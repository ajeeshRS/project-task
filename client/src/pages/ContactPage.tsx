import { useForm } from "react-hook-form"
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import backArrow from "../assets/back-arrow.svg"
import { Link } from "react-router-dom";
import { contactForm } from "../interfaces/interfaces";
import { API } from "../api/api";
import toast from "react-hot-toast";
import Loader from "../components/Loader";

function ContactPage() {
    const [textAreaLength, setTextAreaLength] = useState(null)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    // zod schema
    const schema = z.object({
        email: z.string().email(),
        name: z.string().min(1, "Name is required"),
        topic: z.string().min(1, "Please select a topic"),
        message: z.string()
            .min(1, "message cannot be empty")
            .max(250, "max character reached"),
    });
    // react hook form
    const { handleSubmit, formState: { errors }, register, reset } = useForm<contactForm>({ resolver: zodResolver(schema) })

    // handling text area length
    const handleTextarea = (e: any) => {
        e.preventDefault()
        const value = e.target.value
        setTextAreaLength(value.length)
    }

    // sending form
    const sendForm = async (data: contactForm) => {
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
        <>
            <div className="w-full h-[10vh] bg-white text-black duration-300 ease-in-out transition-all flex justify-start items-center md:px-20 px-5">
                <div>
                    <Link to={"/"}>
                        <button className="w-[35px] h-[35px]"><img src={backArrow} alt="back-btn" /></button>
                    </Link>
                </div>
            </div>
            <div className="w-full h-[90vh] bg-white flex justify-center  items-center md:px-20 px-5">
                <div className="md:w-1/2 w-full h-full flex flex-col py-10 justify-start items-center">
                    {/* hero text */}
                    <p className="font-popins font-bold text-3xl">Get in Touch with us.</p>
                    {/* form */}
                    <form onSubmit={handleSubmit(sendForm)} className="w-full h-5/6 flex flex-col items-center py-10">
                        <input className="bg-[#ececec] md:w-3/6 w-4/6 rounded-xl p-3 my-1 outline-none" type="email" placeholder="Email" {...register("email", { required: true })} />
                        {/* error message */}
                        {errors.email && (
                            <p className="text-sm font-poppins py-1 text-red-500">
                                {errors.email.message as string}
                            </p>
                        )}
                        <input className="bg-[#ececec] md:w-3/6 w-4/6 rounded-xl p-3 my-1 outline-none" type="text" placeholder="Name" {...register("name", { required: true })} />
                        {/* error message */}
                        {errors.name && (
                            <p className="text-sm font-poppins py-1 text-red-500">
                                {errors.name.message as string}
                            </p>
                        )}
                        <select
                            className="bg-[#ececec] md:w-3/6 w-4/6 rounded-xl p-3 my-1 outline-none font-poppins"
                            {...register("topic", { required: true })}
                        >
                            <option className="rounded-xl" value="">Select a topic</option>
                            <option value="real estate">Real estate</option>
                            <option value="official">Official</option>
                            <option value="career">Career</option>

                        </select>
                        {/* error message */}
                        {errors.topic?.message && (
                            <p className="text-sm font-poppins text-red-500">
                                {errors.topic.message as string}
                            </p>
                        )}
                        {/* text area */}
                        <textarea className="bg-[#ececec] md:w-3/6 w-4/6  min-h-[50px] rounded-xl p-3 my-1 scrollbar-hide outline-none" placeholder="Type your message here" {...register("message")} maxLength={250} onChange={(e) => handleTextarea(e)} />
                        {errors.message && (
                            <p className="text-sm font-poppins py-1 text-red-500">
                                {errors.message.message as string}
                            </p>
                        )}
                        {textAreaLength === 250 &&
                            <p className="text-sm font-poppins py-1 text-red-500">
                                Max character reached.
                            </p>}
                        <p className="py-1 text-slate-400 text-xs md:w-3/6 w-4/6 px-3">
                            We assure you that the information you've provided will only be used to respond to your inquiry.
                        </p>
                        <button className={`${isLoading && ' px-2 py-2 flex justify-center'} w-2/6 h-10 font-poppins px-2 py-2 bg-[#3EB5A5] rounded-full text-white hover:bg-[#36a395] duration-300 ease-in-out transition-all my-2`} type="submit">{isLoading ? <Loader /> : 'Send Message'}</button>
                    </form>
                </div>
            </div></>)
}

export default ContactPage