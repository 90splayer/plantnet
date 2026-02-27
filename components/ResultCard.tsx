'use client'

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

interface ResultCardProps {
  result: PlantResult
  imagePreview: string | null
  onReset: () => void
}

export default function ResultCard({ result, imagePreview, onReset }: ResultCardProps) {
  const confidenceColor =
    result.identification.confidence >= 85
      ? 'text-sage-600 bg-sage-100'
      : result.identification.confidence >= 70
      ? 'text-amber-600 bg-amber-50'
      : 'text-orange-600 bg-orange-50'

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-5">
      {/* Hero identification card */}
      <div className="glass-card rounded-3xl overflow-hidden shadow-xl slide-up">
        <div className="relative">
          {imagePreview && (
            <div className="w-full h-56 md:h-72 overflow-hidden">
              <img
                src={imagePreview}
                alt="Identified plant"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent"></div>
            </div>
          )}

          {/* Plant name overlay */}
          <div className={`p-6 md:p-8 ${imagePreview ? 'absolute bottom-0 left-0 right-0' : ''}`}>
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className={`font-display text-3xl md:text-4xl font-bold mb-1 ${imagePreview ? 'text-white' : 'text-moss-900'}`}>
                  {result.identification.commonName}
                </h2>
                <p className={`font-display italic text-lg ${imagePreview ? 'text-sage-200' : 'text-sage-600'}`}>
                  {result.identification.scientificName}
                </p>
                <p className={`font-body text-sm mt-1 ${imagePreview ? 'text-white/70' : 'text-moss-400'}`}>
                  Family: {result.identification.family}
                </p>
              </div>
              <div className={`shrink-0 text-center px-4 py-2 rounded-2xl font-body font-bold ${confidenceColor}`}>
                <div className="text-2xl font-bold">{result.identification.confidence}%</div>
                <div className="text-xs uppercase tracking-wide opacity-70">Confidence</div>
              </div>
            </div>
          </div>
        </div>

        {/* Summary (shown below image only if image exists) */}
        {imagePreview && (
          <div className="px-6 md:px-8 py-5 border-t border-sage-100">
            <p className="font-body text-moss-600 leading-relaxed">{result.summary}</p>
          </div>
        )}
        {!imagePreview && (
          <div className="px-6 md:px-8 pb-6">
            <p className="font-body text-moss-600 leading-relaxed">{result.summary}</p>
          </div>
        )}
      </div>

      {/* Geographic Distribution */}
      <div className="glass-card rounded-3xl p-6 md:p-8 shadow-lg slide-up slide-up-delay-1">
        <div className="flex items-center gap-3 mb-5">
          <span className="text-2xl">🗺️</span>
          <h3 className="font-display text-xl font-semibold text-moss-800">Geographic Distribution</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InfoPill label="Native Regions" value={result.distribution.nativeRegions} />
          <InfoPill label="Climate Zone" value={result.distribution.climateZone} />
          <InfoPill label="Habitat Type" value={result.distribution.habitatType} />
          <InfoPill label="Global Spread" value={result.distribution.spread} />
        </div>
      </div>

      {/* History */}
      <div className="glass-card rounded-3xl p-6 md:p-8 shadow-lg slide-up slide-up-delay-2">
        <div className="flex items-center gap-3 mb-5">
          <span className="text-2xl">📜</span>
          <h3 className="font-display text-xl font-semibold text-moss-800">History & Discovery</h3>
        </div>
        <div className="space-y-4">
          <HistoryBlock label="Discovery" text={result.history.discovery} />
          <HistoryBlock label="Cultivation" text={result.history.cultivation} />
          <HistoryBlock label="Name Origin" text={result.history.nameOrigin} />
        </div>
      </div>

      {/* Cultural & Medicinal Significance */}
      <div className="glass-card rounded-3xl p-6 md:p-8 shadow-lg slide-up slide-up-delay-3">
        <div className="flex items-center gap-3 mb-5">
          <span className="text-2xl">🌺</span>
          <h3 className="font-display text-xl font-semibold text-moss-800">Cultural & Medicinal Significance</h3>
        </div>
        <div className="space-y-4">
          <SignificanceBlock
            icon="🏛️"
            label="Cultural Significance"
            text={result.significance.cultural}
          />
          <SignificanceBlock
            icon="💊"
            label="Medicinal Uses"
            text={result.significance.medicinal}
          />
          <SignificanceBlock
            icon="🕊️"
            label="Symbolism"
            text={result.significance.symbolic}
          />
        </div>
      </div>

      {/* Emotional Backstory */}
      <div className="rounded-3xl p-6 md:p-8 shadow-lg slide-up slide-up-delay-4 relative overflow-hidden"
           style={{ background: 'linear-gradient(135deg, #f3f7f0 0%, #e4eddd 50%, #c9dbbb 100%)' }}>
        <div className="absolute top-0 right-0 text-8xl opacity-10 -translate-y-4 translate-x-4">🌸</div>
        <div className="relative">
          <div className="flex items-center gap-3 mb-5">
            <span className="text-2xl">✨</span>
            <h3 className="font-display text-xl font-semibold text-moss-800">Its Story</h3>
          </div>
          <blockquote className="font-display text-lg text-moss-700 leading-relaxed italic border-l-4 border-sage-400 pl-5">
            {result.story}
          </blockquote>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center pt-4 pb-8 slide-up slide-up-delay-5">
        <button
          onClick={onReset}
          className="btn-primary inline-flex items-center gap-3 bg-sage-600 hover:bg-sage-700 text-white font-body font-semibold text-lg px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
        >
          <span className="text-xl">🌱</span>
          Identify Another Plant
        </button>
      </div>
    </div>
  )
}

function InfoPill({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-sage-50/70 rounded-2xl p-4 border border-sage-100">
      <p className="text-xs font-body font-bold uppercase tracking-wider text-sage-500 mb-1">{label}</p>
      <p className="font-body text-moss-700 text-sm leading-relaxed">{value}</p>
    </div>
  )
}

function HistoryBlock({ label, text }: { label: string; text: string }) {
  return (
    <div className="flex gap-4">
      <div className="w-1.5 rounded-full bg-gradient-to-b from-sage-400 to-sage-200 shrink-0 mt-1"></div>
      <div>
        <p className="text-xs font-body font-bold uppercase tracking-wider text-sage-500 mb-1">{label}</p>
        <p className="font-body text-moss-700 text-sm leading-relaxed">{text}</p>
      </div>
    </div>
  )
}

function SignificanceBlock({ icon, label, text }: { icon: string; label: string; text: string }) {
  return (
    <div className="flex gap-4 bg-sage-50/50 rounded-2xl p-4">
      <span className="text-xl shrink-0">{icon}</span>
      <div>
        <p className="font-body font-bold text-moss-700 text-sm mb-1">{label}</p>
        <p className="font-body text-moss-500 text-sm leading-relaxed">{text}</p>
      </div>
    </div>
  )
}
