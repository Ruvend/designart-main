import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useTranslation } from 'react-i18next'

type SessionDeleteDialogProps = {
  show: boolean
  setShow: (show: boolean) => void
  handleDeleteSession: () => void
  children: React.ReactNode
}

const SessionDeleteDialog: React.FC<SessionDeleteDialogProps> = ({
  show,
  setShow,
  handleDeleteSession,
  children,
}) => {
  const { t } = useTranslation()

  return (
    <Dialog open={show} onOpenChange={setShow}>
      {children}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t('home:deleteSession')}</DialogTitle>
          <DialogDescription>
            {t('home:deleteSessionConfirm')}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>

        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default SessionDeleteDialog
