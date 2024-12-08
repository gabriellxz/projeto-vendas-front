import BagIcon from "../../svg/bag-icon";
import UserIcon from "../../svg/user-icon";
import Logo_yeshua from "../../assets/yeshuá.svg"
import ButtonLogout from "../../svg/button-logout";
import NavBarIcon from "../../svg/navbar-icon";
import { Link } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import { UserAutenticado } from "../../context/authContext";
import IconPlus from "../../svg/plus-icon";
import IconHome from "../../svg/icon-home";
import { CartOrderUser } from "../../types/cart";
import api from "../../config/config";
import { Avatar, Divider, Drawer, IconButton, Menu, MenuItem, Tooltip } from "@mui/material";
import { UserCircleIcon } from "@heroicons/react/16/solid";

export default function Header() {

    const { user, logout } = useContext(UserAutenticado)
    const token = localStorage.getItem('tokenUser')
    // const token = localStorage.getItem("tokenUser")
    const [open, setOpen] = useState<boolean>(false)
    const [amount, setAmount] = useState<number>();
    const [cart, setCart] = useState<CartOrderUser[]>([]);

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const openMenu = Boolean(anchorEl)

    function handleClick(event: React.MouseEvent<HTMLElement>) {
        setAnchorEl(event.currentTarget)
    }

    function handleClose() {
        setAnchorEl(null)
    }

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
                sm:flex lg:flex lg:items-center lg:justify-end
                `}>
                    <div className="flex items-center justify-between max-w-[100%] w-full">
                        <Link to={"/home"} className="">
                            <img src={Logo_yeshua} className="max-w-[100px] w-full" alt="logo_yeshuá" />
                        </Link>
                        <div>
                            <Tooltip title="menu do usuário">
                                <IconButton
                                    onClick={handleClick}
                                    size="small"
                                    aria-controls={openMenu ? "menu-do-usuario" : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={openMenu ? "true" : undefined}
                                >
                                    <UserCircleIcon className="w-[50px]" />
                                </IconButton>
                            </Tooltip>
                            <Menu
                                anchorEl={anchorEl}
                                id="menu-do-usuario"
                                open={openMenu}
                                onClose={handleClose}
                                onClick={handleClose}
                                slotProps={{
                                    paper: {
                                        elevation: 0,
                                        sx: {
                                            overflow: 'visible',
                                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                            mt: 1.5,
                                            '& .MuiAvatar-root': {
                                                width: 32,
                                                height: 32,
                                                ml: -0.5,
                                                mr: 1,
                                            },
                                            '&::before': {
                                                content: '""',
                                                display: 'block',
                                                position: 'absolute',
                                                top: 0,
                                                right: 14,
                                                width: 10,
                                                height: 10,
                                                bgcolor: 'background.paper',
                                                transform: 'translateY(-50%) rotate(45deg)',
                                                zIndex: 0,
                                            },
                                        },
                                    },
                                }}
                                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                            >
                                <MenuItem onClick={handleClose}>
                                    <Link to={"/home/perfil"} className="flex items-center">
                                        <Avatar /> Perfil
                                    </Link>
                                </MenuItem>
                                <Divider />
                                <MenuItem onClick={handleClose}>
                                    <Link to={"/home/carrinho"}>
                                        Carrinho
                                    </Link>
                                </MenuItem>
                                <MenuItem onClick={handleClose}>
                                    <Link to={"/home"}>
                                        Início
                                    </Link>
                                </MenuItem>
                                <MenuItem onClick={handleClose}>
                                    <Link to={"/dashboard/registro-de-pedidos"}>
                                        Dashboard
                                    </Link>
                                </MenuItem>
                                <MenuItem onClick={handleClose}>
                                    <Link to={"/"} onClick={logout}>
                                        Sair
                                    </Link>
                                </MenuItem>
                            </Menu>
                        </div>
                    </div>
                </header>

                {/* VISÍVEL PARA TELAS PEQUENAS */}
                <header className={`
                flex items-center justify-between p-5
                sm:hidden lg:hidden
            `}>
                    <div className="flex items-center w-full">
                        <Link to={"/home"} className="w-full flex justify-center">
                            <img src={Logo_yeshua} className="w-[100px]" alt="logo_yeshuá" />
                        </Link>
                        <div className={`${token ? "flex justify-end" : "hidden"}`}>
                            <button>
                                <NavBarIcon handleNavBar={() => setOpen(!open)} />
                            </button>
                            <Drawer className="sm:hidden" open={open} onClose={() => setOpen(false)}>


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