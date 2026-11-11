import { StudyRoomLocalized, studyRoomMetadata } from '@/components/seo/StudyRoomLocalized'

export const metadata = studyRoomMetadata('zh')

export default function Page() {
  return <StudyRoomLocalized lang="zh" />
}
