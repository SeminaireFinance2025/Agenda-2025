document.addEventListener("DOMContentLoaded", function() {
  console.log("✔ script.js running");

  const form     = document.getElementById("nameForm");
  const feedback = document.getElementById("feedback");
  const planning = document.getElementById("planning");
  const g1       = document.getElementById("g1");
  const g2       = document.getElementById("g2");
  const g3       = document.getElementById("g3");

  // 1) Fetch the JSON we generated
 fetch("./assignments.json")
    .then(res => {
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return res.text();
    })
    .then(text => {
      // replace any standalone NaN (not inside quotes) with "N/A"
      const fixed = text.replace(/\bNaN\b/g, '"N/A"');
      return JSON.parse(fixed);
    })
    .then(assignments => {
      console.log("✅ Loaded assignments after NaN→N/A replacement");
      // ... (rest of your form handler here) ...
    })
    .catch(err => {
      feedback.textContent = "Impossible de charger les affectations : " + err.message;
      console.error(err);
    });
      // 2) On form submit, look up the user
      form.addEventListener("submit", function(e) {
        e.preventDefault();
        feedback.textContent = "";

        function normalize(str) {
          return str
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .trim()
            .toLowerCase();
        }

        const firstRaw = document.getElementById("first_name").value;
        const lastRaw  = document.getElementById("last_name").value;
        const first = normalize(firstRaw);
        const last  = normalize(lastRaw);

        console.log("Inputs → first:", first, "last:", last);
        if (!first || !last) {
          feedback.textContent = "Merci de remplir prénom et nom.";
          return;
        }

        const key = first + " " + last;
        console.log("Looking up key:", key);
        const user = assignments[key];
        console.log("Lookup result:", user);

        if (!user) {
          feedback.textContent = "Nom non trouvé. Vérifiez l’orthographe.";
          return;
        }

        // 3) Inject into the planning card
        g1.textContent = (user.act1 != null) ? "Groupe " + user.act1 : "N/A";
        g2.textContent = (user.act2 != null) ? "Groupe " + user.act2 : "N/A";
        g3.textContent = (user.act3 != null) ? "Groupe " + user.act3 : "N/A";
        planning.style.display = "block";

        // 4) Wire up the PDF download
        document.getElementById("downloadPdf").onclick = function() {
          html2pdf()
            .set({
              margin: 0.5,
              filename: "planning_" + first + "_" + last + ".pdf"
            })
            .from(planning)
            .save();
        };
      });
    })
    .catch(function(err) {
      console.error("Failed to load JSON:", err);
      feedback.textContent = "Impossible de charger les affectations : " + err.message;
    });
});
