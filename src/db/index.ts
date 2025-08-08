import { env } from '@config/env'
import { drizzle } from 'drizzle-orm/node-postgres'
import {
  accountTable,
  categoryRelations,
  categoryTable,
  productRelations,
  productTable,
  productVariantRelations,
  productVariantTable,
  sessionTable,
  userTable,
} from './schema'

export const db = drizzle(env.DATABASE_URL, {
  schema: {
    accountTable,
    categoryRelations,
    categoryTable,
    productRelations,
    productTable,
    productVariantRelations,
    productVariantTable,
    sessionTable,
    userTable,
  },
})
