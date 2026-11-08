import React, { createContext, useState, useContext } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null); // null = deslogado

  // --- MUDANÇA AQUI ---
  // A função de Login agora aceita o email
  const login = (email) => {
    
    // 1. Extrai o nome de usuário (o que vem antes do @)
    let username = email.split('@')[0];
    
    // 2. Capitaliza a primeira letra (deixa mais bonito)
    username = username.charAt(0).toUpperCase() + username.slice(1);

    // 3. Cria o usuário dinâmico
    const newUser = {
      name: username,
      email: email
    };
    
    setCurrentUser(newUser);
    console.log("Usuário logado:", newUser.name);
  };

  // Função de Logout (continua igual)
  const logout = () => {
    setCurrentUser(null);
    console.log("Usuário deslogado.");
  };

  const value = {
    user: currentUser,
    isLoggedIn: !!currentUser,
    login, // <-- Agora é a nossa nova função
    logout
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

// Hook customizado (continua igual)
export const useUser = () => {
  return useContext(UserContext);
};