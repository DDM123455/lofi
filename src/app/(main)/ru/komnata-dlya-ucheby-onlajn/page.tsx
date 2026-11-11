import { StudyRoomLocalized, studyRoomMetadata } from '@/components/seo/StudyRoomLocalized'

export const metadata = studyRoomMetadata('ru')

export default function Page() {
  return <StudyRoomLocalized lang="ru" />
}
