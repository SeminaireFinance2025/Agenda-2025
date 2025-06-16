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

  // ——————————————————————————————————————————
  // 1) Load the JSON from the raw GitHub URL
  // ——————————————————————————————————————————
  const rawUrl = 
    "https://raw.githubusercontent.com/SeminaireFinance2025/Agenda-2025/main/assignments.json";

  console.log("» fetching assignments from:", rawUrl);
  fetch(rawUrl)
    .then(r => {
      console.log("» fetch status:", r.status, r.url);
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      return r.json();
    })
    .then(json => {
      console.log("» assignments loaded:", Object.keys(json).length, "entries");
      assignments = json;
    })
    .catch(err => {
      feedback.textContent = "Impossible de charger les affectations : " + err;
      console.error(err);
    });

  // ——————————————————————————————————————————
  // 2) Form submit handler
  // ——————————————————————————————————————————
  form.addEventListener("submit", ev => {
    ev.preventDefault();
    feedback.textContent = "";

    const first = document.getElementById("first_name").value.trim().toLowerCase();
    const last  = document.getElementById("last_name").value.trim().toLowerCase();
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

    // Inject each group into the planning
    spans.g1.textContent = user.act1;
    spans.g2.textContent = user.act2;
    spans.g3.textContent = user.act3;
    planning.style.display  = "block";

    // Hook up the “Download PDF” button
    document.getElementById("downloadPdf").onclick = () => {
      html2pdf()
        .set({ margin: 0.5, filename: `planning_${first}_${last}.pdf` })
        .from(planning)
        .save();
    };
  });
});
