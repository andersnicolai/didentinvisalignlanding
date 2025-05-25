import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";
import ExitIntentPopup from "@/components/exit-intent-popup";
import FloatingCTA from "@/components/floating-cta";
import pageData from "./data.json";

export const metadata: Metadata = {
  title: pageData.metadata.title,
  description: pageData.metadata.description,
  keywords: pageData.metadata.keywords,
};

export default function InvisalignPage() {
  return (
    <div className="min-h-screen bg-white">
      <main>
        {/* Add Exit Intent Popup */}
        <ExitIntentPopup 
          title="Få et perfekt smil med Invisalign"
          subtitle="Bli med de 500+ fornøyde pasientene som har valgt Dident"
          offerText="Normal pris: 1.200 kr - Din pris: 840 kr"
          treatment="invisalign"
        />
        
        {/* Add Floating CTA */}
        <FloatingCTA 
          buttonText="Bestill Invisalign konsultasjon" 
          targetId="booking"
        />
        
        {/* Hero section */}
        <section className="bg-blue-50 py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 md:pr-12">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                  {pageData.hero.title}
                </h1>
                <p className="text-lg md:text-xl text-gray-600 mb-8">
                  {pageData.hero.description}
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button asChild variant="primary" size="lg">
                    <Link href={pageData.hero.primaryButtonUrl}>
                      {pageData.hero.primaryButtonText}
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg">
                    <a href={pageData.hero.secondaryButtonUrl}>
                      {pageData.hero.secondaryButtonText}
                    </a>
                  </Button>
                </div>
              </div>
              <div className="md:w-1/2 mt-10 md:mt-0">
                <div className="relative rounded-lg overflow-hidden shadow-xl h-80 md:h-96">
                  <Image
                    src={pageData.hero.image}
                    alt="Invisalign behandling"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About Invisalign */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">{pageData.about.title}</h2>
                {pageData.about.paragraphs.map((paragraph, index) => (
                  <p key={index} className="text-gray-600 mb-4">
                    {paragraph}
                  </p>
                ))}
              </div>
              <div className="relative h-80 rounded-lg overflow-hidden">
                <Image
                  src={pageData.about.image}
                  alt="Invisalign skinner"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">{pageData.benefits.title}</h2>
              <p className="text-gray-600 max-w-3xl mx-auto">
                {pageData.benefits.subtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {pageData.benefits.items.map((benefit) => (
                <div key={benefit.id} className="bg-white rounded-lg shadow-md p-6">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <span className="text-blue-600 text-2xl font-bold">{benefit.id}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Treatment process */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">{pageData.treatmentProcess.title}</h2>
              <p className="text-gray-600 max-w-3xl mx-auto">
                {pageData.treatmentProcess.subtitle}
              </p>
            </div>

            <div className="space-y-12">
              {pageData.treatmentProcess.steps.map((step) => (
                <div key={step.id} className="flex flex-col md:flex-row gap-6 items-center">
                  <div className="md:w-1/3 flex justify-center">
                    <div className="relative w-full max-w-sm h-60 rounded-lg overflow-hidden shadow-md">
                      <Image
                        src={step.image}
                        alt={step.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                  <div className="md:w-2/3">
                    <div className="flex items-center mb-2">
                      <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mr-3">
                        <span className="text-white font-bold">{step.id}</span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900">{step.title}</h3>
                    </div>
                    <p className="text-gray-600 mb-3">{step.description}</p>
                    {step.additionalInfo && (
                      <p className="text-sm text-gray-500">{step.additionalInfo}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">{pageData.pricing.title}</h2>
              <p className="text-gray-600 max-w-3xl mx-auto">
                {pageData.pricing.subtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {pageData.pricing.options.map((option) => (
                <div 
                  key={option.id} 
                  className={`bg-white rounded-lg shadow-md overflow-hidden ${
                    option.popular ? 'ring-2 ring-blue-600 relative' : ''
                  }`}
                >
                  {option.popular && (
                    <div className="absolute top-0 right-0 bg-blue-600 text-white px-4 py-1 text-sm font-medium">
                      Mest populær
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{option.title}</h3>
                    <p className="text-gray-600 mb-4 h-12">{option.description}</p>
                    <p className="text-3xl font-bold text-blue-600 mb-2">
                      {formatPrice(option.price)}
                    </p>
                    <p className="text-sm text-gray-500 mb-6">{option.priceDescription}</p>
                    <ul className="space-y-3 mb-6">
                      {option.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <svg className="h-5 w-5 text-blue-600 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                          </svg>
                          <span className="text-gray-600">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button asChild variant={option.popular ? "primary" : "outline"} className="w-full">
                      <Link href="/booking">
                        Bestill konsultasjon
                      </Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">{pageData.pricing.financing.title}</h3>
              {pageData.pricing.financing.paragraphs.map((paragraph, index) => (
                <p key={index} className="text-gray-600 mb-4">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">{pageData.faqs.title}</h2>
              <p className="text-gray-600 max-w-3xl mx-auto">
                {pageData.faqs.subtitle}
              </p>
            </div>

            <div className="max-w-3xl mx-auto divide-y divide-gray-200">
              {pageData.faqs.items.map((faq) => (
                <div key={faq.id} className="py-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-3">{faq.question}</h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Booking Section */}
        <section id="booking" className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Få et perfekt smil med Invisalign
                </h2>
                <p className="text-gray-600 mb-6">
                  Bestill en gratis konsultasjon for Invisalign hos Dident Tannklinikk. 
                  Våre erfarne tannleger vil vurdere om Invisalign er riktig for deg 
                  og lage en personlig behandlingsplan.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <svg className="h-5 w-5 text-blue-600 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <p className="text-gray-600">3D-skanning og digital behandlingsplan</p>
                  </div>
                  <div className="flex items-start">
                    <svg className="h-5 w-5 text-blue-600 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <p className="text-gray-600">Virtuell visning av sluttresultatet</p>
                  </div>
                  <div className="flex items-start">
                    <svg className="h-5 w-5 text-blue-600 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <p className="text-gray-600">Diskusjon av behandlingstid og kostnader</p>
                  </div>
                  <div className="flex items-start">
                    <svg className="h-5 w-5 text-blue-600 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <p className="text-gray-600">Svar på alle dine spørsmål om Invisalign</p>
                  </div>
                </div>
              </div>
              <div>
                <div className="bg-white p-8 rounded-lg shadow-md">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Bestill gratis Invisalign-konsultasjon</h3>
                  <p className="text-gray-600 mb-6">Fyll ut skjemaet så kontakter vi deg for å avtale tid</p>
                  <div className="text-center">
                    <Button asChild variant="primary" size="lg" className="w-full">
                      <Link href="/booking">
                        Bestill konsultasjon nå
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Booking CTA */}
        <section className="bg-blue-600 py-12 md:py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              {pageData.cta.title}
            </h2>
            <p className="text-blue-100 mb-8 max-w-3xl mx-auto">
              {pageData.cta.description}
            </p>
            <Button asChild variant="primary" size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
              <Link href={pageData.cta.buttonUrl}>
                {pageData.cta.buttonText}
              </Link>
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
} 