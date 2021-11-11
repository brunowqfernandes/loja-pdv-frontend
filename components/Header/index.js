import Link from 'next/link'
import { useContext } from 'react'
import { AuthContext } from '../../contexts/AuthContext'

export function Header () {
    const { user, signOut } = useContext(AuthContext)
    return(
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
                            <Link href="/usuarios">
                                <a className="mr-5 hover:text-gray-900">Novo Usuário</a>
                            </Link>
                        </>
                    )}
                    <button className="float-right" onClick={signOut}>Sair</button>
                </nav>
            </div>
        </header>
    )
}