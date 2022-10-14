import moment from "moment";
import { useState } from "react";
import toast from "react-hot-toast";
import api from "../Hooks/instance";

const CardRight = ({ data, user }) => {
    const date = moment(data.date).format('MMMM Do YYYY, h:mm:ss a');
    const [show, setShow] = useState(false)
    const deletee = () => {
        const conf = window.confirm("Are You Sure You want To Unsent This Message")
        if (conf) {
            api.delete(`/api/messages/${data._id}`)
                .then(res => {
                    if (res.status === 200) {
                        toast.success("Thik Ace Bhalo Thaken")
                    }
                    else {
                        toast.error(res.data.message)
                    }
                })
        }
    }
    return (
        <div className="col-start-6 col-end-13 p-3 rounded-lg">
            <div className="flex items-center justify-start flex-row-reverse">
                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                    {data?.name?.slice(0, 1)}
                </div>
                <div className={`relative mr-3 text-[15px] bg-white py-2 px-4 shadow rounded-xl ${data?.deleted && "border border-red-500 opacity-50 select-none"} msg-con bg-gradient`}>
                    <div>{data.deleted ? <span className="text-white">Unsend</span> : data.message}</div>
                    <img src={data.image} className=" mt-3 rounded-lg" alt="" onClick={() => setShow(true)} />
                    <span className="text-[10px] font-semibold text-white">{data.name}</span>
                    <p className="text-[8px]">{date}</p>
                    {
                        !data?.deleted && user?.email === data?.email
                        &&
                        <button onClick={deletee} className="absolute delete-button -left-6 top-0 ">
                            <i className="fa-solid p-2 rounded-lg fa-trash text-[15px]  text-red-500"></i>
                        </button>
                    }
                </div>
            </div>
            {
                show &&
                <div className="modal modal-open" >
                    <div className="modal-box relative">
                        <label onClick={() => setShow(false)} className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                        <img src={data.image} className=" mt-5 rounded-lg" alt="" />
                    </div>
                </div>}
        </div>
    );
}

export default CardRight;