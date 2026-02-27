import { NextRequest, NextResponse } from 'next/server'
import { openai } from '@/lib/openai'

export const runtime = 'nodejs'
export const maxDuration = 60

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const imageFile = formData.get('image') as File

    if (!imageFile) {
      return NextResponse.json(
        { error: 'No image provided' },
        { status: 400 }
      )
    }

    // Convert file to base64
    const bytes = await imageFile.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const base64Image = buffer.toString('base64')
    const mimeType = imageFile.type || 'image/jpeg'

    // Step 1: Identify plant using vision model
    const visionResponse = await openai.chat.completions.create({
      model: 'gpt-4o',
      max_tokens: 500,
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'image_url',
              image_url: {
                url: `data:${mimeType};base64,${base64Image}`,
                detail: 'high',
              },
            },
            {
              type: 'text',
              text: `Identify this plant or flower in the image. Return ONLY a valid JSON object with no markdown formatting, no code blocks, just raw JSON like this:
{
  "identified": true,
  "commonName": "Common name of the plant",
  "scientificName": "Scientific name (genus species)",
  "family": "Plant family name",
  "confidence": 87,
  "description": "One sentence visual description of what you see"
}

If you cannot confidently identify a plant (confidence below 60%), return:
{
  "identified": false,
  "reason": "Brief reason why identification failed"
}`,
            },
          ],
        },
      ],
    })

    const visionContent = visionResponse.choices[0]?.message?.content || ''

    let plantData: {
      identified: boolean
      commonName?: string
      scientificName?: string
      family?: string
      confidence?: number
      description?: string
      reason?: string
    }

    try {
      // Strip any potential markdown code fences
      const cleaned = visionContent.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim()
      plantData = JSON.parse(cleaned)
    } catch {
      return NextResponse.json(
        {
          error:
            "Sorry, we couldn't confidently identify this plant. Try another photo with clearer lighting.",
        },
        { status: 422 }
      )
    }

    if (!plantData.identified) {
      return NextResponse.json(
        {
          error:
            "Sorry, we couldn't confidently identify this plant. Try another photo with clearer lighting.",
        },
        { status: 422 }
      )
    }

    // Step 2: Generate rich botanical information using GPT
    const storyResponse = await openai.chat.completions.create({
      model: 'gpt-4o',
      max_tokens: 1200,
      messages: [
        {
          role: 'system',
          content:
            'You are a botanical educator and storyteller. You write with warmth, expertise, and a deep love for the plant kingdom. Always return valid JSON only, no markdown.',
        },
        {
          role: 'user',
          content: `I have identified a plant with the following details:
- Common Name: ${plantData.commonName}
- Scientific Name: ${plantData.scientificName}
- Family: ${plantData.family}
- Description: ${plantData.description}

Please generate rich botanical information. Return ONLY a valid JSON object with no markdown formatting:

{
  "summary": "2-3 sentence factual summary of this plant",
  "distribution": {
    "nativeRegions": "Specific continents and regions where it naturally grows",
    "climateZone": "Climate zone (tropical, temperate, alpine, etc.)",
    "habitatType": "Specific habitat (rainforest, meadow, wetland, etc.)",
    "spread": "Brief note on how widely it has spread or been cultivated"
  },
  "history": {
    "discovery": "When and how it was first documented by Western science",
    "cultivation": "Brief history of human cultivation or use",
    "nameOrigin": "Etymology or story behind its name"
  },
  "significance": {
    "cultural": "Cultural significance in various societies",
    "medicinal": "Any medicinal or therapeutic uses",
    "symbolic": "Symbolism in art, literature, or tradition"
  },
  "story": "Write a warm, engaging 150-200 word emotional narrative backstory about this plant. Write in second person, inviting the reader into the plant's world. Include sensory details, a sense of time and place, and what makes this plant remarkable or touching."
}`,
        },
      ],
    })

    const storyContent = storyResponse.choices[0]?.message?.content || ''

    let botanicalData: {
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

    try {
      const cleaned = storyContent.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim()
      botanicalData = JSON.parse(cleaned)
    } catch {
      return NextResponse.json(
        { error: 'Failed to generate plant information. Please try again.' },
        { status: 500 }
      )
    }

    // Return combined response
    return NextResponse.json({
      identification: {
        commonName: plantData.commonName,
        scientificName: plantData.scientificName,
        family: plantData.family,
        confidence: plantData.confidence,
        description: plantData.description,
      },
      ...botanicalData,
    })
  } catch (error: unknown) {
    console.error('Plant identification error:', error)

    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error'

    if (errorMessage.includes('API key')) {
      return NextResponse.json(
        { error: 'API configuration error. Please check your OpenAI API key.' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      {
        error:
          'Something went wrong while analyzing your plant. Please try again with a clearer photo.',
      },
      { status: 500 }
    )
  }
}
