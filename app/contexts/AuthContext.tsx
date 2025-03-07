'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { hasPermission } from '../utils/permissions';
import type { User, Permission } from '../utils/permissions';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  hasPermission: (permission: Permission) => boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // 检查用户会话
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // 从 localStorage 或 API 获取用户信息
        const storedUser = localStorage.getItem('user');
        
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
        console.log('storedUser', storedUser);
      } catch (error) {
        console.error('Auth check failed:', error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  // 登录方法
  const login = async (username: string, password: string) => {
    try {
      // 这里应该调用实际的登录 API
      // 为了示例，我们模拟不同用户
      let userInfo: User;
      
      if (username === 'admin') {
        userInfo = { id: '1', username: 'admin', role: 'admin' };
      } else if (username === 'editor') {
        userInfo = { id: '2', username: 'editor', role: 'editor' };
      } else if (username === 'viewer') {
        userInfo = { id: '3', username: 'viewer', role: 'viewer' };
      } else if (username === 'customer') {
        userInfo = { id: '4', username: 'customer', role: 'customer' };
      } else {
        return false;
      }
      
      setUser(userInfo);
      localStorage.setItem('user', JSON.stringify(userInfo));
      return true;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    }
  };

  // 登出方法
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  // 检查用户是否有某权限
  const checkPermission = (permission: Permission) => {
    if (!user) return false;
    return hasPermission(user, permission);
  };

  const contextValue: AuthContextType = {
    user,
    loading,
    hasPermission: checkPermission,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}

// 使用 Auth 的 Hook
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}