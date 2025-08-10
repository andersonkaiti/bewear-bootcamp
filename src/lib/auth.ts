import { env } from '@config/env'
import { db } from '@db/index'
import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
// biome-ignore lint/performance/noNamespaceImport: simple way
import * as schema from '../db/schema'

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'pg',
    schema,
  }),
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    },
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
  verification: {
    modelName: 'verificationTable',
  },
})
