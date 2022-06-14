import { GiBrokenHeart } from "react-icons/gi"
import logo from "../../images/logo.png"
const Footer = () => {
  return (
    <div className="w-full flex md:justify-center justify-between items-center flex-col p-4 gradient-bg-footer">
      <div className="w-full flex flex-col sm:flex-row justify-between items-center my-4">
        <div className="flex flex-[0.5] justify-center items-center">
          <img src={logo} alt="logo" className="w-32" />
        </div>
        <div className="flex flex-1 justify-evenly items-center flex-wrap sm:mt-0 mt-5 w-full">
          <p className="text-white text-base text-center mx-2 cursor-pointer ">Market</p>
          <p className="text-white text-base text-center mx-2 cursor-pointer ">Exchange</p>
          <p className="text-white text-base text-center mx-2 cursor-pointer ">Tutorials</p>
          <p className="text-white text-base text-center mx-2 cursor-pointer ">Wallets</p>
        </div>
      </div>
      <div className="flex justify-center items-center flex-col mt-5">
        <p className="text-white text-center text-sm">Come join us</p>
        <p className="text-white text-center text-sm">henilpica@gmail.com</p>
      </div>
      <div className="sm:w-[90%] w-full h-[0.25px] bg-gray-400 mt-5 "></div>
      <div className="sm:w-[90%] w-full flex justify-between items-center mt-3 ">
        <p className="text-white text-center text-sm">codebyhenil</p>
        <p className="text-white text-center text-sm">All rights reserved.</p>
      </div>
      <div className=" py-3  text-white text-center text-lg">
        <p className="flex items-center justify-center"><span> <GiBrokenHeart className="mr-2" color="#FF4033" /></span>Thanks for visting the website. <span> <GiBrokenHeart className="ml-2" color="#FF4033" /></span></p>
    </div>
    </div>
  )
}

export default Footer