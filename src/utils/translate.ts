import * as deepl from 'deepl-node';
import { env } from './env';

export async function translate(text: string) {
  const deeplClient = new deepl.DeepLClient(env.DEEPL_API_KEY);

  const res = await deeplClient.translateText(text, null, 'en-US');

  return res.text;
}
