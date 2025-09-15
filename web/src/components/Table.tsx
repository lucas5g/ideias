import { useEffect, useState, type FormEvent } from "react";
import { Button } from "./Button";
import { Card } from "./Card";
import { Input } from "./Input";
import { MagnifyingGlassIcon, PauseIcon, PlayIcon } from '@phosphor-icons/react'
import { api } from "@/utils/api";
import { Header } from "@/components/Header";
import { Player } from "@/components/Player";
import { useSearchParams } from 'react-router'
import swr from 'swr'
import { fetcher } from "@/utils/fetcher";
interface Phrase {
  id: number;
  portuguese: string;
  english: string;
  tags: string[];
  audio: string
}
export function Table() {
  const [search, setSearch] = useState<string>("")

  const { data, error, isLoading } = swr(
    ['/phrases', search],
    ([uri, search]) => fetcher<Phrase[]>(uri, { search })
  )

  if (error) return <div>failed to load</div>
  if (isLoading) return <div>loading...</div>

  const [searchParams, setSearchParams] = useSearchParams()


  // useEffect(() => {
  //   const searchActual = searchParams.get('search')

  //   if (searchActual) {
  //     setSearch(searchActual)
  //   }

  // }, [])

  // async function getPhrases() {
  //   const { data } = await api.get('/phrases', {
  //     params: {
  //       search
  //     }
  //   })

  //   setList(data)
  // }

  return (
    <Card>

      <Header title="List" />
      <form onSubmit={event => {
        event.preventDefault()
        if (search) {
          setSearchParams({ search })
        }
      }} >
        <Input
          name="search"
          label="Search"
          placeholder="Search portuguese, english or tags"
          value={search}
          onChange={(e) => setSearch(e.target.value)}

        />
        <Button>
          <MagnifyingGlassIcon size={23} />
        </Button>
      </form>
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

                  // if (res) {
                  //   const newList = list.filter(item => item.id !== phrase.id)
                  //   setList(newList)
                  //   api.delete('/phrases/' + phrase.id)
                  //     .catch(error => console.log(error))
                  // }
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
            )
          })}

        </tbody>
      </table>
    </Card >
  )
}