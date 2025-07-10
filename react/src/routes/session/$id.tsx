import { createCanvas } from '@/api/canvas'
import ChatTextarea from '@/components/chat/ChatTextarea'
import { AnalysisPanel } from '@/components/session/AnalysisPanel'
import { DEFAULT_SYSTEM_PROMPT } from '@/constants'
import sessionsData from '@/data/sessions.json'
import { useMutation } from '@tanstack/react-query'
import { createFileRoute, useNavigate, useSearch } from '@tanstack/react-router'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { AnimatePresence, motion } from 'motion/react'
import { MessageSquare } from 'lucide-react'
import { nanoid } from 'nanoid'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'

interface SessionSearch {
  category: string
}

export const Route = createFileRoute('/session/$id')({
  validateSearch: (search: Record<string, unknown>): SessionSearch => {
    return {
      category: (search.category as string) || '',
    }
  },
  component: SessionDetail,
})

function SessionDetail() {
  const { id: sessionId } = Route.useParams()
  const { category } = Route.useSearch()
  const { t } = useTranslation()
  const navigate = useNavigate()

  // --- [1] THE FIX: Find the session safely without the '!' ---
  const session = sessionsData.sessions.find((s) => s.id === sessionId)

  const sessionsInCategory = useMemo(() => {
    if (!category) return []
    return sessionsData.sessions.filter((s) => s.category === category)
  }, [category])

  const handleSessionSwitch = (newSessionId: string) => {
    if (newSessionId === sessionId) return
    navigate({
      to: '/session/$id',
      params: { id: newSessionId },
      search: { category },
    })
  }

  const videoRef = useRef<HTMLVideoElement>(null)
  const lastStepRef = useRef<HTMLDivElement>(null)
  const [activeStepIndex, setActiveStepIndex] = useState(-1)
  
  // Memoize userJourney to prevent re-renders
  const userJourney = useMemo(() => session?.user_journey || [], [session])

  const handleTimeUpdate = useCallback(() => {
    const video = videoRef.current
    if (!video || !userJourney.length) return

    const currentTime = video.currentTime
    let newActiveIndex = -1

    for (let i = 0; i < userJourney.length; i++) {
      if (currentTime >= userJourney[i].time) {
        newActiveIndex = i
      } else {
        break
      }
    }
    setActiveStepIndex(newActiveIndex)
  }, [userJourney])

  useEffect(() => {
    if (lastStepRef.current) {
      lastStepRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    }
  }, [activeStepIndex])

  const { mutate: createCanvasMutation, isPending } = useMutation({
    mutationFn: createCanvas,
    onSuccess: (data) => {
      navigate({
        to: '/canvas/$id',
        params: { id: data.id },
        search: { init: true },
      })
    },
    onError: (error) => {
      toast.error(t('common:messages.error', 'Error'), {
        description: error.message,
      })
    },
  })

  // --- [2] This guard clause will now work correctly ---
  if (!session) {
    return <div className="p-4">Session not found. Please go back and select a session.</div>
  }

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <aside className="w-2/5 border-r flex flex-col">
        <div className="p-4 border-b flex-shrink-0">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-xl font-bold">{t('User Journey')}</h2>
            {sessionsInCategory.length > 1 && (
              <Select onValueChange={handleSessionSwitch} value={sessionId}>
                <SelectTrigger className="w-full max-w-[240px]">
                  <SelectValue placeholder="Switch Session" />
                </SelectTrigger>
                <SelectContent>
                  {sessionsInCategory.map((s) => (
                    <SelectItem key={s.id} value={s.id}>
                      {s.id} - {new Date(s.startTime).toLocaleTimeString()}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            Session started at: {new Date(session.startTime).toLocaleString()}
          </p>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="p-4 space-y-4">
            <AnimatePresence>
              {userJourney.slice(0, activeStepIndex + 1).map((step, index) => (
                <motion.div
                  ref={index === activeStepIndex ? lastStepRef : null}
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex items-start gap-4 p-2 rounded-md ${
                    index === activeStepIndex ? 'font-bold text-blue-600 bg-blue-500/10' : ''
                  }`}
                >
                  <div className="mt-1">
                    <MessageSquare className={`w-5 h-5 ${
                      index === activeStepIndex ? 'text-blue-600' : 'text-muted-foreground'
                    }`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium break-all">{step.description}</p>
                    <p className="text-xs text-muted-foreground">Appears at: {step.time}s</p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </aside>

      <main className="w-3/5 flex flex-col">
        <div className="w-full aspect-video bg-black">
          <video
            key={sessionId} // Add key to force re-render on session switch
            ref={videoRef}
            src={session.video}
            controls
            className="w-full h-full"
            onTimeUpdate={handleTimeUpdate}
            onSeeked={handleTimeUpdate}
            onPlay={() => handleTimeUpdate()} // Recalculate steps on play
          />
        </div>
        
        <AnalysisPanel session={session} videoRef={videoRef} />

        <div className="p-4 border-t">
          <ChatTextarea
            messages={[]}
            pending={isPending}
            onSendMessages={(messages, configs) => {
              createCanvasMutation({
                name: t('home:newCanvas', 'New Canvas'),
                canvas_id: nanoid(),
                messages: messages,
                session_id: nanoid(),
                text_model: configs.textModel,
                image_model: configs.imageModel,
                system_prompt:
                  localStorage.getItem('system_prompt') || DEFAULT_SYSTEM_PROMPT,
              })
            }}
            placeholder={t('chat:placeholderInSession', 'Enter your design requirements')}
          />
        </div>
      </main>
    </div>
  )
}