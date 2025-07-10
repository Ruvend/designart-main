import { createCanvas } from '@/api/canvas'
import ChatTextarea from '@/components/chat/ChatTextarea'
import CanvasList from '@/components/home/CanvasList'
import HomeHeader from '@/components/home/HomeHeader'
import SessionList from '@/components/home/SessionList'
import { ScrollArea } from '@/components/ui/scroll-area'
import { DEFAULT_SYSTEM_PROMPT } from '@/constants'
import { useMutation } from '@tanstack/react-query'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { AnimatePresence, motion } from 'motion/react'
import { nanoid } from 'nanoid'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'
import { ChevronDown } from 'lucide-react'

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  const navigate = useNavigate()
  const { t } = useTranslation()

  const [openSections, setOpenSections] = useState<string[]>(['canvases'])

  const toggleSection = (section: string) => {
    setOpenSections((prev) =>
      prev.includes(section)
        ? prev.filter((s) => s !== section)
        : [...prev, section]
    )
  }

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
      toast.error(t('common:messages.error'), {
        description: error.message,
      })
    },
  })

  return (
    <div className="flex flex-col h-screen">
      <HomeHeader />
      <ScrollArea className="flex-1"> {/* Let ScrollArea fill remaining space */}
        <div className="container mx-auto px-4">
          {/* --- [1] CHAT SCREEN IS BACK, WITH BETTER SPACING --- */}
          <div className="flex flex-col items-center justify-center text-center py-16 md:py-24 select-none">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-5xl font-bold mb-2 mt-8">
                {t('home:title')}
              </h1>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-xl text-gray-500 mb-8">
                {t('home:subtitle')}
              </p>
            </motion.div>

            <ChatTextarea
              className="w-full max-w-xl"
              messages={[]}
              onSendMessages={(messages, configs) => {
                createCanvasMutation({
                  name: t('home:newCanvas'),
                  canvas_id: nanoid(),
                  messages: messages,
                  session_id: nanoid(),
                  text_model: configs.textModel,
                  image_model: configs.imageModel,
                  system_prompt:
                    localStorage.getItem('system_prompt') ||
                    DEFAULT_SYSTEM_PROMPT,
                })
              }}
              pending={isPending}
            />
          </div>

          {/* --- [2] COLLAPSIBLE LISTS SECTION REMAINS THE SAME --- */}
          <div className="max-w-7xl mx-auto w-full pb-16">
            <h2 className="text-xl font-semibold mb-4 text-center">
              {t('home:continueSession', 'Continue where you left off')}
            </h2>
            
            <div className="space-y-2">
              {/* Canvas List Section */}
              <div className="border rounded-md">
                <button
                  onClick={() => toggleSection('canvases')}
                  className="w-full flex justify-between items-center p-4 text-lg font-medium cursor-pointer"
                >
                  {t('home:recentCanvases', 'Recent Canvases')}
                  <motion.div
                    animate={{ rotate: openSections.includes('canvases') ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown className="h-5 w-5" />
                  </motion.div>
                </button>
                <AnimatePresence initial={false}>
                  {openSections.includes('canvases') && (
                    <motion.section
                      key="content"
                      initial="collapsed"
                      animate="open"
                      exit="collapsed"
                      variants={{
                        open: { opacity: 1, height: 'auto' },
                        collapsed: { opacity: 0, height: 0 },
                      }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="p-4 pt-0">
                        <CanvasList />
                      </div>
                    </motion.section>
                  )}
                </AnimatePresence>
              </div>

              {/* Session List Section */}
              <div className="border rounded-md">
                <button
                  onClick={() => toggleSection('sessions')}
                  className="w-full flex justify-between items-center p-4 text-lg font-medium cursor-pointer"
                >
                  {t('home:recentSessions', 'Recent Sessions')}
                  <motion.div
                    animate={{ rotate: openSections.includes('sessions') ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown className="h-5 w-5" />
                  </motion.div>
                </button>
                <AnimatePresence initial={false}>
                  {openSections.includes('sessions') && (
                    <motion.section
                      key="content"
                      initial="collapsed"
                      animate="open"
                      exit="collapsed"
                      variants={{
                        open: { opacity: 1, height: 'auto' },
                        collapsed: { opacity: 0, height: 0 },
                      }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="p-4 pt-0">
                        <SessionList />
                      </div>
                    </motion.section>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  )
}