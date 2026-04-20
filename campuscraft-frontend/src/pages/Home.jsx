import { useState, useEffect } from 'react';
import { productAPI, requestAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { Search, DollarSign, Repeat, Star, Package } from 'lucide-react';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const [requestLoading, setRequestLoading] = useState({});
  const { user } = useAuth();

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [searchTerm, selectedCategory, products]);

  const fetchProducts = async () => {
    try {
      const response = await productAPI.getAll();
      setProducts(response.data);
      setFilteredProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterProducts = () => {
    let filtered = products;

    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    setFilteredProducts(filtered);
  };

  const handleRequest = async (productId, type) => {
    setRequestLoading({ ...requestLoading, [productId]: true });
    
    try {
      await requestAPI.create(productId, type);
      alert(`${type === 'buy' ? 'Purchase' : 'Swap'} request sent successfully!`);
      fetchProducts();
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to send request');
    } finally {
      setRequestLoading({ ...requestLoading, [productId]: false });
    }
  };

  const categories = ['all', ...new Set(products.map(p => p.category).filter(Boolean))];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-r from-black via-orange-900 to-black text-white py-20 shadow-2xl shadow-orange-900/50 border-b-4 border-orange-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-orange-300 via-orange-400 to-orange-500 bg-clip-text text-transparent drop-shadow-2xl filter drop-shadow-[0_0_30px_rgba(249,115,22,0.5)]">
            🔥 Discover Campus Treasures 🔥
          </h1>
          <p className="text-2xl text-orange-300 font-bold drop-shadow-lg">🎓 Buy, sell, and swap items with fellow students 💼</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10">
        <div className="card mb-8 bg-gradient-to-r from-gray-900 to-black border-orange-500/50 shadow-xl shadow-orange-900/30">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-orange-400" />
              <input
                type="text"
                placeholder="🔍 Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-field pl-10"
              />
            </div>
            
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="input-field md:w-56 font-bold"
            >
              {categories.map(cat => (
                <option key={cat} value={cat} className="bg-gray-900 text-white">
                  {cat === 'all' ? '📂 All Categories' : `🔥 ${cat}`}
                </option>
              ))}
            </select>
          </div>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="text-center py-16 card">
            <Package className="w-20 h-20 text-orange-400 mx-auto mb-4 animate-bounce" />
            <h3 className="text-2xl font-bold text-orange-300 mb-2">No products found 🔍</h3>
            <p className="text-gray-400">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-12">
            {filteredProducts.map((product) => (
              <div key={product._id} className="card">
                <div className="aspect-w-16 aspect-h-9 mb-4 bg-gray-100 rounded-lg overflow-hidden">
                  {product.image ? (
                    <img 
                      src={product.image} 
                      alt={product.title}
                      className="w-full h-48 object-cover"
                    />
                  ) : (
                    <div className="w-full h-48 flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                      <Package className="w-16 h-16 text-gray-400" />
                    </div>
                  )}
                </div>

                <div className="space-y-3">
                  <div>
                    <h3 className="text-xl font-bold text-orange-300 mb-2 drop-shadow-lg">
                      {product.title}
                    </h3>
                    {product.description && (
                      <p className="text-sm text-gray-300 line-clamp-2">
                        {product.description}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-4xl font-bold bg-gradient-to-r from-orange-300 to-orange-500 bg-clip-text text-transparent drop-shadow-xl filter drop-shadow-[0_0_15px_rgba(249,115,22,0.6)]">
                      💰 ${product.price}
                    </span>
                    {product.category && (
                      <span className="px-3 py-1.5 bg-gradient-to-r from-orange-500 to-orange-600 text-black text-xs font-bold rounded-full border-2 border-orange-400 shadow-lg shadow-orange-500/50">
                        🔥 {product.category}
                      </span>
                    )}
                  </div>

                  {product.seller && (
                    <div className="flex items-center space-x-2 pt-3 border-t-2 border-orange-500/30">
                      <div className="flex-1 bg-gray-900 px-3 py-2 rounded-lg border border-orange-500/30">
                        <p className="text-sm font-bold text-orange-300">👤 {product.seller.name}</p>
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-orange-400 fill-current" />
                          <span className="text-xs text-gray-300 font-semibold">{product.seller.rating}/5</span>
                        </div>
                      </div>
                      
                      {!product.isAvailable && (
                        <span className="px-3 py-1.5 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-bold rounded-full border-2 border-red-400 shadow-lg">
                          ⛔ SOLD
                        </span>
                      )}
                    </div>
                  )}

                  {user && product.isAvailable && product.seller?._id !== user.id && (
                    <div className="flex gap-2 pt-2">
                      <button
                        onClick={() => handleRequest(product._id, 'buy')}
                        disabled={requestLoading[product._id]}
                        className="flex-1 flex items-center justify-center space-x-2 btn-primary py-2 text-sm disabled:opacity-50"
                      >
                        <DollarSign className="w-4 h-4" />
                        <span>Buy</span>
                      </button>
                      
                      {product.barterAllowed && (
                        <button
                          onClick={() => handleRequest(product._id, 'swap')}
                          disabled={requestLoading[product._id]}
                          className="flex-1 flex items-center justify-center space-x-2 btn-outline py-2 text-sm disabled:opacity-50"
                        >
                          <Repeat className="w-4 h-4" />
                          <span>Swap</span>
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
