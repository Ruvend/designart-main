import { motion } from 'motion/react'
import { FolderKanban, FileStack } from 'lucide-react'

// Define the Session type so the component knows what to expect
type Session = {
  id: string
  category: string
  // Add other properties if needed for summary, but for now this is enough
}

type CategoryCardProps = {
  index: number
  categoryName: string
  sessions: Session[]
  handleCategoryClick: (categoryName: string, firstSessionId: string) => void
}

const CategoryCard: React.FC<CategoryCardProps> = ({
  index,
  categoryName,
  sessions,
  handleCategoryClick,
}) => {
  // We navigate to the first session in the category when the card is clicked
  const firstSessionId = sessions[0]?.id

  if (!firstSessionId) return null // Don't render if a category has no sessions

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onClick={() => handleCategoryClick(categoryName, firstSessionId)}
      className="border rounded-lg p-6 flex flex-col gap-4 hover:border-primary/40 transition-all duration-300 cursor-pointer hover:shadow-lg bg-card text-card-foreground active:scale-95"
    >
      <div className="flex items-center gap-4">
        <FolderKanban className="w-8 h-8 text-primary" />
        <h3 className="text-2xl font-bold truncate">{categoryName}</h3>
      </div>
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <FileStack className="w-4 h-4" />
        <span>{sessions.length} {sessions.length > 1 ? 'sessions' : 'session'} available</span>
      </div>
    </motion.div>
  )
}

export default CategoryCard