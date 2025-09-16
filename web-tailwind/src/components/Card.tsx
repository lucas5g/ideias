interface Props {
  children: React.ReactNode;
}

export function Card({ children }: Props) {
  return (
    <div className="bg-gray-800 
    p-10 rounded flex flex-col gap-5 w-full 
    h-max
    "
    >
      {children}
    </div>
  );
}
