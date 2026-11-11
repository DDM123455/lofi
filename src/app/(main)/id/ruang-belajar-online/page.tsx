import { StudyRoomLocalized, studyRoomMetadata } from '@/components/seo/StudyRoomLocalized'

export const metadata = studyRoomMetadata('id')

export default function Page() {
  return <StudyRoomLocalized lang="id" />
}
