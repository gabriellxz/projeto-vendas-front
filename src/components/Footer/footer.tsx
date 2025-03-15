import mastercardLogo from "../../assets/mc_vrt_opt_pos_46_3x.png"
import visaLogo from "../../assets/Visa_Brandmark_White_RGB_2021.png"
import instaICon from "../../assets/instaIcon.png"
import yeshuaLogo from "../../assets/yeshuaPNG.png"

export default function Footer() {
    return (
        <footer className='text-black bg-whiteEco-100'>
            <div className="md:flex md:justify-around px-5 py-8">
                <div className="md:flex md:justify-around sm:gap-[50px] md:gap-[100px] mb-[50px] md:mb-0">
                    <div className="mb-[50px]">
                        <img
                            src={yeshuaLogo}
                            alt="logo_yeshua"
                            className="w-[200px]"
                        />
                    </div>
                    <div>
                        <p className="font-jura text-2xl text-greenEco-300 font-bold mb-3">Como podemos ajudar?</p>
                        <ul className="space-y-2">
                            <li>
                                <a href="#">Home</a>
                            </li>
                            <li>
                                <a href="#">Sobre nós</a>
                            </li>
                            <li>
                                <a href="#">Todos os produtos</a>
                            </li>
                            <li>
                                <a href="#">Contato</a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div>
                    <p className="font-jura text-2xl text-greenEco-300 font-bold mb-3">Siga nas redes sociais</p>
                    <img src={instaICon} alt="instagram_icon" className="w-[25px]" />
                </div>
            </div>
            <div className="bg-zinc-400 px-5 py-8 md:flex md:justify-center md:items-center">
                <div className="md:flex md:justify-between w-full max-w-[900px]">
                    <p className='text-justify text-sm max-w-[600px] w-full'>
                        © Copyright 2025 Yeshuá Professional - Todos os direitos reservados.
                        CPNPJ/54.266.654/0001-90 - Sede: Rua 7, 1213, Passare, Fortaleza CE, 60743-680, Brasil.
                    </p>
                    <div className="flex items-center">
                        <img src={mastercardLogo} alt="mastercard_logo" className="w-[50px]" />
                        <img src={visaLogo} alt="mastercard_logo" className="w-[50px]" />
                    </div>
                </div>
            </div>
        </footer>
    )
}