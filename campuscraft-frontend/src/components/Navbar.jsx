import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ShoppingBag, Package, Inbox, LogOut, PlusCircle } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-gradient-to-r from-black via-gray-900 to-black shadow-2xl shadow-orange-900/50 sticky top-0 z-50 backdrop-blur-lg border-b-2 border-orange-500/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2 group">
            <ShoppingBag className="w-9 h-9 text-orange-500 transform group-hover:rotate-12 group-hover:scale-110 transition-all duration-300 drop-shadow-lg filter drop-shadow-[0_0_8px_rgba(249,115,22,0.6)]" />
            <span className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-orange-500 bg-clip-text text-transparent drop-shadow-lg">
              🎓 CampusCraft
            </span>
          </Link>

          <div className="flex items-center space-x-6">
            {user ? (
              <>
                <Link 
                  to="/add-product" 
                  className="flex items-center space-x-2 text-orange-400 hover:text-orange-300 transition-all duration-300 transform hover:scale-110 font-bold"
                >
                  <PlusCircle className="w-5 h-5" />
                  <span>💰 Sell Item</span>
                </Link>
                
                <Link 
                  to="/my-requests" 
                  className="flex items-center space-x-2 text-orange-400 hover:text-orange-300 transition-all duration-300 transform hover:scale-110 font-bold"
                >
                  <Package className="w-5 h-5" />
                  <span>📦 My Requests</span>
                </Link>
                
                <Link 
                  to="/received-requests" 
                  className="flex items-center space-x-2 text-orange-400 hover:text-orange-300 transition-all duration-300 transform hover:scale-110 font-bold"
                >
                  <Inbox className="w-5 h-5" />
                  <span>📬 Received</span>
                </Link>

                <div className="flex items-center space-x-3 pl-6 border-l-2 border-orange-500/50">
                  <div className="text-right bg-gray-900 px-3 py-1 rounded-lg border-2 border-orange-500/40">
                    <p className="text-sm font-bold text-orange-400">{user.name}</p>
                    <p className="text-xs text-gray-300">⭐ {user.rating}/5</p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="p-2 text-orange-400 hover:text-red-500 hover:bg-red-500/20 rounded-lg transition-all duration-300 border-2 border-transparent hover:border-red-500"
                    title="Logout"
                  >
                    <LogOut className="w-5 h-5" />
                  </button>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-3">
                <Link to="/login" className="border-2 border-orange-500 text-orange-400 px-6 py-2 rounded-xl hover:bg-orange-500/20 transition-all duration-300 font-bold shadow-lg shadow-orange-500/20">
                  Login
                </Link>
                <Link to="/register" className="bg-gradient-to-r from-orange-500 to-orange-600 text-black px-6 py-2 rounded-xl hover:from-orange-400 hover:to-orange-500 transition-all duration-300 font-bold shadow-xl shadow-orange-500/50">
                  🚀 Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
