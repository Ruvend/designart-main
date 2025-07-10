import { useNavigate } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import sessionsData from '@/data/sessions.json'
import { useMemo } from 'react'
import CategoryCard from './CategoryCard' // --- [1] IMPORT THE NEW CategoryCard ---

// Define Session and grouped types
type Session = { id: string; category: string; [key: string]: any }

const SessionList: React.FC = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  // Group sessions by category (this logic remains the same)
  const groupedSessions = useMemo(() => {
    return sessionsData.sessions.reduce((acc, session) => {
      const category = session.category || 'Uncategorized';
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(session as Session);
      return acc;
    }, {} as Record<string, Session[]>);
  }, []);

  // --- [2] CREATE THE NAVIGATION HANDLER FOR CATEGORIES ---
  const handleCategoryClick = (category: string, firstSessionId: string) => {
    navigate({
      to: '/session/$id',
      params: { id: firstSessionId },
      search: { category }, // Pass the category so the dropdown works
    })
  }

  return (
    <div className="flex flex-col gap-4 select-none max-w-[1200px] mx-auto">
      {/* --- [3] RENDER CATEGORY CARDS IN A GRID --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full pb-10">
        {Object.entries(groupedSessions).map(([category, sessions], index) => (
          <CategoryCard
            key={category}
            index={index}
            categoryName={category}
            sessions={sessions}
            handleCategoryClick={handleCategoryClick}
          />
        ))}
      </div>
    </div>
  )
}

export default SessionList