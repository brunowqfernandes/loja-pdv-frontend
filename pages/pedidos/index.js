import Link from 'next/link';
import { Header } from "../../components/Header";

export default function Pedidos (){
    function handleAddPedido(e){
        
    }
    return(
        <div className="flex flex-col h-screen">
            <Header/>
            <div className="flex flex-col flex-grow justify-center items-center">
                <h1 className="text-5xl text-gray-900 leading-none flex items-center pb-4 mb-4 border-b border-gray-200">Pedidos</h1>
                <section class="container mx-auto p-6 font-mono">
                    <div class="w-3/4 mx-auto mb-8 rounded-lg shadow-lg">
                        <div class="w-full relative">
                        <button class="bg-gray-600 hover:bg-gray-700 text-white text-sm px-4 py-2 border rounded-full absolute top-full left-full -translate-x-1/2 transform -translate-y-1/2" onClick={handleAddPedido}>
                            +
                        </button>
                        <table class="w-full text-center">
                            <thead>
                            <tr class="text-md font-semibold tracking-wide  text-gray-900 bg-gray-100 uppercase  border-gray-600">
                                <th class="px-4 py-3">N°</th>
                                <th class="px-4 py-3">Produtos</th>
                                <th class="px-4 py-3">Total</th>
                                <th class="px-4 py-3">Nome Cliente</th>
                                <th class="px-4 py-3">End. Cliente</th>
                                <th class="px-4 py-3">Status</th>
                            </tr>
                            </thead>
                            <tbody class="bg-white">
                            <tr class="text-gray-700">
                                <td class="px-4 py-3 border">
                                <div class="flex items-center justify-center text-sm">
                                    <div>
                                    <p class="text-black">1</p>
                                    </div>
                                </div>
                                </td>
                                <td class="px-4 py-3 text-ms border">
                                    <ul>
                                        <li><Link href="/produto-x"><a className="mr-5 hover:text-gray-900">Produto A (1)</a></Link></li>
                                        <li><Link href="/produto-x"><a className="mr-5 hover:text-gray-900">Produto B (8)</a></Link></li>
                                        <li><Link href="/produto-x"><a className="mr-5 hover:text-gray-900">Produto D (3)</a></Link></li>
                                    </ul>
                                </td>
                                <td class="px-4 py-3 text-xs  border">
                                <span class="px-2 py-1 leading-tight text-green-700 rounded-sm"> R$350,00 </span>
                                </td>
                                <td class="px-4 py-3 text-sm border">Bruno</td>
                                <td class="px-4 py-3 text-sm border">Rua a, número 00, SP</td>
                                <td>
                                <span class="px-2 py-1 font-semibold leading-tight text-gray-700 bg-gray-100 rounded-sm"> Aguardando Pagamento </span>
                                </td>
                            </tr>
                            <tr class="text-gray-700">
                                <td class="px-4 py-3 border">
                                <div class="flex items-center justify-center text-sm">
                                    <div>
                                    <p class="text-black">2</p>
                                    </div>
                                </div>
                                </td>
                                <td class="px-4 py-3 text-ms border">
                                    <ul>
                                        <li><Link href="/produto-x"><a className="mr-5 hover:text-gray-900">Produto A (11)</a></Link></li>
                                        <li><Link href="/produto-x"><a className="mr-5 hover:text-gray-900">Produto AB (1)</a></Link></li>
                                        <li><Link href="/produto-x"><a className="mr-5 hover:text-gray-900">Produto DEF (5)</a></Link></li>
                                    </ul>
                                </td>
                                <td class="px-4 py-3 text-xs  border">
                                <span class="px-2 py-1 leading-tight text-green-700 rounded-sm"> R$799,99 </span>
                                </td>
                                <td class="px-4 py-3 text-sm border">Esther</td>
                                <td class="px-4 py-3 text-sm border">Rua fghi, número 000000, SP</td>
                                <td>
                                <span class="px-2 py-1 font-semibold leading-tight text-gray-700 bg-gray-100 rounded-sm"> Aguardando Pagamento </span>
                                </td>
                            </tr>
                            <tr class="text-gray-700">
                                <td class="px-4 py-3 border">
                                <div class="flex items-center justify-center text-sm">
                                    <div>
                                    <p class="text-black">3</p>
                                    </div>
                                </div>
                                </td>
                                <td class="px-4 py-3 text-ms border">
                                    <ul>
                                        <li><Link href="/produto-x"><a className="mr-5 hover:text-gray-900">Produto N (1)</a></Link></li>
                                        <li><Link href="/produto-x"><a className="mr-5 hover:text-gray-900">Produto QRS (18)</a></Link></li>
                                        <li><Link href="/produto-x"><a className="mr-5 hover:text-gray-900">Produto WXY (3)</a></Link></li>
                                    </ul>
                                </td>
                                <td class="px-4 py-3 text-xs  border">
                                <span class="px-2 py-1 leading-tight text-green-700 rounded-sm"> R$556,00 </span>
                                </td>
                                <td class="px-4 py-3 text-sm border">Henrique</td>
                                <td class="px-4 py-3 text-sm border">Rua abxy, número 000, SP</td>
                                <td>
                                <span class="px-2 py-1 font-semibold leading-tight text-white-100 bg-red-400 rounded-sm"> Cancelado </span>
                                </td>
                            </tr>
                            <tr class="text-gray-700">
                                <td class="px-4 py-3 border">
                                <div class="flex items-center justify-center text-sm">
                                    <div>
                                    <p class="text-black">4</p>
                                    </div>
                                </div>
                                </td>
                                <td class="px-4 py-3 text-ms border">
                                    <ul>
                                        <li><Link href="/produto-x"><a className="mr-5 hover:text-gray-900">Produto JB (3)</a></Link></li>
                                        <li><Link href="/produto-x"><a className="mr-5 hover:text-gray-900">Produto HH (2)</a></Link></li>
                                        <li><Link href="/produto-x"><a className="mr-5 hover:text-gray-900">Produto XYZ (2)</a></Link></li>
                                    </ul>
                                </td>
                                <td class="px-4 py-3 text-xs  border">
                                <span class="px-2 py-1 leading-tight text-green-700 rounded-sm"> R$159,80 </span>
                                </td>
                                <td class="px-4 py-3 text-sm border">PH</td>
                                <td class="px-4 py-3 text-sm border">Rua abcd, número 000, SP</td>
                                <td>
                                <span class="px-2 py-1 font-semibold leading-tight text-gray-700 bg-yellow-100 rounded-sm"> Enviado </span>
                                </td>
                            </tr>
                            <tr class="text-gray-700">
                                <td class="px-4 py-3 border">
                                <div class="flex items-center justify-center text-sm">
                                    <div>
                                    <p class="text-black">5</p>
                                    </div>
                                </div>
                                </td>
                                <td class="px-4 py-3 text-ms border">
                                    <ul>
                                        <li><Link href="/produto-x"><a className="mr-5 hover:text-gray-900">Produto C (3)</a></Link></li>
                                        <li><Link href="/produto-x"><a className="mr-5 hover:text-gray-900">Produto D (5)</a></Link></li>
                                        <li><Link href="/produto-x"><a className="mr-5 hover:text-gray-900">Produto J (2)</a></Link></li>
                                        <li><Link href="/produto-x"><a className="mr-5 hover:text-gray-900">Produto XY (15)</a></Link></li>
                                    </ul>
                                </td>
                                <td class="px-4 py-3 text-xs  border">
                                <span class="px-2 py-1 leading-tight text-green-700 rounded-sm"> R$1250,00 </span>
                                </td>
                                <td class="px-4 py-3 text-sm border">Marcos</td>
                                <td class="px-4 py-3 text-sm border">Rua XX, número 000, SP</td>
                                <td>
                                <span class="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-sm"> Entregue </span>
                                </td>
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