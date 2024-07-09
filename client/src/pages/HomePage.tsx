import Navbar from "../components/Navbar"
import realEstateSvg from "../assets/real-estate.svg"
import { useForm } from "react-hook-form"
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { quickContact } from "../interfaces/interfaces";
import { API } from "../api/api";
import toast from "react-hot-toast";
import Loader from "../components/Loader";

function HomePage() {
    const [textAreaLength, setTextAreaLength] = useState<number | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    // zod schema
    const schema = z.object({
        email: z.string().email(),
        message: z.string()
            .min(1, "message cannot be empty")
            .max(250, "max character reached")
    });
    // react-hook-form
    const { handleSubmit, formState: { errors }, reset, register } = useForm<quickContact>({ resolver: zodResolver(schema) })

    // handling text area length
    const handleTextarea = (e: any) => {
        e.preventDefault()
        const value = e.target.value
        setTextAreaLength(value.length)
    }

    // sending form
    const sendForm = async (data: quickContact) => {
        try {
            setIsLoading(true)
            const res = await API.post("/contact-form", data)
            setIsLoading(false)
            toast.success(res.data)
            reset()
        } catch (err: any) {
            console.error(err)
            toast.error(err.response.data)
            setIsLoading(false)
        }
    }

    return (
        <div>
            {/* navbar */}
            <Navbar />
            <div className="w-full h-[90vh] bg-white flex md:flex-row flex-col justify-between items-center md:px-20 px-5">
                {/* hero image */}
                <div className="md:w-1/2 w-2/6 md:h-full h-2/6 flex justify-center items-end md:items-center ">
                    <img className="md:w-[350px] md:h-[350px] w-[100px] h-[100px]" src={realEstateSvg} alt="svg-icon" />
                </div>
                <div className="md:w-1/2 w-4/6 h-full flex flex-col md:py-20 justify-center items-center">
                    {/* hero text*/}
                    <p className="font-popins font-bold md:text-3xl text-sm">Send us a Quick Message</p>
                    {/* contact form */}
                    <form onSubmit={handleSubmit(sendForm)} className="w-full h-4/6 flex flex-col items-center py-10">
                        <input className="bg-[#ececec] md:w-3/6 w-full rounded-xl p-3 my-1 outline-none" type="email" placeholder="Email" {...register("email", { required: true })} />
                        {/* error message */}
                        {errors.email && (
                            <p className="text-sm font-poppins py-1 text-red-500">
                                {errors.email.message as string}
                            </p>
                        )}
                        <textarea className="bg-[#ececec] md:w-3/6 w-full  min-h-[50px] rounded-xl p-3 my-1 scrollbar-hide outline-none" placeholder="Type your message here" {...register("message")} maxLength={250} onChange={(e) => handleTextarea(e)} />
                        {errors.message && (
                            <p className="text-sm font-poppins py-1 text-red-500">
                                {errors.message.message as string}
                            </p>
                        )}
                        {
                            textAreaLength === 250 &&
                            <p className="text-sm font-poppins py-1 text-red-500">
                                Max character reached.
                            </p>
                        }
                        <p className="py-1 text-slate-400 text-xs md:w-3/6 w-6/6 px-3">
                            We assure you that the information you've provided will only be used to respond to your inquiry.
                        </p>
                        <button className={`${isLoading && ' px-2 py-2 flex justify-center'} w-2/6 h-10 font-poppins px-2 py-2 bg-[#3EB5A5] rounded-full text-white hover:bg-[#36a395] duration-300 ease-in-out transition-all my-2`} type="submit">{isLoading ? <Loader /> : 'Send Message'}</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default HomePage