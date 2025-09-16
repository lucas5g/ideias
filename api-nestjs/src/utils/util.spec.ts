import { gemini } from './gemini';

describe('Util', () => {
  it('gemini', async () => {
    const res = await gemini('eu quero beber água');

    expect(res).toBe('I want to drink water');
  }, 6500);
});
