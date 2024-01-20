import BagIcon from "../../svg/bag-icon";
import FavoriteIcon from "../../svg/favorite-icon";
import SearchIcon from "../../svg/search-icon";
import UserIcon from "../../svg/user-icon";


export default function Header() {
    return (
        <div>
            <header className="flex items-center justify-end p-10">
                <div className="flex justify-between max-w-[800px] w-full">
                    <div className="">
                        <h1 className="font-jura text-2xl tracking-widest font-semibold uppercase">logo</h1>
                    </div>
                    <div className="flex items-center gap-5">
                        <SearchIcon />
                        <UserIcon />
                        <FavoriteIcon />
                        <BagIcon />
                    </div>
                </div>
            </header>
            <div className="flex justify-center px-[58px]">
                <div className="bg-zinc-400 p-[0.5px] w-full"></div>
            </div>
        </div>
    )
}