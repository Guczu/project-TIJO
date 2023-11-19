import InfoLabel from "../InfoLabel/InfoLabel"
import MostPopularSlider from "../MostPopularSlider/MostPopularSlider"
import Newsletter from "../Newsletter/Newsletter"
import ShopList from "../Shoplist/Shoplist"

const Home = () => {

  return (
    <main className="w-full bg-main-white font-poppins">

        <ShopList/>

        <Newsletter/>

        <MostPopularSlider/>
        
        <InfoLabel/>

    </main>
  )
}

export default Home