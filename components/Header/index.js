import Link from 'next/link'
import { useContext, useState } from 'react'
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../contexts/AuthContext'
import { Modal } from '../../components/Modal';
import { api } from '../../services/api';

export function Header () {
    const { user, signOut } = useContext(AuthContext)
    const [showModal, setShowModal] = useState(false);
    const { register, handleSubmit } = useForm({
        defaultValues: {
            usuario: '',
            senha: '',
            admin: false
            
        }
    });
    async function handleAddUsuario(data){
        try{

            await api.post('/usuarios', data)
            alert('Usuário criado com sucesso!')
            setShowModal(false)
        } catch(err) {
            alert('Falha na criação do usuário, tente novamente!')
            setShowModal(false)
        }
    }

    return(
        <>
        <header className="text-gray-600 body-font">
            <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
            <a href="#" className="bg-black text-white font-bold text-xl p-4">Logo</a>
                <nav className="md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-400	flex flex-wrap items-center text-base justify-center">
                    <Link href="/produtos">
                        <a className="mr-5 hover:text-gray-900">Produtos</a>
                    </Link>
                    <Link href="/pedidos">
                        <a className="mr-5 hover:text-gray-900">Pedidos</a>
                    </Link>
                    {user?.admin && (
                        <>
                            <Link href="/relatorios">
                                <a className="mr-5 hover:text-gray-900">Relatórios</a>
                            </Link>
                            <button onClick={() => setShowModal(true)}>
                                <a className="mr-5 hover:text-gray-900">Novo Usuário</a>
                            </button>
                        </>
                    )}
                    <button className="float-right" onClick={signOut}>Sair</button>
                </nav>
            </div>
        </header>
        <Modal
            title="Adicionar Usuário"
            show={showModal}
            showModal={setShowModal}
        >
            <form className="w-full max-w-lg" onSubmit={handleSubmit(handleAddUsuario)}>
                <input type="hidden" name="idLoja" value={user?.idLoja} ref={register} />
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="cliente">
                        Nome
                    </label>
                    <input 
                    name='usuario'
                    ref={register}
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="cliente" type="text"/>
                    </div>                            
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">                            
                    <div className="w-full md:w-1/2 px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="pagament">
                        Senha
                    </label>
                    <input 
                    type="password"
                    name='senha'
                    ref={register}
                    required
                    className="block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="pagament"/>
                    </div>
                    <div className="w-full md:w-1/2 px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                        É adminstrador?
                    </label>
                    <input 
                    name='admin'
                    ref={register}
                    className="block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="checkbox"/>
                    </div>
                </div>
                <div className="text-center my-3">
                    <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">
                        Salvar
                    </button>
                </div>
            </form>                    
        </Modal>
        </>
        
    )
}