import { verifyToken } from '../authentication/jwt.js';

const authenticateHeader = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(403).json({ message: "invalid-token" });
  }

  const api_token = authHeader.replace('Bearer ', '').trim();
  console.log(api_token)

  const isValid = verifyToken(api_token);
  if (!isValid) {
    return res.status(403).json({ message: "invalid-token" });
  }

  next();
}

export default authenticateHeader