"use client"
import './globals.css'
import type { Metadata } from 'next'
import Link from 'next/link'
import { Roboto } from 'next/font/google'
import Nav from './components/nav';
import { config, dom } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;

import { faUser, faRss } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { useState } from 'react';

// export const metadata: Metadata = {
//   title: 'Sample Page',
//   description: 'A sample page',
// }

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const [currentPage, setCurrentPage] = useState('feed');

  function changePage(page) {
    setCurrentPage(page);
  }

  return (
    <html lang="en">
      <style>{dom.css()}</style>
      <body className="text-[10pt] tracking-wide">

        <main className="min-h-screen">

          <Nav/>

          <div className="flex min-h-screen">

            {/* LEFT NAV */}

            <aside className="max-md:hidden
              bg-white
              min-h-screen
              border
              flex
              flex-col
              text-gray-600
              text-xl
              gap-2
              items-center
              px-2
              py-6"
            >
              <Link
                className={"px-4 w-full " + (currentPage == 'feed' ? 'bg-blue-100' : '') + " text-center rounded p-1"}
                href="/">
                <div
                  onClick={() => changePage('feed')}
                >
                    <FontAwesomeIcon icon={faRss} />
                </div>
              </Link>
              <Link 
                 className={"px-4 w-full " + (currentPage == 'users' ? 'bg-blue-100' : '') + " text-center rounded p-1"}
              
                href="/users"
              >
                <div
                  onClick={() => changePage('users')}
                >
                  <FontAwesomeIcon icon={faUser} />
                </div>
              </Link>

            </aside>

            {/* CONTENT */}
            <div className="max-md:w-full w-full bg-gray-200 p-6">

              <div className="max-md:w-full md:max-w-5xl m-auto">
                {children}
              </div>
            </div>

          </div>

        </main>
      </body>
    </html>
  )
}
