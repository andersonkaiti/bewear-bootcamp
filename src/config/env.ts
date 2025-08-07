import { createEnv } from '@t3-oss/env-core'
import z from 'zod'

export const env = createEnv({
  server: {
    DATABASE_URL: z.url(),
  },
  client: {},
  clientPrefix: 'NEXT_PUBLIC_',
  shared: {},
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
  },
})
