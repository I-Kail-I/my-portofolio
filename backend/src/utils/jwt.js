import jwt from 'jsonwebtoken';

export const createToken = (user) => {
  // 1. Add the secret
  // 2. Return the result
  return jwt.sign(
    {
      id: user.id,
      name: user.name,
      email: user.email,
      verified: true,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '24h',
    },
  );
};

export const decodeToken = (token) => {
  // verify checks signature + expiration.
  return jwt.verify(token, process.env.JWT_SECRET);
};
