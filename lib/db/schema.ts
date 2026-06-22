import { pgTable, text, timestamp, boolean, integer, jsonb } from 'drizzle-orm/pg-core'

// Better Auth Tables
export const user = pgTable('user', {
  id: text('id').primaryKey(),
  name: text('name'),
  email: text('email').unique(),
  emailVerified: boolean('emailVerified'),
  image: text('image'),
  createdAt: timestamp('createdAt').defaultNow(),
  updatedAt: timestamp('updatedAt').defaultNow(),
})

export const session = pgTable('session', {
  id: text('id').primaryKey(),
  expiresAt: timestamp('expiresAt').notNull(),
  token: text('token').notNull().unique(),
  createdAt: timestamp('createdAt').defaultNow(),
  updatedAt: timestamp('updatedAt').defaultNow(),
  ipAddress: text('ipAddress'),
  userAgent: text('userAgent'),
  userId: text('userId')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
})

export const account = pgTable('account', {
  id: text('id').primaryKey(),
  accountId: text('accountId').notNull(),
  providerId: text('providerId').notNull(),
  userId: text('userId')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  accessToken: text('accessToken'),
  refreshToken: text('refreshToken'),
  idToken: text('idToken'),
  accessTokenExpiresAt: timestamp('accessTokenExpiresAt'),
  refreshTokenExpiresAt: timestamp('refreshTokenExpiresAt'),
  scope: text('scope'),
  password: text('password'),
  createdAt: timestamp('createdAt').defaultNow(),
  updatedAt: timestamp('updatedAt').defaultNow(),
})

export const verification = pgTable('verification', {
  id: text('id').primaryKey(),
  identifier: text('identifier').notNull(),
  value: text('value').notNull(),
  expiresAt: timestamp('expiresAt').notNull(),
  createdAt: timestamp('createdAt').defaultNow(),
  updatedAt: timestamp('updatedAt').defaultNow(),
})

// Portfolio CMS Tables
export const about = pgTable('about', {
  id: text('id').primaryKey().defaultNow(),
  userId: text('userId').notNull(),
  title: text('title'),
  description: text('description'),
  image: text('image'),
  createdAt: timestamp('createdAt').defaultNow(),
  updatedAt: timestamp('updatedAt').defaultNow(),
})

export const workExperience = pgTable('work_experience', {
  id: text('id').primaryKey().defaultNow(),
  userId: text('userId').notNull(),
  title: text('title').notNull(),
  company: text('company').notNull(),
  description: text('description'),
  startDate: text('startDate'),
  endDate: text('endDate'),
  isCurrent: boolean('isCurrent').default(false),
  technologies: text('technologies').array().default([]),
  order: integer('order').default(0),
  createdAt: timestamp('createdAt').defaultNow(),
  updatedAt: timestamp('updatedAt').defaultNow(),
})

export const stack = pgTable('stack', {
  id: text('id').primaryKey().defaultNow(),
  userId: text('userId').notNull(),
  name: text('name').notNull(),
  category: text('category').notNull(), // 'frontend', 'backend', 'tools', 'databases'
  icon: text('icon'),
  proficiency: text('proficiency'), // 'expert', 'advanced', 'intermediate'
  order: integer('order').default(0),
  createdAt: timestamp('createdAt').defaultNow(),
  updatedAt: timestamp('updatedAt').defaultNow(),
})

export const project = pgTable('project', {
  id: text('id').primaryKey().defaultNow(),
  userId: text('userId').notNull(),
  title: text('title').notNull(),
  description: text('description'),
  image: text('image'),
  technologies: text('technologies').array().default([]),
  liveUrl: text('liveUrl'),
  githubUrl: text('githubUrl'),
  order: integer('order').default(0),
  featured: boolean('featured').default(false),
  createdAt: timestamp('createdAt').defaultNow(),
  updatedAt: timestamp('updatedAt').defaultNow(),
})
