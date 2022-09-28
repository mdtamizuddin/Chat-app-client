const CardRight = ({ data }) => {
    return (

        <div className="col-start-6 col-end-13 p-3 rounded-lg">
            <div className="flex items-center justify-start flex-row-reverse">
                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                    {data.name.slice(0, 1)}
                </div>
                <div className="relative ml-3 text-sm bg-white py-2 px-4 shadow-md mr-1 rounded-xl">
                    <div>{data.message}</div>
                    <span className="text-[10px] font-semibold text-red-300">{data.name}</span>
                </div>
            </div>
        </div>
    );
}

export default CardRight;