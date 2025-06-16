document.addEventListener("DOMContentLoaded", () => {
  const form     = document.getElementById("nameForm");
  const feedback = document.getElementById("feedback");
  const planning = document.getElementById("planning");
  const spans    = {
    g1: document.getElementById("g1"),
    g2: document.getElementById("g2"),
    g3: document.getElementById("g3")
  };
  let assignments = {
  "sophie malbec": {
    "act1": 1.0,
    "act2": 1.0,
    "act3": 2.0
  },
  "pascal notte": {
    "act1": 2.0,
    "act2": 2.0,
    "act3": 1.0
  },
  "steve sosson": {
    "act1": 3.0,
    "act2": 3.0,
    "act3": 1.0
  },
  "mélissa collard": {
    "act1": NaN,
    "act2": NaN,
    "act3": NaN
  },
  "vanessa palomba": {
    "act1": NaN,
    "act2": NaN,
    "act3": NaN
  },
  "gabriel canet": {
    "act1": 2.0,
    "act2": 2.0,
    "act3": 2.0
  },
  "aurélie chambon": {
    "act1": 3.0,
    "act2": 3.0,
    "act3": 2.0
  },
  "laurent duhem": {
    "act1": 2.0,
    "act2": 5.0,
    "act3": 2.0
  },
  "carole dupont": {
    "act1": 2.0,
    "act2": 1.0,
    "act3": NaN
  },
  "eric le landais": {
    "act1": 2.0,
    "act2": 3.0,
    "act3": 2.0
  },
  "jonathan pinson": {
    "act1": 2.0,
    "act2": 4.0,
    "act3": 1.0
  },
  "christophe plisson": {
    "act1": 2.0,
    "act2": 5.0,
    "act3": 1.0
  },
  "gilles poilvet": {
    "act1": 1.0,
    "act2": 3.0,
    "act3": 2.0
  },
  "yongqian-christine pont": {
    "act1": 2.0,
    "act2": 1.0,
    "act3": 1.0
  },
  "isabelle rault": {
    "act1": 3.0,
    "act2": 2.0,
    "act3": 1.0
  },
  "samuel renevret": {
    "act1": 3.0,
    "act2": 4.0,
    "act3": 2.0
  },
  "nicolas loiez": {
    "act1": NaN,
    "act2": NaN,
    "act3": NaN
  },
  "lucie le baron": {
    "act1": NaN,
    "act2": NaN,
    "act3": NaN
  },
  "alexis boudjemaa": {
    "act1": 2.0,
    "act2": 2.0,
    "act3": NaN
  },
  "nicolas coster": {
    "act1": 1.0,
    "act2": 1.0,
    "act3": NaN
  },
  "eric hamon": {
    "act1": 2.0,
    "act2": 3.0,
    "act3": 2.0
  },
  "sandrine hamour": {
    "act1": 3.0,
    "act2": 4.0,
    "act3": NaN
  },
  "jerome marion": {
    "act1": 2.0,
    "act2": 5.0,
    "act3": 2.0
  },
  "adam sova": {
    "act1": 2.0,
    "act2": 4.0,
    "act3": NaN
  },
  "cyril baume": {
    "act1": 3.0,
    "act2": 2.0,
    "act3": NaN
  },
  "sidney giraud": {
    "act1": 2.0,
    "act2": 3.0,
    "act3": 2.0
  },
  "stefan mangels": {
    "act1": 2.0,
    "act2": 4.0,
    "act3": NaN
  },
  "marc pelle": {
    "act1": 2.0,
    "act2": 5.0,
    "act3": 2.0
  },
  "denis servole": {
    "act1": 2.0,
    "act2": 2.0,
    "act3": 1.0
  },
  "catherine taoudi": {
    "act1": 2.0,
    "act2": 3.0,
    "act3": 2.0
  },
  "anne vanhoutte": {
    "act1": 1.0,
    "act2": 1.0,
    "act3": NaN
  },
  "kevin wong": {
    "act1": 3.0,
    "act2": 4.0,
    "act3": 2.0
  },
  "vanessa breyton": {
    "act1": 3.0,
    "act2": 1.0,
    "act3": 2.0
  },
  "laura chouzy": {
    "act1": 3.0,
    "act2": 2.0,
    "act3": NaN
  },
  "sandra coutant": {
    "act1": 3.0,
    "act2": 3.0,
    "act3": 2.0
  },
  "clemence dambreville": {
    "act1": 3.0,
    "act2": 4.0,
    "act3": NaN
  },
  "antoine dragon": {
    "act1": 2.0,
    "act2": 5.0,
    "act3": 2.0
  },
  "annick gagnon": {
    "act1": 2.0,
    "act2": 1.0,
    "act3": 2.0
  },
  "yannick hoffmann": {
    "act1": 2.0,
    "act2": 2.0,
    "act3": NaN
  },
  "nicolas lafon": {
    "act1": 2.0,
    "act2": 3.0,
    "act3": NaN
  },
  "frederic langenfeld": {
    "act1": 2.0,
    "act2": 4.0,
    "act3": 2.0
  },
  "lorraine lecussan": {
    "act1": 2.0,
    "act2": 5.0,
    "act3": NaN
  },
  "ludovic levannier": {
    "act1": 2.0,
    "act2": 1.0,
    "act3": 2.0
  },
  "pierre syx": {
    "act1": 1.0,
    "act2": 2.0,
    "act3": NaN
  },
  "adrien viaud": {
    "act1": 2.0,
    "act2": 3.0,
    "act3": 2.0
  },
  "valérie baillat": {
    "act1": 2.0,
    "act2": 4.0,
    "act3": 2.0
  },
  "nathalie boschetti": {
    "act1": 2.0,
    "act2": 5.0,
    "act3": NaN
  },
  "fabien cier": {
    "act1": 3.0,
    "act2": 1.0,
    "act3": 1.0
  },
  "alexandre moutet": {
    "act1": 2.0,
    "act2": 2.0,
    "act3": NaN
  },
  "alexis mehrenberger": {
    "act1": 3.0,
    "act2": 3.0,
    "act3": 2.0
  },
  "lionel moreno": {
    "act1": 2.0,
    "act2": 4.0,
    "act3": 2.0
  },
  "julien pechalat": {
    "act1": 1.0,
    "act2": 5.0,
    "act3": 2.0
  },
  "james wilson": {
    "act1": 2.0,
    "act2": 4.0,
    "act3": 1.0
  },
  "julie boyer": {
    "act1": 2.0,
    "act2": 3.0,
    "act3": 1.0
  },
  "bertrand cochelin": {
    "act1": 2.0,
    "act2": 1.0,
    "act3": NaN
  },
  "catherine constantin": {
    "act1": 3.0,
    "act2": 2.0,
    "act3": 2.0
  },
  "giuseppe curci": {
    "act1": 1.0,
    "act2": 2.0,
    "act3": 1.0
  },
  "stanislas feixas": {
    "act1": 2.0,
    "act2": 4.0,
    "act3": NaN
  },
  "karine labat": {
    "act1": 2.0,
    "act2": 5.0,
    "act3": 2.0
  },
  "freddy roques": {
    "act1": 3.0,
    "act2": 3.0,
    "act3": NaN
  },
  "céline marsaguet": {
    "act1": 3.0,
    "act2": 4.0,
    "act3": NaN
  },
  "valerie sobreira": {
    "act1": NaN,
    "act2": NaN,
    "act3": 2.0
  },
  "olivier blat": {
    "act1": 1.0,
    "act2": 3.0,
    "act3": NaN
  },
  "marina gourdon-dubant": {
    "act1": 2.0,
    "act2": 4.0,
    "act3": NaN
  },
  "geoffroy basset chercot": {
    "act1": 2.0,
    "act2": 5.0,
    "act3": 2.0
  },
  "antoine levassor": {
    "act1": 2.0,
    "act2": 2.0,
    "act3": 2.0
  },
  "pierre-marie soyer": {
    "act1": 2.0,
    "act2": 3.0,
    "act3": NaN
  },
  "sandra mellier": {
    "act1": 3.0,
    "act2": 4.0,
    "act3": 2.0
  },
  "lohan alazard": {
    "act1": NaN,
    "act2": NaN,
    "act3": NaN
  },
  "alexandre rudolf": {
    "act1": NaN,
    "act2": NaN,
    "act3": NaN
  },
  "elisabeth palacio": {
    "act1": 3.0,
    "act2": 5.0,
    "act3": 1.0
  },
  "amandine cotard": {
    "act1": 2.0,
    "act2": 2.0,
    "act3": 2.0
  },
  "sophie touraine": {
    "act1": 2.0,
    "act2": 3.0,
    "act3": 2.0
  },
  "sophie barbay": {
    "act1": 2.0,
    "act2": 4.0,
    "act3": NaN
  },
  "nathalie le talaer": {
    "act1": 2.0,
    "act2": 5.0,
    "act3": 2.0
  },
  "eric fouquay": {
    "act1": 2.0,
    "act2": 1.0,
    "act3": NaN
  },
  "coralie fournier": {
    "act1": 2.0,
    "act2": 2.0,
    "act3": 2.0
  },
  "edwige maugendre": {
    "act1": 3.0,
    "act2": 3.0,
    "act3": 1.0
  },
  "patrick-m thomas": {
    "act1": 1.0,
    "act2": 4.0,
    "act3": 1.0
  },
  "antoine duverger": {
    "act1": 1.0,
    "act2": 2.0,
    "act3": NaN
  },
  "anne aupic": {
    "act1": 3.0,
    "act2": 3.0,
    "act3": NaN
  },
  "christine basse": {
    "act1": 3.0,
    "act2": 4.0,
    "act3": NaN
  },
  "gildas bodolec": {
    "act1": 1.0,
    "act2": 5.0,
    "act3": 2.0
  },
  "christophe chazalon": {
    "act1": 3.0,
    "act2": 1.0,
    "act3": 1.0
  },
  "valerie cluzeau": {
    "act1": 3.0,
    "act2": 2.0,
    "act3": 1.0
  },
  "jean-claude elbazis": {
    "act1": 3.0,
    "act2": 3.0,
    "act3": NaN
  },
  "nicolas gueguen": {
    "act1": 2.0,
    "act2": 1.0,
    "act3": 2.0
  },
  "christian guichardiere": {
    "act1": 1.0,
    "act2": 2.0,
    "act3": NaN
  },
  "sie hien": {
    "act1": 3.0,
    "act2": 3.0,
    "act3": NaN
  },
  "aida locquette": {
    "act1": 2.0,
    "act2": 4.0,
    "act3": 2.0
  },
  "denis masse": {
    "act1": 1.0,
    "act2": 5.0,
    "act3": 2.0
  },
  "eugénie hercouet": {
    "act1": 3.0,
    "act2": 1.0,
    "act3": 1.0
  },
  "pascal picavet": {
    "act1": 1.0,
    "act2": 2.0,
    "act3": NaN
  },
  "nicolas pozniak": {
    "act1": 3.0,
    "act2": 3.0,
    "act3": 2.0
  },
  "emmanuel quil": {
    "act1": 2.0,
    "act2": 4.0,
    "act3": NaN
  },
  "ely rakotobe": {
    "act1": 3.0,
    "act2": 5.0,
    "act3": 2.0
  },
  "delphine richer": {
    "act1": 1.0,
    "act2": 1.0,
    "act3": 2.0
  },
  "francine royer cailleaux": {
    "act1": 1.0,
    "act2": 2.0,
    "act3": NaN
  },
  "nicolas salle": {
    "act1": 2.0,
    "act2": 3.0,
    "act3": 2.0
  },
  "remi schuwer": {
    "act1": 2.0,
    "act2": 4.0,
    "act3": 2.0
  },
  "marie anne michon": {
    "act1": 2.0,
    "act2": 5.0,
    "act3": NaN
  },
  "loyse faroux": {
    "act1": 1.0,
    "act2": 1.0,
    "act3": 1.0
  },
  "marjorie clement": {
    "act1": 3.0,
    "act2": 2.0,
    "act3": NaN
  },
  "cecile chauvin": {
    "act1": 3.0,
    "act2": 3.0,
    "act3": NaN
  },
  "alexandre lieury": {
    "act1": 3.0,
    "act2": 4.0,
    "act3": NaN
  },
  "philippe carbonnel": {
    "act1": 3.0,
    "act2": 5.0,
    "act3": NaN
  },
  "marine guerret": {
    "act1": 3.0,
    "act2": 1.0,
    "act3": NaN
  },
  "baptiste delpierre": {
    "act1": 3.0,
    "act2": 2.0,
    "act3": 1.0
  },
  "jeremy hallebard": {
    "act1": 3.0,
    "act2": 4.0,
    "act3": NaN
  },
  "paul roger-machart": {
    "act1": 2.0,
    "act2": 5.0,
    "act3": 2.0
  },
  "albane duret ferrari": {
    "act1": 3.0,
    "act2": 3.0,
    "act3": 2.0
  },
  "hugo satabin": {
    "act1": NaN,
    "act2": NaN,
    "act3": NaN
  },
  "albin deleuze": {
    "act1": 2.0,
    "act2": 4.0,
    "act3": 2.0
  },
  "frederic lassalle": {
    "act1": 1.0,
    "act2": 1.0,
    "act3": NaN
  },
  "frederic poncet": {
    "act1": 3.0,
    "act2": 2.0,
    "act3": 1.0
  },
  "benoit de la tour du pin": {
    "act1": 3.0,
    "act2": 5.0,
    "act3": NaN
  },
  "sophie berthelier": {
    "act1": 1.0,
    "act2": 3.0,
    "act3": 2.0
  },
  "sandie bocquier": {
    "act1": 3.0,
    "act2": 4.0,
    "act3": 2.0
  },
  "guillaume martin": {
    "act1": 2.0,
    "act2": 5.0,
    "act3": 2.0
  }
}
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
