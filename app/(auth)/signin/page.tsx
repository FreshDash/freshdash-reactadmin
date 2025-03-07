"use client"
// export const metadata = {
//   title: 'Sign In - Mosaic',
//   description: 'Page description',
// }

import { useState } from 'react'
import Link from 'next/link'
import AuthHeader from '../auth-header'
import AuthImage from '../auth-image'
import { useRouter } from 'next/navigation';
import { Button } from '@headlessui/react';
import type { User } from '@/app/utils/permissions';

export default function SignIn() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(username, password);
    if (!username || !password) {
      setError('请输入用户名和密码');
      return;
    }
    try {
      setIsLoading(true);
      setError('');
      
      // 模拟用户信息
      let userInfo: User;
      if (username === 'admin') {
        userInfo = { id: '1', username: 'admin', role:   'admin' };
      } else if (username === 'editor') {
        userInfo = { id: '2', username: 'editor', role: 'editor' };
      } else if (username === 'viewer') {
        userInfo = { id: '3', username: 'viewer', role: 'viewer' };
      } else if (username === 'customer') {
        userInfo = { id: '4', username: 'customer', role: 'customer' };
      } else {
        throw new Error('Invalid credentials');
      }
      
      // 存储到localStorage
      localStorage.setItem('user', JSON.stringify(userInfo));
      router.push('/');
    } catch (error) {
      setError('用户名或密码错误');
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="bg-white dark:bg-gray-900">

      <div className="relative md:flex">

        {/* Content */}
        <div className="md:w-1/2">
          <div className="min-h-[100dvh] h-full flex flex-col after:flex-1">

            <AuthHeader />

            <div className="max-w-sm mx-auto w-full px-4 py-8">
              <h1 className="text-3xl text-gray-800 dark:text-gray-100 font-bold mb-6">Welcome back! FreshDash</h1>
              {/* Form */}
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="email">Email Address</label>
                    <input 
                      id="email"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="form-input w-full" 
                      type="text"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="password">Password</label>
                    <input 
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="form-input w-full" 
                      type="password" 
                      autoComplete="on"
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between mt-6">
                  <div className="mr-1">
                    <Link className="text-sm underline hover:no-underline" href="/reset-password">Forgot Password?</Link>
                  </div>
                  <Button 
                    type="submit"
                    className="btn bg-gray-900 text-gray-100 hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-white ml-3"
                  >
                    {isLoading ? 'Signing in...' : 'Sign In'}
                  </Button>
                </div>
              </form>
              {/* Footer */}
              <div className="pt-5 mt-6 border-t border-gray-100 dark:border-gray-700/60">
                <div className="text-sm">
                  {/* Don't you have an account? <Link className="font-medium text-violet-500 hover:text-violet-600 dark:hover:text-violet-400" href="/signup">Sign Up</Link> */}
                </div>
                {/* Warning */}
                <div className="mt-5">
                  <div className="bg-yellow-500/20 text-yellow-700 px-3 py-2 rounded-lg">
                    <svg className="inline w-3 h-3 shrink-0 fill-current mr-2" viewBox="0 0 12 12" aria-hidden="true" role="img" aria-label="成功标记">
                      <path d="M10.28 1.28L3.989 7.575 1.695 5.28A1 1 0 00.28 6.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 1.28z" />
                    </svg>
                    <span className="text-sm">
                    If you forget your account, please contact the administrator, thank you.
                    </span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        <AuthImage />

      </div>

    </main>
  )
}
