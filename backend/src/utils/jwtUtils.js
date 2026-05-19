import jwt from "jsonwebtoken"

export function generateToken(user) {
  const payload = {
    id: user.id,
    email: user.email,
    username: user.username,
  }

  return jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: "7d" })
}

/**
 * @param {string} token
 */
export function verifyToken(token) {
  try {
    return {
      payload: jwt.verify(token, process.env.JWT_SECRET_KEY),
      error: null,
    }
  } catch (error) {
    return { payload: null, error: error.message }
  }
}
