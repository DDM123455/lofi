import { ViLangHtml } from './ViLangHtml'

export default function ViLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ViLangHtml />
      {children}
    </>
  )
}
