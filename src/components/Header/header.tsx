import BagIcon from "../../svg/bag-icon";
import SearchIcon from "../../svg/search-icon";
import UserIcon from "../../svg/user-icon";
import Logo_ecogreen from "../../../public/Cosméticos.svg"
import ButtonLogout from "../../svg/button-logout";
import NavBarIcon from "../../svg/navbar-icon";
import { useContext, useState } from "react";
import CloseNavBar from "../../svg/closeNavbar";
import { useSpring, animated } from '@react-spring/web'
import { Link } from "react-router-dom";
import { UserAutenticado } from "../../context/authContext";
import IconPlus from "../../svg/plus-icon";
import { DataUser } from "../../context/dataUser";
import IconHome from "../../svg/icon-home";

export default function Header() {

    const { logout } = useContext(UserAutenticado)
    const user = useContext(DataUser)
    // const token = localStorage.getItem("tokenUser")
    const { token } = useContext(UserAutenticado)
    const [open, setOpen] = useState<boolean>(false)

    const openMenu = useSpring({
        width: open ? "60vw" : "0",
    });

    return (
        <>
            <div>
                {/* VISÍVEL PARA TELAS GRANDES */}
                <header className={`
                hidden p-5
                lg:flex lg:items-center lg:justify-end
                `}>
                    <div className="flex justify-between max-w-[800px] w-full">
                        <Link to={"/home"} className="">
                            <img src={Logo_ecogreen} className="w-[100px]" alt="logo_ecogreen" />
                        </Link>
                        <div className={`${token ? "flex items-center gap-5" : "hidden"}`}>
                            <SearchIcon />
                            <UserIcon />
                            <BagIcon />
                            <Link to={"/cadastro-produtos"} className={`${user?.role == 2 ? "flex" : "hidden"}`}>
                                <IconPlus />
                            </Link>
                            <Link to={"/home"}>
                                <IconHome />
                            </Link>
                            <Link to={"/"} onClick={logout}>
                                <ButtonLogout />
                            </Link>
                        </div>
                    </div>
                </header>

                {/* VISÍVEL PARA TELAS PEQUENAS */}
                <header className={`
                flex items-center justify-between p-5
                lg:hidden
            `}>
                    <div className="flex items-center w-full">
                        <Link to={"/home"} className="w-full flex justify-center">
                            <img src={Logo_ecogreen} className="w-[100px]" alt="logo_ecogreen" />
                        </Link>
                        <div className={`${token ? "flex justify-end" : "hidden"}`}>
                            <>
                                <button>
                                    <NavBarIcon handleNavBar={() => setOpen(!open)} />
                                </button>
                                <animated.div style={{ ...openMenu, position: "fixed", top: 0, right: 0, height: "100vh", zIndex: "1", backgroundColor: "white" }}>
                                    {open ? (
                                        <CloseNavBar handleNavBar={() => setOpen(!open)} />
                                    ) : ""}
                                    {open && (
                                        <div className={`
                                                flex flex-col items-end gap-5 mt-5 px-[37px]
                                            `}>
                                            <ul className="flex flex-col">
                                                <li className="flex items-center uppercase text-xl py-[19px] gap-[26px] border-b border-zinc-500">
                                                    <SearchIcon />
                                                    <span className="flex justify-start w-full">
                                                        pesquisar
                                                    </span>
                                                </li>
                                                <li className="flex items-center uppercase text-xl py-[19px] gap-[26px] border-b border-zinc-500">
                                                    <UserIcon />
                                                    <span className="flex justify-start w-full">
                                                        usuário
                                                    </span>
                                                </li>
                                                <li className="flex items-center uppercase text-xl py-[19px] gap-[26px] border-b border-zinc-500">
                                                    <BagIcon />
                                                    <Link to={"/home/carrinho"} className="flex justify-start w-full">
                                                        carrinho
                                                    </Link>
                                                </li>
                                                <Link to={"/home"} className="flex items-center uppercase text-xl py-[19px] gap-[26px] border-b border-zinc-500">
                                                    <IconHome />
                                                    <span>
                                                        Início
                                                    </span>
                                                </Link>
                                                <Link to={"/cadastro-produtos"} className={`${user?.role == 2 ? "flex items-center uppercase text-xl py-[19px] gap-[26px] border-b border-zinc-500" : "hidden"} `}>
                                                    <IconPlus />
                                                    <span>
                                                        Adicionar produto
                                                    </span>
                                                </Link>
                                                <Link to={"/"} onClick={logout} className="flex items-center uppercase text-xl py-[19px] gap-[26px] border-b border-zinc-500">
                                                    <ButtonLogout />
                                                    <span className="flex justify-start w-full">
                                                        sair
                                                    </span>
                                                </Link>
                                            </ul>
                                        </div>
                                    )}
                                </animated.div>
                            </>


                        </div>

                    </div>
                </header>


                <div className="flex justify-center px-[58px]">
                    <div className="bg-zinc-400 p-[0.5px] w-full"></div>
                </div>


            </div>
        </>
    )
}