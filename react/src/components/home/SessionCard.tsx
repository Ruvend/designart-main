import {
  AlertTriangle,
  Calendar,
  CheckCircle,
  Clock,
  PlayCircle,
  Trash2,
} from 'lucide-react'
import { motion } from 'motion/react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'
import SessionDeleteDialog from './SessionDeleteDialog'

// --- [1] The session type needs to be updated here too ---
type JourneyStep = {
  description: string
  time: number
}

type Session = {
  id: string
  startTime: string
  endTime: string
  user_journey: JourneyStep[] // Use the JourneyStep type
  score: number
  video: string
  analysis: object
}

type SessionCardProps = {
  index: number
  session: Session
  handleSessionClick: (id: string) => void
  handleDeleteSession: () => void
}

const getDuration = (start: string, end: string): string => {
  const diff = new Date(end).getTime() - new Date(start).getTime()
  const seconds = Math.floor(diff / 1000)
  return `${seconds}s`
}

const SessionCard: React.FC<SessionCardProps> = ({
  index,
  session,
  handleSessionClick,
  handleDeleteSession,
}) => {
  const { t } = useTranslation()
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)

  const formattedDate = new Date(session.startTime).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  })

  const handleDelete = async () => {
    console.log(`Deleting session with ID: ${session.id}`)
    handleDeleteSession()
    toast.success(t('home:messages.sessionDeleted'))
    setShowDeleteDialog(false)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className=" border rounded-lg p-4 flex flex-col gap-3 hover:border-primary/40 transition-all duration-300 relative group bg-card text-card-foreground"
    >
      {/* ... (Top section is unchanged) ... */}
      <div className="flex justify-between items-center">
        <div className="px-3 py-1 text-sm font-semibold text-white bg-green-500 rounded-full">
          Score: {session.score}/10
        </div>
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-red-500/80" />
          <button onClick={() => handleSessionClick(session.id)} className="text-primary">
            <PlayCircle className="w-7 h-7" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation()
              setShowDeleteDialog(true)
            }}
            className="text-muted-foreground hover:text-red-500 transition-colors"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      <hr className="border-border/50" />

      <div
        className="flex flex-col gap-3 cursor-pointer"
        onClick={() => handleSessionClick(session.id)}
      >
        {/* ... (Date and Duration are unchanged) ... */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="w-4 h-4" />
          <span>{formattedDate}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="w-4 h-4" />
          <span>Duration: {getDuration(session.startTime, session.endTime)}</span>
        </div>

        <hr className="border-border/50" />

        <div className="flex flex-col gap-2">
          <span className="text-sm font-semibold text-muted-foreground">Journey Preview:</span>
          {/* --- [2] THIS IS THE FIX --- */}
          <p className="text-sm truncate">
            {session.user_journey[0]?.description || 'No journey steps available'}
          </p>

          {session.analysis && (
            <div className="mt-2 inline-flex items-center gap-2 self-start px-2.5 py-1 text-xs font-semibold text-green-700 bg-green-100 rounded-full">
              <CheckCircle className="w-3.5 h-3.5" />
              Analysis Available
            </div>
          )}
        </div>
      </div>
      
      <SessionDeleteDialog
        show={showDeleteDialog}
        setShow={setShowDeleteDialog}
        handleDeleteSession={handleDelete}
      />
    </motion.div>
  )
}

export default SessionCard