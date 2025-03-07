'use client';

import React from 'react';
import type { ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../../contexts/AuthContext';
import type { Permission } from '../../../utils/permissions';

interface ProtectedRouteProps {
  children: ReactNode;
  requiredPermission?: Permission;
}

export default function ProtectedRoute({ 
  children, 
  requiredPermission 
}: ProtectedRouteProps) {
  const { user, loading, hasPermission } = useAuth();
  const router = useRouter();

  // 处理加载中状态
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto" />
          <p className="mt-4 text-gray-600">加载中...</p>
        </div>
      </div>
    );
  }

  // 如果未登录，重定向到登录页
  if (!user) {
    router.push('/signin');
    return null;
  }

  // 如果需要特定权限，检查用户是否有该权限
  if (requiredPermission && !hasPermission(requiredPermission)) {
    router.push('/unauthorized');
    return null;
  }

  return <>{children}</>;
}