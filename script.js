document.addEventListener("DOMContentLoaded", () => {
  /* ─── Références DOM ───────────────────────────────────────────── */
  const form      = document.getElementById("nameForm");
  const firstIn   = document.getElementById("first_name");
  const lastIn    = document.getElementById("last_name");
  const feedback  = document.getElementById("feedback");
  const planning  = document.getElementById("planning");
  const download  = document.getElementById("downloadPdf");

  /* Titres et champs planning */
  const title1 = document.getElementById("titleLine1");
  const title2 = document.getElementById("titleLine2");
  const g1      = document.getElementById("g1");
  const g1room  = document.getElementById("g1room");
  const g2      = document.getElementById("g2");
  const g2b     = document.getElementById("g2b");
  const g3      = document.getElementById("g3");
  const g3room  = document.getElementById("g3room");

  /* Tables groupe → salle */
  const roomsAct1 = { 1: "Maison",     2: "Salle A/C", 3: "Salle B"  };
  const roomsAct3 = { 1: "Salle D",    2: "Salle A/C"               };

  /* ─── 1) Charger JSON (corrige NaN) ────────────────────────────── */
  fetch("./assignments.json")
    .then(r => { if (!r.ok) throw new Error("HTTP " + r.status); return r.text(); })
    .then(t => JSON.parse(t.replace(/\bNaN\b/g, '"N/A"')))
    .then(assignments => {

      /* ─── 2) Soumission formulaire ─────────────────────────────── */
      form.addEventListener("submit", ev => {
        ev.preventDefault();
        feedback.textContent = "";

        /* Normalisation : sans accents, lower-case */
        const norm = s => s.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
                                            .trim().toLowerCase();
        const firstNorm = norm(firstIn.value);
        const lastNorm  = norm(lastIn.value);
        if (!firstNorm || !lastNorm){
          feedback.textContent = "Merci de remplir prénom et nom.";
          return;
        }

        const user = assignments[`${firstNorm} ${lastNorm}`];
        if (!user){
          feedback.textContent = "Nom non trouvé. Vérifiez l’orthographe.";
          return;
        }

        /* ─── 3) Titre personnalisé ─────────────────────────────── */
        const formatName = (p, n) =>
          p.charAt(0).toUpperCase() + p.slice(1).toLowerCase() + " " + n.toUpperCase();

        title1.textContent = "Séminaire Finance 2025";
        title2.textContent = formatName(firstIn.value, lastIn.value);

        /* ─── 4) Injecter groupes + salles ───────────────────────── */
        g1.textContent  = user.act1 === "N/A" ? "N/A" : `Groupe ${user.act1}`;
        g1room.textContent = roomsAct1[user.act1] || "";

        g2.textContent  = user.act2 === "N/A" ? "N/A" : `Groupe ${user.act2}`;
        g2b.textContent = g2.textContent;

        g3.textContent  = user.act3 === "N/A" ? "N/A" : `Groupe ${user.act3}`;
        g3room.textContent = roomsAct3[user.act3] || "";

        planning.style.display = "block";

        /* ─── 5) Téléchargement PDF (A4 portrait) ────────────────── */
        download.onclick = () => {
          html2pdf().set({
            margin: 5,                                     // 5 mm
            filename: `planning_${firstNorm}_${lastNorm}.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2, useCORS: true },       // net
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
            pagebreak: { mode: ['avoid-all'] }              // une page
          })
          .from(planning)
          .save();
        };
      });
    })
    .catch(err => {
      console.error(err);
      feedback.textContent =
        "Impossible de charger les affectations : " + err.message;
    });
});
