import CategoryLink from "./CategoryLink/CategoryLink"
import { categories } from "../../constants"

const Categories = () => {
  return (
    <section className="hidden md:flex w-full py-3 bg-base-softbackground">
        <div className="container h-fill md:h-[32px] mx-auto flex md:flex-row flex-col justify-evenly items-center">
            {categories.map((category, index) => (
              <CategoryLink key={index} category={category}/>
            ))}
        </div>
    </section>
  )
}

export default Categories