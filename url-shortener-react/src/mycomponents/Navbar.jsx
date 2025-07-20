import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';
import { BiLinkExternal } from 'react-icons/bi';
import { useCustomContext } from '../ContextApi/contextApi'; // Custom context hook
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
 // Custom logo icon

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const {token,setToken}=useCustomContext(); 
 const navigate = useNavigate();
  const onLogOut=()=>{
   navigate('/');
    localStorage.removeItem('token');
    setToken(null); // Clear the token in context
    
  }

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'About' },
    { to: '/dashboard', label: 'Dashboard' },
  ];

  return (
<header className="fixed top-0 z-50 w-full border-b border-white/10 bg-gradient-to-br from-purple-500  via-blue-600  backdrop-blur-md text-white shadow-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-6">
        {/* Logo & Brand */} 
        <Link
          to="/"
          className="flex items-center gap-2 text-2xl font-bold tracking-wide text-white hover:text-gray-300 transition duration-200"
        >
          <BiLinkExternal className="text-3xl text-white" />
          LinkLynx
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map(({ to, label }) => (
            <NavLink
              key={label}
              to={to}
              className={({ isActive }) =>
                `font-medium transition ${
                  isActive
                    ? 'text-white underline underline-offset-4'
                    : 'text-slate-200 hover:text-blue-400'
                }`
              }
            >
              {label}
            </NavLink>
          ))}

          {/* CTA */}
          {token ? (
        <Link
          
          onClick={onLogOut}
          className="mt-2 block rounded-full bg-red-600 px-5 py-2 text-center text-sm font-semibold text-white shadow-md transition hover:bg-purple-700 hover:shadow-lg"
        >
          Log out
        </Link>
      ) : (
        <Link
          to="/register"
          
          className="mt-2 block rounded-full bg-purple-600 px-5 py-2 text-center text-sm font-semibold text-white shadow-md transition hover:bg-purple-700 hover:shadow-lg"
        >
          Register
        </Link>
      )}
        </nav>

        {/* Mobile toggle */}
        <button
          onClick={() => { setOpen(!open);  }}
          className="text-2xl text-white md:hidden"
          aria-label="Toggle menu"
        >
          {open ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile dropdown */}
      {open && (
       <div className="absolute top-full left-0 w-full z-40 space-y-2 border-t border-white/10 bg-white/90 backdrop-blur-lg px-6 py-4 md:hidden rounded-b-xl shadow-xl">

          {navLinks.map(({ to, label }) => (
            <NavLink
              key={label}
              to={to}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `block py-1 font-medium ${
                  isActive
                    ? 'text-blue-600 underline underline-offset-4'
                    : 'text-purple-600 hover:text-blue-400'
                }`
              }
            >
              {label}
            </NavLink>
          ))}
      {token ? (
        <Link
  
          onClick={() => { setOpen(false); onLogOut(); }}
          className="mt-2 block rounded-full bg-purple-600 px-5 py-2 text-center text-sm font-semibold text-white shadow-md transition hover:bg-purple-700 hover:shadow-lg"
        >
          Log out
        </Link>
      ) : (
        <Link
          to="/register"
          onClick={() => setOpen(false)}
          className="mt-2 block rounded-full bg-purple-600 px-5 py-2 text-center text-sm font-semibold text-white shadow-md transition hover:bg-purple-700 hover:shadow-lg"
        >
          Register
        </Link>
      )}
        </div>
      )}
    </header>
  );
};

export default Navbar;
