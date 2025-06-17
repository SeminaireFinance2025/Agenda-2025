document.addEventListener("DOMContentLoaded", () => {
  console.log("▶️ script.js initialized");

  // Grab all the important DOM nodes and log them
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

  // 1) Load the JSON as text, replace NaN → "N/A", parse it
  fetch("./assignments.json")
    .then(res => {
      console.log("📥 fetch status:", res.status, res.url);
      if (!res.ok) throw new Error("HTTP " + res.status);
      return res.text();
    })
    .then(text => {
      console.log("📄 raw JSON starts with:", text.slice(0, 100));
      const fixed = text.replace(/\bNaN\b/g, '"N/A"');
      return JSON.parse(fixed);
    })
    .then(assignments => {
      console.log("✅ Parsed assignments:", Object.keys(assignments).length, "entries");

      // 2) Now that we have data, wire up the form submit
      form.addEventListener("submit", ev => {
        ev.preventDefault();
        feedback.textContent = "";

        // Normalize accents + lowercase
        function normalize(str) {
          return str
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .trim()
            .toLowerCase();
        }

        const first = normalize(firstIn.value);
        const last  = normalize(lastIn.value);
        console.log("👤 Input normalized:", first, last);

        if (!first || !last) {
          feedback.textContent = "Merci de remplir prénom et nom.";
          console.warn("❗ Missing first or last");
          return;
        }

        const key = first + " " + last;
        console.log("🔑 Lookup key:", key);

        const user = assignments[key];
        console.log("🔍 Lookup result:", user);

        if (!user) {
          feedback.textContent = "Nom non trouvé. Vérifiez l’orthographe.";
          console.error("❌ User not found for key:", key);
          return;
        }

        // 3) Inject groups into the page
        g1.textContent = user.act1 === "N/A" ? "N/A" : "Groupe " + user.act1;
        g2.textContent = user.act2 === "N/A" ? "N/A" : "Groupe " + user.act2;
        g3.textContent = user.act3 === "N/A" ? "N/A" : "Groupe " + user.act3;
        planning.style.display = "block";
        console.log("🎉 Planning displayed");

        // 4) Wire PDF button
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
      console.error("❌ Failed to load or parse assignments.json:", err);
      feedback.textContent = "Impossible de charger les affectations : " + err.message;
    });
});
