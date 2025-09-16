import { Field, Input } from "@chakra-ui/react";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {}

export function FieldInput(props: Props){
  return (
    <Field.Root>
      <Field.Label>Label</Field.Label>
      <Input {...props} />
    </Field.Root>
  )
}