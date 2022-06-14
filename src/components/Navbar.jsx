import { useState } from "react";
import { HiMenuAlt4 } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";
import { BsArrowRightCircle, BsGithub } from "react-icons/bs";
import logo from "../../images/logo.png";

const NavbarItem = ({title, classProps}) => {
    return (
        <li className={`mx-4 cursor-pointer ${classProps}`}>
            {title}
        </li>
    )
}

const Navbar = () => {

    const [toogleMenu, setToogleMenu] = useState(false);

  return (
    <nav className="w-full flex md:justify-center justify-between items-center p-4">
          <div className="md:flex-[0.5] flex-initial justify-center items-center ">
              <img src={logo} alt="logo" className="w-32 cursor-pointer " />
          </div>
          <ul className="text-white flex  list-none flex-row justify-between items-center flex-initial"> 
              <li ><a href="https://github.com/Henil1708" target={"_blank"} rel="noopner noreferrer" className="md:px-5 px-3 rounded-md cursor-pointer md:mx-3 mx-1 hover:bg- bg-black/40 md:py-4 py-2 flex items-center justify-center backdrop-blur md:border-none border "><BsGithub fontSize={23} /> <span className="ml-2"> Github</span></a></li>
              <li >
                  <a href="https://henilmehta.me" target={"_blank"} rel="noopner noreferrer" className="bg-[#2952e3] flex text-sm items-center group justify-center py-2  px-7 md:mx-4 mx-2 rounded-full cursor-pointer hover:bg-[#2546bd]"><span className="mr-2">Portfolio</span><BsArrowRightCircle className="group-hover:ml-0 -ml-6  opacity-0 group-hover:opacity-100 duration-200" /></a>
              </li>
          </ul>
          <div className="flex relative ">
              {
                  toogleMenu ? <AiOutlineClose fontSize={28} className="text-white md:hidden cursor-pointer " onClick={()=>{setToogleMenu(!toogleMenu)}} /> : <HiMenuAlt4 fontSize={28} className="text-white md:hidden cursor-pointer " onClick={()=>{setToogleMenu(!toogleMenu)}} />
              }
              {
                  toogleMenu && (
                      <ul
                          className="z-10 fixed top-0 -right-2 p-3 w-[70vw] h-screen shadow-2xl md:hidden list-none
                            flex flex-col justify-start items-end rounded-md blue-glassmorphism text-white
                      "
                      >
                          <li className="text-xl w-full my-2">
                              <AiOutlineClose onClick={()=>{setToogleMenu(false)}} />
                          </li>
                           {["Market", "Exchange", "Tutorial", "Wallets"].map((item,index) => {
                                return <NavbarItem title={item} key={item + index} classProps="my-2 text-lg" />;
                            })}
                      </ul>
                  )
              }
          </div>
    </nav>
  )
}

export default Navbar