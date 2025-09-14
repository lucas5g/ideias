interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {

}
export function Button(props: Props) {
  return (
    <button
      className="bg-gray-600 hover:bg-gray-500 
        font-bold 
        py-1 rounded 
        disabled:cursor-not-allowed disabled:bg-gray-700 w-full"
      {...props} />
  )

}