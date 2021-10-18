import Head from 'next/head'
import Image from 'next/image'
import { Box } from '../../components/box'
import { Header } from '../../components/Header'
import styles from '../../styles/Home.module.css'

export default function Home() {
  return (
    <div className="flex flex-col h-screen">
      <Header/>
      <div className="flex flex-col flex-grow justify-center items-center">
        <h1 className="text-5xl text-gray-900 leading-none flex items-center pb-4 mb-4 border-b border-gray-200">Bem-vindo</h1>
        <div className="flex justify-center items-center w-full">
          <Box>
            <h2 className="text-sm tracking-widest title-font mb-4 font-medium">Total de vendas no mês</h2>
            <h1 className="text-5xl text-gray-900 leading-none flex items-center pb-4 mb-4 border-b border-gray-200">
                <span>R$538</span>
            </h1>
          </Box>
          <Box>
            <h2 className="text-sm tracking-widest title-font mb-4 font-medium">Produto A</h2>
            <p className="text-gray-600">
                Estoque: <strong>XX</strong>
            </p>
            <p className="text-gray-600 mb-6">
              Vendidos no mês: <strong>XX</strong>
            </p>
          </Box>
        </div>
      </div>
    </div>
  )
}
