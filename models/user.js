import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  college: String,
  degree: String,
  graduationYear: String,
  phone: String,
},{timestamps:true})

const User = mongoose.model('User',UserSchema)
export default User;


