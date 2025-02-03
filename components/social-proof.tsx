import { Star, Users, Clock, Award, Heart } from "lucide-react"

const stats = [
  {
    icon: Star,
    value: "4.9",
    label: "Pasientvurdering",
    subtext: "Basert på 200+ anmeldelser",
  },
  {
    icon: Users,
    value: "1000+",
    label: "Fornøyde pasienter",
    subtext: "I Oslo-området",
  },
  {
    icon: Award,
    value: "15+",
    label: "Års erfaring",
    subtext: "Med tannpleie",
  },
  {
    icon: Heart,
    value: "98%",
    label: "Anbefaler oss",
    subtext: "Til venner og familie",
  },
  {
    icon: Clock,
    value: "24t",
    label: "Responstid",
    subtext: "På henvendelser",
  },
]

const testimonials = [
  {
    name: "Marie L.",
    text: "Fantastisk service og profesjonell behandling. Følte meg trygg og ivaretatt hele veien.",
    rating: 5,
  },
  {
    name: "Anders K.",
    text: "Beste tannlegeopplevelsen jeg har hatt. Grundig forklaring og smertefri behandling.",
    rating: 5,
  },
]

export default function SocialProof() {
  return (
    <section className="w-full py-16 bg-gradient-to-b from-white to-[#F4EBDA]">
      <div className="container mx-auto px-4">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-16">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className="p-6 rounded-xl border border-[#4A6741]/20 bg-white hover:shadow-lg transition-shadow"
            >
              <stat.icon className="h-8 w-8 text-[#4A6741] mb-4" />
              <h3 className="text-3xl font-bold text-[#4A6741] mb-1">{stat.value}</h3>
              <p className="font-medium text-gray-900 mb-1">{stat.label}</p>
              <p className="text-sm text-muted-foreground">{stat.subtext}</p>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-[#4A6741]">
            Hva våre pasienter sier
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index}
                className="bg-white p-6 rounded-xl border border-[#4A6741]/20 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-[#4A6741] text-[#4A6741]" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">&quot;{testimonial.text}&quot;</p>
                <p className="font-medium text-[#4A6741]">{testimonial.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

