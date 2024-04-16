import cadeado from '../../assets/lock-simple.svg'

export default function PageError() {
    return (
        <div className='container-card-acess-negado'>
            <div className="card">
                <img src={cadeado} alt="foto-cadeado.svg" />
                <h1 className="no-acess-text"><strong> Acesso negado</strong></h1>
                <p className="descricao"> <i>Você não pode ter acesso a essa página. Por favor, dirija-se para a página de
                    login.</i> </p>

            </div>
        </div>
    )
}