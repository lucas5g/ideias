import { describe, it, beforeAll, afterAll, expect } from 'bun:test'
import { PhraseService } from '@/phrase/phrase.service'
import { CreatePhraseDto, UpdatePhraseDto } from "@/phrase/phrase.model"

describe("PhraseService", () => {
  const service = new PhraseService()
  let createdId: number

  beforeAll(async () => {
    const payload: CreatePhraseDto = { 
      portuguese: 'ola',
      english: 'hello',
      tags: ['test', 't1']      
    }
    const res = await service.create(payload)
    createdId = res.id
  })

  afterAll(async () => {
    await service.delete(createdId)
  })

  it("findAll", async () => {
    const res = await service.findAll()
    expect(res).toBeArray()
  })

  it("findOne", async () => {
    const res = await service.findOne(createdId)
    expect(res).toHaveProperty("id", createdId)
  })

  it("update", async () => {
    const payload: UpdatePhraseDto = { 
      tags:['test', 't2']
    }
    const res = await service.update(createdId, payload)
    expect(res).toMatchObject(payload)
  })
})
