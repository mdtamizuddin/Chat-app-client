import React, { useEffect, useRef, useState } from 'react'
import audioFile from './Notification.mp3'
import io from 'socket.io-client'
import { useQuery } from '@tanstack/react-query'
import { v4 as uuidv4 } from 'uuid'
import CardRight from './Card/CardRight'
import CardLeft from './Card/CardLeft'
import axios from 'axios'

const socket = io.connect("http://localhost:5000")
const Chat = () => {
    const url = 'http://localhost:5000/messages'
    const { isLoading, data: messages, refetch } = useQuery(['All Messages'], () =>
        axios.get(url)
            .then(res => res.data)
    )
    const scroolRef = useRef()

    useEffect(() => {
        // scroolRef.current?.scrollIntoView({ behavior: "smooth" })
        setInterval(() => {
            const objDiv = document.getElementById("message-container");
            objDiv.scrollTop = objDiv.scrollHeight;
        }, 500);
    }, [])
    const bottom = () => {
        const objDiv = document.getElementById("message-container");
        // scroolRef.current?.scrollIntoView({ behavior: "smooth" })
        objDiv.scrollTop = objDiv?.scrollHeight;
    }
    const [newUser, setNewuser] = useState('')
    const clearBal = () => {
        setInterval(() => {
            setNewuser('')

        }, 5000);
    }
    useEffect(() => {
        const audio = new Audio(audioFile)
        socket.on("recive_message", (data) => {
            refetch()
            audio.play()
        });
    }, [refetch])
    useEffect(() => {
        socket.on("new_connection", (data) => {
            setNewuser(data.email)
            clearBal()
            refetch()
        })
    }, [refetch])
    const [show, setShow] = useState(true)
    const [showNav, setNavshow] = useState(false)
    const navigationhandler = () => {
        if (show) {
            if (showNav) {
                setNavshow(false)
            }
            else {
                setShow(false)
            }
        }
        else {
            setShow(true)
        }
    }
    const navigationHand = () => {
        if (showNav) {
            setNavshow(false)
        }
        else {
            setNavshow(true)
        }
    }
    const [message, setMessage] = useState('')
    const sendMessage = (e) => {
        e.preventDefault()
        const date = new Date()
        if (message) {
            socket.emit('send_message', { message: message, email: 'tamizrabbi@gmail.com', date: date, name: "Tamiz" })
            refetch()
            setMessage('')
        }
    }
    return (
        <div onClick={() => refetch()}>
            <div className="chat-main-container h-screen antialiased text-gray-800">
                <div className={`${showNav ? "show-side" : "side-bar-chat"}`}>
                    <div className={`flex flex-row ${show ? 'sidebar-w-96' : ''} flex-shrink-0 bg-gray-100 py-2 h-full`}>
                        <div className="flex flex-col items-center py-4 flex-shrink-0 w-16 bg-indigo-800 ">
                            <div
                                onClick={navigationhandler}
                                className="flex items-center justify-center h-12 w-12 bg-indigo-100 text-indigo-800 rounded-full"
                            >
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                                </svg>
                            </div>
                            <ul className="flex flex-col space-y-2 mt-12">
                                <li>
                                    <a href="#!" className="flex items-center">
                                        <span className="flex items-center justify-center text-indigo-100 hover:bg-indigo-700 h-12 w-12 rounded-2xl">
                                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                            </svg>
                                        </span>
                                    </a>
                                </li>
                                <li>
                                    <a href="#!" className="flex items-center">
                                        <span className="flex items-center justify-center text-indigo-100 hover:bg-indigo-700 h-12 w-12 rounded-2xl">
                                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                            </svg>
                                        </span>
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="flex items-center">
                                        <span className="flex items-center justify-center text-indigo-100 hover:bg-indigo-700 h-12 w-12 rounded-2xl">
                                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                        </span>
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="flex items-center">
                                        <span className="flex items-center justify-center text-indigo-100 hover:bg-indigo-700 h-12 w-12 rounded-2xl">
                                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                        </span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                        {
                            show
                            &&
                            <div className="flex flex-col w-full h-full pl-4 pr-4 py-4 mr-4">
                                <div className="flex flex-row items-center">
                                    <div className="flex flex-row items-center">
                                        <div className="text-xl font-semibold">Messages</div>
                                    </div>
                                    <div className="ml-auto">
                                        <button className="flex items-center justify-center h-7 w-7 bg-gray-200 text-gray-500 rounded-full">
                                            <svg className="w-4 h-4 stroke-current" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                                <div className="mt-5">
                                    <ul className="flex flex-row items-center justify-between">
                                        <li>
                                            <a href="#" className="flex items-center pb-3 text-xs font-semibold relative text-indigo-800">
                                                <span>All Conversations</span>
                                                <span className="absolute left-0 bottom-0 h-1 w-6 bg-indigo-800 rounded-full" />
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                                <div className="mt-5">
                                    <div className="text-xs text-gray-400 font-semibold uppercase">Team</div>
                                </div>
                                <div className="mt-2">
                                    <div className="flex flex-col -mx-4">
                                        <div className="relative flex flex-row items-center p-4">
                                            <div className="flex items-center justify-center h-10 w-10 rounded-full bg-pink-500 text-pink-300 font-bold flex-shrink-0">
                                                T
                                            </div>
                                            <div className="flex flex-col flex-grow ml-3">
                                                <div className="text-sm  font-medium">Cuberto</div>
                                                <div className="text-xs truncate w-40">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Debitis, doloribus?</div>
                                            </div>
                                        </div>
                                        <div className="flex flex-row items-center p-4 bg-gradient-to-r from-red-100 to-transparent border-l-2 border-red-500">
                                            <div className="flex items-center justify-center h-10 w-10 rounded-full bg-pink-500 text-pink-300 font-bold flex-shrink-0">
                                                T
                                            </div>
                                            <div className="flex flex-col flex-grow ml-3">
                                                <div className="flex items-center">
                                                    <div className="text-sm font-medium">UI Art Design</div>
                                                    <div className="h-2 w-2 rounded-full bg-green-500 ml-2" />
                                                </div>
                                                <div className="text-xs truncate w-40">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Debitis, doloribus?</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-5">
                                    <div className="text-xs text-gray-400 font-semibold uppercase">Personal</div>
                                </div>
                                <div className="h-full overflow-hidden relative pt-2">
                                    <div className="flex flex-col divide-y h-full overflow-y-auto -mx-4">
                                        <div className="flex flex-row items-center p-4 relative">
                                            <div className="flex items-center justify-center h-10 w-10 rounded-full bg-pink-500 text-pink-300 font-bold flex-shrink-0">
                                                T
                                            </div>
                                            <div className="flex flex-col flex-grow ml-3">
                                                <div className="text-sm font-medium">Flo Steinle</div>
                                                <div className="text-xs truncate w-40">Good after noon! how can i help you?</div>
                                            </div>
                                        </div>
                                        <div className="flex flex-row items-center p-4">
                                            <div className="flex items-center justify-center h-10 w-10 rounded-full bg-pink-500 text-pink-300 font-bold flex-shrink-0">
                                                T
                                            </div>
                                            <div className="flex flex-col flex-grow ml-3">
                                                <div className="flex items-center">
                                                    <div className="text-sm font-medium">Sarah D</div>
                                                    <div className="h-2 w-2 rounded-full bg-green-500 ml-2" />
                                                </div>
                                                <div className="text-xs truncate w-40">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Debitis, doloribus?</div>
                                            </div>
                                        </div>
                                        <div className="flex flex-row items-center p-4">
                                            <div className="flex items-center justify-center h-10 w-10 rounded-full bg-pink-500 text-pink-300 font-bold flex-shrink-0">
                                                T
                                            </div>
                                            <div className="flex flex-col flex-grow ml-3">
                                                <div className="flex items-center">
                                                    <div className="text-sm font-medium">Sarah D</div>
                                                    <div className="h-2 w-2 rounded-full bg-green-500 ml-2" />
                                                </div>
                                                <div className="text-xs truncate w-40">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Debitis, doloribus?</div>
                                            </div>
                                        </div>
                                        <div className="flex flex-row items-center p-4">
                                            <div className="flex items-center justify-center h-10 w-10 rounded-full bg-pink-500 text-pink-300 font-bold flex-shrink-0">
                                                T
                                            </div>
                                            <div className="flex flex-col flex-grow ml-3">
                                                <div className="flex items-center">
                                                    <div className="text-sm font-medium">Sarah D</div>
                                                    <div className="h-2 w-2 rounded-full bg-green-500 ml-2" />
                                                </div>
                                                <div className="text-xs truncate w-40">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Debitis, doloribus?</div>
                                            </div>
                                        </div>
                                        <div className="flex flex-row items-center p-4">
                                            <div className="flex items-center justify-center h-10 w-10 rounded-full bg-pink-500 text-pink-300 font-bold flex-shrink-0">
                                                T
                                            </div>
                                            <div className="flex flex-col flex-grow ml-3">
                                                <div className="flex items-center">
                                                    <div className="text-sm font-medium">Sarah D</div>
                                                    <div className="h-2 w-2 rounded-full bg-green-500 ml-2" />
                                                </div>
                                                <div className="text-xs truncate w-40">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Debitis, doloribus?</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }

                    </div>
                </div>
                <div className={`chat-container bg-white`}>
                    <div className="flex flex-row items-center py-4 px-6 rounded-2xl shadow">
                        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-pink-500 text-pink-100">
                            T
                        </div>
                        <div className="flex flex-col ml-3">
                            <div className="font-semibold text-sm">Md Tamiz</div>
                            <div className="text-xs text-gray-500">Active</div>
                        </div>
                        <div className="ml-auto">
                            <ul className="flex flex-row items-center space-x-2">
                                <li>
                                    <div onClick={navigationHand} className="flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-gray-400 h-10 w-10 rounded-full">
                                        <span>
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                                            </svg>
                                        </span>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <p className='text-center text-emerald-500 mt-2 text-sm'>{newUser}</p>
                    <div className="h-[85vh] py-4"
                        onClick={bottom}
                    >
                        <div className="h-full overflow-y-auto animate__animated animate__fadeInLeft" id="message-container"
                            ref={scroolRef}
                        >
                            <div className="grid grid-cols-12 gap-y-2 "
                                key={uuidv4()}

                            >
                                {
                                    isLoading
                                        ?
                                        <>
                                            <svg aria-hidden="true" className="mr-2 w-10 h-10 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                            </svg>

                                        </>
                                        :
                                        messages?.map(message => {
                                            if (message.email === "tamizrabbi@gmail.com") {
                                                return (
                                                    <CardRight key={message._id} data={message} />
                                                )
                                            }
                                            else {
                                                return <CardLeft key={message._id} data={message} />
                                            }
                                        })
                                }

                            </div>
                        </div>

                    </div>

                    <form onSubmit={sendMessage} className="flex flex-row items-center">
                        <div className="flex flex-row items-center w-full border rounded-3xl h-12 px-2">
                            <div className="flex items-center justify-center h-10 w-10 text-gray-400 ml-1">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                                </svg>
                            </div>
                            <div className="w-full">
                                <input
                                    onChange={(e) => setMessage(e.target.value)}
                                    value={message}
                                    type="text" className="border border-transparent w-full focus:outline-none text-sm h-10 flex items-center" placeholder="Type your message...." />
                            </div>
                            <div className="flex flex-row">
                                <button className="flex items-center justify-center h-10 w-8 text-gray-400">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                                    </svg>
                                </button>
                                <button className="flex items-center justify-center h-10 w-8 text-gray-400 ml-1 mr-2">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <div className="ml-6">
                            <button type='submit' className="flex items-center justify-center h-10 w-10 rounded-full bg-gray-200 hover:bg-gray-300 text-indigo-800 ">
                                <svg className="w-5 h-5 transform rotate-90 -mr-px" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                </svg>
                            </button>
                        </div>
                    </form>
                </div>
            </div>

        </div>
    )
}

export default Chat

