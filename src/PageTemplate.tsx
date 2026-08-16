import type { ReactNode } from "react"

type PageTemplateProps = {
  children: ReactNode;
  className?: string;
}

const PageTemplate = ({children, className}: PageTemplateProps) => {
  return (
    <div className={`mx-auto max-w-284 ${className}`}>
      {children}
    </div>
  )
}

export default PageTemplate