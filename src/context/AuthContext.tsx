// import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

// const API_BASE = "http://127.0.0.1:8000/api";

// interface Address {
//   id: string;
//   label: string;
//   street: string;
//   city: string;
//   eircode: string;
//   isDefault: boolean;
// }

// interface Order {
//   id: string;
//   date: string;
//   items: { name: string; quantity: number; price: number }[];
//   total: number;
//   status: 'delivered' | 'processing' | 'shipped';
//   rated: boolean;
// }

// interface User {
//   id: string;
//   name: string;
//   email: string;
//   phone?: string;
//   addresses: Address[];
//   orders: Order[];
// }

// interface AuthState {
//   user: User | null;
//   isAuthenticated: boolean;
// }

// interface AuthContextType extends AuthState {
//   login: (email: string, password: string) => Promise<boolean>;
//   signup: (name: string, email: string, password: string) => Promise<boolean>;
//   logout: () => void;
//   addAddress: (address: Omit<Address, 'id'>) => void;
//   removeAddress: (id: string) => void;
//   setDefaultAddress: (id: string) => void;
// }

// const AuthContext = createContext<AuthContextType | null>(null);

// export const AuthProvider = ({ children }: { children: ReactNode }) => {
//   const [authState, setAuthState] = useState<AuthState>({
//     user: null,
//     isAuthenticated: false,
//   });

//   // 🔄 Restore login on page refresh
//   useEffect(() => {
//     const token = localStorage.getItem("accessToken");
//     const email = localStorage.getItem("userEmail");

//     if (token && email) {
//       setAuthState({
//         user: {
//           id: "1",
//           name: "User",
//           email,
//           addresses: [],
//           orders: [],
//         },
//         isAuthenticated: true,
//       });
//     }
//   }, []);

//   // 🔐 LOGIN
//   const login = async (email: string, password: string): Promise<boolean> => {
//     try {
//       const res = await fetch(`${API_BASE}/auth/login/`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           username: email, // Django uses username field
//           password,
//         }),
//       });

//       const data = await res.json();
//       if (!res.ok) return false;

//       localStorage.setItem("access", data.access);
// localStorage.setItem("refresh", data.refresh);

//       localStorage.setItem("userEmail", email);

//       setAuthState({
//         user: {
//           id: "1",
//           name: "User",
//           email,
//           addresses: [],
//           orders: [],
//         },
//         isAuthenticated: true,
//       });

//       return true;
//     } catch {
//       return false;
//     }
//   };

//   // 📝 SIGNUP
//   const signup = async (name: string, email: string, password: string): Promise<boolean> => {
//     try {
//       const res = await fetch(`${API_BASE}/auth/register/`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           first_name: name,
//           email,
//           password,
//         }),
//       });

//       if (!res.ok) return false;

//       return await login(email, password);
//     } catch {
//       return false;
//     }
//   };

//   // 🚪 LOGOUT
//   const logout = () => {
//     const token = localStorage.getItem("access");

//     localStorage.removeItem("refreshToken");
//     localStorage.removeItem("userEmail");

//     setAuthState({
//       user: null,
//       isAuthenticated: false,
//     });
//   };

//   // 📍 ADDRESS MANAGEMENT (Frontend Only for now)
//   const addAddress = (address: Omit<Address, 'id'>) => {
//     if (!authState.user) return;

//     const newAddress = { ...address, id: Date.now().toString() };
//     const updatedAddresses = address.isDefault
//       ? authState.user.addresses.map(a => ({ ...a, isDefault: false })).concat(newAddress)
//       : [...authState.user.addresses, newAddress];

//     setAuthState({
//       ...authState,
//       user: { ...authState.user, addresses: updatedAddresses },
//     });
//   };

//   const removeAddress = (id: string) => {
//     if (!authState.user) return;

//     setAuthState({
//       ...authState,
//       user: {
//         ...authState.user,
//         addresses: authState.user.addresses.filter(a => a.id !== id),
//       },
//     });
//   };

//   const setDefaultAddress = (id: string) => {
//     if (!authState.user) return;

//     setAuthState({
//       ...authState,
//       user: {
//         ...authState.user,
//         addresses: authState.user.addresses.map(a => ({
//           ...a,
//           isDefault: a.id === id,
//         })),
//       },
//     });
//   };

//   return (
//     <AuthContext.Provider
//       value={{
//         ...authState,
//         login,
//         signup,
//         logout,
//         addAddress,
//         removeAddress,
//         setDefaultAddress,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) throw new Error('useAuth must be used within an AuthProvider');
//   return context;
// };
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

const API_BASE = "http://127.0.0.1:8000/api";

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
  status: "delivered" | "processing" | "shipped";
  rated: boolean;
}

interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
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
  addAddress: (address: Omit<Address, "id">) => void;
  removeAddress: (id: string) => void;
  setDefaultAddress: (id: string) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
  });

  // 🔄 Restore login on page refresh
  useEffect(() => {
    const token = localStorage.getItem("access"); // ✅ Fixed: was "accessToken"
    const email = localStorage.getItem("userEmail");

    if (token && email) {
      setAuthState({
        user: {
          id: "1",
          name: "User",
          email,
          addresses: [],
          orders: [],
        },
        isAuthenticated: true,
      });
    }
  }, []);

  // 🔐 LOGIN
  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const res = await fetch(`${API_BASE}/auth/login/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: email,
          password,
        }),
      });

      const data = await res.json();
      if (!res.ok) return false;

      // ✅ Store tokens with consistent keys
      localStorage.setItem("access", data.access);
      localStorage.setItem("refresh", data.refresh);
      localStorage.setItem("userEmail", email);

      // ✅ Merge guest cart if exists
      const guestSessionId = localStorage.getItem("guestSessionId");
      if (guestSessionId) {
        try {
          await fetch(`${API_BASE}/store/cart/merge/`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${data.access}`,
            },
            body: JSON.stringify({ guest_session_id: guestSessionId }),
          });
          localStorage.removeItem("guestSessionId");
        } catch (err) {
          console.error("Failed to merge cart:", err);
        }
      }

      setAuthState({
        user: {
          id: data.user?.id || "1",
          name: data.user?.first_name || data.user?.name || "User",
          email,
          addresses: [],
          orders: [],
        },
        isAuthenticated: true,
      });

      return true;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  };

  // 📝 SIGNUP
  const signup = async (
    name: string,
    email: string,
    password: string,
  ): Promise<boolean> => {
    try {
      const res = await fetch(`${API_BASE}/auth/register/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          first_name: name,
          email,
          password,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        console.error("Signup error:", errorData);
        return false;
      }

      // ✅ Auto-login after successful signup
      return await login(email, password);
    } catch (error) {
      console.error("Signup error:", error);
      return false;
    }
  };

  // 🚪 LOGOUT
  const logout = () => {
    // ✅ Fixed: Remove correct token keys
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    localStorage.removeItem("userEmail");

    setAuthState({
      user: null,
      isAuthenticated: false,
    });
  };

  // 📍 ADDRESS MANAGEMENT (Frontend Only for now)
  const addAddress = (address: Omit<Address, "id">) => {
    if (!authState.user) return;

    const newAddress = { ...address, id: Date.now().toString() };
    const updatedAddresses = address.isDefault
      ? authState.user.addresses
          .map((a) => ({ ...a, isDefault: false }))
          .concat(newAddress)
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
        addresses: authState.user.addresses.filter((a) => a.id !== id),
      },
    });
  };

  const setDefaultAddress = (id: string) => {
    if (!authState.user) return;

    setAuthState({
      ...authState,
      user: {
        ...authState.user,
        addresses: authState.user.addresses.map((a) => ({
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
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
