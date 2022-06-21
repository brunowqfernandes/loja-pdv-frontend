import {useContext, useEffect, useState} from "react";
import { useForm } from 'react-hook-form';
import Image from 'next/image'
import dateFormat from 'dateformat'
import { Header } from "../../components/Header";
import { Modal } from '../../components/Modal';
import { api } from '../../services/api';
import { AuthContext } from "../../contexts/AuthContext";
import { parseCookies } from "nookies";
import axios from "axios";

export default function Pedidos (){
    const [showModal, setShowModal] = useState(false);
    const [showError, setShowError] = useState(false);
    const [pedidos, setPedidos] = useState([]);
    const [produtos, setProdutos] = useState([]);
    const [idPedido, setIdPedido] = useState(0);
    const [cep, setCep] = useState('');
    const [statusPedido, setStatusPedido] = useState(0);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const { user } = useContext(AuthContext)

    const { register, handleSubmit } = useForm({
        defaultValues: {
            itensPedido: '',
            formaPagamento: '',
            entrega: {
                nomeCliente: '',
                tipoEntrega: '',
                valorEntrega: '',
                cep: '',
                endereco: '',
                num: '',
                bairro: ''
            }
            
        }
    });

    useEffect(()=>{
        if(user){
            api.get(`/pedidos/${user.id}`).then(function(response){
                setPedidos(response.data)
            })
            api.get(`/produtos/${user.id}`).then(function(response){
                setProdutos(response.data.filter(produto => {
                    if( produto.tipoProduto !== "DELETADO"){
                        return produto
                    }
                }))
            })
        }
    }, [user])

    async function verificaCep() {
        if (cep.length == 8) {
            setShowError(false)
            const {data} = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
            if(data.erro) {
                setShowError(true);
                return
            }
            console.log(data);
            document.querySelector('[name="entrega.endereco"]').value = data.logradouro;
            document.querySelector('[name="entrega.cep"]').value = data.cep;
            document.querySelector('[name="entrega.bairro"]').value = data.bairro;
        }
    }

    async function handlePedido(data, e){
        console.log(data)
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
        if(!itensPedido.length){
            alert('É preciso selecionar ao menos um produto')
            return
        }        
        const endereco = `${data.entrega.endereco}, ${data.entrega.num} - ${data.entrega.bairro} - ${data.entrega.cep}`
        data.itensPedido = itensPedido
        data.entrega.endereco = endereco
        console.log(data)
        const response = await api.post('/pedidos', data)        
        console.log(response.data)
        const newPedidos = pedidos;
        newPedidos.push(response.data)
        setPedidos(newPedidos);
        setShowModal(false)
        const prod = await api.get(`/produtos/${user.id}`)
        setProdutos(prod.data)
    }
    async function handleUpdatePedido(){
        let newPedidos = [...pedidos];
        const obj = {
            id: idPedido,
            statusPedido: statusPedido
        }
        const {data} = await api.put(`/pedidos`, obj)
        newPedidos.splice(newPedidos.findIndex(ped => ped.id == data.id),1)
        newPedidos.push(data)
        setPedidos(newPedidos);
        document.querySelector('.editar').classList.remove('editar')
    }

    async function handleDeletePedido(id){
        await api.delete(`/produtos/${id}`)
        let newPedidos = pedidos;        
        newPedidos.splice(newPedidos.findIndex(prod => prod.id == id),1)
        console.log(id, newPedidos)
        setPedidos(newPedidos);
    }


    return(
        <div className="flex flex-col h-screen" aria-live="polite">
            <Header/>
            <div className="flex flex-col flex-grow justify-center items-center" role="main">
                <h1 className="text-5xl text-gray-900 leading-none flex items-center pb-4 mb-4 border-b border-gray-200">Pedidos</h1>
                
                <section className="container mx-auto p-6 font-mono">
                    <div className="w-full mx-auto mb-8 rounded-lg shadow-lg">
                        <div className="w-full relative">
                        <button className="bg-gray-600 hover:bg-gray-700 text-white text-sm px-4 py-2 border rounded-full absolute top-full left-full -translate-x-1/2 transform -translate-y-1/2" onClick={() => setShowModal(true)} aria-label="Adicionar novo pedido">
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
                                <th className="px-4 py-3" aria-label="Endereço de entrega">End. Entrega</th>
                                <th className="px-4 py-3">Status</th>
                                <th className="px-4 py-3">Ações</th>
                            </tr>
                            </thead>
                            <tbody className="bg-white">
                            { pedidos.sort((a,b)=>a.id-b.id).map((pedido) => {
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
                                            <div className="info">
                                                <span className="px-2 py-1 font-semibold leading-tight text-gray-700 rounded-sm">{pedido.statusPedido}</span>
                                            </div>
                                            <div className="input">
                                            <select 
                                            name="statusPedido"
                                            onChange={e => setStatusPedido(e.target.value)}
                                            className="block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="status" type="text">
                                                <option value="AGUARDANDO_ESTOQUE">AGUARDANDO ESTOQUE</option>
                                                <option value="REALIZADO">REALIZADO</option>
                                                <option value="ENTREGUE">ENTREGUE</option>
                                                <option value="CANCELADO">CANCELADO</option>
                                            </select>
                                            <input id={`submit${pedido.id}`} type="submit" hidden />
                                            </div>
                                        </td>
                                        <td className="px-4 py-3 text-xs  border">
                                            <div className="info">
                                            <button onKeyUp={(e) => {
                                                if(e.key == "ENTER") {
                                                    setIdPedido(pedido.id)
                                                    e.target.parentNode.parentNode.parentNode.parentNode.parentNode.classList.add('editar')
                                                    e.currentTarget.parentNode.parentNode.previousSibling.focus();
                                                }
                                            }
                                                
                                            } onClick={(e)=> {
                                                setIdPedido(pedido.id)
                                                e.currentTarget.parentNode.parentNode.parentNode.classList.add('editar')
                                                e.currentTarget.parentNode.parentNode.previousSibling.focus();
                                            }}
                                            tabIndex="1"
                                            aria-label="Editar produto">
                                                <Image src='/edit.png' alt="lápis e prancheta" width="20" height="20"/>
                                            </button>
                                            {/* <button onClick={() => {
                                                setIdProduto(produto.id)
                                                setProdutoExcluir(produto.nome)
                                                setShowDeleteModal(true)
                                                
                                            }}aria-label="deletar produto">
                                                <Image src='/delete.png' alt="lixeira" width="15" height="15"/>
                                            </button> */}
                                            </div>
                                            <div className="input">
                                            <button onClick={handleUpdatePedido } className="block w-full bg-gray-700 p-1 text-white cursor-pointer">Salvar</button>
                                            </div>
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
                        <input type="hidden" name="vendedor.id" value={user?.id} ref={register} />
                        <div className="flex flex-wrap -mx-3 mb-6">
                            <div className="w-full px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="cliente">
                                Nome do cliente
                            </label>
                            <input 
                            name='entrega.nomeCliente'
                            ref={register}
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="cliente" type="text" aria-label="Digitie o nome do cliente"/>
                            </div>                            
                        </div>
                        <div className="flex flex-wrap -mx-3 mb-6">
                            <div className="w-full px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
                                Produtos
                            </label>
                            <p><strong>Obs.:</strong>Para adicionar um produto ao pedido, basta aumentar a sua quantidade</p>
                                <div className="select-produtos w-full text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight">
                                    {produtos.map((produto)=>{
                                        return(
                                            produto.quantidade > 0 && (
                                                <div className="flex items-center justify-between font-bold" data-produto={produto.id} key={produto.id}>{produto.nome} (Disponível: {produto.quantidade})<input type="number" max={produto.quantidade} step="1" className="appearance-none w-3/12 bg-white-200 text-gray-700 border border-gray-300 rounded py-3 px-4 leading-tight focus:outline-none " aria-label={`${produto.nome}, quantidade disponível: ${produto.quantidade}`}/></div>
                                            )
                                        )
                                    })}
                                </div>
                            </div>                            
                        </div>
                        <div className="flex flex-wrap -mx-3 mb-6">                            
                            <div className="w-full md:w-1/2 px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="pagament" >
                                Forma de pagamento
                            </label>
                            <select 
                            name='formaPagamento'
                            ref={register}
                            required
                            className="block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="pagament" type="text" aria-label="Selecione a forma de pagamento do pedido">
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
                            required
                            ref={register}
                            className="block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" aria-label="Selecione o tipo de entrega do pedido">
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
                            required
                            ref={register}
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="entrega" type="number" step="0.01" aria-label="Digite o valor da entrega"/>
                            </div>
                            <div className="w-full md:w-1/2 px-3 flex items-end gap-2">
                                <div className="w-3/4">
                                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="endereco" aria-label="Digite um cep para buscar o endereço">
                                        CEP
                                    </label>
                                    <input 
                                    name='entrega.cep'
                                    required
                                    ref={register}
                                    maxlength="8"
                                    onChange={(e) => setCep(e.target.value)}
                                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="endereco" type="text"/>
                                    {showError && <p className="text-red-500">Cep não encontrado. <br /> Insira manualmente o endereco.</p>}
                                </div>
                                <div className="w-1/4">
                                    <button type="button" aria-label="pesquisar cep" onClick={verificaCep}>
                                        <Image src='/lupa.png' alt="lupa" width="20" height="20"/>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-wrap -mx-3 mb-2">
                            <div className="w-full px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="endereco">
                                Rua
                            </label>
                            <input 
                            name='entrega.endereco'
                            required
                            
                            ref={register}
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="endereco" type="text"/>
                            </div>
                        </div>
                        <div className="flex flex-wrap -mx-3 mb-2">
                            <div className="w-full md:w-4/12 px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="endereco">
                                Número
                            </label>
                            <input 
                            name='entrega.num'
                            required
                            ref={register}
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="endereco" type="text" aria-label="Digite o número do endereço"/>
                            </div>
                            <div className="w-full md:w-8/12 px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="endereco">
                                Bairro
                            </label>
                            <input 
                            name='entrega.bairro'
                            required
                            
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
                            required
                            className="block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="status" type="text" aria-label="Selecione o estado atual do pedido">
                                <option value="" selected hidden>SELECIONE</option>
                                <option value="AGUARDANDO_ESTOQUE">AGUARDANDO ESTOQUE</option>
                                <option value="REALIZADO">REALIZADO</option>
                                <option value="ENTREGUE">ENTREGUE</option>
                                <option value="CANCELADO">CANCELADO</option>
                            </select>
                            </div>                            
                        </div>
                        <div className="text-center my-3">
                            <button className="bg-blue-500 shadow hover:bg-blue-400 text-white font-bold py-2 px-4 border-blue-700 hover:border-blue-500 rounded" aria-label="Clique para salvar o pedido">
                                Salvar
                            </button>
                            <button type="button" className="mr-2 hover:bg-blue-400 font-bold py-2 px-4 shadow border-blue-700 hover:text-white rounded" aria-label="Clique para descartar as informações" onClick={(e) => {setShowModal(false)}}>
                                Cancelar
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