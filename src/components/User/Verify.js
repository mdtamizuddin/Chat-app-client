import React, { useState } from 'react'
import api from '../Hooks/instance'
const Verify = () => {
    const [loading, setLoading] = useState(false)
    const [sending, setSending] = useState(false)
    const [code, setCode] = useState('')
    const resend = () => {
        setSending(true)
        const email = ''
        api.post(`/user/resend/${email}`)
            .then(res => {
                setSending(false)
                console.log(res);
            })
    }
    const verify = () => {
        setLoading(true)
        console.log(code)
    }
    return (
        <div>
            <label htmlFor="my-modal-4" className="modal modal-open cursor-pointer">
                <label className="modal-box relative" htmlFor="">
                    <h3 className="text-lg font-bold">
                        Verify Your Account
                    </h3>
                    <input
                        type="number"
                        value={code}
                        onChange={e => setCode(e.target.value)}
                        placeholder="Check Mail & Enter Verification Code"
                        className="input input-bordered input-secondary w-full max-w-96 mt-5" />
                    <button className={`btn btn-primary btn-sm mt-4 ${loading && "loading"}`}
                        onClick={verify}
                    >
                        Verify
                    </button>
                    <p className="py-4">
                        If You Don't get Verify Mail
                    </p>
                    <button className={`${sending && "loading"} btn btn-secondary btn-sm`}
                        onClick={resend}
                    >
                        Resend Mail
                    </button>
                </label>
            </label>
        </div>
    )
}

export default Verify