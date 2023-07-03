import MobileNav from './components/MobileNav'
import './globals.css'
import { Inter } from 'next/font/google'
import SendIcon from './icons/SendIcon'
import { Providers } from './redux/provider'
import Link from 'next/link'
import ProfileAvatar from './components/ProfileAvatar'
import HeartIcon from './icons/HeartIcon'
import SearchBar from './components/SearchBar'
import AlertBar from './components/AlertBar'
import SiteHeader from './SiteHeader'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Zylag Ecommerce',
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
            <SiteHeader />
          </header>

          <hr className='w-full border-t-neutral-100' />
          <AlertBar />
          <section className='w-full max-w-screen-2xl mx-auto min-h-[400px] center text-sm'>
            {children}
          </section>

          <footer className='bg-red-700 w-full p-5 pb-3'>
            <div className="flex justify-start lg:justify-center items-start flex-wrap gap-5 lg:gap-10 xl:gap-20 p-10 pb-20 text-red-50">

              <div className="flex flex-col gap-3 ">
                <span className='font-bold mb-2'> Zlag </span>
                <span className='text-sm'> Subscribe </span>
                <div className="relative block">
                  <input type="text" id="subscribe" className="block w-full p-2 pr-10 text-sm text-white outline-none border border-gray-300 rounded-md bg-red-600" placeholder="Subscribe..." />
                  <div className="absolute inset-y-0 right-2 flex items-center pl-3 cursor-pointer">
                    <span className='text-neutral-100'><SendIcon /></span>
                    <span className="sr-only">Send icon</span>
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
                      <div className='bg-black text-white'>
                        <img src="/images/download-playstore.png" alt="Get it on app store" />
                      </div>
                      <div className='bg-black text-white'>
                        <img src="/images/download-appstore.png" alt="Get it on app store" />
                      </div>
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
