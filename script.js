document.getElementById('nameForm').addEventListener('submit', function(event) {
  event.preventDefault();
  const enteredName = document.getElementById('name').value.trim().toLowerCase();
  const feedback = document.getElementById('feedback');
  feedback.textContent = ""; // Clear any previous message

  // --- Configuration Section ---
  const groupMembership = {
    "group 1": ["Loyse faroux", "Ines majjad", "Antoine begon"],
    "group 2": ["Antoine duverger", "Marjorie clement"],
    "group 3": ["Aida locquette", "Aldona meneret"]
  };

  const groupPdfs = {
    "group 1": "pdfs/TESTGROUP1.pdf",
    "group 2": "pdfs/TESTGROUP2.pdf",
    "group 3": "pdfs/TESTGROUP3.pdf"
  };

  let pdfFile = null;
  let foundGroup = null;

  for (const groupName in groupMembership) {
    if (groupMembership[groupName].includes(enteredName)) {
      foundGroup = groupName;
      break;
    }
  }

  if (foundGroup) {
    pdfFile = groupPdfs[foundGroup];
  }

  if (pdfFile) {
    window.location.href = pdfFile;
  } else {
    feedback.textContent = "Essayez encore !";
  }
});
