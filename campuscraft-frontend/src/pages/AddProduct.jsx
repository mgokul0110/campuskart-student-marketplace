import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { productAPI } from '../services/api';
import { Package, DollarSign, FileText, Tag, Image, Repeat } from 'lucide-react';

const AddProduct = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    category: '',
    image: '',
    barterAllowed: false
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await productAPI.add({
        ...formData,
        price: parseFloat(formData.price)
      });
      navigate('/');
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to add product');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-300 to-orange-500 bg-clip-text text-transparent mb-2">🔥 List Your Item</h1>
          <p className="text-gray-300 text-lg">Share what you want to sell or swap with fellow students</p>
        </div>

        <div className="card">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-gradient-to-r from-red-600 to-red-700 text-white px-4 py-3 rounded-xl text-sm font-bold border-2 border-red-400">
                ⚠️ {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-bold text-orange-300 mb-2">
                📦 Product Title *
              </label>
              <div className="relative">
                <Package className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-orange-400" />
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="input-field pl-10"
                  placeholder="e.g., Physics Textbook, Gaming Laptop"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-orange-300 mb-2">
                📝 Description
              </label>
              <div className="relative">
                <FileText className="absolute left-3 top-3 w-5 h-5 text-orange-400" />
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="input-field pl-10 min-h-32"
                  placeholder="Describe your item, its condition, and any other relevant details..."
                  rows="4"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-orange-300 mb-2">
                  💰 Price ($) *
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-orange-400" />
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    className="input-field pl-10"
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-orange-300 mb-2">
                  🏷️ Category
                </label>
                <div className="relative">
                  <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-orange-400" />
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="input-field pl-10 font-semibold"
                  >
                    <option value="" className="bg-gray-900">Select a category</option>
                    <option value="Books" className="bg-gray-900">📚 Books</option>
                    <option value="Electronics" className="bg-gray-900">💻 Electronics</option>
                    <option value="Furniture" className="bg-gray-900">🪑 Furniture</option>
                    <option value="Clothing" className="bg-gray-900">👕 Clothing</option>
                    <option value="Sports" className="bg-gray-900">⚽ Sports & Fitness</option>
                    <option value="Stationery" className="bg-gray-900">📝 Stationery</option>
                    <option value="Other" className="bg-gray-900">🔧 Other</option>
                  </select>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-orange-300 mb-2">
                🖼️ Image URL
              </label>
              <div className="relative">
                <Image className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-orange-400" />
                <input
                  type="url"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  className="input-field pl-10"
                  placeholder="https://example.com/image.jpg"
                />
              </div>
              <p className="mt-1 text-xs text-gray-400">
                Optional: Enter a URL to an image of your product
              </p>
            </div>

            <div className="flex items-start space-x-3 p-4 bg-orange-900/30 rounded-xl border-2 border-orange-500/30">
              <input
                type="checkbox"
                name="barterAllowed"
                checked={formData.barterAllowed}
                onChange={handleChange}
                className="mt-1 w-5 h-5 text-orange-500 rounded focus:ring-orange-500 bg-gray-800 border-orange-500"
                id="barter"
              />
              <label htmlFor="barter" className="flex-1 cursor-pointer">
                <div className="flex items-center space-x-2 mb-1">
                  <Repeat className="w-5 h-5 text-orange-400" />
                  <span className="font-bold text-orange-300">🔄 Allow Barter/Swap</span>
                </div>
                <p className="text-sm text-gray-300">
                  Let other students offer to swap items with you instead of buying
                </p>
              </label>
            </div>

            <div className="flex gap-4 pt-4">
              <button
                type="button"
                onClick={() => navigate('/')}
                className="flex-1 btn-secondary py-3"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 btn-primary py-3 disabled:opacity-50"
              >
                {loading ? 'Listing...' : 'List Product'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
