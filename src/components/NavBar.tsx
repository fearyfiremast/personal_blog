import { Link } from "react-router";

type NavItem = {
  displayName: string,
  dest: string,
}

const NavBar = () => {
  const NavButtons: NavItem[] = [
    {
      displayName: 'Home',
      dest: ''
    },
    {
      displayName: 'Projects',
      dest: ''
    },
    {
      displayName: 'About',
      dest: ''
    },
  ];


  return (
    <nav className="sticky top-0 z-20 bg-[#4da2a4]">
      <div className="bg-[#58b5b7] max-w-284 mx-auto flex">
        {NavButtons.map((item) => {
          return (
            <Link 
              to={item.dest}
              className="flex items-center justify-center flex-1 text-center text-white py-2 text-xl hover:bg-[#4da2a4]"
              >
                {item.displayName}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
export default NavBar