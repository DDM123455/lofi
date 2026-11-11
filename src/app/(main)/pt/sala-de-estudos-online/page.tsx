import { StudyRoomLocalized, studyRoomMetadata } from '@/components/seo/StudyRoomLocalized'

export const metadata = studyRoomMetadata('pt')

export default function Page() {
  return <StudyRoomLocalized lang="pt" />
}
