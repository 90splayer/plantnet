'use client'

import { useState } from 'react'
import Link from 'next/link'
import UploadForm from '@/components/UploadForm'
import LoadingState from '@/components/LoadingState'
import ResultCard from '@/components/ResultCard'

type AppState = 'upload' | 'loading' | 'result' | 'error'

interface PlantResult {
  identification: {
    commonName: string
    scientificName: string
    family: string
    confidence: number
    description: string
  }
  summary: string
  distribution: {
    nativeRegions: string
    climateZone: string
    habitatType: string
    spread: string
  }
  history: {
    discovery: string
    cultivation: string
    nameOrigin: string
  }
  significance: {
    cultural: string
    medicinal: string
    symbolic: string
  }
  story: string
}

export default function IdentifyPage() {
  const [state, setState] = useState<AppState>('upload')
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [result, setResult] = useState<PlantResult | null>(null)
  const [errorMessage, setErrorMessage] = useState<string>('')

  const handleImageSelect = (file: File, preview: string) => {
    setSelectedFile(file)
    setImagePreview(preview)
    setResult(null)
    setErrorMessage('')
    setState('upload')
  }

  const handleIdentify = async () => {
    if (!selectedFile) return

    setState('loading')
    setErrorMessage('')

    try {
      const formData = new FormData()
      formData.append('image', selectedFile)

      const response = await fetch('/api/identify', {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()

      if (!response.ok || data.error) {
        setErrorMessage(
          data.error ||
            'Something went wrong while analyzing your plant. Please try again.'
        )
        setState('error')
        return
      }

      setResult(data)
      setState('result')
    } catch {
      setErrorMessage(
        'Network error. Please check your connection and try again.'
      )
      setState('error')
    }
  }

  const handleReset = () => {
    setState('upload')
    setSelectedFile(null)
    setImagePreview(null)
    setResult(null)
    setErrorMessage('')
  }

  return (
    <main className="min-h-screen pb-12">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-6 md:px-12 py-5 border-b border-sage-100/50">
        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <span className="text-2xl">🌿</span>
          <span className="font-display font-semibold text-sage-700 text-lg">Plantnet</span>
        </Link>
        {state === 'result' && (
          <button
            onClick={handleReset}
            className="text-sm font-body text-sage-600 hover:text-sage-800 transition-colors border border-sage-300 rounded-full px-4 py-1.5 hover:border-sage-500"
          >
            + New Identification
          </button>
        )}
      </nav>

      {/* Content */}
      <div className="pt-8">
        {state === 'upload' && (
          <div className="slide-up">
            <div className="text-center mb-10 px-4">
              <h1 className="font-display text-4xl md:text-5xl font-bold text-moss-900 mb-3">
                Identify Your Plant
              </h1>
              <p className="font-body text-moss-500 text-lg max-w-md mx-auto">
                Upload a clear photo and our AI will uncover everything about it.
              </p>
            </div>
            <UploadForm
              onImageSelect={handleImageSelect}
              imagePreview={imagePreview}
              onIdentify={handleIdentify}
              isLoading={false}
            />
          </div>
        )}

        {state === 'loading' && (
          <div className="slide-up">
            <LoadingState />
          </div>
        )}

        {state === 'result' && result && (
          <ResultCard
            result={result}
            imagePreview={imagePreview}
            onReset={handleReset}
          />
        )}

        {state === 'error' && (
          <div className="max-w-md mx-auto px-4 pt-8 slide-up">
            <div className="glass-card rounded-3xl p-8 text-center shadow-xl">
              <span className="text-5xl mb-4 block">🌵</span>
              <h3 className="font-display text-2xl font-semibold text-moss-800 mb-3">
                Identification Failed
              </h3>
              <p className="font-body text-moss-500 mb-6 leading-relaxed">
                {errorMessage}
              </p>
              <div className="flex flex-col gap-3">
                {imagePreview && (
                  <button
                    onClick={handleIdentify}
                    className="btn-primary flex items-center justify-center gap-2 bg-sage-600 hover:bg-sage-700 text-white font-body font-semibold px-6 py-3 rounded-xl transition-all duration-300"
                  >
                    <span>🔄</span> Try Again
                  </button>
                )}
                <button
                  onClick={handleReset}
                  className="flex items-center justify-center gap-2 border-2 border-sage-300 hover:border-sage-500 text-sage-700 font-body font-semibold px-6 py-3 rounded-xl transition-all duration-300 bg-white/60 hover:bg-sage-50"
                >
                  <span>📸</span> Upload Different Photo
                </button>
              </div>
              <p className="mt-5 text-xs text-moss-300 font-body">
                Tips: Use bright natural light · Make sure the plant is in focus · Avoid busy backgrounds
              </p>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
