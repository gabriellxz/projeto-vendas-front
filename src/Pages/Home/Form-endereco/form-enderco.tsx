import ButtonDark from "../../../components/Button-dark/button-dark";
import Input from "../../../components/Input/input";
import data from '../../../ddd.json'
import useEndereco from "../../../hook/useEndereco";

export default function FormEndereco() {

    const {
        getCep,
        cep,
        handleChangeCep,
        cidade,
        estado,
        bairro,
        complemento,
        handleChangeBairro,
        handleChangeComplemento,
        handleChangeNumero,
        handleChangePontoRef,
        handleChangeTelefone,
        handlePostEndereco,
        handleChangeDdd,
        numero,
        ddd,
        pontoDeReferencia,
        telefoneContato
    } = useEndereco()

    return (
        <>
            <div className="flex justify-center p-5">
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
                                styleWidth=""
                                typeInput="text"
                                value={cep}
                            />
                            <ButtonDark text="Buscar CEP" propsBtn={getCep} />
                        </div>
                    </div>
                    <div className="flex w-full gap-[20px] mt-5">
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
                    <div className="flex w-full gap-[20px] mt-5">
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
                            <input type="number" name="numero" value={numero ? numero : ""} onChange={handleChangeNumero} className="border border-1 border-black outline-none p-2" />
                        </div>
                    </div>
                    <div className="flex w-full gap-[20px] mt-5">
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
                            />
                        </div>
                    </div>
                    <div className="flex w-full gap-[20px] mt-5">
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
                            />
                        </div>
                    </div>
                    <div className="mt-8">
                        <ButtonDark text="Continue" />
                    </div>
                </form>
            </div>
        </>
    )
}