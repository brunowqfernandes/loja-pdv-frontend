import Link from 'next/link';
import {useState} from "react";
import { useForm } from 'react-hook-form';
import { Header } from "../../components/Header";
import { Modal } from '../../components/Modal';

export default function Pedidos (){
    const [showModal, setShowModal] = useState(false);
    const [pedidos, setPedidos] = useState({});
    const { register, handleSubmit } = useForm();

    useEffect(()=>{
        api.get('/pedidos/1').then(function(response){
            setPedidos(response.data)
        })
    })

    async function handlePedido(data){
        console.log(data)
        //await api.post('/produtos', data)
    }
    return(
        <div className="flex flex-col h-screen">
            <Header/>
            <div className="flex flex-col flex-grow justify-center items-center">
                <h1 className="text-5xl text-gray-900 leading-none flex items-center pb-4 mb-4 border-b border-gray-200">Pedidos</h1>
                
                <section className="container mx-auto p-6 font-mono">
                    <div className="w-3/4 mx-auto mb-8 rounded-lg shadow-lg">
                        <div className="w-full relative">
                        <button className="bg-gray-600 hover:bg-gray-700 text-white text-sm px-4 py-2 border rounded-full absolute top-full left-full -translate-x-1/2 transform -translate-y-1/2" onClick={() => setShowModal(true)}>
                            +
                        </button>
                        <table className="w-full text-center">
                            <thead>
                            <tr className="text-md font-semibold tracking-wide  text-gray-900 bg-gray-100 uppercase  border-gray-600">
                                <th className="px-4 py-3">N°</th>
                                <th className="px-4 py-3">Produtos</th>
                                <th className="px-4 py-3">Total</th>
                                <th className="px-4 py-3">Nome Cliente</th>
                                <th className="px-4 py-3">End. Cliente</th>
                                <th className="px-4 py-3">Status</th>
                            </tr>
                            </thead>
                            <tbody className="bg-white">
                            { Object.entries(pedidos).map((pedido,index) => {
                                return (
                                    <tr className="text-gray-700" key={index}>
                                        <td className="px-4 py-3 border">
                                        <div className="flex items-center justify-center text-sm">
                                            <div>
                                            <p className="text-black">{index + 1}</p>
                                            </div>
                                        </div>
                                        </td>
                                        <td className="px-4 py-3 text-ms border">
                                            <ul>
                                            { pedidos.itensPedido.map((item,index) =>{
                                                return(
                                                    <li key={index}>{`${item.nome} (${item.quantidade})`}</li>    
                                                )
                                            })}
                                            </ul>
                                        </td>
                                        <td className="px-4 py-3 text-sm border">{pedido.entrega.nomeCliente}</td>
                                        <td className="px-4 py-3 text-sm border">{pedido.entrega.endereco}</td>
                                        <td>
                                        <span className="px-2 py-1 font-semibold leading-tight text-gray-700 bg-gray-100 rounded-sm">{pedido.statusPedido}</span>
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
                    title="Adicionar Pedido"
                    show={showModal}
                    showModal={setShowModal}
                >
                    <form className="w-full max-w-lg" onSubmit={handleSubmit(handlePedido)}>
                        <div className="flex flex-wrap -mx-3 mb-6">
                            <div className="w-full px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
                                Nome do cliente
                            </label>
                            <input 
                            {...register('entrega.nomeCliente')}
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text"/>
                            </div>                            
                        </div>
                        <div className="flex flex-wrap -mx-3 mb-6">
                            <div className="w-full px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
                                Produtos
                            </label>
                            <input 
                            {...register('itensPedido')}
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text"/>
                            </div>                            
                        </div>
                        <div className="flex flex-wrap -mx-3 mb-6">                            
                            <div className="w-full md:w-1/2 px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                                Forma de pagamento
                            </label>
                            <input 
                            {...register('formaPagamento')}
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text"/>
                            </div>
                            <div className="w-full md:w-1/2 px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                                Tipo de entrega
                            </label>
                            <input 
                            {...register('entrega.tipoEntrega')}
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text"/>
                            </div>
                        </div>
                        <div className="flex flex-wrap -mx-3 mb-2">
                            <div className="w-full md:w-1/2 px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                                Valor da entrega
                            </label>
                            <input 
                            {...register('entrega.valorEntrega')}
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text"/>
                            </div>
                            <div className="w-full md:w-1/2 px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                                Endereço de entrega
                            </label>
                            <input 
                            {...register('entrega.endereco')}
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
        </div>
    )
}