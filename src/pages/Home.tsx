import PageTemplate from "../PageTemplate"
import ProjectCard from "../components/home/ProjectCard"
import { PROJECTS } from "../constants/Project"
import HighlightedProject from "../components/home/HighlightedProject"
import ATFHome from "../components/home/ATFHome"

const Home = () => {

  const highlightedArticles: string[] = [
    'portfolio-site'
  ]

  return (
    <PageTemplate>
      {/* Cover */}
      <ATFHome />
      <hr className="my-4"/>
      <HighlightedProject/>
      {/* Project Showcase */}
      <section>
        <h2 className="font-semibold text-[30px] text-center mb-4">
          Showcase
        </h2>
        <div className="flex flex-col">
          {PROJECTS.filter((item) => highlightedArticles.includes(item.slug)).map((item) => 
            <ProjectCard 
              key={item.slug}
              title={item.title}
              description={item.description}
              imgUrl={item.imgUrl}
              imgAlt={item.imgAlt}
              slug={item.slug}
            />
          )}
        </div>
      </section>
    </PageTemplate>
  )
}

export default Home