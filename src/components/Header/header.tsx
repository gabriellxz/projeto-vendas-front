import BagIcon from "../../svg/bag-icon";
import UserIcon from "../../svg/user-icon";
import Logo_yeshua from "../../assets/yeshua_white.png"
import SearchIcon from "../../svg/search-icon";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./style.css"
import { Box, Divider, Drawer, Menu, MenuItem } from "@mui/material";
import { UserAutenticado } from "../../context/authContext";
import { Bars3Icon, MagnifyingGlassIcon } from "@heroicons/react/16/solid";
import useCategory from "../../hook/useCategory";
import { useSearch } from "../../context/searchContext";
// import useCategory from "../../hook/useCategory";

export default function Header() {

    const navigate = useNavigate()
    const token = localStorage.getItem('tokenUser')
    const { setSearchTerm, searchTerm } = useSearch()
    const { categoria } = useCategory()
    const { logout } = useContext(UserAutenticado)
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
            <ul className="text-xl p-5 space-y-5">
                <li className="cursor-pointer">
                    <Link to={"/perfil"}>
                        Minha conta
                    </Link>
                </li>
                <Divider />
                <li className="cursor-pointer">
                    <Link to={"/carrinho"}>
                        Carrinho
                    </Link>
                </li>
                <Divider />
                <li className="cursor-pointer no-close" onClick={() => handleClickCategories("Linhas")}>Linhas +</li>
                {openDropDown &&

                    <ul className="ml-5 text-lg space-y-3">
                        {categoria.map(category => (
                            <li onClick={() => redirectCategoryProduct(category.nome, category.id)} className="cursor-pointer" key={category.id}>
                                {category.nome}
                            </li>
                        ))}
                    </ul>
                }
                <Divider />
                <li className="cursor-pointer">Sobre nós</li>
                <Divider />
                <li>
                    <a href="https://wa.me/5585992537575" target='_blank' className="cursor-pointer">Seja um distribuidor</a>
                </li>
                <Divider />
                <li className="cursor-pointer" onClick={logout}>Sair</li>
            </ul>
        </Box>
    )
    return (
        <>
            <header className="bg-greenEco-300 flex sm:justify-center items-center py-1 w-full select-none">
                <div>
                    <div className="flex items-center sm:space-x-5">
                        <Link to={"/"}>
                            <img src={Logo_yeshua} alt="logo_yeshua" className="w-[100px]" />
                        </Link>
                        {token &&
                            <>
                                {/* TELA PEQUENAS */}
                                <Bars3Icon onClick={() => setOpenMenu(!openMenu)} className="w-[30px] sm:hidden absolute right-1 text-white" />

                                <Drawer
                                    anchor="right"
                                    open={openMenu}
                                    onClose={() => setOpenMenu(!openMenu)}
                                >
                                    {DrawerList}
                                </Drawer>

                                <MagnifyingGlassIcon
                                    onClick={() => setSearchBarMobile(!openSearchBarMobile)}
                                    className="sm:hidden w-[30px] text-white absolute right-[50px] cursor-pointer"
                                />

                                {/* TELAS GRANDES */}
                                <div>
                                    <nav className="hidden sm:flex text-xl text-whiteEco-200 space-x-5">
                                        <span
                                            className="cursor-pointer"
                                            onMouseEnter={handleMouseEnter}
                                            onMouseLeave={handleMouseLeave}
                                        >Linhas</span>
                                        <span className="cursor-pointer">Sobre nós</span>
                                        <a href="https://wa.me/5585992537575" target='_blank'>
                                            <span className="cursor-pointer">
                                                Seja um distribuidor
                                            </span>
                                        </a>
                                    </nav>
                                </div>
                                <div className="hidden sm:flex space-x-3">
                                    <div className="flex items-center bg-white rounded-xl px-2">
                                        <input
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            onKeyDown={(e: any) => {
                                                if (e.key == "Enter") {
                                                    searchProducts(e.target.value)
                                                }
                                            }}
                                            type="text"
                                            placeholder="Buscar"
                                            className="rounded-xl outline-none px-2 text-xl"
                                        />
                                        <button onClick={() => searchProducts(searchTerm)}>
                                            <SearchIcon />
                                        </button>
                                    </div>
                                    <div className="flex items-center gap-5">
                                        <div className="relative">
                                            <span onClick={handleClick} className="cursor-pointer">
                                                <UserIcon />
                                            </span>

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
                                                <span onClick={logout}>
                                                    <MenuItem onClick={handleClose}>Sair</MenuItem>
                                                </span>
                                            </Menu>
                                        </div>
                                        <BagIcon />
                                    </div>
                                </div>
                            </>
                        }
                        {
                            !token &&
                            <div className="flex items-center gap-5 absolute right-2">
                                <Link to={"/cadastro"}>
                                    <button className="btn-signUp">
                                        Cadastrar
                                    </button>
                                </Link>
                                <Link to={"/login"}>
                                    <button className="btn-signIn">
                                        Entrar
                                    </button>
                                </Link>
                            </div>
                        }
                    </div>
                </div>
            </header>
            {
                openDropDown &&
                <div
                    className="w-[50%] bg-whiteEco-100 p-5 absolute shadow-xl left-1/2 transform -translate-x-1/2 z-10 hidden sm:block"
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
                <div className="flex items-center bg-white rounded-xl px-2 sm:hidden">
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