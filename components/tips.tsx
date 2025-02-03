import { Lightbulb } from "lucide-react"

export default function Tips() {
  return (
    <section className="w-full px-4 py-12 bg-background">
      <h2 className="text-2xl font-bold mb-6 text-center">Tips for god tannhygiene</h2>
      <ul className="space-y-4">
        {[
          "Puss tennene to ganger daglig i minst to minutter",
          "Bruk tanntråd eller mellomromsbørste daglig",
          "Unngå sukkerholdig mat og drikke",
          "Bytt tannbørste hver tredje måned",
        ].map((tip, index) => (
          <li key={index} className="flex items-center">
            <Lightbulb className="h-5 w-5 text-primary mr-2" />
            <span>{tip}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}

