import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Address {
  id: string;
  label: string;
  street: string;
  city: string;
  eircode: string;
  isDefault: boolean;
}

interface Order {
  id: string;
  date: string;
  items: { name: string; quantity: number; price: number }[];
  total: number;
  status: 'delivered' | 'processing' | 'shipped';
  rated: boolean;
}

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  addresses: Address[];
  orders: Order[];
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  addAddress: (address: Omit<Address, 'id'>) => void;
  removeAddress: (id: string) => void;
  setDefaultAddress: (id: string) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

const mockUser: User = {
  id: '1',
  name: 'Priya Sharma',
  email: 'priya@example.com',
  phone: '+353 86 123 4567',
  addresses: [
    {
      id: '1',
      label: 'Home',
      street: '123 Grafton Street',
      city: 'Dublin 2',
      eircode: 'D02 XY45',
      isDefault: true,
    },
    {
      id: '2',
      label: 'Work',
      street: '456 Dame Street',
      city: 'Dublin 2',
      eircode: 'D02 AB12',
      isDefault: false,
    },
  ],
  orders: [
    {
      id: 'ORD-001',
      date: '2024-01-15',
      items: [
        { name: 'Tilda Basmati Rice', quantity: 2, price: 15.99 },
        { name: 'MDH Garam Masala', quantity: 1, price: 4.99 },
      ],
      total: 36.97,
      status: 'delivered',
      rated: false,
    },
    {
      id: 'ORD-002',
      date: '2024-01-20',
      items: [
        { name: 'Fresh Paneer', quantity: 2, price: 5.99 },
        { name: 'Kaju Katli', quantity: 1, price: 12.99 },
      ],
      total: 24.97,
      status: 'shipped',
      rated: false,
    },
  ],
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
  });

  const login = async (email: string, password: string): Promise<boolean> => {
    // Mock login - in real app, this would call an API
    if (email && password) {
      setAuthState({
        user: { ...mockUser, email },
        isAuthenticated: true,
      });
      return true;
    }
    return false;
  };

  const signup = async (name: string, email: string, password: string): Promise<boolean> => {
    // Mock signup
    if (name && email && password) {
      setAuthState({
        user: { ...mockUser, name, email, addresses: [], orders: [] },
        isAuthenticated: true,
      });
      return true;
    }
    return false;
  };

  const logout = () => {
    setAuthState({
      user: null,
      isAuthenticated: false,
    });
  };

  const addAddress = (address: Omit<Address, 'id'>) => {
    if (!authState.user) return;
    const newAddress = { ...address, id: Date.now().toString() };
    const updatedAddresses = address.isDefault
      ? authState.user.addresses.map(a => ({ ...a, isDefault: false })).concat(newAddress)
      : [...authState.user.addresses, newAddress];
    
    setAuthState({
      ...authState,
      user: { ...authState.user, addresses: updatedAddresses },
    });
  };

  const removeAddress = (id: string) => {
    if (!authState.user) return;
    setAuthState({
      ...authState,
      user: {
        ...authState.user,
        addresses: authState.user.addresses.filter(a => a.id !== id),
      },
    });
  };

  const setDefaultAddress = (id: string) => {
    if (!authState.user) return;
    setAuthState({
      ...authState,
      user: {
        ...authState.user,
        addresses: authState.user.addresses.map(a => ({
          ...a,
          isDefault: a.id === id,
        })),
      },
    });
  };

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        login,
        signup,
        logout,
        addAddress,
        removeAddress,
        setDefaultAddress,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
