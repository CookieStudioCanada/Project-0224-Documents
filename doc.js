function handleSubmit(event) {
    event.preventDefault();
    
    const companyName = event.target.elements.company_name.value;
    const resolutionName = event.target.elements.resolution_name.value;
    const adminName = event.target.elements.admin_name.value;
    
    console.log("Company Name:", companyName);
    console.log("Resolution Name:", resolutionName);
    console.log("Admin Name:", adminName);
    
    var fileName = prompt("Please enter the file name.");

    const doc = new docx.Document({
        sections: [{
          properties: {},
          children: [
            new docx.Paragraph({
              alignment: docx.AlignmentType.CENTER,
              children: [
                new docx.TextRun({
                  text: "RÉSOLUTIONS DU CONSEIL D’ADMINISTRATION DE\n",
                }),
                new docx.TextRun({
                    text: companyName + "\n",
                  }),
              ],
            }),
            new docx.Paragraph({
                style: "Normal",
                children: [
                    new docx.TextRun({
                        text: resolutionName + "\n\n",
                        underline: {},
                    }),

                    new docx.TextRun({
                    text: "ATTENDU QUE...\n\n",
                    }),

                    new docx.TextRun({
                    text: "ATTENDU QUE...\n\n",
                    }),

                    new docx.TextRun({
                    text: "ATTENDU QUE...\n",
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
                    text: "QUE...\n",
                    }),

                    new docx.TextRun({
                    text: "QUE...\n",
                    }),
                ],
              }),
              new docx.Paragraph({
                style: "Normal",
                children: [
                    new docx.TextRun({
                        text: "COPIE DES RÉSOLUTIONS \n\n",
                        underline: {},
                    }),
                  
                    new docx.TextRun({
                    text: "IL EST RÉSOLU, conformément à l’article 34 de la Loi sur les sociétés par actions du Québec, de conserver dans le Livre de la société une copie des résolutions reproduites ci-dessus, une fois signées par tous les membres du conseil d’administration.\n",             
                }),
                ],
              }),
              new docx.Paragraph({
                style: "Normal",
                children: [
                    new docx.TextRun({
                        text: "DÉCLARATION D’ADOPTION \n\n",
                        underline: {},
                    }),
                  
                    new docx.TextRun({
                    text: "Tous les membres du conseil d’administration de la société habiles à voter sur les résolutions susmentionnées lors d’une réunion, adoptent ces résolutions en date des présentes et, conformément à l’article 140 de la Loi sur les sociétés par actions du Québec, apposent leur signature aux présentes afin de conférer à ces résolutions la même valeur que si elles avaient été adoptées au cours d’une réunion du conseil d’administration.\n",  
                }),
                ],
              }),
              new docx.Paragraph({
                style: "Normal",
                children: [
                  new docx.TextRun({
                    text: "                                 ",  
                    underline: {},
                }),
                    new docx.TextRun({
                    text: "\n" + adminName,
                }),
                ],
              }),
          ],
        }]
      });
      
  
    docx.Packer.toBlob(doc).then(blob => {
      console.log(blob);
      saveAs(blob, fileName + ".docx");
      alert("Document created successfully. Check your downloads.");
    });
  }