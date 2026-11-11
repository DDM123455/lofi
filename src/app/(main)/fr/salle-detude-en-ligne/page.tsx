import { StudyRoomLocalized, studyRoomMetadata } from '@/components/seo/StudyRoomLocalized'

export const metadata = studyRoomMetadata('fr')

export default function Page() {
  return <StudyRoomLocalized lang="fr" />
}
