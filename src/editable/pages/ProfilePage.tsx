import { EditableTaskArchiveRoute, taskMetadata } from '@/editable/pages/TaskArchivePage'

export const revalidate = 3

export const generateMetadata = () => taskMetadata('profile', '/profile')

export async function ProfilePageTaskPage({
  searchParams,
  basePath = '/profile',
}: {
  searchParams?: Promise<{ category?: string; page?: string }>
  basePath?: string
}) {
  return <EditableTaskArchiveRoute task="profile" searchParams={searchParams} basePath={basePath} />
}

export default ProfilePageTaskPage

export const ProfileTaskPage = ProfilePageTaskPage

// redesigned-ui-2026-05-28
