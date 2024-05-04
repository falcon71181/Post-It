"use client"

import { ThemeToggle } from '../theme/ThemeToggler';
import Link from 'next/link';
import { AvatarIcon, EnterIcon, PersonIcon, GitHubLogoIcon } from '@radix-ui/react-icons';
import { useAuthContext } from '@/contexts/auth';
import { AuthUser as AuthUserType } from '@/types/auth';

const NavBar = () => {
  const { authUser, setAuthUser } = useAuthContext();

  return (
    <div className='w-full max-h-20 mb-3 px-3 py-2 backdrop-blur flex justify-between rounded-b-lg items-center border-b-2 border-muted'>
      <section className='flex items-center gap-2'>
        <Link href="/" className='text-2xl font-extrabold font-caveat tracking-widest select-none'>Post - It</Link>
      </section>
      <section className='flex items-center gap-2'>
        <Github />
        <ThemeToggle />
        {authUser ? (
          <AuthUser authUser={authUser} />
        ) : (
          <div className='flex items-center justify-center gap-1'>
            <Login />
            <Register />
          </div>
        )}
      </section>
    </div>
  )
}

const Github = () => {
  return (
    <Link href="https://github.com/falcon71181/Post-It" target='_blank' className='flex items-center gap-2 h-9 px-2 rounded-md border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground'>
      <GitHubLogoIcon className='size-5 my-auto' />
    </Link>
  )
}

const Register = () => {
  return (
    <Link href="/register" className='flex items-center gap-2 h-9 px-4 rounded-md border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground'>
      <AvatarIcon className='size-4 my-auto' />
      <h1 className='text-sm my-auto'>Register</h1>
    </Link>
  )
}

const Login = () => {
  return (
    <Link href="/login" className='flex items-center gap-2 h-9 px-4 rounded-md border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground'>
      <EnterIcon className='size-4 my-auto' />
      <h1 className='text-sm my-auto'>Login</h1>
    </Link>
  )
}

const AuthUser = ({ authUser }: { authUser: AuthUserType }) => {
  return (
    <Link href="/login" className='flex items-center gap-2 h-9 px-4 rounded-md border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground'>
      <PersonIcon className='size-4 my-auto' />
      <h1 className='text-sm my-auto'>{authUser.username}</h1>
    </Link>
  )
}

export default NavBar;
