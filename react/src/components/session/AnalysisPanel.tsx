import { Lightbulb, AlertCircle, Link } from 'lucide-react'
import { useMemo } from 'react'
import { ScrollArea } from '../ui/scroll-area'

// Define a more specific type for our session data
type JourneyStep = {
  description: string
  time: number
}
type AnalysisResult = {
  recommendations: string[]
}
type Session = {
  analysis?: {
    analysis_results?: AnalysisResult[]
  }
  user_journey: JourneyStep[],
  qmUrl?: string
}

type AnalysisPanelProps = {
  session: Session
  videoRef: React.RefObject<HTMLVideoElement>
}

export function AnalysisPanel({ session, videoRef }: AnalysisPanelProps) {
  const keyEvents = useMemo(() => {
    return session.user_journey.filter(
      (step) =>
        step.description.includes('Error Detected') ||
        step.description.includes('Rage Click')
    )
  }, [session.user_journey])

  const recommendations = session.analysis?.analysis_results?.[0]?.recommendations || []

  const handleSeekVideo = (time: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = time
      videoRef.current.play()
    }
  }

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-6">
      <ScrollArea className="h-full pr-4">
        {/* Section for QM URL */}
        {session.qmUrl && (
          <div className="space-y-3">
            <h3 className="text-lg font-semibold flex items-center">
              <Link className="w-5 h-5 mr-2 text-gray-500" />
              Session URL
            </h3>
            <a
              href={session.qmUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-blue-500 hover:underline break-all"
            >
              {session.qmUrl}
            </a>
          </div>
        )}

        {/* Section for Recommendations */}
        {recommendations.length > 0 && (
          <div className="space-y-3 mt-6">
            <h3 className="text-lg font-semibold flex items-center">
              <Lightbulb className="w-5 h-5 mr-2 text-yellow-500" />
              Recommendations
            </h3>
            <ul className="space-y-2 list-disc list-inside text-sm text-muted-foreground">
              {recommendations.map((rec, index) => (
                <li key={index}>{rec}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Section for Key Events */}
        {keyEvents.length > 0 && (
          <div className="space-y-3 mt-6">
            <h3 className="text-lg font-semibold flex items-center">
              <AlertCircle className="w-5 h-5 mr-2 text-red-500" />
              Key Events
            </h3>
            <div className="space-y-2">
              {keyEvents.map((event, index) => (
                <button
                  key={index}
                  onClick={() => handleSeekVideo(event.time)}
                  className="w-full text-left p-2 rounded-md hover:bg-accent text-sm text-muted-foreground transition-colors"
                >
                  <span className="font-semibold text-foreground">{event.description}</span>
                  <span className="text-xs"> (at {event.time}s)</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </ScrollArea>
    </div>
  )
}