import BagIcon from "../../svg/bag-icon";
import UserIcon from "../../svg/user-icon";
import Logo_yeshua from "../../assets/yeshuá.svg"
import ButtonLogout from "../../svg/button-logout";
import NavBarIcon from "../../svg/navbar-icon";
import CloseNavBar from "../../svg/closeNavbar";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { UserAutenticado } from "../../context/authContext";
import IconPlus from "../../svg/plus-icon";
import IconHome from "../../svg/icon-home";
import { AnimatePresence, motion } from "framer-motion"
import { CartOrderUser } from "../../types/cart";
import api from "../../config/config";
import { Drawer } from "@mui/material";

export default function Header() {

    const { user, logout } = useContext(UserAutenticado)
    const token = localStorage.getItem('tokenUser')
    // const token = localStorage.getItem("tokenUser")
    const [open, setOpen] = useState<boolean>(false)
    const [amount, setAmount] = useState<number>();
    const [cart, setCart] = useState<CartOrderUser[]>([]);

    async function getAmount() {
        try {
            if (token) {
                const response = await api.get("/cart/find", {
                    headers: {
                        "Authorization": "Bearer " + JSON.parse(token)
                    }
                })

                setCart(response.data.carrinho);

                const totalAmount = cart.reduce((accumulator, item) => {
                    return accumulator + item.amount;
                }, 0);

                setAmount(totalAmount);
            }
        } catch (error) {
            console.log(error);
            // setLoadingCart(false);
        } finally {
            // setLoadingCart(false);
        }
    }

    useEffect(() => {
        getAmount();
    }, [cart])


    return (
        <>
            <div>
                {/* VISÍVEL PARA TELAS GRANDES */}
                <header className={`
                hidden p-5
                lg:flex lg:items-center lg:justify-end
                `}>
                    <div className="flex items-center justify-between max-w-[100%] w-full">
                        <Link to={"/home"} className="">
                            <img src={Logo_yeshua} className="max-w-[100px] w-full" alt="logo_yeshuá" />
                        </Link>
                        <div className="flex items-center gap-5">
                            <AnimatePresence>
                                {
                                    open &&
                                    <motion.div className={`${token ? "flex items-center gap-5" : "hidden"}`}
                                        initial={{ opacity: 0, translateX: 50 }}
                                        animate={{ opacity: 1, translateX: 0 }}
                                        exit={{ opacity: 0, translateX: 50 }}
                                        transition={{ duration: 0.5 }}
                                    >
                                        <UserIcon />
                                        <div>
                                            {
                                                amount ? (
                                                    amount > 0 ? (
                                                        <span className={`
                                                            flex justify-center items-center p-2 text-white absolute bg-red-600 rounded-full w-[10px] 
                                                            h-[10px] cursor-pointer
                                                        `}>{amount}</span>
                                                    ) : (
                                                        <span className={`
                                                            justify-center items-center p-2 text-white absolute bg-red-600 rounded-full w-[10px] 
                                                            h-[10px] cursor-pointer hidden
                                                        `}>{amount}</span>
                                                    )
                                                ) : (
                                                    <span className={`
                                                        justify-center items-center p-2 text-white absolute bg-red-600 rounded-full w-[10px] 
                                                        h-[10px] cursor-pointer hidden
                                                    `}>{amount}</span>
                                                )
                                            }
                                            <BagIcon />
                                        </div>
                                        <Link to={"/dashboard"} className={`${user?.role == 2 ? "flex" : "hidden"}`}>
                                            <IconPlus />
                                        </Link>
                                        <Link to={"/home"}>
                                            <IconHome />
                                        </Link>
                                        <Link to={"/"} onClick={logout}>
                                            <ButtonLogout />
                                        </Link>
                                    </motion.div>
                                }
                            </AnimatePresence>
                            <div>
                                {token ? (
                                    <div className="">
                                        {open ? <CloseNavBar handleNavBar={() => setOpen(!open)} /> : <NavBarIcon handleNavBar={() => setOpen(!open)} />}
                                    </div>
                                ) : (
                                    <div className="hidden">
                                        {open ? <CloseNavBar handleNavBar={() => setOpen(!open)} /> : <NavBarIcon handleNavBar={() => setOpen(!open)} />}
                                    </div>
                                )}
                            </div>
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
                            <img src={Logo_yeshua} className="w-[100px]" alt="logo_yeshuá" />
                        </Link>
                        <div className={`${token ? "flex justify-end" : "hidden"}`}>
                            <>
                                <button>
                                    <NavBarIcon handleNavBar={() => setOpen(!open)} />
                                </button>
                                <Drawer open={open} onClose={() => setOpen(false)}>


                                    <div className={`
                                                flex flex-col items-end gap-5 mt-5 px-[37px]
                                            `}>
                                        <ul className="flex flex-col">
                                            <li className="flex items-center uppercase text-xl py-[19px] gap-[26px] border-b border-zinc-500">
                                                <UserIcon />
                                                <Link to={"/home/perfil"} className="flex justify-start w-full" onClick={() => setOpen(!open)}>
                                                    usuário
                                                </Link>
                                            </li>
                                            <li className="flex items-center uppercase text-xl py-[19px] gap-[26px] border-b border-zinc-500">
                                                <div>
                                                    {
                                                        amount ? (
                                                            amount > 0 ? (
                                                                <span className={`
                                                            flex justify-center items-center p-2 text-white absolute bg-red-600 rounded-full w-[10px] 
                                                            h-[10px] cursor-pointer
                                                        `}>{amount}</span>
                                                            ) : (
                                                                <span className={`
                                                            justify-center items-center p-2 text-white absolute bg-red-600 rounded-full w-[10px] 
                                                            h-[10px] cursor-pointer hidden
                                                        `}>{amount}</span>
                                                            )
                                                        ) : (
                                                            <span className={`
                                                        justify-center items-center p-2 text-white absolute bg-red-600 rounded-full w-[10px] 
                                                        h-[10px] cursor-pointer hidden
                                                    `}>{amount}</span>
                                                        )
                                                    }
                                                    <BagIcon />
                                                </div>
                                                <Link to={"/home/carrinho"} className="flex justify-start w-full" onClick={() => setOpen(!open)}>
                                                    carrinho
                                                </Link>
                                            </li>
                                            <Link to={"/home"} className="flex items-center uppercase text-xl py-[19px] gap-[26px] border-b border-zinc-500" onClick={() => setOpen(!open)}>
                                                <IconHome />
                                                <span>
                                                    Início
                                                </span>
                                            </Link>
                                            <Link to={"/dashboard/registro-de-pedidos"} className={`${user?.role == 2 ? "flex items-center uppercase text-xl py-[19px] gap-[26px] border-b border-zinc-500" : "hidden"} `}>
                                                <IconPlus />
                                                <span>
                                                    Dashboard
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
                                </Drawer>
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