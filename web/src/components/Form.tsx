import { Card } from "./Card";
import { Input } from "./Input";

export function Form() {
  return (
    <form>
      <Card>
        <h2 className="title">Create</h2>

        <Input name="portuguse" placeholder="Portuguese" />
        <Input name="english" placeholder="English" />

        <button id="button-submit" className="button">
          Save
        </button>

      </Card>
    </form>
  )
}