import SessionCard from '@/components/home/SessionCard'
import { useNavigate } from '@tanstack/react-router'
import { motion } from 'motion/react'
import { useTranslation } from 'react-i18next'
import sessionsData from '@/data/sessions.json'

const SessionList: React.FC = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const sessions = sessionsData.sessions

  const handleSessionClick = (id: string) => {
    navigate({
      to: '/session/$id',
      params: { id },
    })
  }

  return (
    // --- [1] REMOVED PADDING/WIDTH and USE FLEXBOX ---
    <div className="flex flex-col gap-4 select-none">
      {sessions && sessions.length > 0 && (
        <motion.span
          className="text-xl font-bold" // Adjusted font size slightly
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {t('All Sessions')}
        </motion.span>
      )}

      {/* --- [2] CHANGED FROM GRID TO FLEX WRAP --- */}
      <div className="flex flex-wrap gap-4 w-full">
        {sessions?.map((session, index) => (
          <SessionCard
            key={session.id}
            index={index}
            session={session}
            handleSessionClick={handleSessionClick}
            handleDeleteSession={() => console.log('Delete not implemented')}
          />
        ))}
      </div>
    </div>
  )
}

export default SessionList