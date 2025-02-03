import { Mountain } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Header() {
  return (
    <header className="w-full px-4 py-4 flex justify-between items-center bg-white shadow-sm">
      <Link href="/" className="flex items-center space-x-2">
        <Mountain className="h-6 w-6 text-primary" />
        <span className="text-xl font-bold text-primary">Dident</span>
      </Link>
      <Button asChild>
        <Link href="#booking">Bestill time</Link>
      </Button>
    </header>
  )
}

