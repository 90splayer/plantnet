'use client'

import { useCallback, useRef, useState } from 'react'

interface UploadFormProps {
  onImageSelect: (file: File, preview: string) => void
  imagePreview: string | null
  onIdentify: () => void
  isLoading: boolean
}

export default function UploadForm({
  onImageSelect,
  imagePreview,
  onIdentify,
  isLoading,
}: UploadFormProps) {
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const cameraInputRef = useRef<HTMLInputElement>(null)

  const processFile = useCallback(
    (file: File) => {
      if (!file.type.startsWith('image/')) {
        alert('Please upload an image file (JPG, PNG, WEBP, etc.)')
        return
      }

      if (file.size > 10 * 1024 * 1024) {
        alert('Image size must be under 10MB.')
        return
      }

      const reader = new FileReader()
      reader.onloadend = () => {
        onImageSelect(file, reader.result as string)
      }
      reader.readAsDataURL(file)
    },
    [onImageSelect]
  )

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragging(false)
      const file = e.dataTransfer.files[0]
      if (file) processFile(file)
    },
    [processFile]
  )

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback(() => {
    setIsDragging(false)
  }, [])

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (file) processFile(file)
    },
    [processFile]
  )

  return (
    <div className="max-w-xl mx-auto px-4">
      {!imagePreview ? (
        // Upload Zone
        <div
          className={`drop-zone rounded-3xl p-10 md:p-14 text-center cursor-pointer transition-all duration-300 ${
            isDragging ? 'active scale-[1.01]' : ''
          }`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => fileInputRef.current?.click()}
          style={{ background: isDragging ? 'rgba(163, 194, 144, 0.15)' : 'rgba(255,255,255,0.7)' }}
        >
          <div className="animate-float mb-6">
            <span className="text-6xl md:text-7xl">📸</span>
          </div>

          <h3 className="font-display text-2xl font-semibold text-moss-800 mb-2">
            Drop your plant photo here
          </h3>
          <p className="font-body text-moss-400 mb-6 text-sm">
            Or click to browse · JPG, PNG, WEBP up to 10MB
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={(e) => {
                e.stopPropagation()
                fileInputRef.current?.click()
              }}
              className="btn-primary flex items-center justify-center gap-2 bg-sage-600 hover:bg-sage-700 text-white font-body font-semibold px-6 py-3 rounded-xl transition-all duration-300"
            >
              <span>🖼️</span> Browse Files
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation()
                cameraInputRef.current?.click()
              }}
              className="flex items-center justify-center gap-2 border-2 border-sage-300 hover:border-sage-500 text-sage-700 font-body font-semibold px-6 py-3 rounded-xl transition-all duration-300 bg-white/60 hover:bg-sage-50"
            >
              <span>📷</span> Take Photo
            </button>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
          <input
            ref={cameraInputRef}
            type="file"
            accept="image/*"
            capture="environment"
            onChange={handleFileChange}
            className="hidden"
          />

          <p className="mt-6 text-xs text-moss-300 font-body">
            Tip: Best results with clear, well-lit photos showing leaves or flowers
          </p>
        </div>
      ) : (
        // Preview + Identify
        <div className="space-y-5 slide-up">
          {/* Image preview */}
          <div className="glass-card rounded-3xl overflow-hidden shadow-xl">
            <div className="relative">
              <img
                src={imagePreview}
                alt="Preview"
                className="w-full h-64 md:h-80 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
              <span className="absolute top-4 right-4 bg-white/90 text-green-700 text-xs font-body font-bold px-3 py-1.5 rounded-full shadow">
                ✓ Ready to identify
              </span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={onIdentify}
              disabled={isLoading}
              className="btn-primary flex-1 flex items-center justify-center gap-3 bg-sage-600 hover:bg-sage-700 disabled:bg-sage-300 disabled:cursor-not-allowed text-white font-body font-semibold text-lg px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 disabled:translate-y-0"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Analyzing...
                </>
              ) : (
                <>
                  <span className="text-xl">🔍</span>
                  Identify This Plant
                </>
              )}
            </button>

            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={isLoading}
              className="flex items-center justify-center gap-2 border-2 border-sage-300 hover:border-sage-500 text-sage-700 font-body font-semibold px-6 py-4 rounded-2xl transition-all duration-300 bg-white/60 hover:bg-sage-50 disabled:opacity-50"
            >
              <span>🔄</span> Change Photo
            </button>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>
      )}
    </div>
  )
}
