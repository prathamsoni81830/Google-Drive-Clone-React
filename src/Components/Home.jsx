import { Link } from "react-router-dom"
import { ecomContext } from "./First"
import { useContext } from "react"



function Home() {

  const{logIn} = useContext(ecomContext)

  return (
    <div className="py-5 px-12">
      <header className="flex h-10 justify-between mb-16">
        <div className="flex gap-2"> 
          <img className="" src="./src/assets/GD-logo.png"></img>
          <p className="flex items-center font-normal text-2xl text-gray-600">Disk</p>
          </div>
         
          <Link to="OnLogIn">
          
        <div>
          <button className="bg-blue-500 text-white rounded py-2 px-9 pb-3 text-xl hover:bg-blue-600" onClick={logIn}>Log In</button>
        </div>

        </Link>

      </header>
      <section className="flex">
        <div className="left-section flex-col w-[45%] py-20">
          <p className="text-6xl font-semibold">Easy and secure</p>
          <p className="text-6xl mb-7" >access to your content</p>
          <p className="text-2xl mb-16 text-gray-500">Store, share, and collaborate on files and folders from your mobile device, tablet, or computer</p>
          <button  className="bg-blue-500 text-white font-semibold rounded py-2 px-8 pb-3 text-xl hover:bg-blue-300 hover:text-blue-700">Log In</button>
        </div>
        <div className="right-section w-[55%]">
          <img src="./src/assets/GD-section-right.jpg"></img>
        </div>
      </section>
    </div>
  )
}

export default Home
