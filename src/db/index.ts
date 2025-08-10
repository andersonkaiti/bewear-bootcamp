import { env } from '@config/env'
import { drizzle } from 'drizzle-orm/node-postgres'
// biome-ignore lint/performance/noNamespaceImport: simple way
import * as schema from './schema'

export const db = drizzle(env.DATABASE_URL, {
  schema,
})
