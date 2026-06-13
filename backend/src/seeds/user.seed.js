import { users } from '../db/schema.js';
import { db } from '../db/db.js';
import { config } from 'dotenv';
import bcrypt from 'bcryptjs';

config({
  path: process.env.NODE_ENV === 'production' ? '.env.prod' : '.env.dev',
});

const insertUser = async () => {
  const saltRounds = parseInt(process.env.SALT_ROUNDS, 10);

  const hashedPassword = await bcrypt.hash(
    process.env.USER_PASSWORD,
    saltRounds,
  );

  await db.insert(users).values({
    name: 'Mikail Arianos',
    password: hashedPassword,
    email: process.env.USER_EMAIL,
  });

  console.log('✅ User created successfully!');
};

insertUser().catch(console.error);
