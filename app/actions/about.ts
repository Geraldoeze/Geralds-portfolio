'use server'

import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { about } from '@/lib/db/schema'
import { and, eq } from 'drizzle-orm'
import { headers } from 'next/headers'
import { revalidatePath } from 'next/cache'
import { v4 as uuidv4 } from 'uuid'

async function getUserId() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) throw new Error('Unauthorized')
  return session.user.id
}

export async function getAbout() {
  const userId = await getUserId()
  const result = await db
    .select()
    .from(about)
    .where(eq(about.userId, userId))
  return result[0] || null
}

export async function upsertAbout(data: {
  title: string
  content: string
  profileImageUrl?: string
  resumeUrl?: string
}) {
  const userId = await getUserId()
  const existing = await getAbout()

  if (existing) {
    await db
      .update(about)
      .set({
        ...data,
        updatedAt: new Date(),
      })
      .where(eq(about.id, existing.id))

    revalidatePath('/admin/about')
    revalidatePath('/about')
    return existing.id
  } else {
    const id = uuidv4()
    await db.insert(about).values({
      id,
      userId,
      ...data,
    })

    revalidatePath('/admin/about')
    revalidatePath('/about')
    return id
  }
}
