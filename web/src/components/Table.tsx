import { useEffect, useState } from "react";
import { Button } from "./Button";
import { Card } from "./Card";
import { Input } from "./Input";
import { MagnifyingGlassIcon } from '@phosphor-icons/react'
export function Table() {

  const [list, setList] = useState([])

  useEffect(() => {
    
  })

  return (
    <Card>
      {/* <h2 class="title">List</h2> */}
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
          <tr>
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
          </tr>
        </tbody>
      </table>
    </Card>
  )
}