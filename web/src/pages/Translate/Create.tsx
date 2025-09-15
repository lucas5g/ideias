import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { Header } from "@/components/Header";
import { Input } from "@/components/Input";
import type { FormEvent } from "react";

const options = [
  'interrogative',
  'negative',
]
export function TranslateCreate() {

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const file = formData.get("file") as File | null;
    const action = formData.get("action") as string;

    console.log({ file, action });
  }



  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <Header title="Create" />
        <Input type="file" name="file" placeholder="File" />
        <div className="flex flex-col gap-1">
          <label htmlFor="action">Action</label>
          <select
            name="action"
            className="bg-gray-500 py-3 px-4 rounded placeholder:text-gray-400 w-full "
          >
            {options.map((option) => (
              <option
                key={option}
                value={option}
              >
                {option}
              </option>
            ))}
          </select>
        </div>
        <Button>
          Save
        </Button>
      </Card>
    </form>
  )
}