import React, { useEffect, useRef } from 'react'
import CardLeft from './Card/CardLeft'
import CardRight from './Card/CardRight'
import { v4 as uuidv4 } from 'uuid'
const ChatComp = ({ messages, goBottom }) => {
    const scroolRef = useRef()
    useEffect(() => {
        const objDiv = document.getElementById("message-container");
        // scroolRef.current?.scrollIntoView({ behavior: "smooth" })
        objDiv.scrollTop = objDiv.scrollHeight;
    }, [])

    const bottom = () => {
        const objDiv = document.getElementById("message-container");
        // scroolRef.current?.scrollIntoView({ behavior: "smooth" })
        objDiv.scrollTop = objDiv.scrollHeight;
    }
    goBottom(bottom)
    return (
        <div>
            <div className="h-[85vh] py-4"
                onClick={bottom}
            >
                <div className="h-full overflow-y-auto" id="message-container">
                    <div className="grid grid-cols-12 gap-y-2 "
                        ref={scroolRef} key={uuidv4()}

                    >

                        {
                            messages.map(message => {
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
        </div>
    )
}

export default ChatComp