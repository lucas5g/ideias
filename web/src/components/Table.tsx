import { useEffect, useState } from "react";
import { Button } from "./Button";
import { Card } from "./Card";
import { Input } from "./Input";
import { MagnifyingGlassIcon, PauseIcon, PlayIcon } from '@phosphor-icons/react'
import { api } from "@/utils/api";
import { Header } from "@/components/Header";
import { Player } from "@/components/Player";

interface Phrase {
  id: number;
  portuguese: string;
  english: string;
  tags: string[];
  audio: string
}
export function Table() {

  const [list, setList] = useState<Phrase[]>()

  useEffect(() => {
    api.get('/phrases').then(response => {
      setList(response.data)
    })
  }, [])


  return (
    <Card>

      <Header title="List" />
      <form className="">
        <Input
          name="search"
          label="Search"
          placeholder="Search portuguese, english or tags"

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
          {list?.map((phrase) => {
            return (
              <tr
                key={phrase.id}
                className="border-b border-gray-600 h-14 last:border-0"
                onDoubleClick={() => {
                  const res = confirm(`Deletar frase "${phrase.english.toUpperCase()}"`)

                  if (res) {
                    const newList = list.filter(item => item.id !== phrase.id)
                    setList(newList)
                    api.delete('/phrases/' + phrase.id)
                      .catch(error => console.log(error))
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
            )
          })}
          {/* <tr>
            <td>0</td>
            <td>teste</td>
            <td>teste</td>
            <td>
              <button className="w-10 h-10 pt-1 bg-gray-500 rounded-full hover:bg-gray-400">
                <i className="ph ph-play"></i>
              </button>
              <button className="w-10 h-10 pt-1 bg-gray-500 rounded-full hover:bg-gray-400">
                <i className="ph ph-pause"></i>
              </button>
            </td>
          </tr> */}
        </tbody>
      </table>
    </Card >
  )
}