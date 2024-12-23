
'use client'

import Image from 'next/image'
import { LoginLink, RegisterLink } from "@kinde-oss/kinde-auth-nextjs/components"

export function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-[#F5E2C2]">
      <div className="text-center space-y-8">
        <div className="space-y-4">
          <Image
            src="/CraftersConnectLogo.svg"
            alt="Crafters Connect Logo"
            width={120}
            height={120}
            className="mx-auto"
            priority
          />
          <h1 className="text-4xl font-bold text-gray-800">Crafters Connect</h1>
        </div>

        <div className="space-x-4">
          <LoginLink className="px-6 py-2 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors">
            Sign In
          </LoginLink>
          <RegisterLink className="px-6 py-2 text-indigo-600 border-2 border-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors">
            Sign Up
          </RegisterLink>
        </div>
      </div>
    </main>
  );
}