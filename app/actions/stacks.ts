'use server'

import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { stack } from '@/lib/db/schema'
import { and, desc, eq } from 'drizzle-orm'
import { headers } from 'next/headers'
import { revalidatePath } from 'next/cache'
import { v4 as uuidv4 } from 'uuid'

async function getUserId() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) throw new Error('Unauthorized')
  return session.user.id
}

export async function getStacks() {
  const userId = await getUserId()
  return db
    .select()
    .from(stack)
    .where(eq(stack.userId, userId))
    .orderBy(desc(stack.order))
}

export async function getStackById(id: string) {
  const userId = await getUserId()
  const result = await db
    .select()
    .from(stack)
    .where(and(eq(stack.id, id), eq(stack.userId, userId)))
  return result[0] || null
}

export async function createStack(data: {
  name: string
  category: string
  description?: string
  iconUrl?: string
  proficiency?: string
  featured?: boolean
}) {
  const userId = await getUserId()
  const id = uuidv4()

  await db.insert(stack).values({
    id,
    userId,
    ...data,
    order: 0,
  })

  revalidatePath('/admin/stacks')
  revalidatePath('/')
  return { id, ...data }
}

export async function updateStack(
  id: string,
  data: {
    name?: string
    category?: string
    description?: string
    iconUrl?: string
    proficiency?: string
    featured?: boolean
    order?: number
  }
) {
  const userId = await getUserId()

  await db
    .update(stack)
    .set({
      ...data,
      updatedAt: new Date(),
    })
    .where(and(eq(stack.id, id), eq(stack.userId, userId)))

  revalidatePath('/admin/stacks')
  revalidatePath('/')
  return { id, ...data }
}

export async function deleteStack(id: string) {
  const userId = await getUserId()

  await db
    .delete(stack)
    .where(and(eq(stack.id, id), eq(stack.userId, userId)))

  revalidatePath('/admin/stacks')
  revalidatePath('/')
}

export async function reorderStacks(
  items: Array<{ id: string; order: number }>
) {
  const userId = await getUserId()

  for (const item of items) {
    await db
      .update(stack)
      .set({ order: item.order })
      .where(and(eq(stack.id, item.id), eq(stack.userId, userId)))
  }

  revalidatePath('/admin/stacks')
  revalidatePath('/')
}
