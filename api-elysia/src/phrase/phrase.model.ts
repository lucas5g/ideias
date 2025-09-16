import { t } from 'elysia'
export const createPhraseSchema = t.Object({
  portuguese: t.String(),
  english: t.String(),
  tags: t.Array(t.String()),
})

export const updatePhraseSchema = t.Partial(createPhraseSchema)

export type CreatePhraseDto = typeof createPhraseSchema.static
export type UpdatePhraseDto = typeof updatePhraseSchema.static
