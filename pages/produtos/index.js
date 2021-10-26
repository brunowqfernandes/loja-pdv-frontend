import { useForm } from 'react-hook-form'
import {useEffect, useState} from "react";
import { Header } from "../../components/Header";
import { Modal } from '../../components/Modal';
import { api } from '../../services/api';
import Image from 'next/image'

export default function Produtos (){
    const [showModal, setShowModal] = useState(false);
    const [produtos, setProdutos] = useState([]);    
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [ produtoExcluir, setProdutoExcluir] = useState('');
    const [ idProduto, setIdProduto] = useState(0);
    
    const { register, handleSubmit, formState: {errors} } = useForm(
        { defaultValues: {
            nome: "",
            preco: '',
            quantidade: 0,
            descricao: '',
            tipoProduto: '',
            cor: '',
            tamanho: '',
        } }
    );

    useEffect(()=>{
        api.get('/produtos/1').then(function(response){
            setProdutos(response.data)
        })
    }, [])  

    
    async function handleAddProduto(data){        
        const response = await api.post('/produtos/1', data)
        let newProdutos = produtos;
        produtos.push(data)
        setProdutos(newProdutos);
        setShowModal(false)
    }
    
    async function handleDeleteProduto(id){
        //await api.delete(`/produtos/${id}`)
        let newProdutos = produtos;        
        newProdutos.splice(newProdutos.findIndex(prod => prod.id == id),1)
        console.log(id, newProdutos)
        setProdutos(newProdutos);
    }

    return(
        <div className="flex flex-col h-screen">
            <Header/>
            <div className="flex flex-col flex-grow justify-center items-center">
                <h1 className="text-5xl text-gray-900 leading-none flex items-center pb-4 mb-4 border-b border-gray-200">Produtos</h1>
                <section className="container mx-auto p-6 font-mono">
                    <div className="w-3/4 mx-auto mb-8 rounded-lg shadow-lg">
                        <div className="w-full relative">
                        <button className="bg-gray-600 hover:bg-gray-700 text-white text-sm px-4 py-2 border rounded-full absolute top-full left-full -translate-x-1/2 transform -translate-y-1/2" onClick={() => setShowModal(true)} aria-label="adicionar um produto">
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
                                <th></th>
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
                                        <td className="px-4 py-3 text-ms border">{Number(produto.preco).toLocaleString("pt-BR", { minimumFractionDigits: 2 , style: 'currency', currency: 'BRL' })}</td>
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
                                        <td>
                                            <button onClick={() => {
                                                setIdProduto(produto.id)
                                                setProdutoExcluir(produto.nome)
                                                setShowDeleteModal(true)
                                            }}>
                                                <Image src='/delete.png' alt="lixeira" width="15" height="15"/>
                                            </button>
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
                    <form className="w-full max-w-lg" onSubmit={handleSubmit(handleAddProduto)}>
                        <div className="flex flex-wrap -mx-3 mb-6">
                            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
                                Produto
                            </label>
                            <input 
                            name='nome'
                            ref={register}
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text"/>
                            
                            </div>
                            <div>
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="preco">
                                Valor
                            </label>
                            <input
                            name='preco'
                            ref={register} 
                            type="number"
                            step="0.01"
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="preco"/>
                            </div>
                        </div>
                        <div className="flex flex-wrap -mx-3 mb-6">
                            <div className="w-full md:w-1/2 px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                                QTE. Estoque
                            </label>
                            <input 
                            name='quantidade'
                            ref={register}
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="number"/>
                            
                            </div>
                            <div className="w-full md:w-1/2 px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                                Descrição
                            </label>
                            <input 
                            name='descricao'
                            ref={register}
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text"/>
                            
                            </div>
                        </div>
                        <div className="flex flex-wrap -mx-3 mb-2">
                            <div className="w-full md:w-1/3 px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                                Tipo de produto
                            </label>
                            <input 
                            name='tipoProduto'
                            ref={register}
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text"/>
                            
                            </div>
                            <div className="w-full md:w-1/3 px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                                Cor
                            </label>
                            <input 
                            name='cor'
                            ref={register}
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text"/>
                            
                            </div>
                            <div className="w-full md:w-1/3 px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                                Tamanho
                            </label>
                            <input 
                            name='tamanho'
                            ref={register}
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
                <Modal
                    title="Atenção!"
                    show={showDeleteModal}
                    showModal={setShowDeleteModal}
                >
                    <div className="w-full text-center">
                        <p className="font-md">Tem certeza que deseja excluir o produto <strong>{produtoExcluir}</strong>?</p>
                        <div className="mt-3">
                        <button className="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 mr-3 border-blue-700 hover:border-blue-500 rounded" onClick={() => {
                            handleDeleteProduto(idProduto)
                            setShowDeleteModal(false)
                        }}>
                            Excluir
                        </button>
                        <button className="bg-gray-500 hover:bg-gray-400 text-white font-bold py-2 px-4 border-blue-700 hover:border-blue-500 rounded" onClick={(()=> {
                            setShowDeleteModal(false)
                        })}>
                            Cancelar
                        </button>
                        </div>
                    </div>
                </Modal>
            </div>
        </div>)
}