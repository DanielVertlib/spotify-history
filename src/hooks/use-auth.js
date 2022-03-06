import React, { useContext, createContext, useState } from "react"

const authContext = createContext()

export function ProvideAuth({ children }) {
  const auth = useProvideAuth()
  return (
    <authContext.Provider value={auth}>
      {children}
    </authContext.Provider>
  )
}

export function useAuth() {
  return useContext(authContext);
}

function useProvideAuth() {
  const [token, setToken] = useState(null);

  const updateToken = tokenToSet => {
    return setToken(tokenToSet)
  }

  return { token, updateToken }
}