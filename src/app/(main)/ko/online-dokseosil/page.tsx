import { StudyRoomLocalized, studyRoomMetadata } from '@/components/seo/StudyRoomLocalized'

export const metadata = studyRoomMetadata('ko')

export default function Page() {
  return <StudyRoomLocalized lang="ko" />
}
