import { db } from '../db/db.js';
import { users } from '../db/schema.js';
import bcrypt from 'bcryptjs';
import { createToken } from '../utils/jwt.js';
import { eq } from 'drizzle-orm'; // Add this import

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if email and password are provided
    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }
    if (!password) {
      return res.status(400).json({ message: 'Password is required' });
    }

    // Check if user exists
    const [user] = await db.select().from(users).where(eq(users.email, email));

    // If no user found with the provided email
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // If password is invalid
    const isPasswordValid = await bcrypt.compare(password, user.password);  
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = createToken(user);

    // Generating token after successfully login
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 3600000,
    });

    // Exclude password from response
    const { password: _, ...userWithoutPassword } = user;

    // If everything is correct, send success response
    res
      .status(200)
      .json({ message: 'Login successful', user: userWithoutPassword });
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Internal server error', error: error.message });
  }
};
