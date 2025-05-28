import fs from 'fs';
import path from 'path';

const logCertificateLookup = (certid, status) => {
  const logLine = `${new Date().toISOString()} | ${certid || "N/A"} | ${status}\n`;
  const logPath = path.join("certificates-log.txt"); // safer with __dirname

  fs.appendFile(logPath, logLine, (err) => {
    if (err) console.error("Failed to log:", err);
  });
};


export default logCertificateLookup