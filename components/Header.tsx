import Link from "next/link"

type headerProps = {
  headerTitle?: string,
  titleClassName?: string
}
export default function Header({ headerTitle, titleClassName }: headerProps) {
  return (
    <header className="flex items-center justify-between">
      {headerTitle ? (
        <h1 className={`text-[16px] font-bold text-white-1 ${titleClassName}`}>{headerTitle}</h1>
      ): (<div/>)}
      <Link href="/discover" className="text-[16px] font-semibold text-sakura-1">
        See all
      </Link>
    </header>
  )
}