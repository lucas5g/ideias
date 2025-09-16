import { prisma } from '@/utils/prisma'
async function main(){
  await prisma.phrase.createMany({
    data: [
      {
        portuguese: 'ola',
        english: 'hello',
        tags: ['test', 't1']
      },
      {
        portuguese: 'bom dia',
        english: 'good morning',
        tags: ['test']
      }
    ]
  })
}

main()