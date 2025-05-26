"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ImageDialog } from "@/components/ui/image-dialog";

const galleryImages = [
  {
    src: "/prosjekter/holmenkollen (2).jpg",
    alt: "Holmenkollen prosjekt bilde 1",
  },
  {
    src: "/prosjekter/holmenkollen (3).jpg",
    alt: "Holmenkollen prosjekt bilde 2",
  },
  {
    src: "/prosjekter/holmenkollen (4).jpg",
    alt: "Holmenkollen prosjekt bilde 3",
  },
  {
    src: "/prosjekter/holmenkollen (5).jpg",
    alt: "Holmenkollen prosjekt bilde 4",
  },
];

export default function HolmenkollenPage() {
  const [selectedImage, setSelectedImage] = useState<{
    src: string;
    alt: string;
  } | null>(null);

  return (
    <main className="min-h-screen">
      {/* Gallery Section */}
      <section className="relative h-[60vh] md:h-[80vh] overflow-hidden bg-stone-100">
        <div className="absolute inset-0 grid grid-cols-2 md:grid-cols-4 gap-1">
          {galleryImages.map((image, index) => (
            <div
              key={index}
              className="relative w-full h-full overflow-hidden group cursor-pointer"
              onClick={() => setSelectedImage(image)}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-300" />
            </div>
          ))}
        </div>
      </section>

      {/* Image Dialog */}
      {selectedImage && (
        <ImageDialog
          isOpen={!!selectedImage}
          onClose={() => setSelectedImage(null)}
          src={selectedImage.src}
          alt={selectedImage.alt}
        />
      )}

      {/* Article Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <article className="max-w-3xl mx-auto prose prose-lg">
            <div className="flex flex-col gap-4 items-center mb-16 text-center not-prose">
              <div className="flex gap-6 items-center text-sm text-muted-foreground">
                <span>Desember 2023</span>
                <span>•</span>
                <span>Holmenkollen, Oslo</span>
              </div>
            </div>

            <h2 className="mb-2 font-bold">Om Prosjektet</h2>
            <p className="mb-12">
              Dette prosjektet i Holmenkollen omfattet en fullstendig renovering
              av en leilighet. Arbeidet inkluderte omfattende malerarbeid på
              vegger og tak, samt detaljert behandling av listverk og karmer.
            </p>

            <h3 className="mt-16 mb-2 font-bold">Utfordringer og Løsninger</h3>
            <p className="mb-12">
              En av hovedutfordringene var å sikre jevn og høy kvalitet på alle
              overflater, spesielt i områder med kompleks arkitektur. Vi brukte
              vår ekspertise til å velge riktige materialer og teknikker for
              hver spesifikk overflate.
            </p>

            <h3 className="mt-16 mb-4 font-bold">Materialer og Metoder</h3>
            <ul className="mb-12 space-y-3">
              <li>Premium malingstyper for ulike overflater</li>
              <li>Spesialtilpassede fargeløsninger</li>
              <li>Miljøvennlige produkter</li>
              <li>Profesjonelt verktøy og utstyr</li>
            </ul>

            <h3 className="mt-16 mb-2 font-bold">Resultat</h3>
            <p className="mb-16">
              Sluttresultatet ble en moderne og elegant leilighet med perfekt
              utførte overflater. Kunden var svært fornøyd med både
              arbeidsprosessen og det ferdige resultatet.
            </p>

            <div className="mt-24 not-prose">
              <h4 className="text-md font-semibold mb-2">Prosjektdetaljer</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="p-6 bg-stone-50 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-2">Varighet</p>
                  <p className="font-medium">3 uker</p>
                </div>
                <div className="p-6 bg-stone-50 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-2">Område</p>
                  <p className="font-medium">120 m²</p>
                </div>
                <div className="p-6 bg-stone-50 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-2">Type</p>
                  <p className="font-medium">Innvendig</p>
                </div>
                <div className="p-6 bg-stone-50 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-2">Status</p>
                  <p className="font-medium">Fullført</p>
                </div>
              </div>
            </div>
          </article>
        </div>
      </section>
    </main>
  );
}
