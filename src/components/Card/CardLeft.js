const CardLeft = ({ data }) => {
    return (
        <div className="col-start-1 col-end-8 p-3 rounded-lg chat-card">
            <div className="flex flex-row items-center">
                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                    {data.name.slice(0, 1)}
                </div>
                <div className="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
                    <div>{data.message}</div>
                    <span className="text-[10px] font-semibold text-red-300">{data.name}</span>
                </div>
            </div>
        </div>
    );
}

export default CardLeft;