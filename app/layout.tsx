import MobileNav from './components/MobileNav'
import './globals.css'
import { Inter } from 'next/font/google'
import SendIcon from './icons/SendIcon'
import { Providers } from './redux/provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <header className='w-full py-10 px-5 md:px-10 lg:px-20'>
            <div className='container mx-auto flex justify-between items-center gap-3 md:gap-10 lg:gap-20 xl:gap-40'>
              <div className="font-bold">
                Zylag
              </div>
              <div className="hidden md:flex items-center gap-3 lg:gap-4">
                <span>Home</span>
                <span>Contact</span>
                <span>About</span>
                <span>Sign up</span>
              </div>
              <div className="relative hidden md:block">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg className="w-5 h-5 text-gray-500" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
                  <span className="sr-only">Search icon</span>
                </div>
                <input type="text" id="search-navbar" className="block w-full p-2 pl-10 text-sm text-gray-900 outline-none border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search..." />
              </div>
              <div className='md:hidden'><MobileNav /></div>
            </div>
          </header>

          <hr className='w-full border-t-neutral-100' />
          <section className='w-full min-h-[400px] flex justify-center items-center'>
            {children}
          </section>

          <footer className='bg-red-600 w-full p-5 pb-3'>
            <div className="flex justify-start lg:justify-center items-start flex-wrap gap-5 lg:gap-10 xl:gap-20 p-10 pb-20 text-red-50">

              <div className="flex flex-col gap-3 ">
                <span className='font-bold mb-2'> Zlag </span>
                <span className='text-sm'> Subscribe </span>
                <div className="relative block">
                  <input type="text" id="search-navbar" className="block w-full p-2 pr-10 text-sm text-white outline-none border border-gray-300 rounded-md bg-red-600" placeholder="Search..." />
                  <div className="absolute inset-y-0 right-2 flex items-center pl-3 cursor-pointer">
                    <span className='text-neutral-100'><SendIcon /></span>
                    <span className="sr-only">Search icon</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <span className='font-semibold mb-2'>Support</span>
                <span className="text-sm">Help Desk</span>
                <span className="text-sm">exclusive@gmail.com</span>
                <span>+234 8141971579</span>
              </div>

              <div className="flex flex-col gap-3">
                <span className="font-semibold mb-2">Account</span>
                <span className="text-sm">My Account</span>
                <span className="text-sm">Login / Register</span>
                <span className="text-sm">Cart</span>
                <span className="text-sm">Shop</span>
              </div>

              <div className="flex flex-col gap-3">
                <span className="font-semibold mb-2">Quick Link</span>
                <span className="text-sm">Privacy Policy</span>
                <span className="text-sm">Terms Of Use</span>
                <span className="text-sm">FAQ</span>
                <span className="text-sm">Contact</span>
              </div>

              <div className="flex flex-col gap-3">
                <span className="font-semibold mb-2">Download App</span>
                <div>
                  <span className='text-xs'>Save $3 with App New User only</span>
                  <div className="grid grid-cols-2">
                    <div><img src="/Qr Code.png" alt="qrcode to download app" /></div>
                    <div className='grid grid-rows-2 gap-2'>
                      <button className='bg-black text-white'>Google play</button>
                      <button className='bg-black text-white'>App Store</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mx-auto text-red-300 text-center">&copy; All rights reserved. Google Play, Youtube and other marks are trademarks of Google Inc</div>
          </footer>
        </Providers>
      </body>
    </html>
  )
}
