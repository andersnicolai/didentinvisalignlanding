import { CheckCircle } from "lucide-react"

export default function WhyDentalCleaning() {
  return (
    <section className="w-full px-4 py-12 bg-background">
      <h2 className="text-2xl font-bold mb-6 text-center">Hvorfor er tannrens viktig?</h2>
      <ul className="space-y-4">
        {[
          "Bedre munnhelse og friskere pust",
          "Forebygger tannkjøttsykdommer",
          "Hvitere og renere tenner",
          "Oppdager potensielle problemer tidlig",
        ].map((benefit, index) => (
          <li key={index} className="flex items-center">
            <CheckCircle className="h-5 w-5 text-primary mr-2" />
            <span>{benefit}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}

