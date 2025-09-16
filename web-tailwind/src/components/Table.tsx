import { useEffect, useState, type FormEvent } from 'react';
import { Button } from './Button';
import { Card } from './Card';
import { Input } from './Input';
import { MagnifyingGlassIcon } from '@phosphor-icons/react';
import { Header } from '@/components/Header';
import { Player } from '@/components/Player';
import { mutate } from 'swr';
import { fetcher } from '@/utils/fetcher';
import { useSearchParams } from 'react-router';
import { useAppContext } from '@/contexts/AppContext';
import { api } from '@/utils/api';
import { Loading } from '@/components/Loading';
interface Phrase {
  id: number;
  portuguese: string;
  english: string;
  tags: string[];
  audio: string;
}
export function Table() {
  const [search, setSearch] = useState<string>('');
  const [searchParams, setSearchParams] = useSearchParams()
  const { uri, setUri } = useAppContext();

  useEffect(() => {
    const search = searchParams.get('search')


    if (search) {
      setUri(`/phrases?search=${search}`)
      setSearch(search)
    } else {
      setUri('/phrases')
    }

  }, [])

  const { data, error, isLoading } = fetcher<Phrase[]>(uri)

  if (error) {

    return <div>failed to load</div>;
  }
  function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // setSearch(searchControl)
    setSearchParams({ search })
    setUri(`/phrases?search=${search}`)


  }

  return (

    <Card>
      <Header title="List" />
      <form onSubmit={handleSearch} className="flex 
        justify-items-center 
        items-center 
        gap-3">
        <Input
          name="search"
          isNotLabel
          // placeholder="Search portuguese, english or tags"
          value={search}
          onChange={(event) => setSearch(event.target.value)}

        />
        <Button width="w-[20%]">
          <MagnifyingGlassIcon size={23} />
        </Button>
      </form>
      {isLoading &&
        <Loading />
      }
      {!isLoading &&
        <table>
          <thead className="text-left">
            <tr>
              <th>Phrase</th>
              <th>Audio</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((phrase) => {
              return (
                <tr
                  key={phrase.id}
                  className="border-b border-gray-600 h-14 last:border-0 hover:bg-gray-700 hover:cursor-pointer transition-all"
                  onDoubleClick={() => {
                    const res = confirm(`Deletar frase "${phrase.english.toUpperCase()}"`)
                    if (res) {

                      api.delete('/phrases/' + phrase.id)
                        .catch(error => console.log(error))

                      mutate(uri)
                    }
                  }}
                >
                  <td>
                    {phrase.portuguese} <br />
                    {phrase.english}
                  </td>
                  <td>
                    <Player audio={phrase.audio} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      }
    </Card>
  );
}
