import clsx from "clsx";
interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  width?: string
}
export function Button({width, ...props}: Props) {
  return (
    <button
      className={clsx(
        "bg-gray-600 hover:bg-gray-500 font-bold hover:cursor-pointer   disabled:cursor-not-allowed disabled:bg-gray-700 flex items-center justify-center h-12 rounded",
        width ? width : 'w-full',
      )}
      // className="bg-gray-600 hover:bg-gray-500 
      //   font-bold 
      //   h-12 rounded 
      //   "
      {...props} />
  )

}