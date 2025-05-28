import mongoose from "mongoose";

const CertificateSchema = new mongoose.Schema({
    user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  certificate_id: {
    type: String,
    required: true,
    unique: true,
    index:true
  },
  domain: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  issue_date: {
    type: String,
    required: true,
  },
  verified: {
    type: Boolean,
    default: true,
  },
  certificateUrl: {
    type: String,
    required: true,
  }
}, {
  timestamps: true
})


const Certificate = mongoose.model('Certificate',CertificateSchema)
export default Certificate