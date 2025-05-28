import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';
import dotenv from 'dotenv';

dotenv.config();

class SpreadSheet {
  constructor() {
    this.serviceAccountAuth = new JWT({
      email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    this.doc = new GoogleSpreadsheet('1oQUogf-eTmVu15E-4u9tqxZq9LBJ2pWHLZaejANGLtc', this.serviceAccountAuth);
  }

  async init() {
    await this.doc.loadInfo();
  }

  async addRecord(fields) {
    try {
      const sheet = this.doc.sheetsByIndex[0];

      // Fresh date each time addRecord is called
      const d = new Date();
      const formattedDate = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

      const addedRow = await sheet.addRow({
        "Internship-id": fields["internship_id"],
        "Internship-name": fields["internship_name"],
        "Company-name": fields["company_name"],
        "Applicant-name": fields["applicant_name"],
        "Applicant-email": fields["applicant_email"],
        "Applicant-phone": fields["applicant_phone"],
        "Applicant-resumeUrl": fields["applicant_resumeUrl"],
        "Applicant-linkedin": fields["applicant_linkedin"],
        "Applicant-github": fields["applicant_github"],
        "Applicant-portfolio": fields["applicant_portfolio"],
        "Applicant-skills": fields["applicant_skills"],
        "Applicant-experience": fields["applicant_experience"],
        "Applicant-availability": fields["applicant_availability"],
        "Applicant-preferredLocation": fields["applicant_preferredLocation"],
        "Applicant-college": fields["applicant_college"],
        "Applicant-degree": fields["applicant_degree"],
        "Applicant-graduationYear": fields["applicant_graduationYear"],
        "Internship-purpose": fields["internship_purpose"],
        "Referrer": fields["referrer"],
        "Application-date": formattedDate,
      });

      const rows = await sheet.getRows();
      console.log(`✅ Record added at row: ${rows.length}`);
      return addedRow;
    } catch (error) {
      console.error("❌ Failed to add record:", error.message);
      throw error;
    }
  }
}

export default SpreadSheet;

