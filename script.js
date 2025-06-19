document.addEventListener("DOMContentLoaded", () => {
  console.log("▶️ script.js initialized");

  /* ————— Références DOM ————— */
  const form     = document.getElementById("nameForm");
  const firstIn  = document.getElementById("first_name");
  const lastIn   = document.getElementById("last_name");
  const feedback = document.getElementById("feedback");
  const planning = document.getElementById("planning");

  const g1       = document.getElementById("g1");
  const g1room   = document.getElementById("g1room");   // salle act1
  const g2       = document.getElementById("g2");
  const g2b      = document.getElementById("g2b");
  const g3       = document.getElementById("g3");
  const g3room   = document.getElementById("g3room");   // salle act3

  const download = document.getElementById("downloadPdf");

  console.log({ form, firstIn, lastIn, g1, g1room, g2, g2b, g3, g3room });

  /* ————— Tables groupe → salle ————— */
  const roomsAct1 = { 1: "Maison",      2: "Salle A/C", 3: "Salle B"  }; // Actualités
  const roomsAct3 = { 1: "Salle D",     2: "Salle A/C"               }; // Conférences

  /* ————— 1) Charger le JSON et corriger les NaN ————— */
  fetch("./assignments.json")
    .then(res => {
      if (!res.ok) throw new Error("HTTP " + res.status);
      return res.text();
    })
    .then(t => JSON.parse(t.replace(/\bNaN\b/g, '"N/A"')))
    .then(assignments => {

      /* ————— 2) Soumission formulaire ————— */
      form.addEventListener("submit", ev => {
        ev.preventDefault();
        feedback.textContent = "";

        const normalize = s =>
          s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim().toLowerCase();

        const first = normalize(firstIn.value);
        const last  = normalize(lastIn.value);
        if (!first || !last) {
          feedback.textContent = "Merci de remplir prénom et nom.";
          return;
        }

        const user = assignments[`${first} ${last}`];
        if (!user) {
          feedback.textContent = "Nom non trouvé. Vérifiez l’orthographe, évitez les accents.";
          return;
        }

        /* ————— 3) Injecter groupes + salles ————— */
        g1.textContent = user.act1 === "N/A" ? "N/A" : `Groupe ${user.act1}`;
        g1room.textContent = roomsAct1[user.act1] || "";

        g2.textContent  = user.act2 === "N/A" ? "N/A" : `Groupe ${user.act2}`;
        g2b.textContent = g2.textContent;                           // même numéro

        g3.textContent = user.act3 === "N/A" ? "N/A" : `Groupe ${user.act3}`;
        g3room.textContent = roomsAct3[user.act3] || "";

        planning.style.display = "block";

        /* ————— 4) Téléchargement PDF ————— */
        download.onclick = () => {
          html2pdf().set({
            margin: 5,                               // ← marges réduites
            filename: `planning_${first}_${last}.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2, useCORS: true },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
            pagebreak: { mode: ['avoid-all'] }       // on garde une seule page
          }).from(planning).save();
        };
      });
    })
    .catch(err => {
      console.error(err);
      feedback.textContent = "Impossible de charger les affectations : " + err.message;
    });
});
