import { Header } from "../../components/Header";

export default function Home (){
    
    return(
        <div className="flex flex-col h-screen">
            <Header/>
            <div className="flex flex-col flex-grow justify-center items-center text-center">
                <h1 className="text-5xl text-gray-900 leading-none flex items-center pb-4 mb-4 border-b border-gray-200"> Seja bem vindo!</h1>
                <p>Escolha uma das opções no menu acima</p>                
            </div>            
        </div>
    )
}