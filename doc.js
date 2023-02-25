// OnChange dans le dropdown, pour afficher "optionTexts"
  function addStepForm() {
    var stepform = document.getElementById("step-form");
    var select = document.getElementById("options");
    var selectedOption = select.options[select.selectedIndex].value;
  
    stepform.innerHTML = optionTexts[selectedOption];
  }

// Les textes pour les inputs
var optionTexts = { 
  "Vente d'actions": 
    "Date : <br><input type='date' placeholder='Date' id='option-date'><br><br>" +
    "Société : <input placeholder='Société' id='option-company'><br><br>" + 
    "Vendeur : <input placeholder='Vendeur' id='option-vendeur'><br><br>" + 
    "Actions : <input placeholder='Nombre et catégories' id='option-shares'><br><br>" +
    "Prix de vente : <input placeholder='Prix de vente' id='option-price'><br><br>" +
    "Commentaires : <input placeholder='Description' id='option-comments'>",
  "Dividendes": 
    "Date : <br><input type='date' placeholder='Date' id='option-date'><br><br>" +
    "Société : <input placeholder='Société' id='option-company'><br><br>" + 
    "Montant du dividende : <input placeholder='Montant du dividende' id='option-price'>" + 
    "<a id='option-shares'></a>" + // invisible...
    "Commentaires : <input placeholder='Description' id='option-comments'>",
  "Echange":
    "Date : <br><input type='date' placeholder='Date' id='option-date'><br><br>" +  
    "Société : <input placeholder='Société' id='option-company'><br><br>" + 
    "Vendeur : <input placeholder='Vendeur' id='option-vendeur'><br><br>" + 
    "Actions : <input placeholder='Nombre et catégories' id='option-shares'><br><br>" +
    "Contrepartie : <input placeholder='Contrepartie en actions' id='option-price'><br><br>" + 
    "Commentaires : <input placeholder='Description' id='option-comments'>",
  "other":
    "Date : <br><input type='date' placeholder='Date' id='option-date'><br><br>" +  
    "Description de l'étape : <input placeholder='Description' id='option-comments'><br><br>" + 
    "Société : <input placeholder='Société' id='option-company'><br><br>" + 
    "Actions : <input placeholder='Nombre et catégories' id='option-shares'><br><br>" +
    "Vendeur : <input placeholder='Vendeur' id='option-vendeur'><br><br>" + 
    "Contrepartie : <input placeholder='Contrepartie' id='option-price'>",
};

function createDoc() {

  var select = document.getElementById("options");
  var optionName = select.value;
  var optionCompany = document.getElementById("option-company").value;
  var optionVendeur = document.getElementById("option-vendeur").value;
  var optionShares = document.getElementById("option-shares").value;
  var optionDate = document.getElementById("option-date").value;
  var optionPrice = document.getElementById("option-price").value;
  var optionComments = document.getElementById("option-comments").value;

  const getOptionText = (optionName) => {
  switch (optionName) {
    case "Vente d'actions":
      return {
        attenduQue: "ATTENDU QUE vente d'actions",
        que: "QUE le conseil décide de la vente d'actions.",
      };
    case "Dividendes":
      return {
        attenduQue: "ATTENDU QUE la société veut donner du cash",
        que: "QUE la société procède à...",
      };
    case "Echange":
      return {
        attenduQue: 
          `ATTENDU le contrat d’achat de gré à gré par échange d’actions intervenu entre ${optionVendeur} et la société, dont copie est jointe aux présentes.\n\n` +
          "ATTENDU QU’aucun dividende déclaré n’est impayé sur ces actions.\n\n" +
          "ATTENDU qu’aucun appel de versement n’est en cours sur ces actions et qu’aucun montant n’est impayé sur ces actions\n\n" +
          "ATTENDU QUE la société respecte les exigences des articles 95 et 96 de la Loi sur les sociétés par actions du Québec pour payer le prix d’achat desdites actions.\n\n" +
          "ATTENDU que toutes les exigences de la société quant au statut d’émetteur fermé de la société conformément au Règlement 45-106 de la Loi sur les valeurs mobilières (Québec) sur les dispenses de prospectus et d’inscription et quant à l’inscription du cessionnaire à titre d’actionnaire de la société, ont été respectées.\n\n" +
          `ATTENDU QUE la société a convenu avec ${optionVendeur} que la contrepartie payée pour l’acquisition des ${optionShares} serait l’émission, par la société, en faveur de ${optionVendeur} de ${optionPrice} du capital-actions de la société.\n`,        
        que: "QUE la société procède à...\n",
      };
    default:
      return {
        attenduQue: "",
        que: "",
      };
  }
}

  const optionText = getOptionText(optionName);

  const attenduQueText = optionText.attenduQue;
  const queText = optionText.que;

  // DocX

  const introLine = new docx.TextRun({
    text: "RÉSOLUTIONS DU CONSEIL D’ADMINISTRATION DE\n" + optionCompany + "\n",
  });

  const signatureLine = new docx.TextRun({
    text: "                                 ",  
    underline: {},
  });

  const signatureName = new docx.TextRun({
    text: "\n" + "Admin_NAME",
  });

  const copieResolution = new docx.TextRun({
    text: "COPIE DES RÉSOLUTIONS\n\n",
    underline: {},
  });

  const copieResolutionText = new docx.TextRun({
    text: "IL EST RÉSOLU, conformément à l’article 34 de la Loi sur les sociétés par actions du Québec, de conserver dans le Livre de la société une copie des résolutions reproduites ci-dessus, une fois signées par tous les membres du conseil d’administration.\n",    
  });

  const declarationAdoption = new docx.TextRun({
    text: "DÉCLARATION D’ADOPTION\n\n",
    underline: {},
  });

  const declarationAdoptionText = new docx.TextRun({
    text: "Tous les membres du conseil d’administration de la société habiles à voter sur les résolutions susmentionnées lors d’une réunion, adoptent ces résolutions en date des présentes et, conformément à l’article 140 de la Loi sur les sociétés par actions du Québec, apposent leur signature aux présentes afin de conférer à ces résolutions la même valeur que si elles avaient été adoptées au cours d’une réunion du conseil d’administration.\n",  
  });

  // File Name

  var fileName = prompt("Please enter the file name.");

  // Doc Creation

  const doc = new docx.Document({
    sections: [{
          properties: {},
          children: [
            new docx.Paragraph({
              alignment: docx.AlignmentType.CENTER,
              children: [
                introLine,
              ],
            }),
            new docx.Paragraph({
              style: "Normal",
              children: [
                  new docx.TextRun({
                      text: "ADOPTÉES LE: " + optionDate + "\n",
                  }),
              ],
            }),
            new docx.Paragraph({
                style: "Normal",
                children: [
                    new docx.TextRun({
                        text: optionName + "\n\n",
                        underline: {},
                    }),

                    new docx.TextRun({
                    text: attenduQueText,
                    }),
                ],
              }),
              new docx.Paragraph({
                style: "Normal",
                children: [
                    new docx.TextRun({
                        text: "IL EST RÉSOLU: \n\n",
                    }),

                    new docx.TextRun({
                    text: queText,
                    }),
                ],
              }),
              new docx.Paragraph({
                style: "Normal",
                children: [
                    copieResolution,
                    copieResolutionText,
                ],
              }),
              new docx.Paragraph({
                style: "Normal",
                children: [
                    declarationAdoption,
                    declarationAdoptionText,
                ],
              }),
              new docx.Paragraph({
                style: "Normal",
                children: [
                  signatureLine,
                  signatureName,
                ],
              }),
          ],
        }]
      });
      
    // Save document
    docx.Packer.toBlob(doc).then(blob => {
      console.log(blob);
      saveAs(blob, fileName + ".docx");
      alert("Document created successfully. Check your downloads.");
    });
}