import background_mobile from "../../assets/background_mobile.png"
import background_pc from "../../assets/background_pc.png"

export default function SlidesHome() {
    return (
        <>
            <div className={`
                hidden mt-7
                lg:flex lg:justify-center
            `}>
                <img src={background_pc} alt="image-home" className={`
                    w-full
                `} />
            </div>

            <div className={`
                lg:hidden mt-7
            `}>
                <img src={background_mobile} alt="image-home" className={`
                    w-full
                `} />
            </div>
        </>
    )
}