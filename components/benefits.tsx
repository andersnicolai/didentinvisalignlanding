import { CheckCircle } from "lucide-react"

const benefits = [
  "Profesjonell tannrens utført av erfarne tannleger",
  "Forbedret munnhelse og friskere pust",
  "Forebygging av tannkjøttsykdommer",
  "Oppdage potensielle problemer tidlig",
  "Hvitere og renere tenner",
]

export default function Benefits() {
  return (
    <section className="w-full py-12 bg-[#F4EBDA]">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 text-[#2c513d]">
          Hvorfor velge vår gratis tannrens?
        </h2>
        <ul className="space-y-4">
          {benefits.map((benefit, index) => (
            <li key={index} className="flex items-center">
              <CheckCircle className="h-6 w-6 text-[#2c513d] mr-2" />
              <span className="text-lg">{benefit}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

