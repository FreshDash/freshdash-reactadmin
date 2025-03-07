// app/utils/permissions.ts
// 定义权限类型
export enum Permission {
    VIEW_DASHBOARD = 'view_dashboard',
    VIEW_PRODUCTS = 'view_products',
    VIEW_ORDERS = 'view_orders',
    VIEW_CUSTOMERS = 'view_customers',
    VIEW_SETTINGS = 'view_settings',
    VIEW_ANALYTICS = 'view_analytics',
    MANAGE_USERS = 'manage_users',
  }
  
  // 定义角色类型及其对应的权限
  export const Roles = {
    ADMIN: 'admin',
    EDITOR: 'editor',
    VIEWER: 'viewer',
    CUSTOMER: 'customer',
  };
  
  // 每个角色拥有的权限
  export const RolePermissions: Record<string, Permission[]> = {
    [Roles.ADMIN]: [
      Permission.VIEW_DASHBOARD,
      Permission.VIEW_PRODUCTS,
      Permission.VIEW_ORDERS,
      Permission.VIEW_CUSTOMERS,
      Permission.VIEW_SETTINGS,
      Permission.VIEW_ANALYTICS,
      Permission.MANAGE_USERS,
    ],
    [Roles.EDITOR]: [
      Permission.VIEW_DASHBOARD,
      Permission.VIEW_PRODUCTS,
      Permission.VIEW_ORDERS,
      Permission.VIEW_ANALYTICS,
    ],
    [Roles.VIEWER]: [
      Permission.VIEW_DASHBOARD,
      Permission.VIEW_PRODUCTS,
    ],
    [Roles.CUSTOMER]: [
      Permission.VIEW_DASHBOARD,
      Permission.VIEW_ORDERS,
    ],
  };
  
  // 用户类型
  export interface User {
    id: string;
    username: string;
    role: string;
    permissions?: Permission[]; // 自定义权限
  }
  
  // 检查用户是否有特定权限
  export function hasPermission(user: User, permission: Permission): boolean {
    // 如果用户是管理员，直接返回true
    if (user.role === Roles.ADMIN) {
      return true;
    }
    
    // 获取角色权限
    const rolePermissions = RolePermissions[user.role] || [];
    
    // 获取自定义权限
    const customPermissions = user.permissions || [];
    
    // 检查是否有该权限
    return [...rolePermissions, ...customPermissions].includes(permission);
  }
  
  // 获取用户所有可访问的路由
  export function getAccessibleRoutes(user: User): string[] {
    const routes: string[] = ['/dashboard']; // 所有用户都可访问dashboard
    
    if (hasPermission(user, Permission.VIEW_PRODUCTS)) {
      routes.push('/products');
    }
    
    if (hasPermission(user, Permission.VIEW_ORDERS)) {
      routes.push('/orders');
    }
    
    if (hasPermission(user, Permission.VIEW_CUSTOMERS)) {
      routes.push('/customers');
    }
    
    if (hasPermission(user, Permission.VIEW_SETTINGS)) {
      routes.push('/settings');
    }
    
    if (hasPermission(user, Permission.VIEW_ANALYTICS)) {
      routes.push('/analytics');
    }
    
    if (hasPermission(user, Permission.MANAGE_USERS)) {
      routes.push('/users');
    }
    
    return routes;
  }
  
  // 修改菜单项接口定义
  interface SidebarItem {
    label: string;
    path: string;
    permission: Permission | null;
  }
  
  // 生成侧边栏菜单
  export function generateSidebar(user: User) {
    const items: SidebarItem[] = [
      { label: 'Dashboard', path: '/dashboard', permission: null },
    ];
    
    if (hasPermission(user, Permission.VIEW_PRODUCTS)) {
      items.push({ label: '产品管理', path: '/products', permission: Permission.VIEW_PRODUCTS });
    }
    
    if (hasPermission(user, Permission.VIEW_ORDERS)) {
      items.push({ label: '订单管理', path: '/orders', permission: Permission.VIEW_ORDERS });
    }
    
    if (hasPermission(user, Permission.VIEW_CUSTOMERS)) {
      items.push({ label: '客户管理', path: '/customers', permission: Permission.VIEW_CUSTOMERS });
    }
    
    if (hasPermission(user, Permission.VIEW_ANALYTICS)) {
      items.push({ label: '数据分析', path: '/analytics', permission: Permission.VIEW_ANALYTICS });
    }
    
    if (hasPermission(user, Permission.MANAGE_USERS)) {
      items.push({ label: '用户管理', path: '/users', permission: Permission.MANAGE_USERS });
    }
    
    if (hasPermission(user, Permission.VIEW_SETTINGS)) {
      items.push({ label: '系统设置', path: '/settings', permission: Permission.VIEW_SETTINGS });
    }
    
    return items;
  }