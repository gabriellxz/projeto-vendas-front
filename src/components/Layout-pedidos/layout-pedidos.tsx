import FilterIcon from "../../svg/filter-icon";
import usePedidos from "../../hook/usePedidos"
import Loading from "../Loading/loading";

interface PropsLayout {
    titleLayout: string;
    th1?: string;
    th2?: string;
    th3?: string;
    styleTable: string;
    component?: any;
    buttonModalFilter?: () => void;
    // modalFilterState: boolean;
}

export default function LayoutPedidos(props: PropsLayout) {

    const { loading } = usePedidos()

    return (
        <>
            <div className="max-w-[840px] w-full bg-white mt-[30px] px-4 pt-5 py-3 rounded-[20px] h-[460px]">
                <div className="flex justify-between">
                    <div>
                        <span className="font-bold text-lg">{props.titleLayout}</span>
                    </div>
                    <div onClick={props.buttonModalFilter}>
                        <FilterIcon />
                    </div>
                </div>
                <div className="mt-6 relative w-full">
                    {/* {
                        props.modalFilterState && props.modalFilterState
                    } */}
                    <table className={`w-full`}>
                        <thead className="w-full border-b border-gray-500">
                            <tr className="w-full flex justify-between pb-3">
                                <th className="w-full text-left">{props.th1}</th>
                                <th className="w-full text-center">{props.th2}</th>
                                <th className="w-full text-center">{props.th3}</th>
                            </tr>
                        </thead>
                        <tbody className="w-full font-bold">
                            <div className="overflow-y-scroll h-[300px]">
                                {
                                   loading ? <Loading/> : props.component 
                                }
                            </div>
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}