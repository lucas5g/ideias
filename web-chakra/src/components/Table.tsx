import { useEffect, useState, type FormEvent } from 'react';
import { Loading } from '@/components/Loading';
import { MagnifyingGlassIcon } from '@phosphor-icons/react';
import { useSearchParams } from 'react-router';
import { useAppContext } from '@/contexts/AppContext';
import { fetcher } from '@/utils/fetcher';
import { Button, Card, Flex, HStack, Input, Skeleton, SkeletonCircle, SkeletonText, Stack } from '@chakra-ui/react';
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

  if (error) return <div>failed to load</div>

  function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSearchParams({ search })
    setUri(`/phrases?search=${search}`)
  }

  return (

    <Card.Root>
      <Card.Header>
        <Card.Title>
          List
        </Card.Title>
      </Card.Header>
      <Card.Body gap={3}>
        <form onSubmit={handleSearch}>
          <Flex gap={3}>
            <Input
              name="search"
              placeholder="Search portuguese, english or tags"
              value={search}
              onChange={(event) => setSearch(event.target.value)}

            />
            <Button variant={'surface'}>
              <MagnifyingGlassIcon size={23} />
            </Button>
          </Flex>
        </form>

        {isLoading &&
          <SkeletonText noOfLines={3} gap="4" />
        }
      </Card.Body>
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
                    {/* <Player audio={phrase.audio} /> */}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      }

    </Card.Root>
  );
}
