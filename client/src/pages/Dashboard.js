import { useState, useEffect, useContext } from 'react';
import AuthContext from '../contexts/AuthContext';
import { fetchProducts, fetchDashboardStats } from '../services/api';
import ProductList from '../components/ProductList';
import StatsCards from '../components/StatsCards';

const Dashboard = () => {
  const [currentTab, setCurrentTab] = useState('products');
  const [products, setProducts] = useState([]);
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalSales: 0,
    totalRevenue: 0,
    totalCustomers: 0
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { currentUser, logout } = useContext(AuthContext);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const productsData = await fetchProducts();
      setProducts(productsData);
      
      const statsData = await fetchDashboardStats();
      setStats(statsData);
      
      setIsLoading(false);
    } catch (err) {
      setError('Failed to load dashboard data');
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    window.location.href = '/';
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex justify-center items-center h-64">
          <div className="text-gray-500">Loading...</div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p>{error}</p>
        </div>
      );
    }

    switch (currentTab) {
      case 'products':
        return <ProductList products={products} onRefresh={loadDashboardData} />;
      case 'stats':
        return <StatsCards stats={stats} />;
      default:
        return <div>Select a tab</div>;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-900">Merchandise Dashboard</h1>
          {currentUser && (
            <div className="flex items-center">
              <span className="mr-4">Welcome, {currentUser.name}</span>
              <button 
                onClick={handleLogout} 
                className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Main content */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="flex space-x-8">
            <button
              onClick={() => setCurrentTab('products')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                currentTab === 'products'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Products
            </button>
            <button
              onClick={() => setCurrentTab('stats')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                currentTab === 'stats'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Statistics
            </button>
          </nav>
        </div>

        {/* Dashboard content */}
        {renderContent()}
      </main>
    </div>
  );
};

export default Dashboard;