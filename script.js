document.addEventListener("DOMContentLoaded", () => {
  const form     = document.getElementById("nameForm");
  const feedback = document.getElementById("feedback");
  const planning = document.getElementById("planning");
  const spans    = {
    g1: document.getElementById("g1"),
    g2: document.getElementById("g2"),
    g3: document.getElementById("g3")
  };
  let assignments = {};

  // Charger les données JSON
  fetch("assignments.json")
    .then(r => r.json())
    .then(json => assignments = json)
    .catch(() => feedback.textContent = "Impossible de charger les affectations.");

  form.addEventListener("submit", ev => {
    ev.preventDefault();
    feedback.textContent = "";

    // 1) Lire et normaliser le nom
    const first = document.getElementById("first_name").value.trim().toLowerCase();
    const last  = document.getElementById("last_name").value.trim().toLowerCase();
    if (!first || !last) {
      feedback.textContent = "Merci de remplir prénom et nom.";
      return;
    }
    const key = `${first} ${last}`;
    const user = assignments[key];
    if (!user) {
      feedback.textContent = "Nom non trouvé. Vérifiez l’orthographe.";
      return;
    }

    // 2) Injecter les groupes dans le planning
    spans.g1.textContent = user.act1;
    spans.g2.textContent = user.act2;
    spans.g3.textContent = user.act3;
    planning.style.display = "block";

    // 3) Bouton pour télécharger en PDF
    document.getElementById("downloadPdf").onclick = () => {
      html2pdf()
        .set({ margin: 0.5, filename: `planning_${first}_${last}.pdf` })
        .from(planning)
        .save();
    };
  });
});
