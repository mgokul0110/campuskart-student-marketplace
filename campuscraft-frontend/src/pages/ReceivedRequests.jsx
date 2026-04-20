import { useState, useEffect } from 'react';
import { requestAPI } from '../services/api';
import { Check, X, Clock, Package, User, DollarSign, Repeat } from 'lucide-react';

const ReceivedRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState({});

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const response = await requestAPI.getReceived();
      setRequests(response.data);
    } catch (error) {
      console.error('Error fetching requests:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (requestId, status) => {
    setActionLoading({ ...actionLoading, [requestId]: true });
    
    try {
      await requestAPI.updateStatus(requestId, status);
      alert(`Request ${status} successfully!`);
      fetchRequests();
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to update request');
    } finally {
      setActionLoading({ ...actionLoading, [requestId]: false });
    }
  };

  const getStatusBadge = (status) => {
    const styles = {
      pending: 'bg-gradient-to-r from-yellow-500 to-yellow-600 text-black border-2 border-yellow-400',
      approved: 'bg-gradient-to-r from-green-500 to-green-600 text-white border-2 border-green-400',
      rejected: 'bg-gradient-to-r from-red-500 to-red-600 text-white border-2 border-red-400'
    };

    return (
      <span className={`px-3 py-1.5 rounded-full text-sm font-bold shadow-lg ${styles[status]} capitalize`}>
        {status}
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
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-300 to-orange-500 bg-clip-text text-transparent mb-2">📬 Received Requests</h1>
          <p className="text-gray-300 text-lg">Manage purchase and swap requests on your products</p>
        </div>

        {requests.length === 0 ? (
          <div className="card text-center py-16">
            <Package className="w-20 h-20 text-orange-400 mx-auto mb-4 animate-bounce" />
            <h3 className="text-2xl font-bold text-orange-300 mb-2">No requests yet 📭</h3>
            <p className="text-gray-400">When someone requests your products, they'll appear here</p>
          </div>
        ) : (
          <div className="space-y-4">
            {requests.map((request) => (
              <div key={request._id} className="card hover:shadow-2xl transition-all">
                <div className="flex flex-col lg:flex-row gap-6">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-xl font-bold text-orange-300 mb-2">
                          {request.product?.title || 'Product Unavailable'}
                        </h3>
                        <p className="text-gray-300 text-sm">{request.product?.description}</p>
                      </div>
                      {getStatusBadge(request.status)}
                    </div>

                    <div className="flex items-center space-x-4 mb-4 flex-wrap gap-2">
                      <div className="flex items-center space-x-2">
                        <DollarSign className="w-5 h-5 text-orange-400" />
                        <span className="text-2xl font-bold bg-gradient-to-r from-orange-300 to-orange-500 bg-clip-text text-transparent">
                          ${request.product?.price}
                        </span>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        {request.type === 'swap' ? (
                          <Repeat className="w-5 h-5 text-orange-400" />
                        ) : (
                          <DollarSign className="w-5 h-5 text-orange-400" />
                        )}
                        <span className="px-3 py-1.5 bg-gradient-to-r from-orange-500 to-orange-600 text-black rounded-full text-sm font-bold capitalize border-2 border-orange-400">
                          {request.type === 'buy' ? '💰 Buy' : '🔄 Swap'} Request
                        </span>
                      </div>
                    </div>

                    <div className="border-t-2 border-orange-500/20 pt-4">
                      <div className="flex items-center space-x-3 mb-3 bg-gray-900/50 p-3 rounded-lg border border-orange-500/30">
                        <User className="w-5 h-5 text-orange-400" />
                        <div>
                          <p className="text-sm font-bold text-orange-300">👤 Requested by</p>
                          <p className="text-sm text-gray-300">
                            {request.buyer?.name || 'Unknown User'} <span className="text-gray-500">({request.buyer?.email})</span>
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3 text-xs text-gray-500 bg-gray-900/50 px-3 py-2 rounded-lg inline-flex">
                        <Clock className="w-4 h-4 text-orange-400" />
                        <span>🕐 {new Date(request.createdAt).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  {request.status === 'pending' && (
                    <div className="flex lg:flex-col gap-3 lg:justify-center">
                      <button
                        onClick={() => handleStatusUpdate(request._id, 'approved')}
                        disabled={actionLoading[request._id]}
                        className="flex-1 lg:flex-none flex items-center justify-center space-x-2 bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-xl hover:from-green-400 hover:to-green-500 transition-all font-bold disabled:opacity-50 shadow-lg shadow-green-500/30 border-2 border-green-400"
                      >
                        <Check className="w-5 h-5" />
                        <span>✅ Approve</span>
                      </button>
                      
                      <button
                        onClick={() => handleStatusUpdate(request._id, 'rejected')}
                        disabled={actionLoading[request._id]}
                        className="flex-1 lg:flex-none flex items-center justify-center space-x-2 bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-3 rounded-xl hover:from-red-400 hover:to-red-500 transition-all font-bold disabled:opacity-50 shadow-lg shadow-red-500/30 border-2 border-red-400"
                      >
                        <X className="w-5 h-5" />
                        <span>❌ Reject</span>
                      </button>
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

export default ReceivedRequests;
