import { useForm } from 'react-hook-form';
import { parseCookies } from 'nookies'
import { useContext, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';

export default function Login() {
    const { register, handleSubmit } = useForm();
    const [error, setError] = useState(false)
    const { signIn } = useContext(AuthContext)

    async function handleLogin (data, e) {
        try{
    
            await signIn(data)
    
        } catch(err){
            
            setError(true);
    
        }
    }
  return (
    <div className="flex flex-col h-screen">
      <div className="w-full flex flex-wrap">

        <div className="w-full md:w-1/2 flex flex-col">

            <div className="flex justify-center md:justify-start pt-12 md:pl-12 md:-mb-24">
                <a href="#" className="bg-black text-white font-bold text-xl p-4">Logo</a>
            </div>

            <div className="flex flex-col justify-center md:justify-start my-auto pt-8 md:pt-0 px-8 md:px-24 lg:px-32">
                <p className="text-center text-3xl">Bem-vindo</p>
                <form className="flex flex-col pt-3 md:pt-8" onSubmit={handleSubmit(handleLogin)}>
                    <div className="flex flex-col pt-4">
                        <label htmlFor="email" className="text-lg">Usuário</label>
                        <input 
                        name="login"
                        ref={register}
                        type="text" 
                        id="email" 
                        placeholder="usuario" 
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"/>
                    </div>
    
                    <div className="flex flex-col pt-4">
                        <label htmlFor="password" className="text-lg">Senha</label>
                        <input
                        name="senha"
                        ref={register}
                        type="password" 
                        id="password" 
                        placeholder="Senha" 
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"/>
                    </div>
                    {error && (
                        <div className="flex flex-col pt-4">
                            <p className="text-center text-red-600 font-bold">Usuário/senha incorretos!</p>
                        </div>
                    )}
        
                    <input type="submit" value="Entrar" className="bg-black text-white font-bold text-lg hover:bg-gray-700 p-2 mt-8"/>
                </form>
            </div>

        </div>

        <div className="w-1/2 shadow-2xl">
            <img className="object-cover w-full h-screen hidden md:block" src="https://source.unsplash.com/cZrKsE7IkWk"/>
        </div>
    </div>
    </div>
  )
}

export async function getServerSideProps(ctx) {
    // Parse
    const { 'pdv.user':usuario } = parseCookies(ctx)

    if(usuario) {
        return{
          redirect: {
            destination: '/produtos',
            permanent: false
          }
        }
      }
  
      return {
        props: {}
      }
  }
  