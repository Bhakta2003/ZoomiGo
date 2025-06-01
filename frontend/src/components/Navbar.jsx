import { useContext, useState } from 'react';
import { assets } from '../assets/assets';
import { NavLink, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import toast, { Toaster } from 'react-hot-toast';


const Navbar = () => {
  const navigate = useNavigate();
  const { token, setToken, userData } = useContext(AppContext);
  const [showMenu, setShowMenu] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const handleProfileClick = () => {
    if (window.innerWidth < 1280) {
      setShowProfileMenu(!showProfileMenu);
    }
  };

  const logout = () => {
    setToken(false);
    localStorage.removeItem('token');
  };

  return (
    <div className="fixed top-4 left-10 right-10 md:left-15 md:right-15 lg:left-40 lg:right-40 z-50 bg-black/30 backdrop-blur-lg rounded-full shadow-xl px-6 py-3 flex items-center justify-between border border-white/20 h-20 gap-2">
      {/* Logo */}
      <img onClick={() => navigate('/')} className="w-29 cursor-pointer rounded-full" src={assets.logo} alt="Logo" />

      {/* Desktop Navigation */}
      <ul className="hidden md:flex items-center gap-6 text-white font-semibold">
        <NavLink
          to='/'
          className={({ isActive }) => `px-4 py-2 rounded-lg transition-all duration-300 ${isActive ? 'text-gray-700 bg-white/70' : 'text-white'}`}
        >
          HOME
        </NavLink>
        <NavLink
          to='/vehicles'
          className={({ isActive }) => `px-4 py-2 rounded-lg transition-all duration-300 ${isActive ? 'text-gray-700 bg-white/70' : 'text-white'}`}
        >
          ALL VEHICLES
        </NavLink>
        <NavLink
          to='/about'
          className={({ isActive }) => `px-4 py-2 rounded-lg transition-all duration-300 ${isActive ? 'text-gray-700 bg-white/70' : 'text-white'}`}
        >
          ABOUT
        </NavLink>
        <NavLink
          to='/contact'
          className={({ isActive }) => `px-4 py-2 rounded-lg transition-all duration-300 ${isActive ? 'text-gray-700 bg-white/70' : 'text-white'}`}
        >
          CONTACT
        </NavLink>
      </ul>

      {/* Profile & Menu */}
      <div className="flex items-center gap-4">
        {token && userData ?
          <div className='flex items-center gap-2 cursor-pointer group relative' onClick={handleProfileClick}>
            <img src={userData.image} alt="Profile" className='w-10 h-10 rounded-full border-2 border-white/50' />
            <img src={assets.dropdown_icon} alt="" className='w-2.5' />
            <div className={`absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 ${showProfileMenu ? 'block' : 'hidden'
              } group-hover:block`}>
              <div className='min-w-48 bg-white/80 rounded flex flex-col gap-4 p-4 mt-2 border-0 shadow-lg'>
                <p onClick={() => navigate('my-profile')} className='hover:text-white cursor-pointer hover:bg-black p-2 rounded-md'>My Profile</p>
                <p onClick={() => navigate('my-bookings')} className='hover:text-white cursor-pointer hover:bg-black p-2 rounded-md'>My Bookings</p>
                <p onClick={()=>{logout(); toast.success('Logged Out Successfully');}} className='hover:text-white cursor-pointer hover:bg-black p-2 rounded-md'>Logout</p>
              </div>
            </div>
          </div>
          :
          <button className='bg-white/20 hover:bg-blue-600/80 text-white md:px-1 md:py-1 lg:px-8 lg:py-3 rounded-full hidden md:block border border-white/30 transition-all' onClick={() => navigate('/login')}>Create Account</button>
        }

        {/* Mobile Menu Button */}
        <img
          onClick={() => setShowMenu(true)}
          className="w-8 md:hidden cursor-pointer filter invert"
          src={assets.menu_icon}
          alt="Menu"
        />
      </div>

      {/* Mobile Menu */}
      {showMenu && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex justify-end md:hidden transition-all">
          <div className="bg-white/10 backdrop-blur-md w-3/4 h-full p-6 shadow-xl">
            <div className="flex justify-between items-center mb-10">
              <img onClick={() => navigate('/')} className="w-32" src={assets.logo} alt="Logo" />
              <img onClick={() => setShowMenu(false)} className="w-7 cursor-pointer" src={assets.cross_icon} alt="Close" />
            </div>
            <ul className="space-y-4">
              <NavLink to='/' onClick={() => setShowMenu(false)}>
                <li className="px-4 py-3 rounded-lg hover:bg-gray-100 text-lg">HOME</li>
              </NavLink>
              <NavLink to='/vehicles' onClick={() => setShowMenu(false)}>
                <li className="px-4 py-3 rounded-lg hover:bg-gray-100 text-lg">ALL VEHICLES</li>
              </NavLink>
              <NavLink to='/about' onClick={() => setShowMenu(false)}>
                <li className="px-4 py-3 rounded-lg hover:bg-gray-100 text-lg">ABOUT</li>
              </NavLink>
              <NavLink to='/contact' onClick={() => setShowMenu(false)}>
                <li className="px-4 py-3 rounded-lg hover:bg-gray-100 text-lg">CONTACT</li>
              </NavLink>
            </ul>
            {!token && (
              <button
                className="mt-8 w-full bg-black text-white px-6 py-3 rounded-lg font-medium"
                onClick={() => {
                  setShowMenu(false);
                  navigate('/login');
                }}
              >
                Create Account
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;