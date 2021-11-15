import {useContext, useEffect, useState} from "react";
import { useForm } from 'react-hook-form';
import Image from 'next/image'
import dateFormat from 'dateformat'
import { Header } from "../../components/Header";
import { Modal } from '../../components/Modal';
import { api } from '../../services/api';
import { AuthContext } from "../../contexts/AuthContext";

export default function Relatorios (){
    const [pedidos, setPedidos] = useState([]);
    const [pedidosFiltrados, setPedidosFiltrados] = useState([]);
    const [date, setDate] = useState(new Date())
    const [total, setTotal] = useState(0)
    const { user } = useContext(AuthContext)

    useEffect(()=>{
        if(user){

            api.get(`/pedidos/${user.id}`).then(function(response){
                setPedidos(response.data)
            })
        }
    }, [user])
    
    useEffect(()=>{
        const newPedidos = pedidos
        let totalAtualizado = 0
        const filter = newPedidos.filter((pedido => {
            const datePedido = new Date(pedido.dataPedido)
            if(datePedido.getUTCMonth() == date.getUTCMonth() && datePedido.getUTCFullYear() == date.getUTCFullYear()){
                totalAtualizado+= pedido.valorTotal
                return pedido
            } 
                
        }))
        setPedidosFiltrados(filter)
        setTotal(totalAtualizado);
    }, [date,pedidos])

    function handleDateFilter(e){
        const dateFilter = new Date(e.target.value)
        setDate(dateFilter)
    }

    return(
        <div className="flex flex-col h-screen">
            <Header/>
            <div className="flex flex-col flex-grow justify-center items-center">
                <h1 className="text-5xl text-gray-900 leading-none flex items-center pb-4 mb-4 border-b border-gray-200">Relatórios</h1>
                <section className="container mx-auto p-6 font-mono flex justify-center p-10">
                    <input type="month" value={`${date.getUTCFullYear()}-${(date.getUTCMonth() + 1).toLocaleString(undefined, {minimumIntegerDigits: 2, useGrouping:false})}`} onChange={handleDateFilter}/>
                </section>
                <section className="container mx-auto p-6 font-mono">
                    <div className="w-full mx-auto mb-8 rounded-lg shadow-lg">
                        <div className="w-full relative">
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
                            </tr>
                            </thead>
                            <tbody className="bg-white">
                            { pedidosFiltrados.sort((a,b)=>a.id-b.id).map((pedido) => {
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
                                        <td className="px-4 py-3 text-sm border">{Number(pedido.valorTotal ).toLocaleString("pt-BR", { minimumFractionDigits: 2 , style: 'currency', currency: 'BRL' })}</td>
                                        <td className="px-4 py-3 text-sm border">{pedido.entrega.nomeCliente}</td>
                                        <td className="px-4 py-3 text-sm border">{pedido.formaPagamento}</td>
                                        <td className="px-4 py-3 text-sm border">{pedido.entrega.tipoEntrega}</td>
                                        <td className="px-4 py-3 text-sm border">{Number(pedido.entrega.valorEntrega).toLocaleString("pt-BR", { minimumFractionDigits: 2 , style: 'currency', currency: 'BRL' })}</td>
                                        <td className="px-4 py-3 text-sm border">{pedido.entrega.endereco}</td>
                                        <td className="px-4 py-3 text-sm border">
                                        <span className="px-2 py-1 font-semibold leading-tight text-gray-700 rounded-sm">{pedido.statusPedido}</span>
                                        </td>
                                    </tr>
                                )
                            })}
                                <tr>
                                    <td colSpan="8" className="px-4 py-3 text-sm border">Total vendido no mês</td>
                                    <td colSpan="2" className="px-4 py-3 text-sm border">{total.toLocaleString("pt-BR", { minimumFractionDigits: 2 , style: 'currency', currency: 'BRL' })}</td>
                                </tr>
                            </tbody>
                        </table>
                        
                        </div>
                    </div>
                </section>
            </div>            
        </div>
    )
}