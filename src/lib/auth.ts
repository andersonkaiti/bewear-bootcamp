import { db } from '@db/index'
import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
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
} from '../db/schema'

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'pg',
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
  }),
  emailAndPassword: {
    enabled: true,
  },
  user: {
    modelName: 'userTable',
  },
  session: {
    modelName: 'sessionTable',
  },
  account: {
    modelName: 'accountTable',
  },
})
