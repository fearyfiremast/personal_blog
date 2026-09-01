import type { ProjectCardInfo } from "../../constants/Project"

const ProjectCard = ({title, description, imgUrl, imgAlt}: ProjectCardInfo) => {
  return (
    <div className="flex gap-3 bg-white hover:cursor-pointer hover:ring-2 ring-gray-600 rounded-[5px] overflow-hidden p-4">
      <div className="w-200 bg-gray-500">
        <img src={imgUrl} alt={imgAlt} />
      </div>
      <div className="flex flex-col gap-4">
        <h1 className="text-xl underline font-semibold">{title}</h1>
        <p>
          {description}
        </p>
      </div>
    </div>
  )
}

export default ProjectCard