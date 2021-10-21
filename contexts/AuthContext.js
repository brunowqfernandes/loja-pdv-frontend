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
    if(token){
      api.post('/auth/get_user').then(response => {
        setUser(response.data.user)
      })
    }
  }, [])

  async function signIn({email, password}) {
    const response = await api.post('/auth/authenticate', {
      email, 
      password
    })

    const { token, user } = response.data

    setCookie(undefined, 'psychometrika.token', token, {
      maxAge: 60 * 60 * 24 // 1 day
    })

    api.defaults.headers['Authorization'] = `Bearer ${token}`

    setUser(user);
    

    router.push('/dashboard');
  }

  async function signOut(){
    api.defaults.headers['Authorization'] = '';
    destroyCookie(undefined, 'psychometrika.token')    
    router.push('/');
      
  }

  return(
    <AuthContext.Provider value={{user, isAuthenticated, signIn, signOut}}>
      {children}
    </AuthContext.Provider>
  )
}