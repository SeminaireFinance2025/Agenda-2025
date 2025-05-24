document.getElementById('nameForm').addEventListener('submit', function(event) {
  event.preventDefault();
  const enteredName = document.getElementById('name').value.trim().toLowerCase();
  const feedback = document.getElementById('feedback');
  feedback.textContent = ""; // Clear any previous message

  // --- Configuration Section ---
  const groupMembership = {
    "titans": ["brody", "ashley", "justin", "zack"],
    "olympians": ["ines", "pierre", "ford", "chris"],
    "innovators": ["vi", "devon", "virgule", "jordan"],
    "voyagers": ["beans", "nelson", "david", "pat"],
    "pioneers": ["kelly", "lily", "leo", "max"]
  };

  const groupPdfs = {
    "titans": "pdfs/proj3.pdf",
    "olympians": "pdfs/Mechanical_Keyboard_Instructions.pdf",
    "innovators": "pdfs/hw8.pdf",
    "voyagers": "pdfs/hw7.pdf",
    "pioneers": "pdfs/cpu.pdf"
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
