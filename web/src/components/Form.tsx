import { Header } from "@/components/Header";
import { Card } from "./Card";
import { Input } from "./Input";
import { Button } from "@/components/Button";

export function Form() {
  return (
    <form>
      <Card>
        <Header title="Form" />

        <Input name="portuguse" placeholder="Portuguese" />
        <Input name="english" placeholder="English" />
        <Button>Save</Button>

      </Card>
    </form>
  )
}