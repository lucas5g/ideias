import z from 'zod';

export const env = z
  .object({
    DATABASE_URL: z.string(),
    DEEPL_API_KEY: z.string(),
    ELEVEN_LABS_API_KEY: z.string(),
    PORT: z.coerce.number(),
    BASE_URL_API: z.string(),
  })
  .parse(process.env);
