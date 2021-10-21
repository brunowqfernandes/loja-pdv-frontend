import Link from 'next/link';
import {useState} from "react";
import { Header } from "../../components/Header";
import { Modal } from '../../components/Modal';

export default function Pedidos (){
    const [showModal, setShowModal] = useState(false);
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
                            <tr className="text-gray-700">
                                <td className="px-4 py-3 border">
                                <div className="flex items-center justify-center text-sm">
                                    <div>
                                    <p className="text-black">1</p>
                                    </div>
                                </div>
                                </td>
                                <td className="px-4 py-3 text-ms border">
                                    <ul>
                                        <li><Link href="/produto-x"><a className="mr-5 hover:text-gray-900">Produto A (1)</a></Link></li>
                                        <li><Link href="/produto-x"><a className="mr-5 hover:text-gray-900">Produto B (8)</a></Link></li>
                                        <li><Link href="/produto-x"><a className="mr-5 hover:text-gray-900">Produto D (3)</a></Link></li>
                                    </ul>
                                </td>
                                <td className="px-4 py-3 text-xs  border">
                                <span className="px-2 py-1 leading-tight text-green-700 rounded-sm"> R$350,00 </span>
                                </td>
                                <td className="px-4 py-3 text-sm border">Bruno</td>
                                <td className="px-4 py-3 text-sm border">Rua a, número 00, SP</td>
                                <td>
                                <span className="px-2 py-1 font-semibold leading-tight text-gray-700 bg-gray-100 rounded-sm"> Aguardando Pagamento </span>
                                </td>
                            </tr>
                            <tr className="text-gray-700">
                                <td className="px-4 py-3 border">
                                <div className="flex items-center justify-center text-sm">
                                    <div>
                                    <p className="text-black">2</p>
                                    </div>
                                </div>
                                </td>
                                <td className="px-4 py-3 text-ms border">
                                    <ul>
                                        <li><Link href="/produto-x"><a className="mr-5 hover:text-gray-900">Produto A (11)</a></Link></li>
                                        <li><Link href="/produto-x"><a className="mr-5 hover:text-gray-900">Produto AB (1)</a></Link></li>
                                        <li><Link href="/produto-x"><a className="mr-5 hover:text-gray-900">Produto DEF (5)</a></Link></li>
                                    </ul>
                                </td>
                                <td className="px-4 py-3 text-xs  border">
                                <span className="px-2 py-1 leading-tight text-green-700 rounded-sm"> R$799,99 </span>
                                </td>
                                <td className="px-4 py-3 text-sm border">Esther</td>
                                <td className="px-4 py-3 text-sm border">Rua fghi, número 000000, SP</td>
                                <td>
                                <span className="px-2 py-1 font-semibold leading-tight text-gray-700 bg-gray-100 rounded-sm"> Aguardando Pagamento </span>
                                </td>
                            </tr>
                            <tr className="text-gray-700">
                                <td className="px-4 py-3 border">
                                <div className="flex items-center justify-center text-sm">
                                    <div>
                                    <p className="text-black">3</p>
                                    </div>
                                </div>
                                </td>
                                <td className="px-4 py-3 text-ms border">
                                    <ul>
                                        <li><Link href="/produto-x"><a className="mr-5 hover:text-gray-900">Produto N (1)</a></Link></li>
                                        <li><Link href="/produto-x"><a className="mr-5 hover:text-gray-900">Produto QRS (18)</a></Link></li>
                                        <li><Link href="/produto-x"><a className="mr-5 hover:text-gray-900">Produto WXY (3)</a></Link></li>
                                    </ul>
                                </td>
                                <td className="px-4 py-3 text-xs  border">
                                <span className="px-2 py-1 leading-tight text-green-700 rounded-sm"> R$556,00 </span>
                                </td>
                                <td className="px-4 py-3 text-sm border">Henrique</td>
                                <td className="px-4 py-3 text-sm border">Rua abxy, número 000, SP</td>
                                <td>
                                <span className="px-2 py-1 font-semibold leading-tight text-white-100 bg-red-400 rounded-sm"> Cancelado </span>
                                </td>
                            </tr>
                            <tr className="text-gray-700">
                                <td className="px-4 py-3 border">
                                <div className="flex items-center justify-center text-sm">
                                    <div>
                                    <p className="text-black">4</p>
                                    </div>
                                </div>
                                </td>
                                <td className="px-4 py-3 text-ms border">
                                    <ul>
                                        <li><Link href="/produto-x"><a className="mr-5 hover:text-gray-900">Produto JB (3)</a></Link></li>
                                        <li><Link href="/produto-x"><a className="mr-5 hover:text-gray-900">Produto HH (2)</a></Link></li>
                                        <li><Link href="/produto-x"><a className="mr-5 hover:text-gray-900">Produto XYZ (2)</a></Link></li>
                                    </ul>
                                </td>
                                <td className="px-4 py-3 text-xs  border">
                                <span className="px-2 py-1 leading-tight text-green-700 rounded-sm"> R$159,80 </span>
                                </td>
                                <td className="px-4 py-3 text-sm border">PH</td>
                                <td className="px-4 py-3 text-sm border">Rua abcd, número 000, SP</td>
                                <td>
                                <span className="px-2 py-1 font-semibold leading-tight text-gray-700 bg-yellow-100 rounded-sm"> Enviado </span>
                                </td>
                            </tr>
                            <tr className="text-gray-700">
                                <td className="px-4 py-3 border">
                                <div className="flex items-center justify-center text-sm">
                                    <div>
                                    <p className="text-black">5</p>
                                    </div>
                                </div>
                                </td>
                                <td className="px-4 py-3 text-ms border">
                                    <ul>
                                        <li><Link href="/produto-x"><a className="mr-5 hover:text-gray-900">Produto C (3)</a></Link></li>
                                        <li><Link href="/produto-x"><a className="mr-5 hover:text-gray-900">Produto D (5)</a></Link></li>
                                        <li><Link href="/produto-x"><a className="mr-5 hover:text-gray-900">Produto J (2)</a></Link></li>
                                        <li><Link href="/produto-x"><a className="mr-5 hover:text-gray-900">Produto XY (15)</a></Link></li>
                                    </ul>
                                </td>
                                <td className="px-4 py-3 text-xs  border">
                                <span className="px-2 py-1 leading-tight text-green-700 rounded-sm"> R$1250,00 </span>
                                </td>
                                <td className="px-4 py-3 text-sm border">Marcos</td>
                                <td className="px-4 py-3 text-sm border">Rua XX, número 000, SP</td>
                                <td>
                                <span className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-sm"> Entregue </span>
                                </td>
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
                    <form class="w-full max-w-lg">
                        <div class="flex flex-wrap -mx-3 mb-6">
                            <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                                Produto
                            </label>
                            <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text"/>
                            <p class="text-red-500 text-xs italic">Please fill out this field.</p>
                            </div>
                            <div class="w-full md:w-1/2 px-3">
                            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
                                Quantidade
                            </label>
                            <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="number"/>
                            </div>
                        </div>
                        <div class="flex flex-wrap -mx-3 mb-6">
                            <div class="w-full px-3">
                            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
                                Password
                            </label>
                            <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="password" placeholder="******************"/>
                            <p class="text-gray-600 text-xs italic">Make it as long and as crazy as you'd like</p>
                            </div>
                        </div>
                        <div class="flex flex-wrap -mx-3 mb-2">
                            <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-city">
                                City
                            </label>
                            <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-city" type="text" placeholder="Albuquerque"/>
                            </div>
                            <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-state">
                                State
                            </label>
                            <div class="relative">
                                <select class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
                                <option>New Mexico</option>
                                <option>Missouri</option>
                                <option>Texas</option>
                                </select>
                                <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                                </div>
                            </div>
                            </div>
                            <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-zip">
                                Zip
                            </label>
                            <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-zip" type="text" placeholder="90210"/>
                            </div>
                        </div>
                    </form>
                </Modal>
            </div>            
        </div>
    )
}