"use client"

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Check, X, ChevronRight } from 'lucide-react'
import { formatPrice } from '@/lib/utils'

interface TreatmentFeature {
  id: string
  name: string
  description?: string
}

interface TreatmentOption {
  id: string
  name: string
  description: string
  price: number
  priceNote?: string
  path: string
  features: Record<string, boolean | string>
  popular?: boolean
  color?: string
}

interface TreatmentComparisonProps {
  title?: string
  subtitle?: string
  features: TreatmentFeature[]
  treatments: TreatmentOption[]
  primaryColor?: string
  secondaryColor?: string
}

export default function TreatmentComparison({
  title = "Sammenlign behandlinger",
  subtitle = "Finn den beste løsningen for ditt smil",
  features,
  treatments,
  primaryColor = "blue",
  secondaryColor = "gray"
}: TreatmentComparisonProps) {
  const [hoveredTreatment, setHoveredTreatment] = useState<string | null>(null)
  const colorMap: Record<string, { bg: string, hover: string, border: string, text: string }> = {
    blue: {
      bg: 'bg-blue-50',
      hover: 'hover:bg-blue-100',
      border: 'border-blue-200',
      text: 'text-blue-600'
    },
    green: {
      bg: 'bg-green-50',
      hover: 'hover:bg-green-100',
      border: 'border-green-200',
      text: 'text-green-600'
    },
    yellow: {
      bg: 'bg-yellow-50',
      hover: 'hover:bg-yellow-100',
      border: 'border-yellow-200',
      text: 'text-yellow-600'
    },
    purple: {
      bg: 'bg-purple-50',
      hover: 'hover:bg-purple-100',
      border: 'border-purple-200',
      text: 'text-purple-600'
    },
    gray: {
      bg: 'bg-gray-50',
      hover: 'hover:bg-gray-100',
      border: 'border-gray-200',
      text: 'text-gray-600'
    }
  }

  return (
    <div className="w-full overflow-x-auto">
      <div className="min-w-[1000px]">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">{title}</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">{subtitle}</p>
        </div>
        
        {/* Comparison table */}
        <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm">
          {/* Treatment headers */}
          <div className="grid grid-cols-[280px_repeat(auto-fill,minmax(200px,1fr))]">
            <div className="p-4 bg-gray-50 border-b border-r border-gray-200">
              <span className="font-medium text-gray-700">Behandling</span>
            </div>
            
            {treatments.map((treatment) => {
              const colorStyle = colorMap[treatment.color || primaryColor]
              const isHovered = hoveredTreatment === treatment.id
              return (
                <div 
                  key={treatment.id}
                  className={`p-4 border-b ${
                    isHovered ? colorStyle.bg : 'bg-white'
                  } border-r border-gray-200 relative ${
                    treatment.popular ? `${colorStyle.border} border-t-4` : ''
                  }`}
                  onMouseEnter={() => setHoveredTreatment(treatment.id)}
                  onMouseLeave={() => setHoveredTreatment(null)}
                >
                  {treatment.popular && (
                    <div className={`absolute top-0 right-0 ${colorStyle.text} text-xs font-medium px-2 py-1 ${colorStyle.bg} rounded-bl-lg`}>
                      Populær
                    </div>
                  )}
                  <h3 className="font-medium text-gray-900 mb-1">{treatment.name}</h3>
                  <p className="text-sm text-gray-500 mb-2">{treatment.description}</p>
                  <div className="font-bold text-lg mb-2">{formatPrice(treatment.price)}</div>
                  {treatment.priceNote && (
                    <p className="text-xs text-gray-500 mb-3">{treatment.priceNote}</p>
                  )}
                  <Button 
                    asChild 
                    variant={isHovered ? "primary" : "outline"} 
                    size="sm" 
                    className="w-full"
                  >
                    <Link href={treatment.path}>
                      Les mer
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              )
            })}
          </div>
          
          {/* Features rows */}
          {features.map((feature, index) => (
            <div 
              key={feature.id}
              className={`grid grid-cols-[280px_repeat(auto-fill,minmax(200px,1fr))] ${
                index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
              }`}
            >
              <div className="p-4 border-r border-gray-200">
                <div className="font-medium text-gray-700">{feature.name}</div>
                {feature.description && (
                  <div className="text-xs text-gray-500 mt-1">{feature.description}</div>
                )}
              </div>
              
              {treatments.map((treatment) => {
                const value = treatment.features[feature.id]
                const colorStyle = colorMap[treatment.color || primaryColor]
                const isHovered = hoveredTreatment === treatment.id
                
                return (
                  <div 
                    key={`${treatment.id}-${feature.id}`} 
                    className={`p-4 border-r border-gray-200 flex items-center justify-center ${
                      isHovered ? colorStyle.bg : ''
                    }`}
                    onMouseEnter={() => setHoveredTreatment(treatment.id)}
                    onMouseLeave={() => setHoveredTreatment(null)}
                  >
                    {typeof value === 'boolean' ? (
                      value ? (
                        <Check className={`h-5 w-5 ${colorStyle.text}`} />
                      ) : (
                        <X className="h-5 w-5 text-gray-300" />
                      )
                    ) : (
                      <span className={`text-sm ${isHovered ? colorStyle.text : 'text-gray-700'}`}>
                        {value}
                      </span>
                    )}
                  </div>
                )
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 