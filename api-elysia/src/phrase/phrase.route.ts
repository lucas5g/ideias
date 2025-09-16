import { Elysia, t } from 'elysia';
import { PhraseService } from '@/phrase/phrase.service';
import { createPhraseSchema, updatePhraseSchema } from '@/phrase/phrase.model';

const phraseService = new PhraseService();

export const phraseRoute = (app: Elysia) =>
  app.group('/phrases', app =>
    app
      .get('/', () => phraseService.findAll())
      .get('/:id', ({ params }) => phraseService.findOne(params.id), {
        params: t.Object({
          id: t.Number()
        })
      })
      .post('/', ({ body }) => phraseService.create(body), { 
        body: createPhraseSchema
      })
      .put('/:id', ({ params, body }) => phraseService.update(+params.id, body), { 
        body: updatePhraseSchema
       })
      .delete('/:id', ({ params }) => phraseService.delete(+params.id))
  );
