import BagIcon from "../../svg/bag-icon";
import FavoriteIcon from "../../svg/favorite-icon";
import SearchIcon from "../../svg/search-icon";
import UserIcon from "../../svg/user-icon";
import Logo_ecogreen from "../../../public/Cosméticos.svg"
import ButtonLogout from "../../svg/button-logout";
import NavBarIcon from "../../svg/navbar-icon";
import { useState } from "react";
import CloseNavBar from "../../svg/closeNavbar";
import { useSpring, animated } from '@react-spring/web'

export default function Header() {

    const token = localStorage.getItem("tokenUser")
    const [open, setOpen] = useState<boolean>(false)

    const openMenu = useSpring({
        transform: open ? 'translate3d(0,0,0)' : 'translate3d(50%, 0,0)',
        config: { tension: 210, friction: 20 }
    })

    return (
        <div>
            {/* VISÍVEL PARA TELAS GRANDES */}
            <header className={`
                hidden p-5
                lg:flex lg:items-center lg:justify-end
            `}>
                <div className="flex justify-between max-w-[800px] w-full">
                    <div className="">
                        <img src={Logo_ecogreen} className="w-[100px]" alt="logo_ecogreen" />
                    </div>
                    <div className="flex items-center gap-5">
                        <SearchIcon />
                        <UserIcon />
                        <FavoriteIcon />
                        <BagIcon />
                        {token ? <ButtonLogout /> : ""}
                    </div>
                </div>
            </header>

            {/* VISÍVEL PARA TELAs PEQUENAS */}
            <header className={`
                flex items-center justify-between p-5
                lg:hidden
            `}>
                <div className="flex items-center justify-between max-w-[800px] w-full">
                    <div className="">
                        <img src={Logo_ecogreen} className="w-[70px]" alt="logo_ecogreen" />
                    </div>
                    <animated.div style={openMenu} className="flex items-center">
                        {open ? <CloseNavBar handleNavBar={() => setOpen(!open)} /> : <NavBarIcon handleNavBar={() => setOpen(!open)} />}
                        {
                            open &&
                            <div className={`
                            flex items-center gap-5
                        `}>
                                <SearchIcon />
                                <UserIcon />
                                <FavoriteIcon />
                                <BagIcon />
                                {token ? <ButtonLogout /> : ""}
                            </div>
                        }
                    </animated.div>

                </div>
            </header>

            <div className="flex justify-center px-[58px]">
                <div className="bg-zinc-400 p-[0.5px] w-full"></div>
            </div>


        </div>
    )
}