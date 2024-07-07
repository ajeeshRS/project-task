import { Link } from "react-router-dom"

function Navbar() {
    return (
        <div className="w-full h-[10vh] bg-white text-black duration-300 ease-in-out transition-all flex justify-between items-center md:px-20 px-5 shadow-md">
            <div>
                <p className="font-poppins font-bold text-2xl">To-Let.</p>
            </div>
            <div>
                <Link to={"/contact-us"}>
                    <button className="font-poppins px-3 py-1 bg-[#3EB5A5] rounded-full text-white hover:bg-[#36a395] duration-300 ease-in-out transition-all">Contact us</button>
                </Link>
            </div>
        </div>
    )
}

export default Navbar