export default function SumarioCompras() {
    return (
        <>
            <div className="mb-[67px]">
                <span className="uppercase text-xl">sumário de compras</span>
            </div>
            <div className="w-full flex flex-col gap-[25px]">
                <div className="w-full flex justify-between">
                    <span>Subtotal</span>
                    <span>{ }</span>
                </div>
                <div className="w-full flex justify-between">
                    <span>Frete</span>
                    <span>$20</span>
                </div>
                <div>
                    <span>Calcular Frete</span>
                    <div className="flex gap-[18px] mt-[10px]">
                        <input type="text" className="max-w-[200px] h-[45px] w-full border-solid border border-black" />
                        <button className="bg-greenEco-200 text-white max-w-[100px] w-full rounded-md">Calcular</button>
                    </div>
                </div>
            </div>
        </>
    )
}