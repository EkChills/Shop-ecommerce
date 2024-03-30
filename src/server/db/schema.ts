// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { sql } from "drizzle-orm";
import {
  boolean,
  decimal,
  doublePrecision,
  index,
  pgEnum,
  pgTableCreator,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const pgTable = pgTableCreator((name) => `chills-shop_${name}`);


export const user = pgTable("user", {
  id: serial("id").notNull().primaryKey(),
  email: text("email").notNull(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  name:text('name'),
  otp:varchar('otp', {length:256}),
  otpExpiry:timestamp('otpExpiry'),
  createdAt:timestamp('createdAt').defaultNow()
 })

 export const productImages = pgTable('product_images', {
  id:serial('id').notNull().primaryKey(),
  imageUrl:text('imageUrl'),
  productId:serial('product_id').references(() => product.id)
 })

 export const categories = pgTable('categories', {
   id: serial("id").notNull().primaryKey(),
   name:varchar('name', {length:256})
  })
  
  export const categoriesEnum = pgEnum('category', ['SOCKS', 'UNDERWEAR', 'HATS', 'GLOVES', 'T-SHIRTS']);
  export const sizesEnum = pgEnum('size', ['SMALL', 'MEDIUM', 'LARGE', 'X-LARGE']);


 export const product = pgTable("product",{
  id: serial("id").notNull().primaryKey(),
  name:varchar('name', {length:256}),
  description:text('description'),
  price:doublePrecision('price').notNull(),
  onSale:boolean('on_sale').default(true),
  category:categoriesEnum('category'),
  size:sizesEnum('size').default('MEDIUM'),
  createdAt: timestamp('createdAt').defaultNow(),
  updatedAt: timestamp('updatedAt').defaultNow()
 })


  export type Product = typeof product.$inferSelect



