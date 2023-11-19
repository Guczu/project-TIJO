import { Link } from "react-router-dom"
import CustomButton from "../../components/CustomButton/CustomButton"

const NotFound = () => {
  return (
    <section className="container w-screen h-screen mx-auto flex flex-col justify-center items-center gap-6">
        <span className="text-heading-6">
            Taka podstrona nie istnieje!
        </span>

        <CustomButton styles="text-body-4 bg-main-primary hover:bg-main-third text-white px-6 py-2">
            <Link to='/'>
                Powrót
            </Link>
        </CustomButton>
    </section>
  )
}

export default NotFound