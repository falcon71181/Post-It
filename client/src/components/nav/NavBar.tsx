"use client"

import { ThemeToggle } from '../theme/ThemeToggler';
import Link from 'next/link';
import { AvatarIcon, EnterIcon, ExitIcon, PersonIcon, GitHubLogoIcon, GlobeIcon, Pencil2Icon } from '@radix-ui/react-icons';
import { useAuthContext } from '@/contexts/auth';
import { useRouter } from 'next/navigation';
import { AuthUser as AuthUserType } from '@/types/auth';
import { Dispatch, SetStateAction } from 'react';

const NavBar = () => {
  const { authUser, setAuthUser } = useAuthContext();

  return (
    <div className='w-full h-14 mb-3 px-3 py-2 backdrop-blur flex justify-between rounded-b-lg items-center border-b-2 border-muted'>
      <section className='flex items-center gap-2 h-full'>
        <Link href="/" className='mr-5 text-2xl font-extrabold font-caveat tracking-widest select-none'>Post - It</Link>
        <Link href="/global" className='h-full text-sm font-extrabold font-caveat tracking-widest select-none flex gap-2 items-center justify-center px-2 rounded-md bg-background shadow-sm hover:bg-accent hover:text-accent-foreground'>
          <GlobeIcon />
          <h1>Chat</h1>
        </Link>
        <Link href="/rules" className='h-full text-sm font-extrabold font-caveat tracking-widest select-none flex gap-2 items-center justify-center px-2 rounded-md bg-background shadow-sm hover:bg-accent hover:text-accent-foreground'>
          <Pencil2Icon />
          <h1>Rules</h1>
        </Link>
      </section>
      <section className='flex items-center gap-2'>
        <Github />
        <ThemeToggle />
        {authUser ? (
          <div className='flex items-center justify-center gap-1'>
            <AuthUser authUser={authUser} />
            <Logout setAuthUser={setAuthUser} />
          </div>
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
    <Link href="/user/profile" className='flex items-center gap-2 h-9 px-4 rounded-md border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground'>
      <PersonIcon className='size-4 my-auto' />
      <h1 className='text-sm my-auto'>{authUser?.username}</h1>
    </Link>
  )
}

const Logout = ({ setAuthUser }: { setAuthUser: Dispatch<SetStateAction<AuthUserType>> }) => {
  const router = useRouter();

  const handleLogOut = () => {
    localStorage.clear();
    setAuthUser(null);
    router.push("/login")
  }

  return (
    <div className='flex items-center gap-2 h-9 px-2 cursor-pointer rounded-md border border-input bg-background shadow-sm hover:bg-red-400 hover:text-accent-foreground' onClick={handleLogOut}>
      <ExitIcon className='size-4 my-auto' />
    </div>
  )
}

export default NavBar;
