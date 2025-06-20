document.addEventListener("DOMContentLoaded", () => {
  /* ─── Références DOM ─────────────────────────────────────────── */
  const form      = document.getElementById("nameForm");
  const firstIn   = document.getElementById("first_name");
  const lastIn    = document.getElementById("last_name");
  const feedback  = document.getElementById("feedback");
  const planning  = document.getElementById("planning");
  const download  = document.getElementById("downloadPdf");

  /* Titres + champs planning */
  const title1 = document.getElementById("titleLine1");
  const title2 = document.getElementById("titleLine2");
  const g1      = document.getElementById("g1");
  const g1room  = document.getElementById("g1room");
  const g2      = document.getElementById("g2");
  const g2b     = document.getElementById("g2b");
  const g3      = document.getElementById("g3");
  const g3room  = document.getElementById("g3room");

  /* Tables groupe → salle */
  const roomsAct1 = { 1: "Maison", 2: "Salle A/C", 3: "Salle B" };
  const roomsAct3 = { 1: "Salle D", 2: "Salle A/C" };

  /* ─── 1) Charger JSON (corrige NaN) ─────────────────────────── */
  fetch("./assignments.json")
    .then(r => { if (!r.ok) throw new Error("HTTP " + r.status); return r.text(); })
    .then(t => JSON.parse(t.replace(/\bNaN\b/g, '"N/A"')))
    .then(assignments => {

      /* ─── 2) Soumission formulaire ───────────────────────────── */
      form.addEventListener("submit", ev => {
        ev.preventDefault();
        feedback.textContent = "";

        const norm = s => s.normalize("NFD")
                           .replace(/[\u0300-\u036f]/g, "")
                           .trim().toLowerCase();

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

        /* ─── 3) Planning global si trois champs = "N/A" ───────── */
        if (user.act1 === "N/A" && user.act2 === "N/A" && user.act3 === "N/A") {
          generateFullPlanning(assignments);
          return;
        }

        /* ─── 4) Titre personnalisé ────────────────────────────── */
        const formatName = (p, n) =>
          p.charAt(0).toUpperCase() + p.slice(1).toLowerCase() + " " + n.toUpperCase();

        title1.textContent = "Séminaire Finance 2025";
        title2.textContent = formatName(firstIn.value, lastIn.value);

        /* ─── 5) Injecter groupes + salles (affiche N/A proprement) */
        g1.textContent     = user.act1 === "N/A" ? "N/A" : `Groupe ${user.act1}`;
        g1room.textContent = user.act1 === "N/A" ? "N/A" : (roomsAct1[user.act1] || "N/A");

        g2.textContent  = user.act2 === "N/A" ? "N/A" : `Groupe ${user.act2}`;
        g2b.textContent = g2.textContent; // miroir si tu as deux emplacements

        g3.textContent     = user.act3 === "N/A" ? "N/A" : `Groupe ${user.act3}`;
        g3room.textContent = user.act3 === "N/A" ? "N/A" : (roomsAct3[user.act3] || "N/A");

        planning.style.display = "block";

        /* ─── 6) Téléchargement PDF personnalisé ───────────────── */
        download.onclick = async () => {
          await html2pdf().set({
            margin: 5,
            filename: `planning_${firstNorm}_${lastNorm}.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2, useCORS: true },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
            pagebreak: { mode: ['css', 'legacy'] }
          }).from(planning).save();
        };
      });

      /* ─── 7) Fonction : Générer planning global ─────────────── */
      function generateFullPlanning(assignments) {
        title1.textContent = "Planning général - Séminaire Finance 2025";
        title2.textContent = "Ines MAJJAD";

        const table = document.createElement("table");
        table.innerHTML = `
          <thead><tr>
            <th>Nom</th><th>Act1</th><th>Salle1</th>
            <th>Act2</th><th>Act3</th><th>Salle3</th>
          </tr></thead><tbody></tbody>`;

        Object.entries(assignments).forEach(([fullName, data]) => {
          /* on ignore la ligne d’Ines (les trois champs = "N/A") */
          if (data.act1 === "N/A" && data.act2 === "N/A" && data.act3 === "N/A") return;

          const act1Display = data.act1 === "N/A" ? "N/A" : `Groupe ${data.act1}`;
          const act1Room    = data.act1 === "N/A" ? "N/A" : (roomsAct1[data.act1] || "N/A");

          const act2Display = data.act2 === "N/A" ? "N/A" : `Groupe ${data.act2}`;
          const act3Display = data.act3 === "N/A" ? "N/A" : `Groupe ${data.act3}`;
          const act3Room    = data.act3 === "N/A" ? "N/A" : (roomsAct3[data.act3] || "N/A");

          const row = document.createElement("tr");
          row.innerHTML = `
            <td>${fullName}</td>
            <td>${act1Display}</td><td>${act1Room}</td>
            <td>${act2Display}</td>
            <td>${act3Display}</td><td>${act3Room}</td>
          `;
          table.querySelector("tbody").appendChild(row);
        });

        /* wrapper responsive pour mobile */
        const wrapper = document.createElement("div");
        wrapper.style.overflowX = "auto";
        wrapper.appendChild(table);

        planning.innerHTML = "";
        planning.appendChild(wrapper);
        planning.style.display = "block";

        /* --- PDF global --- */
        download.onclick = async () => {
          await html2pdf().set({
            margin: 5,
            filename: `planning_global_ines_majjad.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2, useCORS: true },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
            pagebreak: { mode: ['css', 'legacy'] }
          }).from(planning).save();
        };
      }
    })
    .catch(err => {
      console.error(err);
      feedback.textContent =
        "Impossible de charger les affectations : " + err.message;
    });
});
