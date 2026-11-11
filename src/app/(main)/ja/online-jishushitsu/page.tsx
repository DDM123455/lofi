import { StudyRoomLocalized, studyRoomMetadata } from '@/components/seo/StudyRoomLocalized'

export const metadata = studyRoomMetadata('ja')

export default function Page() {
  return <StudyRoomLocalized lang="ja" />
}
