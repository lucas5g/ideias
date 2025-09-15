import { api } from '@/utils/api';
// import swr from 'swr'

export async function fetcher<T>(
  uri: string,
  searchParams?: Record<string, string | number | boolean>,
) {
  // return swr(
  //   [uri, searchParams],
  //   async () => {
  //     const { data } = await api.get<T>(uri, {
  //       params: searchParams
  //     })
  //     return data
  //   }
  // )

  const { data } = await api.get<T>(uri, {
    params: searchParams,
  });
  return data;
}
