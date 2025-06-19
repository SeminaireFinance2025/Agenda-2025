document.addEventListener("DOMContentLoaded", () => {
  /* ─── Références DOM ─────────────────────────────────────────────── */
  const form      = document.getElementById("nameForm");
  const firstIn   = document.getElementById("first_name");
  const lastIn    = document.getElementById("last_name");
  const feedback  = document.getElementById("feedback");
  const planning  = document.getElementById("planning");
  const planTitle = document.getElementById("planTitle");   // ← nouveau

  const g1      = document.getElementById("g1");
  const g1room  = document.getElementById("g1room");
  const g2      = document.getElementById("g2");
  const g2b     = document.getElementById("g2b");
  const g3      = document.getElementById("g3");
  const g3room  = document.getElementById("g3room");
  const download = document.getElementById("downloadPdf");

  /* ─── Tables groupe → salle ──────────────────────────────────────── */
  const roomsAct1 = { 1: "Maison", 2: "Salle A/C", 3: "Salle B" };
  const roomsAct3 = { 1: "Salle D", 2: "Salle A/C" };

  /* ─── 1) Charger le JSON & corriger les NaN ─────────────────────── */
  fetch("./assignments.json")
    .then(r => { if (!r.ok) throw new Error("HTTP " + r.status); return r.text(); })
    .then(t => JSON.parse(t.replace(/\bNaN\b/g, '"N/A"')))
    .then(assignments => {

      /* ─── 2) Soumission du formulaire ────────────────────────────── */
      form.addEventListener("submit", ev => {
        ev.preventDefault();
        feedback.textContent = "";

        const normalize = s =>
          s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim().toLowerCase();

        const firstNorm = normalize(firstIn.value);
        const lastNorm  = normalize(lastIn.value);
        if (!firstNorm || !lastNorm) {
          feedback.textContent = "Merci de remplir prénom et nom.";
          return;
        }

        const user = assignments[`${firstNorm} ${lastNorm}`];
        if (!user) {
          feedback.textContent = "Nom non trouvé. Vérifiez l’orthographe, évitez les accents.";
          return;
        }
        /* ---- 3) Titre personnalisé ---- */
        const formatName = (p, n) =>
          p.charAt(0).toUpperCase() + p.slice(1).toLowerCase() + " " + n.toUpperCase();
        
        document.getElementById("titleLine1").textContent = "Séminaire Finance 2025";
        document.getElementById("titleLine2").textContent =
          formatName(firstIn.value.trim(), lastIn.value.trim());

        /* ─── 4) Injecter groupes + salles ─────────────────────────── */
        g1.textContent  = user.act1 === "N/A" ? "N/A" : `Groupe ${user.act1}`;
        g1room.textContent = roomsAct1[user.act1] || "";

        g2.textContent  = user.act2 === "N/A" ? "N/A" : `Groupe ${user.act2}`;
        g2b.textContent = g2.textContent;

        g3.textContent  = user.act3 === "N/A" ? "N/A" : `Groupe ${user.act3}`;
        g3room.textContent = roomsAct3[user.act3] || "";

        planning.style.display = "block";

        /* ─── 5) Téléchargement PDF ────────────────────────────────── */
        download.onclick = () => {
          const element = planning;
          const dpi     = 96;
          const mm      = v => v * 25.4 / dpi;   // px → mm

          html2pdf().from(element).set({
            html2canvas: { scale: 2, useCORS: true }
          })
          .toPdf()
          .get('pdf')
          .then(pdf => {
            const wMM = mm(element.offsetWidth  * 2); // scale=2
            const hMM = mm(element.offsetHeight * 2);
            pdf.internal.pageSize.setWidth (wMM);
            pdf.internal.pageSize.setHeight(hMM);
          })
          .save(`planning_${firstNorm}_${lastNorm}.pdf`);
        };
      });
    })
    .catch(err => {
      console.error(err);
      feedback.textContent = "Impossible de charger les affectations : " + err.message;
    });
});
