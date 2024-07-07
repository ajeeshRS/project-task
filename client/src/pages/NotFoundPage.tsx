import { Link } from "react-router-dom"

function NotFoundPage() {
    return (
        <div className="w-full h-[90vh] flex justify-center items-center">
            <div className="flex flex-col justify-center">
                <div className="flex items-center font-poppins font-semibold">
                    <p className="mx-1">404</p>
                    <div className="h-4 w-[1px] bg-slate-300 mx-1"></div>
                    <p className="mx-1">Page not found</p>
                </div>
                <button className="font-poppins px-1 py-1 my-5 bg-[#3EB5A5] rounded-full text-white hover:bg-[#36a395] duration-300 ease-in-out transition-all"><Link to={"/"}>Go to Homepage</Link></button>
            </div>
        </div>
    )
}

export default NotFoundPage