import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ShoppingBag, Mail, Lock } from 'lucide-react';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await login(formData.email, formData.password);
    
    if (result.success) {
      navigate('/');
    } else {
      setError(result.message);
    }
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-orange-950 px-4 py-12">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-orange-500 to-orange-600 rounded-3xl mb-4 shadow-2xl shadow-orange-500/60 animate-pulse">
            <ShoppingBag className="w-12 h-12 text-black drop-shadow-lg" />
          </div>
          <h2 className="text-5xl font-bold bg-gradient-to-r from-orange-300 to-orange-500 bg-clip-text text-transparent drop-shadow-2xl mb-3 filter drop-shadow-[0_0_20px_rgba(249,115,22,0.5)]">Welcome Back! 🔥</h2>
          <p className="mt-2 text-orange-300 text-xl font-bold drop-shadow-lg">Sign in to your CampusCraft account</p>
        </div>

        <div className="card bg-gradient-to-br from-gray-900 to-black border-orange-500/50">
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="bg-gradient-to-r from-red-600 to-red-700 text-white px-4 py-3 rounded-xl text-sm font-bold border-2 border-red-400 shadow-lg">
                ⚠️ {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-bold text-orange-300 mb-2">
                📧 Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-orange-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="input-field pl-10"
                  placeholder="your.name@college.edu"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-orange-300 mb-2">
                🔒 Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-orange-400" />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="input-field pl-10"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary py-3 text-base disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-6 text-center bg-gray-900 py-3 rounded-xl border-2 border-orange-500/30">
            <p className="text-sm text-gray-300">
              Don't have an account?{' '}
              <Link to="/register" className="text-orange-400 hover:text-orange-300 font-bold underline">
                🚀 Sign up now!
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
