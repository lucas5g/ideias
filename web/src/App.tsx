import { Form } from "@/components/Form";
import { Table } from "./components/Table";

export function App() {

  return (

    <div className="flex flex-col min-h-screen gap-5 p-10 text-white bg-gray-950">
      <Form />

      <Table />
    </div>
  )

}

