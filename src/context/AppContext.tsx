import React, { createContext, useContext, useState, useEffect } from 'react';
import { Aeronave, Funcionario } from '../types';
import { storage } from '../services/storage';

interface AppContextType {
  aeronaves: Aeronave[];
  setAeronaves: (a: Aeronave[]) => void;
  funcionarios: Funcionario[];
  setFuncionarios: (f: Funcionario[]) => void;
  user: Funcionario | null;
  setUser: (u: Funcionario | null) => void;
  logout: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [aeronaves, _setAeronaves] = useState<Aeronave[]>(storage.getAeronaves());
  const [funcionarios, _setFuncionarios] = useState<Funcionario[]>(storage.getFuncionarios());
  const [user, _setUser] = useState<Funcionario | null>(storage.getCurrentUser());

  const setAeronaves = (a: Aeronave[]) => {
    _setAeronaves(a);
    storage.saveAeronaves(a);
  };

  const setFuncionarios = (f: Funcionario[]) => {
    _setFuncionarios(f);
    storage.saveFuncionarios(f);
  };

  const setUser = (u: Funcionario | null) => {
    _setUser(u);
    storage.setCurrentUser(u);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AppContext.Provider value={{ aeronaves, setAeronaves, funcionarios, setFuncionarios, user, setUser, logout }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppContext must be used within AppProvider');
  return context;
};
