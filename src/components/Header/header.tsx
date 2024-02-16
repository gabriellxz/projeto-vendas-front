import BagIcon from "../../svg/bag-icon";
import FavoriteIcon from "../../svg/favorite-icon";
import SearchIcon from "../../svg/search-icon";
import UserIcon from "../../svg/user-icon";
import Logo_ecogreen from "../../../public/Cosméticos.svg"
import ButtonLogout from "../../svg/button-logout";

export default function Header() {

    const token =  localStorage.getItem("tokenUser")

    return (
        <div>
            <header className="flex items-center justify-end p-5">
                <div className="flex justify-between max-w-[800px] w-full">
                    <div className="">
                        <img src={Logo_ecogreen} className="w-[100px]" alt="logo_ecogreen"/>
                    </div>
                    <div className="flex items-center gap-5">
                        <SearchIcon />
                        <UserIcon />
                        <FavoriteIcon />
                        <BagIcon />
                        {token ? <ButtonLogout/> : ""}
                    </div>
                </div>
            </header>
            <div className="flex justify-center px-[58px]">
                <div className="bg-zinc-400 p-[0.5px] w-full"></div>
            </div>
        </div>
    )
}