document.getElementById('nameForm').addEventListener('submit', function(event) {
  event.preventDefault();
  const enteredName = document.getElementById('name').value.trim().toLowerCase();
  const feedback = document.getElementById('feedback');
  feedback.textContent = ""; // Clear any previous message

  // --- Configuration Section ---
  const groupMembership = {
    "group 1": ["loyse faroux", "ines majjad", "antoine begon"],
    "group 2": ["antoine duverger", "marjorie clement"],
    "group 3": ["aida locquette", "aldona meneret"]
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
