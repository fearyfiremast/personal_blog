export type ProjectCardInfo = {
  slug: string
  title: string;
  description: string;
  imgUrl: string;
  imgAlt?: string;
}

export const PROJECTS: ProjectCardInfo[] = [
  {
    slug: 'portfolio-site',
    title: 'portfolio site project',
    description: `The development history behind the creation of this website. 
                  Created in my spare time over the summer of 2025 using raw JavaScript, 
                  CSS, and HTML to create something that is both dynamic and responsive`,
    imgUrl: '',
    imgAlt: ''
  }
]