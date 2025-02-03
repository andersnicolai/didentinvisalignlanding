import Image from "next/image"

const teamMembers = [
  {
    name: "Dr. Alex",
    role: "Tannlege",
    image: "https://storage.googleapis.com/msgsndr/7zGDabJudfn9AdfzT6N5/media/67902cd5accdd19a2286be9c.jpeg",
    specialties: ["Tannrens", "Forebyggende tannpleie"],
    education: "Universitetet i Oslo",
  },
  {
    name: "Dr. Mohammed Alhusain",
    role: "Daglig leder og tannlege",
    image:
      "https://www.cdn.tv2.no/images/17261519.webp?imageId=17261519&x=0&y=0&cropw=100&croph=100&width=1060&height=1060&compression=80",
    specialties: ["Implantater", "Estetisk tannbehandling"],
    education: "Universitetet i Bergen",
  },
]

export default function MeetTheTeam() {
  return (
    <section className="w-full py-16 bg-[#F4EBDA]">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-2 text-center">Møt vårt erfarne team</h2>
        <p className="text-center text-muted-foreground mb-12">
          Vi er dedikerte til å gi deg den beste tannpleien i Oslo
        </p>
        
        {teamMembers.map((member, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-lg hover:bg-primary/5 transition-colors">
            <div className="flex flex-col items-center group hover:transform hover:scale-105 transition-all">
              <div className="w-48 h-48 rounded-full overflow-hidden mb-6 border-4 border-primary/10">
                <Image
                  src={member.image || "/placeholder.svg"}
                  alt={member.name}
                  width={192}
                  height={192}
                  className="object-cover w-full h-full"
                />
              </div>
              
              <h3 className="text-xl font-bold text-primary-dark">{member.name}</h3>
              <p className="text-[#2c513d] font-medium mb-3">{member.role}</p>
              
              <div className="text-center text-muted-foreground">
                <p className="mb-2">{member.education}</p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {member.specialties.map((specialty, i) => (
                    <span 
                      key={i}
                      className="bg-[#2c513d]/10 text-[#2c513d] px-3 py-1 rounded-full text-sm"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

