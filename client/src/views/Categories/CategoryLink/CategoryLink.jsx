import { NavLink } from "react-router-dom";

const CategoryLink = ({ category }) => {
    const { name, icon, routeLink } = category;

  return (
    <div className="flex py-2 justify-center items-center">
        <NavLink 
            to={routeLink}
            className={({ isActive }) =>
                isActive ? "text-body-6 hover:cursor-pointer border-b-[3px] border-main-third rounded-[3px]" : "text-body-6 hover:cursor-pointer hover:border-b-[3px] border-main-third rounded-[3px]"
            }
            state={{ filter: name }}
          >
            {name}
        </NavLink>
    </div>
  )
}

export default CategoryLink