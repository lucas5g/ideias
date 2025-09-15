interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  isNotLabel?: boolean
}

export function Input(props: Props) {
  return (
    <div className="flex flex-col gap-1 w-full">
      {!props.isNotLabel &&
        <label>
          {props.label ?? props.placeholder}
        </label>
      }
      <input
        type="text"
        className="bg-gray-500 py-3 px-4 rounded placeholder:text-gray-400 w-full"
        {...props}
      />
    </div>
  )
}