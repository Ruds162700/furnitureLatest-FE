import React, { useState, useEffect } from 'react';
import AdminLayout from "../../Component/admin/AdminLayout";
import { Search, Mail, Phone, Calendar, CheckCircle, Clock, Filter, RefreshCw, BookmarkCheck, Loader2 } from 'lucide-react'; // Added BookmarkCheck and Loader2 icons

const Inquiries = () => {
  const [queries, setQueries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [refreshing, setRefreshing] = useState(false);
  const [resolvingId, setResolvingId] = useState(null); // New state to track which query is being resolved

  const fetchQueries = async () => {
    try {
      setError(null);
      const response = await fetch('https://interior-designer-backend-73ri.onrender.com/api/queries/getQueries');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setQueries(data);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching queries:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchQueries();
  }, []);

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchQueries();
  };

  const handleResolveQuery = async (queryId, currentStatus) => {
    setResolvingId(queryId); // Set the ID of the query being resolved
    try {
      const response = await fetch('https://interior-designer-backend-73ri.onrender.com/api/queries/resolveQuery', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ queryId, updateIsResolvedStatus: !currentStatus }), // Toggle the status
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data.message); // Log success message from backend

      // Update the state to reflect the change
      setQueries(prevQueries =>
        prevQueries.map(query =>
          query._id === queryId ? { ...query, isResolved: !currentStatus } : query
        )
      );
    } catch (err) {
      console.error('Error resolving query:', err);
      // Optionally, show an error message to the user
      alert(`Failed to update inquiry status: ${err.message}`);
    } finally {
      setResolvingId(null); // Clear the resolving ID
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const filteredQueries = queries.filter(query => {
    const matchesSearch =
      query.emailId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      query.query.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (query.contactNo && query.contactNo.toString().includes(searchTerm)); // Ensure contactNo exists before converting to string

    const matchesStatus =
      statusFilter === 'all' ||
      (statusFilter === 'resolved' && query.isResolved) ||
      (statusFilter === 'pending' && !query.isResolved);

    return matchesSearch && matchesStatus;
  });

  const resolvedCount = queries.filter(q => q.isResolved).length;
  const pendingCount = queries.filter(q => !q.isResolved).length;

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-1/4 mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {[1, 2, 3].map(i => (
                <div key={i} className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                  <div className="h-8 bg-gray-300 rounded w-1/2"></div>
                </div>
              ))}
            </div>
            <div className="space-y-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="h-4 bg-gray-300 rounded w-1/4 mb-4"></div>
                  <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-sm text-center max-w-md">
          <div className="text-red-500 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.728-.833-2.498 0L4.316 15.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Failed to Load Inquiries</h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={fetchQueries}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <AdminLayout>
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <h1 className="text-3xl font-bold text-gray-900">Customer Inquiries</h1>
              <button
                onClick={handleRefresh}
                disabled={refreshing}
                className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
                Refresh
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Inquiries</p>
                  <p className="text-3xl font-bold text-gray-900">{queries.length}</p>
                </div>
                <div className="p-3 bg-blue-100 rounded-full">
                  <Mail className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Resolved</p>
                  <p className="text-3xl font-bold text-green-600">{resolvedCount}</p>
                </div>
                <div className="p-3 bg-green-100 rounded-full">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Pending</p>
                  <p className="text-3xl font-bold text-orange-600">{pendingCount}</p>
                </div>
                <div className="p-3 bg-orange-100 rounded-full">
                  <Clock className="w-6 h-6 text-orange-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search by email, query, or contact number..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Filter className="w-5 h-5 text-gray-400" />
                <select
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="all">All Status</option>
                  <option value="resolved">Resolved</option>
                  <option value="pending">Pending</option>
                </select>
              </div>
            </div>
          </div>

          {/* Inquiries List */}
          <div className="space-y-4">
            {filteredQueries.length === 0 ? (
              <div className="bg-white p-12 rounded-lg shadow-sm text-center">
                <div className="text-gray-400 mb-4">
                  <Search className="w-16 h-16 mx-auto" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No inquiries found</h3>
                <p className="text-gray-600">
                  {searchTerm || statusFilter !== 'all'
                    ? 'Try adjusting your search or filter criteria.'
                    : 'No inquiries have been submitted yet.'
                  }
                </p>
              </div>
            ) : (
              filteredQueries.map((query) => (
                <div key={query._id} className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                            query.isResolved
                              ? 'bg-green-100 text-green-800'
                              : 'bg-orange-100 text-orange-800'
                          }`}>
                            {query.isResolved ? 'Resolved' : 'Pending'}
                          </div>
                          {query.post && (
                            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                              Related to Post
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="mb-4">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Query</h3>
                        <p className="text-gray-700 leading-relaxed">{query.query}</p>
                      </div>
                    </div>

                    <div className="lg:ml-6 lg:min-w-0 lg:w-80 flex flex-col justify-between"> {/* Added flex-col justify-between */}
                      <div className="space-y-3 mb-4"> {/* Added mb-4 for spacing */}
                        <div className="flex items-center gap-3 text-sm">
                          <Mail className="w-4 h-4 text-gray-400 flex-shrink-0" />
                          <a
                            href={`mailto:${query.emailId}`}
                            className="text-blue-600 hover:text-blue-800 truncate"
                          >
                            {query.emailId}
                          </a>
                        </div>

                        <div className="flex items-center gap-3 text-sm">
                          <Phone className="w-4 h-4 text-gray-400 flex-shrink-0" />
                          <a
                            href={`tel:${query.contactNo}`}
                            className="text-blue-600 hover:text-blue-800"
                          >
                            {query.contactNo}
                          </a>
                        </div>

                        <div className="flex items-center gap-3 text-sm text-gray-500">
                          <Calendar className="w-4 h-4 flex-shrink-0" />
                          <span>{formatDate(query.createdAt)}</span>
                        </div>

                        {query.updatedAt !== query.createdAt && (
                          <div className="text-xs text-gray-400">
                            Updated: {formatDate(query.updatedAt)}
                          </div>
                        )}
                      </div>

                      {/* Resolve Button */}
                      <button
                        onClick={() => handleResolveQuery(query._id, query.isResolved)}
                        disabled={resolvingId === query._id} // Disable button when resolving this specific query
                        className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors
                          ${query.isResolved
                            ? 'bg-gray-200 text-gray-700 cursor-not-allowed' // Style for resolved state
                            : 'bg-blue-600 text-white hover:bg-blue-700' // Style for pending state
                          }
                          ${resolvingId === query._id ? 'opacity-70 cursor-wait' : ''}
                        `}
                      >
                        {resolvingId === query._id ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Updating...
                          </>
                        ) : (
                          <>
                            <BookmarkCheck className="w-4 h-4" />
                            {query.isResolved ? 'Mark as Pending' : 'Mark as Resolved'}
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Inquiries;