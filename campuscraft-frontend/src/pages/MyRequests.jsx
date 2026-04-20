import { useState, useEffect } from 'react';
import { requestAPI } from '../services/api';
import { Clock, CheckCircle, XCircle, Package } from 'lucide-react';

const MyRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const response = await requestAPI.getMyRequests();
      setRequests(response.data);
    } catch (error) {
      console.error('Error fetching requests:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    const styles = {
      pending: 'bg-gradient-to-r from-yellow-500 to-yellow-600 text-black border-2 border-yellow-400',
      approved: 'bg-gradient-to-r from-green-500 to-green-600 text-white border-2 border-green-400',
      rejected: 'bg-gradient-to-r from-red-500 to-red-600 text-white border-2 border-red-400'
    };

    const icons = {
      pending: <Clock className="w-4 h-4" />,
      approved: <CheckCircle className="w-4 h-4" />,
      rejected: <XCircle className="w-4 h-4" />
    };

    return (
      <span className={`inline-flex items-center space-x-1 px-3 py-1.5 rounded-full text-sm font-bold shadow-lg ${styles[status]}`}>
        {icons[status]}
        <span className="capitalize">{status}</span>
      </span>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-300 to-orange-500 bg-clip-text text-transparent mb-2">📦 My Requests</h1>
          <p className="text-gray-300 text-lg">Track your purchase and swap requests</p>
        </div>

        {requests.length === 0 ? (
          <div className="card text-center py-16">
            <Package className="w-20 h-20 text-orange-400 mx-auto mb-4 animate-bounce" />
            <h3 className="text-2xl font-bold text-orange-300 mb-2">No requests yet 📭</h3>
            <p className="text-gray-400">Start browsing products to make your first request</p>
          </div>
        ) : (
          <div className="space-y-4">
            {requests.map((request) => (
              <div key={request._id} className="card hover:shadow-2xl transition-all">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-xl font-bold text-orange-300">
                        {request.product?.title || 'Product Unavailable'}
                      </h3>
                      {getStatusBadge(request.status)}
                    </div>
                    
                    {request.product && (
                      <>
                        <p className="text-gray-300 mb-3">{request.product.description}</p>
                        <div className="flex items-center space-x-4 text-sm">
                          <span className="text-3xl font-bold bg-gradient-to-r from-orange-300 to-orange-500 bg-clip-text text-transparent">
                            💰 ${request.product.price}
                          </span>
                          <span className="px-3 py-1.5 bg-gradient-to-r from-orange-500 to-orange-600 text-black rounded-full font-bold capitalize border-2 border-orange-400">
                            {request.type === 'buy' ? '💰 Buy' : '🔄 Swap'}
                          </span>
                          {request.product.category && (
                            <span className="text-gray-400 font-semibold">
                              📂 {request.product.category}
                            </span>
                          )}
                        </div>
                      </>
                    )}
                    
                    <div className="mt-3 text-xs text-gray-500 bg-gray-900/50 px-3 py-1 rounded-lg inline-block">
                      🕐 Requested on {new Date(request.createdAt).toLocaleDateString()}
                    </div>
                  </div>

                  {request.product?.image && (
                    <div className="md:w-32 md:h-32 w-full h-48 bg-gray-900 rounded-xl overflow-hidden flex-shrink-0 border-2 border-orange-500/30">
                      <img 
                        src={request.product.image} 
                        alt={request.product.title}
                        className="w-full h-full object-cover"
                      />
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

export default MyRequests;
