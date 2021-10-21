import { useForm } from 'react-hook-form'
import {useEffect, useState} from "react";
import { Header } from "../../components/Header";
import { Modal } from '../../components/Modal';
import { api } from '../../services/api';

export default function Produtos (){
    const [showModal, setShowModal] = useState(false);
    const [produtos, setProdutos] = useState({});
    const { register, handleSubmit } = useForm();

    useEffect(()=>{
        api.get('/produtos/1').then(function(){
        })
    })
    
    async function handleProduto(data){
        //console.log(data)
        await api.post('/produtos', data)
    }

    return(
        <div className="flex flex-col h-screen">
            <Header/>
            <div className="flex flex-col flex-grow justify-center items-center">
                <h1 className="text-5xl text-gray-900 leading-none flex items-center pb-4 mb-4 border-b border-gray-200">Produtos</h1>
                <section class="container mx-auto p-6 font-mono">
                    <div class="w-3/4 mx-auto mb-8 rounded-lg shadow-lg">
                        <div class="w-full relative">
                        <button class="bg-gray-600 hover:bg-gray-700 text-white text-sm px-4 py-2 border rounded-full absolute top-full left-full -translate-x-1/2 transform -translate-y-1/2" onClick={() => setShowModal(true)}>
                            +
                        </button>
                        <table class="w-full text-center">
                            <thead>
                            <tr class="text-md font-semibold tracking-wide  text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
                                <th class="px-4 py-3">Produto</th>
                                <th class="px-4 py-3">Valor</th>
                                <th class="px-4 py-3">Qte. Estoque</th>
                                <th class="px-4 py-3">Descrição</th>
                                <th class="px-4 py-3">Tipo do produto</th>
                                <th class="px-4 py-3">Cor</th>
                                <th class="px-4 py-3">Tamanho</th>
                            </tr>
                            </thead>
                            <tbody class="bg-white">
                            <tr class="text-gray-700">
                                <td class="px-4 py-3 border">
                                <div class="flex items-center justify-center text-sm">
                                    <div>
                                    <p class="text-black">Produto A</p>
                                    </div>
                                </div>
                                </td>
                                <td class="px-4 py-3 text-ms border">R$ 22,00</td>
                                <td class="px-4 py-3 text-sm border">15</td>
                                <td class="px-4 py-3 text-xs  border">
                                <span class="px-2 py-1 leading-tight text-green-700 rounded-sm"> ... </span>
                                </td>
                                <td class="px-4 py-3 text-xs  border">
                                <span class="px-2 py-1 leading-tight text-green-700 rounded-sm"> ... </span>
                                </td>
                                <td class="px-4 py-3 text-xs  border">
                                <span class="px-2 py-1 leading-tight text-green-700 rounded-sm"> ... </span>
                                </td>
                                <td class="px-4 py-3 text-xs  border">
                                <span class="px-2 py-1 leading-tight text-green-700 rounded-sm"> ... </span>
                                </td>
                            </tr>
                            <tr class="text-gray-700">
                                <td class="px-4 py-3 border">
                                <div class="flex items-center justify-center text-sm">
                                    <div>
                                    <p class="text-black">Produto B</p>
                                    </div>
                                </div>
                                </td>
                                <td class="px-4 py-3 text-md border">R$ 27,00</td>
                                <td class="px-4 py-3 text-xs  border">
                                <span class="px-2 py-1 leading-tight text-orange-700 rounded-sm"> ... </span>
                                </td>
                                <td class="px-4 py-3 text-sm border">0</td>
                            </tr>
                            <tr class="text-gray-700">
                                <td class="px-4 py-3 border">
                                <div class="flex items-center justify-center text-sm">
                                    <div>
                                    <p class="font-semibold">Produto C</p>
                                    </div>
                                </div>
                                </td>
                                <td class="px-4 py-3 text-md border">R$ 17,00</td>
                                <td class="px-4 py-3 text- xs border">
                                <span class="px-2 py-1 leading-tight text-red-700 rounded-sm"> ... </span>
                                </td>
                                <td class="px-4 py-3 text-sm border">22</td>
                            </tr>
                            <tr class="text-gray-700">
                                <td class="px-4 py-3 border">
                                <div class="flex items-center justify-center text-sm">
                                    <div>
                                    <p class="font-semibold">Produto D</p>
                                    </div>
                                </div>
                                </td>
                                <td class="px-4 py-3 border text-md ">R$ 23,00</td>
                                <td class="px-4 py-3 border  text-xs">
                                <span class="px-2 py-1 leading-tight text-green-700 rounded-sm"> ... </span>
                                </td>
                                <td class="px-4 py-3 border text-sm">35</td>
                            </tr>
                            </tbody>
                        </table>
                        
                        </div>
                    </div>
                </section>
                <Modal
                    title="Adicionar Pedido"
                    show={showModal}
                    showModal={setShowModal}
                >
                    <form class="w-full max-w-lg" onSubmit={handleSubmit(handleProduto)}>
                        <div class="flex flex-wrap -mx-3 mb-6">
                            <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                                Produto
                            </label>
                            <input 
                            {...register('nome')}
                            class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text"/>
                            </div>
                            <div>
                            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
                                Valor
                            </label>
                            <input 
                            {...register('preco')}
                            class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text"/>
                            </div>
                        </div>
                        <div class="flex flex-wrap -mx-3 mb-6">
                            <div class="w-full md:w-1/2 px-3">
                            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
                                QTE. Estoque
                            </label>
                            <input 
                            {...register('quantidade')}
                            class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="number"/>
                            </div>
                            <div class="w-full md:w-1/2 px-3">
                            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
                                Descrição
                            </label>
                            <input 
                            {...register('descricao')}
                            class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text"/>
                            </div>
                        </div>
                        <div class="flex flex-wrap -mx-3 mb-2">
                            <div class="w-full md:w-1/3 px-3">
                            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
                                Tipo de produto
                            </label>
                            <input 
                            {...register('tipoProduto')}
                            class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text"/>
                            </div>
                            <div class="w-full md:w-1/3 px-3">
                            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
                                Cor
                            </label>
                            <input 
                            {...register('cor')}
                            class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text"/>
                            </div>
                            <div class="w-full md:w-1/3 px-3">
                            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
                                Tamanho
                            </label>
                            <input 
                            {...register('tamanho')}
                            class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text"/>
                            </div>
                        </div>
                        <div className="text-center my-3">
                            <button class="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">
                                Salvar
                            </button>
                        </div>
                    </form>                    
                </Modal>
            </div>
        </div>)
}