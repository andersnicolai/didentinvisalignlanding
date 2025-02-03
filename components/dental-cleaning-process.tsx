import { WashingMachineIcon as CleaningIcon, CheckIcon, SmileIcon } from "lucide-react"

export default function DentalCleaningProcess() {
  return (
    <section className="w-full px-4 py-12 bg-gradient-to-b from-primary-light to-background">
      <h2 className="text-2xl font-bold mb-6 text-center text-primary-dark">
        Tannrensprosessen hos Dident
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          {
            icon: CleaningIcon,
            title: "Grundig rens",
            description: "Vi fjerner plakk og tannstein skånsomt og effektivt.",
          },
          {
            icon: CheckIcon,
            title: "Undersøkelse",
            description: "Vi sjekker tennene og tannkjøttet for eventuelle problemer.",
          },
          { icon: SmileIcon, title: "Polering", description: "Vi polerer tennene for et strålende resultat." },
        ].map(({ icon: Icon, title, description }, index) => (
          <div key={index} className="flex flex-col items-center text-center p-4 bg-white rounded-lg shadow-lg">
            <Icon className="h-12 w-12 text-primary mb-2" />
            <h3 className="font-semibold mb-2 text-primary-dark">{title}</h3>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

