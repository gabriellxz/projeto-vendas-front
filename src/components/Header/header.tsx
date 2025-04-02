import Logo_yeshua from "../../assets/yeshua_white.png"
import SearchIcon from "../../svg/search-icon";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./style.css"
import { Box, Divider, Drawer, Menu, MenuItem } from "@mui/material";
import { UserAutenticado } from "../../context/authContext";
import { Bars3Icon, MagnifyingGlassIcon } from "@heroicons/react/16/solid";
import { ChartPieIcon, ChevronDownIcon, ChevronUpIcon, ShoppingBagIcon, UserCircleIcon } from "@heroicons/react/24/outline"
import useCategory from "../../hook/useCategory";
import { useSearch } from "../../context/searchContext";
import { useCart } from "../../context/cartContext";
// import useCategory from "../../hook/useCategory";

export default function Header() {

    const navigate = useNavigate()
    const { setSearchTerm, searchTerm } = useSearch()
    const { categoria } = useCategory()
    const { logout, token, user } = useContext(UserAutenticado)
    const { setBagIsOpen, cart } = useCart()
    const [openDropDown, setOpenDropDown] = useState<boolean>(false)
    const [timeId, setTimeId] = useState<NodeJS.Timeout | null>(null)
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const [openMenu, setOpenMenu] = useState(false)
    const [openSearchBarMobile, setSearchBarMobile] = useState(false)

    function searchProducts(value: string) {
        navigate(`produto/${value}`)
        setSearchTerm(value)
    }

    function redirectCategoryProduct(categoria: string, id: number) {
        setSearchTerm("")
        navigate(`produto/${categoria}/${id}`)
    }

    const open = Boolean(anchorEl)

    function handleClick(event: React.MouseEvent<HTMLElement>) {
        setAnchorEl(event.currentTarget)
    }

    function handleClose() {
        setAnchorEl(null)
    }

    function handleMouseEnter() {
        if (timeId) clearTimeout(timeId)

        // console.log(timeId)
        setOpenDropDown(true)
    }

    function handleMouseLeave() {
        const id = setTimeout(() => {
            setOpenDropDown(false)
        }, 400)

        // console.log(timeId)
        setTimeId(id)
    }

    function handleClickCategories(option: string) {
        if (option === "Linhas") {
            setOpenDropDown(!openDropDown)
            setOpenMenu(true)
        }
    }

    function calAmount() {
        return cart.reduce((total, item) => {
            return total + item.amount
        }, 0)
    }

    // MENU MOBILE
    const DrawerList = (
        <Box
            sx={{ width: 250 }}
            onClick={(e) => {
                const target = e.target as HTMLElement

                if (!target.closest(".no-close")) {
                    setOpenMenu(false)
                }
            }}
        >
            <ul className="text-xl font-jura font-semibold">
                {/* <li className="cursor-pointer">
                    <Link to={"/perfil"}>
                        Minha conta
                    </Link>
                </li>
                <Divider />
                <li className="cursor-pointer">
                    <Link to={"/carrinho"}>
                        Carrinho
                    </Link>
                </li> */}
                <li className={`${openDropDown && "bg-greenEco-200 text-white"} cursor-pointer no-close p-5 flex items-center gap-5`} onClick={() => handleClickCategories("Linhas")}>
                    Linhas {openDropDown ? <ChevronUpIcon className="w-[20px]" /> : <ChevronDownIcon className="w-[20px]" />}
                </li>
                {openDropDown &&

                    <ul className="ml-[50px] py-1 text-lg space-y-3">
                        {categoria.map(category => (
                            <li onClick={() => redirectCategoryProduct(category.nome, category.id)} className="cursor-pointer" key={category.id}>
                                {category.nome}
                            </li>
                        ))}
                    </ul>
                }
                <Divider />
                <li className="cursor-pointer p-5">Sobre nós</li>
                <Divider />
                <li className="p-5">
                    <a href="https://wa.me/5585992537575" target='_blank' className="cursor-pointer">Seja um distribuidor</a>
                </li>
                <Divider />
            </ul>
        </Box>
    )
    return (
        <>
            <header className="bg-greenEco-300 flex lg:justify-center items-center py-1 w-full select-none">
                <div>
                    <div className="flex items-center lg:space-x-5 px-5">
                        <div className="flex items-center">
                            <div className="flex items-center gap-[50px]">
                                <Bars3Icon onClick={() => setOpenMenu(!openMenu)} className="w-[30px] lg:hidden text-white" />
                                <Link to={"/"}>
                                    <img src={Logo_yeshua} alt="logo_yeshua" className="w-[100px]" />
                                </Link>
                            </div>
                            <div className="flex items-center absolute right-5 gap-5">
                                <button onClick={handleClick}>
                                    <UserCircleIcon className="text-white w-[30px] cursor-pointer" />
                                </button>

                                <Menu
                                    anchorEl={anchorEl}
                                    open={open}
                                    onClose={handleClose}
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
                                    <Link to={"/perfil"}>
                                        <MenuItem onClick={handleClose}>
                                            Minha conta
                                        </MenuItem>
                                    </Link>
                                    {token &&
                                        <span onClick={logout}>
                                            <MenuItem onClick={handleClose}>Sair</MenuItem>
                                        </span>
                                    }
                                </Menu>
                                <MagnifyingGlassIcon
                                    onClick={() => setSearchBarMobile(!openSearchBarMobile)}
                                    className="lg:hidden w-[30px] text-white cursor-pointer"
                                />
                                <div className="relative" onClick={() => setBagIsOpen(true)}>
                                    <span className="flex justify-center items-center bg-red-600 absolute text-white rounded-full w-[20px] h-[20px]">{calAmount()}</span>
                                    <ShoppingBagIcon className="text-white w-[30px] cursor-pointer" />
                                </div>
                                {user?.role === 2 ? (
                                    token && <Link to={"/dashboard"}>
                                        <ChartPieIcon className="w-[30px] text-white" />
                                    </Link>
                                ) : ""}
                            </div>
                        </div>
                        <Drawer
                            anchor="left"
                            open={openMenu}
                            onClose={() => setOpenMenu(!openMenu)}
                        >
                            {DrawerList}
                        </Drawer>
                        {/* TELAS GRANDES */}
                        <nav className="hidden lg:flex text-xl text-white items-center gap-[35px]">
                            <div className="flex gap-[35px]">
                                <span
                                    className="cursor-pointer"
                                    onMouseEnter={handleMouseEnter}
                                    onMouseLeave={handleMouseLeave}
                                >
                                    Linhas
                                </span>
                                <span className="cursor-pointer">Sobre nós</span>
                                <a href="https://wa.me/5585992537575" target='_blank'>
                                    <span className="cursor-pointer">
                                        Seja um distribuidor
                                    </span>
                                </a>
                            </div>
                            <div className="bg-white rounded-xl flex items-center px-1">
                                <input
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    onKeyDown={(e: any) => {
                                        if (e.key == "Enter") {
                                            searchProducts(e.target.value)
                                        }
                                    }}
                                    type="text"
                                    placeholder="Buscar"
                                    className="rounded-xl outline-none px-1 text-[16px] max-w-[200px] w-full text-black"
                                />
                                <button onClick={() => searchProducts(searchTerm)}>
                                    <MagnifyingGlassIcon className="w-[20px] text-black" />
                                </button>
                            </div>
                        </nav>

                    </div>
                </div>
            </header>
            {
                openDropDown &&
                <div
                    className="w-[50%] bg-whiteEco-100 p-5 absolute shadow-xl left-1/2 transform -translate-x-1/2 z-10 hidden lg:block"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    <ul className="text-lg space-y-5 font-jura">
                        {categoria.map(category => (
                            <li onClick={() => redirectCategoryProduct(category.nome, category.id)} className="cursor-pointer" key={category.id}>
                                {category.nome}
                            </li>
                        ))}
                    </ul>
                </div>
            }
            {
                openSearchBarMobile &&
                <div className="flex items-center bg-white rounded-xl px-2 py-1 lg:hidden">
                    <input
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onKeyDown={(e: any) => {
                            if (e.key == "Enter") {
                                searchProducts(e.target.value)
                            }
                        }}
                        type="text"
                        placeholder="Buscar"
                        className="rounded-xl outline-none px-2 text-xl w-full"
                    />
                    <button onClick={() => searchProducts(searchTerm)}>
                        <SearchIcon />
                    </button>
                </div>
            }
        </>
    )
}