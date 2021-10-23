import { useForm } from 'react-hook-form'
import {useEffect, useState} from "react";
import { Header } from "../../components/Header";
import { Modal } from '../../components/Modal';
import { api } from '../../services/api';

export default function Produtos (){
    const [showModal, setShowModal] = useState(false);
    const [produtos, setProdutos] = useState([]);
    const { register, handleSubmit } = useForm();

    useEffect(()=>{
        api.get('/produtos/1').then(function(response){
            setProdutos(response.data)
        })
    }, [])
    
    async function handleProduto(data){
        //console.log(data)
        //await api.post('/produtos', data)
    }

    return(
        <div className="flex flex-col h-screen">
            <Header/>
            <div className="flex flex-col flex-grow justify-center items-center">
                <h1 className="text-5xl text-gray-900 leading-none flex items-center pb-4 mb-4 border-b border-gray-200">Produtos</h1>
                <section className="container mx-auto p-6 font-mono">
                    <div className="w-3/4 mx-auto mb-8 rounded-lg shadow-lg">
                        <div className="w-full relative">
                        <button className="bg-gray-600 hover:bg-gray-700 text-white text-sm px-4 py-2 border rounded-full absolute top-full left-full -translate-x-1/2 transform -translate-y-1/2" onClick={() => setShowModal(true)}>
                            +
                        </button>
                        <table className="w-full text-center">
                            <thead>
                            <tr className="text-md font-semibold tracking-wide  text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
                                <th className="px-4 py-3">Produto</th>
                                <th className="px-4 py-3">Valor</th>
                                <th className="px-4 py-3">Qte. Estoque</th>
                                <th className="px-4 py-3">Descrição</th>
                                <th className="px-4 py-3">Tipo do produto</th>
                                <th className="px-4 py-3">Cor</th>
                                <th className="px-4 py-3">Tamanho</th>
                            </tr>
                            </thead>
                            <tbody className="bg-white">
                                { produtos.map((produto,index) => {
                                    return(
                                        <tr className="text-gray-700" key={index}>
                                        <td className="px-4 py-3 border">
                                        <div className="flex items-center justify-center text-sm">
                                            <div>
                                            <p className="text-black">{produto.nome}</p>
                                            </div>
                                        </div>
                                        </td>
                                        <td className="px-4 py-3 text-ms border">R$ {produto.preco}</td>
                                        <td className="px-4 py-3 text-sm border">{produto.quantidade}</td>
                                        <td className="px-4 py-3 text-xs  border">
                                        <span className="px-2 py-1 leading-tight text-green-700 rounded-sm">{produto.descricao}</span>
                                        </td>
                                        <td className="px-4 py-3 text-xs  border">
                                        <span className="px-2 py-1 leading-tight text-green-700 rounded-sm"> {produto.tipoProduto} </span>
                                        </td>
                                        <td className="px-4 py-3 text-xs  border">
                                        <span className="px-2 py-1 leading-tight text-green-700 rounded-sm">{produto.cor}</span>
                                        </td>
                                        <td className="px-4 py-3 text-xs  border">
                                        <span className="px-2 py-1 leading-tight text-green-700 rounded-sm">{produto.tamanho}</span>
                                        </td>
                                    </tr>          
                                    )
                                })}
                            </tbody>
                        </table>
                        
                        </div>
                    </div>
                </section>
                <Modal
                    title="Adicionar Produto"
                    show={showModal}
                    showModal={setShowModal}
                >
                    <form className="w-full max-w-lg" onSubmit={handleSubmit(handleProduto)}>
                        <div className="flex flex-wrap -mx-3 mb-6">
                            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
                                Produto
                            </label>
                            <input 
                            {...register('nome')}
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text"/>
                            </div>
                            <div>
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                                Valor
                            </label>
                            <input 
                            {...register('preco')}
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text"/>
                            </div>
                        </div>
                        <div className="flex flex-wrap -mx-3 mb-6">
                            <div className="w-full md:w-1/2 px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                                QTE. Estoque
                            </label>
                            <input 
                            {...register('quantidade')}
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="number"/>
                            </div>
                            <div className="w-full md:w-1/2 px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                                Descrição
                            </label>
                            <input 
                            {...register('descricao')}
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text"/>
                            </div>
                        </div>
                        <div className="flex flex-wrap -mx-3 mb-2">
                            <div className="w-full md:w-1/3 px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                                Tipo de produto
                            </label>
                            <input 
                            {...register('tipoProduto')}
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text"/>
                            </div>
                            <div className="w-full md:w-1/3 px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                                Cor
                            </label>
                            <input 
                            {...register('cor')}
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text"/>
                            </div>
                            <div className="w-full md:w-1/3 px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                                Tamanho
                            </label>
                            <input 
                            {...register('tamanho')}
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text"/>
                            </div>
                        </div>
                        <div className="text-center my-3">
                            <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">
                                Salvar
                            </button>
                        </div>
                    </form>                    
                </Modal>
            </div>
        </div>)
}