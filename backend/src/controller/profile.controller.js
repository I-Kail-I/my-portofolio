import { decodeToken } from '../utils/jwt.js';

export const profileController = (req, res) => {
  const token = req.cookies.token;

  const decode = decodeToken(token);

  res.status(200).json({ message: 'User profile', user: decode });
};
