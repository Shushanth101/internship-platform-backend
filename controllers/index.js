import validateApplication from "./validators.js";
import Certificate from '../models/certificate.js';
import User from '../models/user.js';
import SpreadSheet from '../utils/spreadsheet.js';
import logCertificateLookup from "../logger.js";
import redis from 'redis'

const redisClient = redis.createClient(); 

redisClient.connect().catch(console.error);


let isSheetReady = false;
const ss = new SpreadSheet();
(async () => {
  try {
    await ss.init();
    isSheetReady = true;
    console.log("Spreadsheet initialized successfully");
  } catch (err) {
    console.error("Spreadsheet initialization failed:", err.message);
  }
})();
const handleInternshipApplicationSubmit = async (req, res) => {
  if (!isSheetReady) {
    return res.status(503).json({ success: false, message: "Spreadsheet not ready" });
  }

  const errors = validateApplication(req.body);

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors,
    });
  }

  try {
    await ss.addRecord(req.body);
    return res.status(200).json({
      success: true,
      message: "Application is valid and accepted.",
    });
  } catch (err) {
    console.error("Spreadsheet Error:", err.message);
    return res.status(500).json({
      success: false,
      message: "Error saving to spreadsheet",
      error: err.message,
    });
  }
}


const redirectToSheets = (req, res) => {
  return res.redirect("https://docs.google.com/spreadsheets/d/1oQUogf-eTmVu15E-4u9tqxZq9LBJ2pWHLZaejANGLtc/edit?gid=0");
}



const getCertificateDetails = async (req, res) => {
  const certificate_id = req.params.id;

  if (!certificate_id) {
    logCertificateLookup(certificate_id, "Certificate ID is required.");
    return res.status(400).json({ message: "Certificate ID is required." });
  }

  try {
    
    const cachedData = await redisClient.get(certificate_id);
    if (cachedData) {
      logCertificateLookup(certificate_id, "served from cache");
      return res.status(200).json(JSON.parse(cachedData));
    }


    const certificate = await Certificate.findOne({ certificate_id }).select("user_id domain duration issue_date certificateUrl").lean();
    if (!certificate) {
      logCertificateLookup(certificate_id, "Certificate not found.");
      return res.status(404).json({ message: "Certificate not found." });
    }

    const { user_id, domain, duration,issue_date, certificateUrl } = certificate;
    const user = await User.findOne({ _id: user_id }).select("name email college degree graduationYear phone").lean();
    if (!user) {
      logCertificateLookup(certificate_id, "Associated user not found.");
      return res.status(404).json({ message: "Associated user not found." });
    }

    const result = {
      status: "success",
      data: {
        name: user.name || "N/A",
        email: user.email || "N/A",
        college: user.college || "N/A",
        degree: user.degree || "N/A",
        graduationYear: user.graduationYear || "N/A",
        phone: user.phone || "N/A",
        domain: domain || "N/A",
        duration: duration || "N/A",
        issue_date:issue_date||"N/A",
        certificateUrl: certificateUrl || "N/A"
      }
    };

    
    await redisClient.setEx(certificate_id, 3600, JSON.stringify(result)); // TTL: 1 hour

    logCertificateLookup(certificate_id, "served from DB and cached");
    return res.status(200).json(result);
  } catch (error) {
    console.error("Error in getCertificateDetails:", error);
    logCertificateLookup(certificate_id, "Unexpected error");
    return res.status(500).json({ message: "Unexpected server error" });
  }
};


export{
    handleInternshipApplicationSubmit,
    redirectToSheets,
    getCertificateDetails
}