interface PropsCard {
    titleCard1: string;
    titleCard2: string;
    titleCard3: string;
    orderUserLength?: number;
    styleCard?: string;
    link?: () => void;
    editProductFunction?: () => void;
    // svg1?: any;
    // svg2?: any;
    // svg3?: any;
}

export default function CardDashboard(props:PropsCard) {
    
    return (
        <>
            <div className="flex sm:max-w-[380px] w-full bg-white px-3 py-5 gap-[13px] rounded-[20px]" onClick={props.editProductFunction}>
                <div className="flex justify-center items-center bg-blue-400 max-w-[100px] w-full h-[100px] rounded-2xl">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-[45px] h-[45px] text-blue-800">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 10.5v6m3-3H9m4.06-7.19-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z" />
                    </svg>
                </div>
                <div className={`font-bold flex ${props.styleCard}`}>
                    <span className="text-xl">{props.titleCard1}</span>
                    <span className="text-4xl">{props.orderUserLength}</span>
                </div>
            </div>
            <div className="flex sm:max-w-[380px] w-full bg-white px-3 py-5 gap-[13px] rounded-[20px]" onClick={props.link}>
                <div className="flex justify-center items-center bg-orange-300 max-w-[100px] w-full h-[100px] rounded-2xl">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-[45px] h-[45px] text-orange-500">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                    </svg>
                </div>
                <div className={`font-bold flex ${props.styleCard}`}>
                    <span className="text-xl">{props.titleCard2}</span>
                    <span className="text-4xl">{props.orderUserLength}</span>
                </div>
            </div>
            <div className="flex sm:max-w-[380px] w-full bg-white px-3 py-5 gap-[13px] rounded-[20px]">
                <div className="flex justify-center items-center bg-green-400 max-w-[100px] w-full h-[100px] rounded-2xl">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-[45px] h-[45px] text-green-600">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                </div>
                <div className="font-bold flex flex-col justify-center gap-2">
                    <span className="text-xl">{props.titleCard3}</span>
                </div>
            </div>
        </>
    )
}