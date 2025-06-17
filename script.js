document.addEventListener("DOMContentLoaded", () => {
  console.log("▶️ script.js initialized");

  const form     = document.getElementById("nameForm");
  const firstIn  = document.getElementById("first_name");
  const lastIn   = document.getElementById("last_name");
  const feedback = document.getElementById("feedback");
  const planning = document.getElementById("planning");
  const g1       = document.getElementById("g1");
  const g2       = document.getElementById("g2");
  const g3       = document.getElementById("g3");
  const download = document.getElementById("downloadPdf");

  console.log({ form, firstIn, lastIn, feedback, planning, g1, g2, g3, download });

  // 1) Fetch + fix NaN → "N/A"
  fetch("./assignments.json")
    .then(res => {
      console.log("📥 fetch status:", res.status);
      if (!res.ok) throw new Error("HTTP " + res.status);
      return res.text();
    })
    .then(text => {
      console.log("📄 raw JSON preview:", text.slice(0, 80));
      const fixed = text.replace(/\bNaN\b/g, '"N/A"');
      return JSON.parse(fixed);
    })
    .then(assignments => {
      console.log("✅ Parsed", Object.keys(assignments).length, "entries");

      // 2) Wire up form submission
      form.addEventListener("submit", ev => {
        ev.preventDefault();
        feedback.textContent = "";

        // normalize accents + lowercase
        function normalize(str) {
          return str
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .trim()
            .toLowerCase();
        }

        const first = normalize(firstIn.value);
        const last  = normalize(lastIn.value);
        console.log("👤 Inputs:", first, last);

        if (!first || !last) {
          feedback.textContent = "Merci de remplir prénom et nom.";
          return;
        }

        const key = first + " " + last;
        console.log("🔑 Lookup key:", key);

        const user = assignments[key];
        console.log("🔍 Lookup result:", user);

        if (!user) {
          feedback.textContent = "Nom non trouvé. Vérifiez l’orthographe.";
          return;
        }

        // 3) Populate planning
        g1.textContent = user.act1 === "N/A" ? "N/A" : `Groupe ${user.act1}`;
        g2.textContent = user.act2 === "N/A" ? "N/A" : `Groupe ${user.act2}`;
        g3.textContent = user.act3 === "N/A" ? "N/A" : `Groupe ${user.act3}`;
        planning.style.display = "block";

        // 4) PDF download
        download.onclick = () => {
          html2pdf()
            .set({
              margin: 0.5,
              filename: `planning_${first}_${last}.pdf`,
            })
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
