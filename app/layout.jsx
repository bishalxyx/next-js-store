
import "./globals.css";
import {Assistant} from 'next/font/google'
import { ToastContainer} from 'react-toastify';

const assistantFont=Assistant({
  weight:['400','500','600','700','800'],
  subsets:['latin'],
  display:'swap'
})

export default function RootLayout({ children }) {
  
  return (
    <html lang="en">
      <body
        className={`${assistantFont.className} antialiased bg-slate-500 dark:bg-gray-800 min-h-screen`}
        >
        
        <ToastContainer/>
        {children}
      </body>
    </html>
  );
}
