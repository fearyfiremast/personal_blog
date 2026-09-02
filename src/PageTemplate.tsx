import type { ReactNode } from "react"

type PageTemplateProps = {
  children: ReactNode;
  className?: string;
}

const PageTemplate = ({children, className}: PageTemplateProps) => {
  return (
    <div className={`mx-auto w-full max-xl:px-4 max-w-7xl ${className}`}>
      {children}
    </div>
  )
}

export default PageTemplate