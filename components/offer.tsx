import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Clock } from "lucide-react"

export default function Offer() {
  return (
    <section className="w-full py-12 bg-[#4A6741] text-white">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-4">
          Ikke gå glipp av denne muligheten!
        </h2>
        <p className="text-xl mb-6">
          Få 30% rabatt på din første undersøkelse som ny pasient
        </p>
        <div className="flex justify-center items-center space-x-2 mb-8">
          <Clock className="h-6 w-6" />
          <p className="text-lg">
            Dette tilbudet er kun tilgjengelig i en begrenset periode
          </p>
        </div>
        <Button 
          size="lg" 
          asChild 
          className="bg-white text-[#4A6741] hover:bg-[#F4EBDA] transition-colors font-medium"
        >
          <Link href="#booking">
            Ja, jeg vil ha 30% rabatt på min behandling!
          </Link>
        </Button>
      </div>
    </section>
  )
}

