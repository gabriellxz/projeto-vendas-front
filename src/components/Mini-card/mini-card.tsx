import produto1 from '../../assets/produto-1.webp'

export default function MiniCard() {
    return(
        <>
            <div className='max-w-[224px] w-full bg-white flex flex-col justify-center items-center p-3'>
                <div>
                    <img src={produto1} alt="" />
                </div>
                <div className='text-xl text-center flex justify-center items-center'>
                    <h1>Produto 1</h1>
                </div>
            </div>
        </>
    )
}