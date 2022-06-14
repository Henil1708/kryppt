import { Navbar, Footer, Services, Transactions, Welcome } from "./components"
import { GiBrokenHeart } from "react-icons/gi";
const App = () => {
  return (
    <div className="min-h-screen">
    <div className="bg-purple-800  text-white text-center text-sm">
        <p className="flex items-center justify-center">Web3 website to exchange ethereum - made by <span><a href="https://henilmehta.me" className="underline underline-offset-2 items-center  flex ml-1"> Henil Mehta <span><GiBrokenHeart className="ml-2" color="#FF4033" /></span></a></span></p>
    </div>
      <div className="gradient-bg-welcome">
        <Navbar />
        <Welcome />
      </div>
      <Services />
      <Transactions />
      <Footer />
    
    </div>
  )
}

export default App
