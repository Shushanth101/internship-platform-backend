const urlValidator = (url) => {
  if (typeof url !== 'string') return false;

  let normalized = url.trim();

  if (normalized.startsWith('www.')) {
    normalized = 'https://' + normalized;
  }

  if (!/^https?:\/\//i.test(normalized)) {
    normalized = 'https://' + normalized;
  }

  const urlPattern = /^https?:\/\/([\w-]+(\.[\w-]+)+)([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?$/i;

  return urlPattern.test(normalized);
};

const emailValidator = (email) => {
  if (typeof email !== 'string') return false;

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

  return emailPattern.test(email.trim());
};



const isEmpty = (val) => typeof val !== 'string' || val.trim() === '';

const validateApplication = (data) => {
  const errors = [];

  const {
    internship_id,
    internship_name,
    company_name,
    applicant_name,
    applicant_email,
    applicant_phone,
    applicant_resumeUrl,
    applicant_linkedin,
    applicant_github,
    applicant_portfolio,
    applicant_skills,
    applicant_experience,
    applicant_availability,
    applicant_preferredLocation,
    applicant_college,
    applicant_degree,
    applicant_graduationYear,
    internship_purpose,
    referrer,
  } = data;

  
  const requiredFields = {
    internship_id,
    internship_name,
    company_name,
    applicant_name,
    applicant_email,
    applicant_phone,
    applicant_resumeUrl,
    applicant_linkedin,
    applicant_skills,
    applicant_availability,
    applicant_college,
    applicant_degree,
    applicant_graduationYear,
    internship_purpose
  };

  for (const [field, value] of Object.entries(requiredFields)) {
    if (isEmpty(value)) {
      errors.push(`${field} is required`);
    }
  }

  
  if (!emailValidator(applicant_email)) {
    errors.push("Invalid applicant_email");
  }

  const urlFields = {
    applicant_resumeUrl,
    applicant_linkedin,
    applicant_github,
    applicant_portfolio
  };

  for (const [field, url] of Object.entries(urlFields)) {
    if (!isEmpty(url) && !urlValidator(url)) {
      errors.push(`Invalid URL format in ${field}`);
    }
  }

  
  const gradYear = parseInt(applicant_graduationYear);
  const currentYear = new Date().getFullYear();
  if (isNaN(gradYear) || gradYear < currentYear - 10 || gradYear > currentYear + 5) {
    errors.push("Invalid applicant_graduationYear");
  }


  if (!/^\d{10}$/.test(applicant_phone.trim())) {
    errors.push("Invalid applicant_phone (should be 10 digits)");
  }

  return errors;
};

export default validateApplication