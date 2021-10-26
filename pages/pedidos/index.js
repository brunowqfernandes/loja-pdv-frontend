import {useEffect, useState} from "react";
import { useForm } from 'react-hook-form';
import Image from 'next/image'
import dateFormat from 'dateformat'
import { Header } from "../../components/Header";
import { Modal } from '../../components/Modal';
import { api } from '../../services/api';

export default function Pedidos (){
    const [showModal, setShowModal] = useState(false);
    const [pedidos, setPedidos] = useState([]);
    const [produtos, setProdutos] = useState([]);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [ idPedido, setIdPedido] = useState(0);

    const { register, handleSubmit } = useForm({
        defaultValues: {
            itensPedido: '',
            formaPagamento: '',
            entrega: {
                nomeCliente: '',
                tipoEntrega: '',
                valorEntrega: '',
                endereco: ''
            }
            
        }
    });

    useEffect(()=>{
        api.get('/pedidos/1').then(function(response){
            setPedidos(response.data)
        })
        api.get('/produtos/1').then(function(response){
            setProdutos(response.data)
        })
    }, [])

    async function handlePedido(data, e){
        //console.log(data)
        const itensPedido = []
        e.target.querySelectorAll('.select-produtos input').forEach(el => {
            if(Number(el.value.length) > 0){
                const idProduto = el.parentNode.dataset.produto
                const item = {
                    produto: {
                        id: idProduto
                    },
                    quantidade: el.value
                }
                itensPedido.push(item)
            }
        })
        data.itensPedido = itensPedido
        const response = await api.post('/pedidos', data)
        console.log(response)
        const newPedidos = pedidos;
        newPedidos.push(data)
        setPedidos(newPedidos);
        setShowModal(false)
    }
    async function handleDeletePedido(id){
        await api.delete(`/produtos/${id}`)
        let newPedidos = pedidos;        
        newPedidos.splice(newPedidos.findIndex(prod => prod.id == id),1)
        console.log(id, newPedidos)
        setPedidos(newPedidos);
    }


    return(
        <div className="flex flex-col h-screen">
            <Header/>
            <div className="flex flex-col flex-grow justify-center items-center">
                <h1 className="text-5xl text-gray-900 leading-none flex items-center pb-4 mb-4 border-b border-gray-200">Pedidos</h1>
                
                <section className="container mx-auto p-6 font-mono">
                    <div className="w-full mx-auto mb-8 rounded-lg shadow-lg">
                        <div className="w-full relative">
                        <button className="bg-gray-600 hover:bg-gray-700 text-white text-sm px-4 py-2 border rounded-full absolute top-full left-full -translate-x-1/2 transform -translate-y-1/2" onClick={() => setShowModal(true)}>
                            +
                        </button>
                        <table className="w-full text-center">
                            <thead>
                            <tr className="text-md font-semibold tracking-wide  text-gray-900 bg-gray-100 uppercase  border-gray-600">
                                <th className="px-4 py-3">N°</th>
                                <th className="px-4 py-3">Data do Pedido</th>
                                <th className="px-4 py-3">Produtos</th>
                                <th className="px-4 py-3">Total</th>
                                <th className="px-4 py-3">Cliente</th>
                                <th className="px-4 py-3">Forma de pagamento</th>
                                <th className="px-4 py-3">Tipo de Entrega</th>
                                <th className="px-4 py-3">Valor da entrega</th>
                                <th className="px-4 py-3">End. Entrega</th>
                                <th className="px-4 py-3">Status</th>
                                <th className="px-4 py-3"></th>
                            </tr>
                            </thead>
                            <tbody className="bg-white">
                            { pedidos.map((pedido,index) => {
                                return (
                                    <tr className="text-gray-700" key={pedido.id}>
                                        <td className="px-4 py-3 border">
                                        <div className="flex items-center justify-center text-sm">
                                            <div>
                                            <p className="text-black">{pedido.id}</p>
                                            </div>
                                        </div>
                                        </td>
                                        <td className="px-4 py-3 border">{dateFormat(pedido.dataPedido, 'dd/mm/yyyy')}</td>
                                        <td className="px-4 py-3 text-sm border">
                                            <ul>
                                            { pedido.itensPedido?.map((item,index) =>{
                                                return(
                                                    <li key={index}>{`${item.produto.nome} (${item.quantidade})`}</li>    
                                                )
                                            })}
                                            </ul>
                                        </td>
                                        <td className="px-4 py-3 text-sm border">{Number(pedido.valorTotal).toLocaleString("pt-BR", { minimumFractionDigits: 2 , style: 'currency', currency: 'BRL' })}</td>
                                        <td className="px-4 py-3 text-sm border">{pedido.entrega.nomeCliente}</td>
                                        <td className="px-4 py-3 text-sm border">{pedido.formaPagamento}</td>
                                        <td className="px-4 py-3 text-sm border">{pedido.entrega.tipoEntrega}</td>
                                        <td className="px-4 py-3 text-sm border">{Number(pedido.entrega.valorEntrega).toLocaleString("pt-BR", { minimumFractionDigits: 2 , style: 'currency', currency: 'BRL' })}</td>
                                        <td className="px-4 py-3 text-sm border">{pedido.entrega.endereco}</td>
                                        <td className="px-4 py-3 text-sm border">
                                        <span className="px-2 py-1 font-semibold leading-tight text-gray-700 rounded-sm">{pedido.statusPedido}</span>
                                        </td>
                                        <td className="px-4 py-3 text-sm border">
                                            <button onClick={() => {
                                                setIdPedido(pedido.id)                                                
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
                    title="Adicionar Pedido"
                    show={showModal}
                    showModal={setShowModal}
                >
                    <form className="w-full max-w-lg" onSubmit={handleSubmit(handlePedido)}>
                        <input type="hidden" name="vendedor.id" value="1" ref={register} />
                        <div className="flex flex-wrap -mx-3 mb-6">
                            <div className="w-full px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="cliente">
                                Nome do cliente
                            </label>
                            <input 
                            name='entrega.nomeCliente'
                            ref={register}
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="cliente" type="text"/>
                            </div>                            
                        </div>
                        <div className="flex flex-wrap -mx-3 mb-6">
                            <div className="w-full px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
                                Produtos
                            </label>
                                <div className="select-produtos w-full text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight">
                                    {produtos.map((produto)=>{
                                        return(
                                            produto.quantidade > 0 && (
                                                <div className="flex items-center justify-between font-bold" data-produto={produto.id} key={produto.id}>{produto.nome} (Disponível: {produto.quantidade})<input type="number" max={produto.quantidade} step="1" className="appearance-none w-3/12 bg-white-200 text-gray-700 border border-gray-300 rounded py-3 px-4 leading-tight focus:outline-none " /></div>
                                            )
                                        )
                                    })}
                                </div>
                            </div>                            
                        </div>
                        <div className="flex flex-wrap -mx-3 mb-6">                            
                            <div className="w-full md:w-1/2 px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="pagament">
                                Forma de pagamento
                            </label>
                            <select 
                            name='formaPagamento'
                            ref={register}
                            className="block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="pagament" type="text">
                                <option value="" selected hidden>SELECIONE</option>
                                <option value="DINHEIRO">DINHEIRO</option>    
                                <option value="DEBITO">DEBITO</option>    
                                <option value="CREDITO">CREDITO</option>    
                                <option value="PIX">PIX</option>    
                            </select>                            
                            </div>
                            <div className="w-full md:w-1/2 px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                                Tipo de entrega
                            </label>
                            <select 
                            name='entrega.tipoEntrega'
                            ref={register}
                            className="block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text">
                                <option value="" selected hidden>SELECIONE</option>
                                <option value="METRO">METRO</option>
                                <option value="RETIRADA">RETIRADA</option>
                                <option value="MOTOBOY">MOTOBOY</option>
                                <option value="CORREIOS">CORREIOS</option>
                            </select>
                            </div>
                        </div>
                        <div className="flex flex-wrap -mx-3 mb-2">
                            <div className="w-full md:w-1/2 px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="entrega">
                                Valor da entrega
                            </label>
                            <input 
                            name='entrega.valorEntrega'
                            ref={register}
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="entrega" type="number" step="0.01"/>
                            </div>
                            <div className="w-full md:w-1/2 px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="endereco">
                                Endereço de entrega
                            </label>
                            <input 
                            name='entrega.endereco'
                            ref={register}
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="endereco" type="text"/>
                            </div>
                        </div>
                        <div className="flex flex-wrap -mx-3 mb-6">
                            <div className="w-full px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="status">
                                Status do pedido
                            </label>
                            <select 
                            name="statusPedido" 
                            ref={register}
                            className="block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="status" type="text">
                                <option value="" selected hidden>SELECIONE</option>
                                <option value="AGUARDANDO_ESTOQUE">AGUARDANDO ESTOQUE</option>
                                <option value="REALIZADO">REALIZADO</option>
                                <option value="ENTREGUE">ENTREGUE</option>
                                <option value="CANCELADO">CANCELADO</option>
                            </select>
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
                        <p className="font-md">Tem certeza que deseja excluir o pedido?</p>
                        <div className="mt-3">
                        <button className="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 mr-3 border-blue-700 hover:border-blue-500 rounded" onClick={() => {
                            handleDeletePedido(idPedido)
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
        </div>
    )
}