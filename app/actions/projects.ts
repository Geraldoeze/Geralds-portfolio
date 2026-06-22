'use server'

import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { project } from '@/lib/db/schema'
import { and, desc, eq } from 'drizzle-orm'
import { headers } from 'next/headers'
import { revalidatePath } from 'next/cache'
import { v4 as uuidv4 } from 'uuid'

async function getUserId() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) throw new Error('Unauthorized')
  return session.user.id
}

export async function getProjects() {
  const userId = await getUserId()
  return db
    .select()
    .from(project)
    .where(eq(project.userId, userId))
    .orderBy(desc(project.order))
}

export async function getProjectById(id: string) {
  const userId = await getUserId()
  const result = await db
    .select()
    .from(project)
    .where(and(eq(project.id, id), eq(project.userId, userId)))
  return result[0] || null
}

export async function createProject(data: {
  title: string
  description: string
  shortDescription?: string
  imageUrl?: string
  technologies?: string[]
  startDate?: Date
  endDate?: Date
  projectUrl?: string
  gitUrl?: string
  featured?: boolean
}) {
  const userId = await getUserId()
  const id = uuidv4()

  await db.insert(project).values({
    id,
    userId,
    ...data,
    order: 0,
  })

  revalidatePath('/admin/projects')
  revalidatePath('/')
  return { id, ...data }
}

export async function updateProject(
  id: string,
  data: {
    title?: string
    description?: string
    shortDescription?: string
    imageUrl?: string
    technologies?: string[]
    startDate?: Date
    endDate?: Date
    projectUrl?: string
    gitUrl?: string
    featured?: boolean
    order?: number
  }
) {
  const userId = await getUserId()

  await db
    .update(project)
    .set({
      ...data,
      updatedAt: new Date(),
    })
    .where(and(eq(project.id, id), eq(project.userId, userId)))

  revalidatePath('/admin/projects')
  revalidatePath('/')
  return { id, ...data }
}

export async function deleteProject(id: string) {
  const userId = await getUserId()

  await db
    .delete(project)
    .where(and(eq(project.id, id), eq(project.userId, userId)))

  revalidatePath('/admin/projects')
  revalidatePath('/')
}

export async function reorderProjects(
  items: Array<{ id: string; order: number }>
) {
  const userId = await getUserId()

  for (const item of items) {
    await db
      .update(project)
      .set({ order: item.order })
      .where(and(eq(project.id, item.id), eq(project.userId, userId)))
  }

  revalidatePath('/admin/projects')
  revalidatePath('/')
}
