document.addEventListener("DOMContentLoaded", () => {
  console.log("🔍 script.js loaded");

  // Grab elements and log them
  const form     = document.getElementById("nameForm");
  const feedback = document.getElementById("feedback");
  const planning = document.getElementById("planning");
  const g1       = document.getElementById("g1");
  const g2       = document.getElementById("g2");
  const g3       = document.getElementById("g3");
  const download = document.getElementById("downloadPdf");

  console.log({ form, feedback, planning, g1, g2, g3, download });

  // Inline assignments (shortened for brevity—you get the idea)
  const assignments = {
    "sophie malbec": { act1: 1, act2: 1, act3: 2 },
    /* … your other entries … */
  };

  form.addEventListener("submit", ev => {
    ev.preventDefault();
    feedback.textContent = "";
    console.log("Form submitted");

    // Read & normalize
    const rawFirst = document.getElementById("first_name").value;
    const rawLast  = document.getElementById("last_name").value;
    const first = rawFirst.trim().toLowerCase();
    const last  = rawLast.trim().toLowerCase();
    console.log("First:", first, "Last:", last);

    const key = `${first} ${last}`;
    console.log("Looking up key:", key);

    const user = assignments[key];
    console.log("Lookup result:", user);

    if (!user) {
      feedback.textContent = "Nom non trouvé.";
      return;
    }

    // Inject and show
    g1.textContent = `Groupe ${user.act1}`;
    g2.textContent = `Groupe ${user.act2}`;
    g3.textContent = `Groupe ${user.act3}`;
    planning.style.display = "block";
  });
});
