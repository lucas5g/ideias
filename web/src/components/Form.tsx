import { Header } from "@/components/Header";
import { Card } from "./Card";
import { Input } from "./Input";
import { Button } from "@/components/Button";
import { useState, type FormEvent } from "react";
import { api } from "@/utils/api";

export function Form() {

  const [isLoading, setIsLoading] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const portuguese = event.currentTarget.portuguese.value
    const tag = event.currentTarget.tag.value

    const payload = {
      portuguese,
      tag
    }

    try {
      setIsLoading(true)
      await api.post('/phrases', payload)
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }

  }

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <Header title="Form" />

        <Input name="portuguese" placeholder="Portuguese" />
        <Input name="tag" placeholder="Tag" />
        <Button>
          {isLoading ? 'Saving...' : 'Save'}
        </Button>

      </Card>
    </form>
  )
}