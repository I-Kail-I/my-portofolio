import { db } from "@/config/db/db.js"
import { users } from "@/config/db/schema.js"
import { generateToken } from "@/utils/jwtUtils.js"
import { eq } from "drizzle-orm"
import { hash } from "bcrypt"

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 *
 * Login controller
 */
export async function loginController(req, res) {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      res.status(400).json({
        message: "All input needed to be fill.",
      })
    }

    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1)

    if (!user.email) {
      return res.status(401).json({ message: "Email doesn't exist." })
    }

    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid password." })
    }

    const token = generateToken(user)

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    })
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error.",
      error: error.message,
    })
  }
}

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 *
 * Register controller
 */
export async function registerController(req, res) {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      res.status(400).json({
        message: "All input needed to be fill.",
      })
    }

    if (password < 6) {
      return res.status(400).json({
        message: "Password need at least need more than 6 characters."
      })
    }

    const saltRounds = 12
    const hashedPassword = await hash(password, saltRounds)

    await db.insert(users).values({
      email,
      password: hashedPassword,
    })

    return res.status(200).json({
      message: "Register is success.",
    })
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error.",
      error: error.message,
    })
  }
}
