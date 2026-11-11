import { StudyRoomLocalized, studyRoomMetadata } from '@/components/seo/StudyRoomLocalized'

export const metadata = studyRoomMetadata('de')

export default function Page() {
  return <StudyRoomLocalized lang="de" />
}
