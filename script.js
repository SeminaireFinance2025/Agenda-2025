document.addEventListener("DOMContentLoaded", () => {

  /* ── Références DOM ─────────────────────────────────────────── */
  const form      = document.getElementById("nameForm");
  const firstIn   = document.getElementById("first_name");
  const lastIn    = document.getElementById("last_name");
  const feedback  = document.getElementById("feedback");
  const planning  = document.getElementById("planning");
  const download  = document.getElementById("downloadPdf");

  const title1 = document.getElementById("titleLine1");
  const title2 = document.getElementById("titleLine2");
  const g1      = document.getElementById("g1");
  const g1room  = document.getElementById("g1room");
  const g2      = document.getElementById("g2");
  const g2b     = document.getElementById("g2b");
  const g3      = document.getElementById("g3");
  const g3room  = document.getElementById("g3room");

  /* Groupes → salles */
  const roomsAct1 = { 1: "Maison", 2: "Salle A/C", 3: "Salle B" };
  const roomsAct3 = { 1: "Salle D", 2: "Salle A/C" };
  const isNA      = x => x == null || x === "N/A";

  /* ── Charger JSON ───────────────────────────────────────────── */
  fetch("./assignments.json")
    .then(r => { if (!r.ok) throw new Error(`HTTP ${r.status}`); return r.text(); })
    .then(t => JSON.parse(t.replace(/\bNaN\b/g, '"N/A"')))
    .then(assignments => {

      /* ── Soumission formulaire ──────────────────────────────── */
      form.addEventListener("submit", ev => {
        ev.preventDefault();
        feedback.textContent = "";

        const norm = s => s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim().toLowerCase();
        const firstNorm = norm(firstIn.value);
        const lastNorm  = norm(lastIn.value);

        if (!firstNorm || !lastNorm){
          feedback.textContent = "Merci de remplir prénom et nom.";
          return;
        }

        const user = assignments[`${firstNorm} ${lastNorm}`];
        if (!user){
          feedback.textContent = "Nom non trouvé. Vérifiez l’orthographe, évitez les accents.";
          return;
        }

        /* Vue globale ou individuelle */
        if (isNA(user.act1) && isNA(user.act2) && isNA(user.act3)){
          renderGlobal(assignments);
          attachDownload("planning_global_ines_majjad.pdf");
        } else {
          renderPersonal(user, firstIn.value, lastIn.value);
          attachDownload(`planning_${firstNorm}_${lastNorm}.pdf`);
        }
      });

      /* ── Rendus ─────────────────────────────────────────────── */

      function renderPersonal(u, first, last){
        title1.textContent = "Séminaire Finance 2025";
        title2.textContent = `${first.charAt(0).toUpperCase()+first.slice(1).toLowerCase()} ${last.toUpperCase()}`;

        g1.textContent     = isNA(u.act1) ? "N/A" : `Groupe ${u.act1}`;
        g1room.textContent = isNA(u.act1) ? "N/A" : (roomsAct1[u.act1] || "N/A");
        g2.textContent     = isNA(u.act2) ? "N/A" : `Groupe ${u.act2}`;
        g2b.textContent    = g2.textContent;
        g3.textContent     = isNA(u.act3) ? "N/A" : `Groupe ${u.act3}`;
        g3room.textContent = isNA(u.act3) ? "N/A" : (roomsAct3[u.act3] || "N/A");

        planning.style.display = "block";
      }

      function renderGlobal(data){
        title1.textContent = "Planning général - Séminaire Finance 2025";
        title2.textContent = "Ines MAJJAD";

        const table = document.createElement("table");
        table.innerHTML = `
          <thead><tr>
            <th>Nom</th><th>Act1</th><th>Salle1</th>
            <th>Act2</th><th>Act3</th><th>Salle3</th>
          </tr></thead><tbody></tbody>`;

        Object.entries(data).forEach(([name, d])=>{
          if (isNA(d.act1) && isNA(d.act2) && isNA(d.act3)) return; // saute Ines

          const row = document.createElement("tr");
          row.innerHTML = `
            <td>${name}</td>
            <td>${isNA(d.act1) ? "N/A" : `Groupe ${d.act1}`}</td>
            <td>${isNA(d.act1) ? "N/A" : (roomsAct1[d.act1] || "N/A")}</td>
            <td>${isNA(d.act2) ? "N/A" : `Groupe ${d.act2}`}</td>
            <td>${isNA(d.act3) ? "N/A" : `Groupe ${d.act3}`}</td>
            <td>${isNA(d.act3) ? "N/A" : (roomsAct3[d.act3] || "N/A")}</td>`;
          table.tBodies[0].appendChild(row);
        });

        planning.innerHTML = "";
        const wrap = document.createElement("div");
        wrap.style.overflowX = "auto";
        wrap.appendChild(table);
        planning.appendChild(wrap);
        planning.style.display = "block";
      }

      /* ── Téléchargement PDF ─────────────────────────────────── */

      function attachDownload(filename){
        /* reset pour éviter empilement */
        download.replaceWith(download.cloneNode(true));
        const btn = document.getElementById("downloadPdf");

        btn.onclick = async () => {
          if (!window.html2pdf){
            alert("Le module PDF n'a pas été chargé. Veuillez réessayer plus tard.");
            return;
          }
          try{
            await html2pdf()
              .set({
                margin:5,
                filename,
                html2canvas:{ scale:2, useCORS:true },
                jsPDF:{ unit:"mm", format:"a4", orientation:"portrait" },
                pagebreak:{ mode:["css","legacy"] }
              })
              .from(planning)
              .save();
          }catch(e){
            console.error("Erreur html2pdf :", e);
            alert("Impossible de générer le PDF.");
          }
        };
      }

    })
    .catch(err=>{
      console.error(err);
      feedback.textContent = `Impossible de charger les affectations : ${err.message}`;
    });

});
