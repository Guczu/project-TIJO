import { Link } from "react-router-dom"

const ShopListTile = ({ children, name, image }) => {
  return (
    <Link 
      to={`/categories/${children.toLowerCase()}`} 
      className="w-3/4 h-40 mx-auto rounded-[5px] relative hover:cursor-pointer hover:brightness-75"
      state={{ shopFilter: name }}
    >
        <img src={image} alt='alt' className="w-full h-full object-cover rounded-[5px] mx-auto shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px]"/>
        <span className="absolute bottom-0 px-12 py-6 text-main-white text-heading-2 drop-shadow-[0_1.3px_2px_rgba(0,0,0,1)]">
            {children}
        </span>
    </Link>
  )
}

export default ShopListTile