document.getElementById('nameForm').addEventListener('submit', function(event) {
  event.preventDefault();
  const enteredName = document.getElementById('name').value.trim().toLowerCase();
  const feedback = document.getElementById('feedback');
  feedback.textContent = ""; // Clear any previous message

  // --- Configuration Section ---
  const groupMembership = {
    "group 1": ["brody", "ashley", "justin", "zack"],
    "group 2": ["ines", "pierre", "ford", "chris"],
    "group 3": ["vi", "devon", "virgile", "jordan"],
  };

  const groupPdfs = {
    "group 1": "pdfs/proj3.pdf",
    "group 2": "pdfs/Mechanical_Keyboard_Instructions.pdf",
    "group 3": "pdfs/hw8.pdf",
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
