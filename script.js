document.getElementById('nameForm').addEventListener('submit', function(event) {
  event.preventDefault();

  // Récupérer prénom et nom séparément
  const first = document.getElementById('first_name').value.trim().toLowerCase();
  const last  = document.getElementById('last_name').value.trim().toLowerCase();
  const feedback = document.getElementById('feedback');
  feedback.textContent = ""; // Effacer tout message précédent

  // Validation basique : s’assurer que les deux champs ne sont pas vides
  if (first === "" || last === "") {
    feedback.textContent = "Veuillez saisir à la fois votre prénom et votre nom.";
    return;
  }

  // Combiner prénom et nom avec un espace
  const enteredName = `${first} ${last}`;

  // --- Section de configuration ---
  const groupMembership = {
    "group1": ["ines majjad", "antoine begon","antoine duverger"],
    "group2": ["marjorie clement", "loyse faroux"],
    "group3": ["aldona meneret", "aida loquette"],
  };

  const groupPdfs = {
    "group1": "pdfs/Planning Seminaire FINANCE ANTOINE.pdf",
    "group2": "pdfs/TESTGROUP2.pdf",
    "group3": "pdfs/TESTGROUP3.pdf",
  };

  let foundGroup = null;

  for (const groupName in groupMembership) {
    // On s’assure de bien comparer après trim pour éviter erreurs sur espaces en trop
    const normalizedList = groupMembership[groupName].map(name => name.trim().toLowerCase());
    if (normalizedList.includes(enteredName)) {
      foundGroup = groupName;
      break;
    }
  }

  if (foundGroup) {
    // On redirige vers le bon PDF
    window.location.href = groupPdfs[foundGroup];
  } else {
    feedback.textContent = "Essayez encore !";
  }
});
