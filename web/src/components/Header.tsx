interface Props {
  title: string;
}
export function Header(props: Props) {
  return <h1 className="text-3xl font-bold text-right">{props.title}</h1>;
}
