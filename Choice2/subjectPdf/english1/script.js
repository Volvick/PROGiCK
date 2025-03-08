const submitBtn = document.getElementById("submitBtn");
const userName = document.getElementById("name");
const userClasss = document.getElementById("classs");
const userRoll = document.getElementById("roll");
const userAdmno = document.getElementById("admno");
const userSession = document.getElementById("session");
const userSubmit = document.getElementById("submitted");

const generatePDF = async (name, classs, roll, admno, submitted, session) => {
  const { PDFDocument, rgb,degrees } = PDFLib;

  const capitalize = (str, lower = false) =>
    (lower ? str.toLowerCase() : str).replace(/(?:^|\s|["'([{])+\S/g, (match) =>
      match.toUpperCase()
    );

  const exBytes = await fetch("./cert.pdf").then((res) => {
    return res.arrayBuffer();
  });
  const exFont = await fetch("./Poppins-Regular.ttf").then((res) => {
    return res.arrayBuffer();
  });
  const pdfDoc = await PDFDocument.load(exBytes);
  pdfDoc.registerFontkit(fontkit);
  const myFont = await pdfDoc.embedFont(exFont);
  const pages = pdfDoc.getPages();
  const firstPg = pages[0];
  firstPg.drawText(name, {
    x: 94,
     y: 256,
     size: 18,
     font: myFont,
     color: rgb(0.078, 0.078, 0.078),
   });
   firstPg.drawText(classs, {
     x: 94,
     y: 198,
     size: 18,
     font: myFont,
     color: rgb(0.078, 0.078, 0.078),
   });
   firstPg.drawText(roll, {
    x: 100,
     y: 134,
     size: 18,
     font: myFont,
     color: rgb(0.078, 0.078, 0.078),
   });
   firstPg.drawText(admno, {
     x: 102,
     y: 63,
     size: 18,
     font: myFont,
     color: rgb(0.078, 0.078, 0.078),
   });
 
   firstPg.drawText(submitted, {
    //session
    x: 54,
   y: 470,
   size: 24,
   font: myFont,
   color: rgb(0.05, 0.05, 0.05),
   rotate: degrees(90),
 });
   firstPg.drawText(session, {
     //submitted
       x: 344,
       y: 114,
       size: 15,
       font: myFont,
       color: rgb(0.05, 0.05, 0.05),
  });
  const uri = await pdfDoc.saveAsBase64({ dataUri: true });
  saveAs(uri, "PAGiCK.pdf", { autoBom: true });
  // document.querySelector("#mypdf").src = uri;
};
const capitalize = (str, lower = false) =>
  (lower ? str.toLowerCase() : str).replace(/(?:^|\s|["'([{])+\S/g, (match) =>
    match.toUpperCase()
  );
submitBtn.addEventListener("click", () => {
  // const val = capitalize(userName.value);

  const valName = capitalize(userName.value);
  const valClass = capitalize(userClasss.value);
  const valRoll = userRoll.value;
  const valAdmno = userAdmno.value;
  const valSubmitted = capitalize(userSubmit.value);
  const valSession = userSession.value;

  //check if the text is empty or not
  if (valName.trim() !== "" && userName.checkValidity()) {
    // console.log(val);
    generatePDF(valName, valClass, valRoll, valAdmno, valSession, valSubmitted);
  } else if (valClass.trim() !== "" && userClasss.checkValidity()) {
    generatePDF(valName, valClass, valRoll, valAdmno, valSession, valSubmitted);
  } else if (valRoll.trim() !== "" && userRoll.checkValidity()) {
    generatePDF(valName, valClass, valRoll, valAdmno, valSession, valSubmitted);
  } else if (valAdmno.trim() !== "" && userAdmno.checkValidity()) {
    generatePDF(valName, valClass, valRoll, valAdmno, valSession, valSubmitted);
  } else {
    userName.reportValidity();
  }
  var file = new File([pdfBytes], "PAGiCK.pdf", {
    type: "application/pdf;charset=utf-8",
  });
  saveAs(file);
});



// const generatePDF = async (name, classs, roll, admno) => {
//   const { PDFDocument, rgb } = PDFLib;

//   const exBytes = await fetch("./cert.pdf").then((res) => {
//     return res.arrayBuffer();
//   });

//   const exFont = await fetch("./Poppins-Regular.ttf").then((res) => {
//     return res.arrayBuffer();
//   });

//   const pdfDoc = await PDFDocument.load(exBytes);

//   pdfDoc.registerFontkit(fontkit);
//   const myFont = await pdfDoc.embedFont(exFont);

//   const pages = pdfDoc.getPages();
//   const firstPg = pages[0];

//   firstPg.drawText(name, {
//     x: 369,
//     y: 151,
//     size: 12,
//     font: myFont,
//     color: rgb(0.4, 0.404, 0.4),
//   });

//   const uri = await pdfDoc.saveAsBase64({ dataUri: true });

//   document.querySelector("#mypdf").src = uri;
// };

// generatePDF("2024-2025");
