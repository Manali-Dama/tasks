'use client';

import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import Navbar from './components/Navbar';
import { logout } from '@/store/slices/authSlice';
import './globals.css';

export default function ProtectedLayout({ children }) {
  const { user } = useSelector((state) => state.login); // Access login state
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) {
      router.replace('/login'); // Use replace to prevent back button issue
    }
  }, [user, router]);

  if (!user) {
    return <p>Redirecting to login...</p>; // Show a simple message while redirecting
  }

  return (
    <div >
      <div className="protected-content">
        <p>Welcome, {user?.name || 'User'}!</p>
        <button onClick={() => dispatch(logout())}>Logout</button>
        {children} {/* Render nested pages here */}
      </div>
    </div>
  );
}
