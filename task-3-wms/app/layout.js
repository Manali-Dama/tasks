// app/layout.js

'use client'; // Required for using hooks in Next.js App Router

import { useEffect } from 'react';
import { Provider } from 'react-redux';
import store from '../store'; // Ensure the correct path to your Redux store
import Navbar from './components/Navbar';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';

export default function RootLayout({ children }) {


  return (

    <Provider store={store}>
      <html lang="en">
       
        <body>  
        <Navbar />
          {children} {/* Render the children (the page content) */}
        </body>
      </html>
    </Provider>
  );
}
