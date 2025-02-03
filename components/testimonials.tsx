import { Star } from "lucide-react"

export default function Testimonials() {
  return (
    <section className="w-full px-4 py-12 bg-primary/5">
      <h2 className="text-2xl font-bold mb-6 text-center">Hva våre kunder sier</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          { name: "Anne Hansen", comment: "Fantastisk service! Tannrensen var grundig og smertefri." },
          { name: "Ole Pedersen", comment: "Profesjonelle tannleger og hyggelig personale. Anbefales!" },
        ].map(({ name, comment }, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow">
            <div className="flex items-center mb-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
              ))}
            </div>
            <p className="mb-2 italic">&quot;{comment}&quot;</p>
            <p className="text-sm font-semibold">{name}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

