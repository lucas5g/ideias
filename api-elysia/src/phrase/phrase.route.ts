import { Elysia } from 'elysia'
import { PhraseService } from '@/phrase/phrase.service'
import { createPhraseSchema, updatePhraseSchema } from '@/phrase/phrase.model'

const phraseService = new PhraseService()

export const phraseRoute = (app: Elysia) =>
  app.group("/phrases", app =>
    app
      .get("/", () => phraseService.findAll())
      .get("/:id", ({ params }) => phraseService.findOne(Number(params.id)))
      .post("/", ({ body }) => phraseService.create(body), { body: createPhraseSchema })
      .put("/:id", ({ params, body }) => phraseService.update(Number(params.id), body), { body: updatePhraseSchema })
      .delete("/:id", ({ params }) => phraseService.delete(Number(params.id)))
  )
