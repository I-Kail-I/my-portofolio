import { integer, pgTable, varchar, pgEnum, text, timestamp } from 'drizzle-orm/pg-core';

export const roleEnum = pgEnum('role', ['admin', 'user']);

export const users = pgTable('users', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  password: varchar({ length: 255 }).notNull(),
});

export const blogs = pgTable('blogs', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  title: varchar({ length: 255 }).notNull(),
  content: text().notNull().default(''),
  coverImage: text(),
  tags: text().array().notNull().default([]),
  createdAt: timestamp().notNull().defaultNow(),
  updatedAt: timestamp().notNull().defaultNow(),
});

export const experiences = pgTable('experiences', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  title: varchar({ length: 255 }).notNull(),
  subheading: varchar({ length: 255 }).notNull(),
  startDate: varchar({ length: 7 }).notNull(),
  endDate: varchar({ length: 7 }),
  description: text().notNull().default(''),
  createdAt: timestamp().notNull().defaultNow(),
  updatedAt: timestamp().notNull().defaultNow(),
});
