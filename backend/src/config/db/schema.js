import { varchar, integer, pgTable, pgEnum } from "drizzle-orm/pg-core"

const userENum = pgEnum("user_enum", ["user", "admin"])

export const users = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  email: varchar(),
  password: varchar(),
  role: userENum().default("user").notNull(),
})
