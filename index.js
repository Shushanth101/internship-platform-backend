import express from 'express';
import dotenv from 'dotenv';
import router from './routes/apiRouter.js';
import authenticateHeader from './middlewares/authenticate.js';
import { getCertificateDetails, redirectToSheets } from './controllers/index.js';
import connectDB from './connection.js';

connectDB("mongodb://127.0.0.1:27017/internship")

dotenv.config();

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use("/api", router);



app.get("/api/certificate/:id",authenticateHeader,getCertificateDetails)
app.get("/internship-applications", authenticateHeader,redirectToSheets);










app.listen(process.env.PORT, () => {
  console.log(`🚀 Server running at http://localhost:${process.env.PORT}`);
});




// async function accessSheet() {
//   const serviceAccountAuth = new JWT({
//     email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
//     key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'), 
//     scopes: ['https://www.googleapis.com/auth/spreadsheets'],
//   });

//   const doc = new GoogleSpreadsheet('1oQUogf-eTmVu15E-4u9tqxZq9LBJ2pWHLZaejANGLtc', serviceAccountAuth);

//   await doc.loadInfo(); 
//   console.log(doc.title);
// }

// async function initializeSheetHeaders() {
//   const serviceAccountAuth = new JWT({
//     email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
//     key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
//     scopes: ['https://www.googleapis.com/auth/spreadsheets'],
//   });

//   const doc = new GoogleSpreadsheet('1oQUogf-eTmVu15E-4u9tqxZq9LBJ2pWHLZaejANGLtc', serviceAccountAuth);
//   await doc.loadInfo();

//   const sheet = doc.sheetsByIndex[0]; // or use `doc.sheetsByTitle['Sheet1']`


//   await sheet.setHeaderRow([
//   'Internship-id',
//   'Internship-name',
//   'Applicant-name',
//   'Applicant-email',
//   'Applicant-phone',
//   'Applicant-resumeUrl',
//   'Applicant-linkedin',
//   'Applicant-github',
//   'Applicant-portfolio',
//   'Applicant-skills',
//   'Applicant-experience',
//   'Applicant-availability',
//   'Applicant-preferredLocation',  
//   'Applicant-college',
//   'Applicant-degree',
//   'Applicant-graduationYear',
//   'Internship-purpose'
// ]);

// console.log('Headers initialized.');

// }


