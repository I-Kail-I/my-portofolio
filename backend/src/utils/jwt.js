import jwt from "jsonwebtoken";

export const createToken = (user) => {
  // 1. Add the secret
  // 2. Return the result
  jwt.sign(
    {
      id: user.id,
      email: user.email,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "24h",
    },
  );
};

export const decodeToken = (token) => {
  // verify checks signature + expiration.
  return jwt.verify(token, process.env.JWT_SECRET);
};
