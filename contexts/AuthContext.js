import { createContext, useEffect, useState } from "react";
import { destroyCookie, setCookie, parseCookies } from "nookies";
import { useRouter } from "next/router";

import { api } from "../services/api";


export const AuthContext = createContext({})

export function AuthProvider({children}){
  const [ user, setUser ] = useState(null);
  const router = useRouter();

  const isAuthenticated = !!user;

  useEffect(() => {
    const { 'pdv.user':usuario } = parseCookies()
    if(usuario){
      setUser(JSON.parse(usuario))
    }
  }, [])

  async function signIn({login, senha}) {    
    let {data:usuario} = await api.get(`/usuarios/login?login=${login}&senha=${senha}`)
    usuario.senha = '';
    setCookie(undefined, 'pdv.user', JSON.stringify(usuario), {
        maxAge: 60 * 60 * 24 // 1 day
    })

    setUser(usuario);
    router.push('/pedidos');
  }

  async function signOut(){
    destroyCookie(undefined, 'pdv.user')    
    router.push('/');
  }

  return(
    <AuthContext.Provider value={{user, isAuthenticated, signIn, signOut}}>
      {children}
    </AuthContext.Provider>
  )
}