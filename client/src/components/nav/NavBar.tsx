import { ThemeToggle } from '../theme/ThemeToggler';

const NavBar = () => {
  return (
    <div className='w-full h-12 px-5 py-2 flex justify-between items-center border border-red-300'>
      <section>Post - It</section>
      <section>
        <ThemeToggle />
      </section>
    </div>
  )
}

export default NavBar;
