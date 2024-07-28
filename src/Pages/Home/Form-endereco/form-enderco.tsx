import ButtonDark from "../../../components/Button-dark/button-dark";
import Input from "../../../components/Input/input";
import data from '../../../ddd.json'
import useEndereco from "../../../hook/useEndereco";
import { ToastContainer } from "react-toastify"
// import usePayment from "../../../hook/usePayment";
import Loading from "../../../components/Loading/loading";
import '../../../global.css'
import { motion } from "framer-motion"

export default function FormEndereco() {

    function hanldeKeyDown(event: any) {
        if (event.key === "KeyUp" || event.key === "KeyDown") {
            event.preventDefault();
        }
    }

    const {
        getCep,
        cep,
        handleChangeCep,
        cidade,
        estado,
        bairro,
        rua,
        complemento,
        handleChangeBairro,
        handleChangeComplemento,
        handleChangeNumero,
        handleChangePontoRef,
        handleChangeTelefone,
        handlePostEndereco,
        handleChangeDdd,
        handleChangeRua,
        numero,
        ddd,
        pontoDeReferencia,
        telefoneContato,
        loading,
    } = useEndereco()

    return (
        <>
            <motion.div className="flex justify-center p-5"
                initial={{
                    opacity: 0,
                    translateY: 160
                }}
                animate={{
                    opacity: 1,
                    translateY: 0
                }}
            >
                <form className="max-w-[670px] w-full mt-5" onSubmit={handlePostEndereco}>
                    <div>
                        <h1 className="text-xl font-bold mb-2">Informações para entrega</h1>
                        <div className="bg-zinc-400 p-[0.5px] w-full"></div>
                    </div>
                    <div className="flex w-full gap-[20px] mt-5">
                        <div className="flex flex-col w-full">
                            <Input
                                inputLabel="CEP"
                                onInputValue={handleChangeCep}
                                name="CEP"
                                styleWidth="mb-2"
                                typeInput="text"
                                value={cep}
                                placeholder="Obs: Não use caracteres especiais (- . , _ / ( ) [ ] { })"
                            />
                            {loading ? <Loading /> : <ButtonDark text="Buscar CEP" propsBtn={getCep} />}
                        </div>
                    </div>
                    <div className="md:flex md:flex-row w-full gap-[20px] mt-5">
                        <div className="flex flex-col w-full">
                            <Input
                                inputLabel="Cidade"
                                onInputValue={() => { }}
                                name="cidade"
                                styleWidth=""
                                typeInput="text"
                                value={cidade}
                            />
                        </div>
                        <div className="flex flex-col w-full">
                            <Input
                                inputLabel="Estado"
                                onInputValue={() => { }}
                                name="estado"
                                styleWidth=""
                                typeInput="text"
                                value={estado}
                            />
                        </div>
                    </div>
                    <div className="md:flex md:flex-row w-full gap-[20px] mt-5">
                        <div className="flex flex-col w-full">
                            <Input
                                inputLabel="Bairro"
                                onInputValue={handleChangeBairro}
                                name="bairro"
                                styleWidth=""
                                typeInput="text"
                                value={bairro}
                            />
                        </div>
                        <div className="flex flex-col w-full">
                            <label className="text-xl">Número</label>
                            <input placeholder="Obs: se não houver número, coloque zero" type="number" name="numero" value={numero ? numero : ""} onKeyDown={hanldeKeyDown} onChange={handleChangeNumero} className="input border border-1 border-black outline-none p-2" />
                        </div>
                    </div>
                    <div className="md:flex md:flex-row w-full gap-[20px] mt-5">
                        <div className="flex flex-col w-full">
                            <Input
                                inputLabel="Rua"
                                onInputValue={handleChangeRua}
                                name="Rua"
                                styleWidth=""
                                typeInput="text"
                                value={rua}
                            />
                        </div>
                    </div>
                    <div className="md:flex md:flex-row w-full gap-[20px] mt-5">
                        <div className="flex flex-col w-full">
                            <Input
                                inputLabel="Ponto de referência"
                                onInputValue={handleChangePontoRef}
                                name="ponto_de_referencia"
                                styleWidth=""
                                typeInput="text"
                                value={pontoDeReferencia}
                            />
                        </div>
                        <div className="flex flex-col w-full">
                            <Input
                                inputLabel="Complemento"
                                onInputValue={handleChangeComplemento}
                                name="estado"
                                styleWidth=""
                                typeInput="text"
                                value={complemento}
                                placeholder="Ex: Andar, Bloco, Unidade"
                            />
                        </div>
                    </div>
                    <div className="md:flex md:flex-row w-full gap-[20px] mt-5">
                        <div className="flex flex-col w-full">
                            <span className="text-xl">DDD</span>
                            <select
                                name="ddd"
                                id=""
                                value={ddd}
                                onChange={handleChangeDdd}
                                className="border border-1 border-black outline-none p-2 w-full"
                            >
                                <option>DDD</option>
                                {
                                    data.dddsPorEstado.map((ddd: string) => (
                                        <option>{ddd}</option>
                                    ))
                                }
                            </select>
                        </div>
                        <div className="flex flex-col w-full">
                            <Input
                                inputLabel="Telefone"
                                onInputValue={handleChangeTelefone}
                                name="telefone_contato"
                                styleWidth=""
                                typeInput="text"
                                value={telefoneContato}
                                placeholder="Obs: Não use caracteres especiais (- . , _ / ( ) [ ] { })"
                            />
                        </div>
                    </div>
                    <div className="mt-8">
                        {loading ? <Loading /> : <ButtonDark text="Continue" />}
                    </div>
                </form>
            </motion.div>
            <ToastContainer />
        </>
    )
}