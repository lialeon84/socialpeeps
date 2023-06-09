import './globals.css'
import Nav from './Nav';
import { Roboto } from 'next/font/google';
import AuthContext from "./auth/AuthContext"
import QueryWrapper from "./auth/QueryWrapper"


const roboto = Roboto({
    subsets:['latin'],
    weight:['400', '700'],
    variable: "--font-roboto",
})
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head />
      <body className={`mx-4 md:mx-48 xl:mx-96 ${roboto.variable} font-sans bg-black`}>
        <QueryWrapper>
          <AuthContext>
            <Nav />
           
            {children}
          </AuthContext>
        </QueryWrapper>
      </body>
    </html>
  )
}
