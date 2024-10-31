import ButtonDark from "../Button-dark/button-dark";
import ButtonLight from "../Button-light/button-light";
import Input from "../Input/input";
import TitleForm from "../Title-form/title-form";
import data from '../../ddd.json'
import { Link } from "react-router-dom";
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Loading from "../Loading/loading";
import useCadastro from "../../hook/useCadastro";
import { FormControl, FormControlLabel, FormLabel, InputLabel, MenuItem, Radio, RadioGroup, Select } from "@mui/material";

export default function FormCadastro() {

    const {
        handleSubmit,
        validation,
        senha,
        email,
        telefoneData,
        nome,
        CPF,
        handleEmailValue,
        handleGeneroValue,
        handleNomeInput,
        handleSenhaValue,
        handleTelefoneValue,
        handleCpfValue
    } = useCadastro()

    return (
        <>
            <form className="max-w-[600px] w-full m-5" onSubmit={handleSubmit}>
                <div className="mb-10">
                    <TitleForm text={"cadastro"} />
                </div>
                <div>
                    <div className="flex flex-col gap-7">
                        <div className="flex flex-col gap-2">
                            <Input
                                typeInput={"email"}
                                inputLabel={"Email"}
                                styleWidth={"w-full"}
                                name={"email"}
                                value={email}
                                onInputValue={handleEmailValue}
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Input
                                typeInput={"password"}
                                inputLabel={"Senha"}
                                styleWidth={"w-full"}
                                name={"senha"}
                                value={senha}
                                onInputValue={handleSenhaValue}
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Input
                                typeInput={"text"}
                                inputLabel={"CPF"}
                                styleWidth={"w-full"}
                                name={"CPF"}
                                value={CPF}
                                onInputValue={handleCpfValue}
                            />
                            <p>
                                {validation.type === "error-cpf" ? <p className="text-red-600">{validation.message}</p> : <p className="text-red-600 hidden">{validation.message}</p>}
                            </p>
                        </div>
                        <div className="flex gap-5">
                            <FormControl className="max-w-[108px] w-full">
                                <InputLabel id="demo-simple-select-label">DDD</InputLabel>
                                <Select
                                    name="ddd"
                                    labelId="demo-simple-select-label"
                                    value={telefoneData.ddd}
                                    label="DDD"
                                    onChange={handleTelefoneValue}
                                >
                                    <MenuItem disabled selected>DDD</MenuItem>
                                    {
                                        data.dddsPorEstado.map((ddd: string) => (
                                            <MenuItem value={ddd}>{ddd}</MenuItem>
                                        ))
                                    }
                                </Select>
                            </FormControl>
                            <div className="w-full">
                                <Input
                                    typeInput={"tel"}
                                    inputLabel={"Telefone"}
                                    styleWidth={"w-full"}
                                    name={"Telefone"}
                                    value={telefoneData.Telefone}
                                    onInputValue={handleTelefoneValue}
                                />
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <Input
                                typeInput={"text"}
                                inputLabel={"Nome completo"}
                                styleWidth={"w-full"}
                                name={"nome"}
                                value={nome}
                                onInputValue={handleNomeInput}
                            />
                        </div>
                        <FormControl className="mt-5">
                            <FormLabel id="label-radio-gender">Sexo</FormLabel>
                            <RadioGroup
                                aria-labelledby="label-radio-gender"
                            >
                                <div className="flex items-center gap-3">
                                    <FormControlLabel control={<Radio />} label={"Feminino"} name="gender" value={"feminino"} onChange={handleGeneroValue} />
                                </div>
                                <div className="flex items-center gap-3">
                                    <FormControlLabel control={<Radio />} label={"Masculino"} name="gender" value={"masculino"} onChange={handleGeneroValue} />
                                </div>
                                <div className="flex items-center gap-3">
                                    <FormControlLabel control={<Radio />} label={"Masculino"} name="gender" value={"outro"} onChange={handleGeneroValue} />
                                </div>
                            </RadioGroup>
                        </FormControl>
                        <div className="text-center">
                            {
                                validation.loading ? <Loading />
                                    :
                                    <ButtonDark text={"cadastrar"} />
                            }
                            <div className="bg-zinc-400 p-[0.4px] w-full"></div>
                        </div>
                        <div>
                            <div className="flex justify-center mb-3">
                                <span>Já possui uma conta?</span>
                            </div>
                            <Link to={"/"}>
                                <ButtonLight text={"Entrar"} />
                            </Link>
                        </div>
                    </div>
                </div>

            </form>
            <ToastContainer />
        </>
    )
}