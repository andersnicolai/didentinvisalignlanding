import { Button } from "@/components/ui/button"
import Link from "next/link"
import Logo from "./logo"

export default function Header() {
  return (
    <header className="w-full px-4 py-4 flex justify-between items-center bg-white shadow-sm">
      <Logo />
      <Button asChild>
        <Link href="#booking">Bestill time</Link>
      </Button>
    </header>
  )
}

