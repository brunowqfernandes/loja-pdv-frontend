import { Header } from "../../components/Header";

export default function Produtos (){
    function handleAddProduto(e){
        
    }
    return(
        <div className="flex flex-col h-screen">
            <Header/>
            <div className="flex flex-col flex-grow justify-center items-center">
                <h1 className="text-5xl text-gray-900 leading-none flex items-center pb-4 mb-4 border-b border-gray-200">Produtos</h1>
                <section class="container mx-auto p-6 font-mono">
                    <div class="w-3/4 mx-auto mb-8 rounded-lg shadow-lg">
                        <div class="w-full relative">
                        <button class="bg-gray-600 hover:bg-gray-700 text-white text-sm px-4 py-2 border rounded-full absolute top-full left-full -translate-x-1/2 transform -translate-y-1/2" onClick={handleAddProduto}>
                            +
                        </button>
                        <table class="w-full text-center">
                            <thead>
                            <tr class="text-md font-semibold tracking-wide  text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
                                <th class="px-4 py-3">Produto</th>
                                <th class="px-4 py-3">Valor</th>
                                <th class="px-4 py-3">Descrição</th>
                                <th class="px-4 py-3">Qte. Estoque</th>
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
                                <td class="px-4 py-3 text-xs  border">
                                <span class="px-2 py-1 leading-tight text-green-700 rounded-sm"> ... </span>
                                </td>
                                <td class="px-4 py-3 text-sm border">15</td>
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
            </div>
        </div>
    )
}