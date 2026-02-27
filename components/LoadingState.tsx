'use client'

import { useEffect, useState } from 'react'

const steps = [
  { icon: '🔍', text: 'Analyzing leaf patterns...', detail: 'Examining shape, texture and venation' },
  { icon: '🌿', text: 'Identifying species...', detail: 'Matching against 10,000+ plant records' },
  { icon: '🗺️', text: 'Mapping distribution...', detail: 'Finding native regions and habitats' },
  { icon: '📖', text: 'Exploring its history...', detail: 'Uncovering cultural and botanical lore' },
  { icon: '✨', text: 'Crafting its story...', detail: 'Weaving the narrative tapestry' },
]

export default function LoadingState() {
  const [currentStep, setCurrentStep] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev < steps.length - 1 ? prev + 1 : prev))
    }, 2200)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] py-12 px-6">
      <div className="glass-card rounded-3xl p-8 md:p-12 max-w-md w-full text-center shadow-xl">
        {/* Animated spinner */}
        <div className="relative w-24 h-24 mx-auto mb-8">
          <div className="absolute inset-0 rounded-full border-4 border-sage-100"></div>
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-sage-500 leaf-spinner"></div>
          <div className="absolute inset-2 rounded-full border-4 border-transparent border-t-sage-300" style={{ animation: 'leafSpin 1.5s linear infinite reverse' }}></div>
          <span className="absolute inset-0 flex items-center justify-center text-2xl">
            {steps[currentStep].icon}
          </span>
        </div>

        {/* Current step text */}
        <div className="mb-6">
          <p className="font-display text-xl font-semibold text-moss-800 mb-1 transition-all duration-500">
            {steps[currentStep].text}
          </p>
          <p className="text-sm text-moss-400 font-body transition-all duration-500">
            {steps[currentStep].detail}
          </p>
        </div>

        {/* Step indicators */}
        <div className="flex justify-center gap-3 mb-6">
          {steps.map((step, i) => (
            <div
              key={i}
              className={`flex flex-col items-center gap-1 transition-all duration-500 ${
                i === currentStep ? 'opacity-100 scale-110' : i < currentStep ? 'opacity-40' : 'opacity-20'
              }`}
            >
              <div
                className={`w-2 h-2 rounded-full transition-all duration-500 ${
                  i <= currentStep ? 'bg-sage-500' : 'bg-sage-200'
                }`}
              ></div>
            </div>
          ))}
        </div>

        {/* Progress bar */}
        <div className="w-full bg-sage-100 rounded-full h-1.5 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-sage-400 to-sage-600 rounded-full transition-all duration-700 ease-out"
            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          ></div>
        </div>

        <p className="mt-4 text-xs text-moss-300 font-body">
          This may take 10–20 seconds
        </p>
      </div>
    </div>
  )
}
