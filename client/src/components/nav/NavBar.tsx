import { ThemeToggle } from '../theme/ThemeToggler';
import Link from 'next/link';
import { AvatarIcon, EnterIcon } from '@radix-ui/react-icons';

const NavBar = () => {
  return (
    <div className='w-full max-h-20 mb-5 px-5 py-4 flex justify-between rounded-b-lg items-center border-b-2 border-muted'>
      <section className='flex items-center gap-2'>
        <Link href="/" className='text-2xl font-extrabold font-mono'>Post - It</Link>
      </section>
      <section className='flex items-center gap-3'>
        <ThemeToggle />
        <Login />
        <Register />
      </section>
    </div>
  )
}

const Register = () => {
  return (
    <Link href="/register" className='flex items-center gap-2 h-9 px-4 py-2 rounded-md border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground'>
      <AvatarIcon className='size-5' />
      <h1 className='text-lg pb-1'>Register</h1>
    </Link>
  )
}

const Login = () => {
  return (
    <Link href="/login" className='flex items-center gap-2 h-9 px-4 py-2 rounded-md border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground'>
      <EnterIcon className='size-5' />
      <h1 className='text-lg pb-1'>Login</h1>
    </Link>
  )
}

export default NavBar;
