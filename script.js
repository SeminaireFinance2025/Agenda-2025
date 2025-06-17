document.addEventListener("DOMContentLoaded", () => {
  console.log("▶️ script.js initialized");

  /* ————— Références DOM ————— */
  const form     = document.getElementById("nameForm");
  const firstIn  = document.getElementById("first_name");
  const lastIn   = document.getElementById("last_name");
  const feedback = document.getElementById("feedback");
  const planning = document.getElementById("planning");
  const g1       = document.getElementById("g1");
  const g2       = document.getElementById("g2");
  const g2b      = document.getElementById("g2b");   // ← nouvelle référence
  const g3       = document.getElementById("g3");
  const download = document.getElementById("downloadPdf");

  console.log({ form, firstIn, lastIn, feedback, planning, g1, g2, g2b, g3, download });

  /* ————— 1) Charger le JSON et remplacer les NaN ————— */
  fetch("./assignments.json")
    .then(res => {
      console.log("📥 fetch status:", res.status);
      if (!res.ok) throw new Error("HTTP " + res.status);
      return res.text();
    })
    .then(text => {
      const fixed = text.replace(/\bNaN\b/g, '"N/A"');
      return JSON.parse(fixed);
    })
    .then(assignments => {
      console.log("✅ Parsed", Object.keys(assignments).length, "entries");

      /* ————— 2) Soumission du formulaire ————— */
      form.addEventListener("submit", ev => {
        ev.preventDefault();
        feedback.textContent = "";

        const normalize = s =>
          s.normalize("NFD")
           .replace(/[\u0300-\u036f]/g, "")
           .trim()
           .toLowerCase();

        const first = normalize(firstIn.value);
        const last  = normalize(lastIn.value);
        if (!first || !last) {
          feedback.textContent = "Merci de remplir prénom et nom.";
          return;
        }

        const key  = `${first} ${last}`;
        const user = assignments[key];
        if (!user) {
          feedback.textContent = "Nom non trouvé. Vérifiez l’orthographe, évitez les accents.";
          return;
        }

        /* ————— 3) Injection des groupes ————— */
        g1.textContent  = user.act1 === "N/A" ? "N/A"         : `Groupe ${user.act1}`;
        g2.textContent  = user.act2 === "N/A" ? "N/A"         : `Groupe ${user.act2}`;
        g2b.textContent = g2.textContent; // même numéro pour 2e partie
        g3.textContent  = user.act3 === "N/A" ? "N/A"         : `Groupe ${user.act3}`;

        planning.style.display = "block";

        /* ————— 4) Téléchargement PDF ————— */
        download.onclick = () => {
          html2pdf()
            .set({ margin: 0.5, filename: `planning_${first}_${last}.pdf` })
            .from(planning)
            .save();
        };
      });
    })
    .catch(err => {
      console.error("❌ JSON load/parse failed:", err);
      feedback.textContent = "Impossible de charger les affectations : " + err.message;
    });
});
