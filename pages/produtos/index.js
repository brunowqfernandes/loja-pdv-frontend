import { useForm } from 'react-hook-form'
import {useContext, useEffect, useState} from "react";
import { Header } from "../../components/Header";
import { Modal } from '../../components/Modal';
import { api } from '../../services/api';
import Image from 'next/image'
import { AuthContext } from '../../contexts/AuthContext'
import { parseCookies } from 'nookies';

export default function Produtos (){
    const [showModal, setShowModal] = useState(false);
    const [produtos, setProdutos] = useState([]);    
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [ produtoExcluir, setProdutoExcluir] = useState('');
    const [ idProduto, setIdProduto] = useState(0);
    const [preco,setPreco] = useState(null);
    const [estoque,setEstoque] = useState(null);
    const { user } = useContext(AuthContext)
    
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
        if(user){

            api.get(`/produtos/${user.id}`).then(function(response){
                setProdutos(response.data.filter(produto => {
                    if( produto.tipoProduto != "DELETADO"){
                        return produto
                    }
                }))
            })
        }
    }, [user])  

    
    async function handleAddProduto(data){
        console.log(data)
        const response = await api.post(`/produtos/${user.id}`, data)        
        console.log(response.datadata)
        let newProdutos = produtos;
        newProdutos.push(response.data)
        setProdutos(newProdutos);
        setShowModal(false)
    }
    
    async function handleUpdateProduto(){        
        let newProdutos = [...produtos];
        const obj = {
            id: idProduto,
            preco: preco,
            quantidade: estoque
        }
        console.log(obj)
        const {data} = await api.put(`/produtos/${user.id}`, obj)
        newProdutos.splice(newProdutos.findIndex(prod => prod.id == data.id),1)
        console.log(newProdutos)
        newProdutos.push(data)
        await setProdutos(newProdutos);
        document.querySelector('.editar').classList.remove('editar')
    }

    async function handleDeleteProduto(id){
        let newProdutos = produtos;        
        newProdutos.splice(newProdutos.findIndex(prod => prod.id == id),1)
        await api.delete(`/produtos/${id}`)
        setProdutos(newProdutos);
    }
    

    return(
        <div className="flex flex-col h-screen overflow-x-hidden">
            <Header/>
            <div className="flex flex-col flex-grow justify-center items-center">
                <h1 className="text-5xl text-gray-900 leading-none flex items-center pb-4 mb-4 border-b border-gray-200">Produtos</h1>
                <section className="container mx-auto p-6 font-mono">
                    <div className="w-full mx-auto mb-8 rounded-lg shadow-lg">
                        <div className="w-full relative">
                            <button className="bg-gray-600 hover:bg-gray-700 text-white text-sm px-4 py-2 border rounded-full absolute top-full left-full -translate-x-1/2 transform -translate-y-1/2" onClick={() => setShowModal(true)} aria-label="adicionar um produto">
                                +
                            </button>
                            <div className='w-full overflow-auto'>
                                <table className="w-full text-center">
                                    <thead>
                                    <tr className="text-md font-semibold tracking-wide  text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
                                        <th className="px-4 py-3">Id</th>
                                        <th className="px-4 py-3">Produto</th>
                                        <th className="px-4 py-3">Valor</th>
                                        <th className="px-4 py-3">Qte. Estoque</th>
                                        <th className="px-4 py-3">Descrição</th>
                                        <th className="px-4 py-3">Tipo do produto</th>
                                        <th className="px-4 py-3">Cor</th>
                                        <th className="px-4 py-3">Tamanho</th>
                                        <th className="px-4 py-3">Ações</th>
                                    </tr>
                                    </thead>
                                    <tbody className="bg-white">
                                        { produtos.sort((a,b) => a.id - b.id ).map((produto,index) => {
                                            return(
                                                <tr className="text-gray-700" key={index}>
                                                <td className="px-4 py-3 border">{produto.id}</td>
                                                <td className="px-4 py-3 border">
                                                <div className="flex items-center justify-center text-sm">
                                                    <div>
                                                    <p className="text-black">{produto.nome}</p>
                                                    </div>
                                                </div>
                                                </td>
                                                <td className="px-4 py-3 text-ms border">
                                                    <div className="input">
                                                        {`Atual: ${Number(produto.preco).toLocaleString("pt-BR", { minimumFractionDigits: 2 , style: 'currency', currency: 'BRL' })}`}
                                                        <input type="number" step="0.01" name="preco" onChange={e => setPreco(e.target.value)} className="appearance-none w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"/>
                                                    </div>
                                                    <div className="info">
                                                        {Number(produto.preco).toLocaleString("pt-BR", { minimumFractionDigits: 2 , style: 'currency', currency: 'BRL' })}
                                                    </div>
                                                </td>
                                                <td className="px-4 py-3 text-sm border">
                                                    <div className="info">
                                                        {produto.quantidade}
                                                    </div>
                                                        <div className="input">
                                                            {`Atual: ${produto.quantidade}`}<br />
                                                            <input name="quantidade" type="number" onChange={e => setEstoque(e.target.value)} className="appearance-none w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"/>
                                                        </div>
                                                </td>
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
                                                <td className="px-4 py-3 text-xs  border">
                                                    <div className="info">
                                                    <button onClick={(e)=> {
                                                        setIdProduto(produto.id)
                                                        e.target.parentNode.parentNode.parentNode.parentNode.parentNode.classList.add('editar')
                                                    }}
                                                    aria-label="Editar produto">
                                                        <Image src='/edit.png' alt="lápis e prancheta" width="20" height="20"/>
                                                    </button>
                                                    <button onClick={() => {
                                                        setIdProduto(produto.id)
                                                        setProdutoExcluir(produto.nome)
                                                        setShowDeleteModal(true)
                                                        
                                                    }}aria-label="deletar produto">
                                                        <Image src='/delete.png' alt="lixeira" width="20" height="20"/>
                                                    </button>
                                                    </div>
                                                    <div className="input">
                                                    <button onClick={handleUpdateProduto} className="block w-full bg-gray-700 p-1 text-white cursor-pointer">Salvar</button>
                                                    </div>
                                                </td>
                                            </tr>          
                                            )
                                        })}
                                    </tbody>
                                </table>
                            </div>                        
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
                            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
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

export async function getServerSideProps(ctx) {
    // Parse
    const { 'pdv.user':usuario } = parseCookies(ctx)

    if(!usuario) {
        return{
          redirect: {
            destination: '/',
            permanent: false
          }
        }
      }
  
      return {
        props: {}
      }
  }