export default function HeaderDashboard() {
    return (
        <>
            <div className="flex items-center bg-white w-full h-[126px]">
                <div className="flex items-center w-full">
                    <div className="mx-[25px] flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" className="w-[30px] h-[30px]">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                        </svg>
                        <span className="mx-[28px] text-xl">Categorias</span>
                    </div>
                    <div className="w-full">
                        <div className="flex">
                            <input type="text" className="max-w-[600px] w-full bg-slate-200 p-2 rounded-l-full outline-none" />
                            <div className="flex justify-center items-center bg-blue-500 px-3 rounded-r-full">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                    stroke="currentColor" className="w-6 h-6 text-white">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}