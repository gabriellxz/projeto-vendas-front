import mastercardLogo from "../../assets/mc_vrt_opt_pos_46_3x.png"
import visaLogo from "../../assets/Visa_Brandmark_White_RGB_2021.png"
import instaICon from "../../assets/instaIcon.png"
import iconWts from "../../assets/iconWts.png"
import emailIcon from "../../assets/emailIcon.png"

export default function Footer() {
    return (
        <footer className='bg-greenEco-300 text-white'>
            <div className='grid grid-cols-2 gap-5 sm:flex sm:flex-row sm:justify-around p-5'>
                <div className='flex flex-col gap-3'>
                    <p className='uppercase font-bold'>institucional</p>
                    <div>
                        <ul>
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
                <div className='flex flex-col gap-3 text-justify'>
                    <p className='uppercase font-bold'>ajuda</p>
                    <div>
                        <a href='#'>Política de privacidade</a>
                    </div>
                    <div>
                        <a href='mailto:yeshuaprofessional9@gmail.com' className='flex gap-4 overflow-hidden' target='_blank'>
                            <img src={emailIcon} className='w-[20px]' alt="" /> yeshuaprofessional9@gmail.com
                        </a>
                        <a href="https://wa.me/5585992537575" className='flex gap-4' target='_blank'>
                            <img src={iconWts} className='w-[20px]' alt="" /> (85) 99253-7575
                        </a>
                    </div>
                </div>
                <div>
                    <p className='uppercase font-bold'>formas de pagamento</p>
                    <div className='flex items-center'>
                        <img src={mastercardLogo} alt="" className='max-w-[80px] w-full' />
                        <img src={visaLogo} alt="" className='max-w-[80px] w-full' />
                    </div>
                </div>
                <div className='flex flex-col gap-3'>
                    <p className='uppercase font-bold'>nossas redes sociais</p>
                    <div className='flex justify-center'>
                        <a href="https://www.instagram.com/yeshua_professional/">
                            <img src={instaICon} className='w-[20px]' alt="" />
                        </a>
                    </div>
                </div>
            </div>
            <div className='bg-greenEco-200'>
                <p className='text-center'>
                    © Copyright 2025 Yeshuá Professional - Todos os direitos reservados.
                    CPNPJ/54.266.654/0001-90 - Sede: Rua 7, 1213, Passare, Fortaleza CE, 60743-680, Brasil.
                </p>
            </div>
        </footer>
    )
}