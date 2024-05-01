import FilterIcon from "../../svg/filter-icon";

export default function LayoutPedidos() {
    return (
        <>
            <div className="max-w-[840px] w-full bg-white mt-[30px] px-4 pt-5  rounded-xl">
                <div className="flex justify-between">
                    <div>
                        <span className="font-bold text-lg">Pedidos</span>
                    </div>
                    <div>
                        <FilterIcon />
                    </div>
                </div>
                <div className="mt-6">
                    
                </div>
            </div >
        </>
    )
}