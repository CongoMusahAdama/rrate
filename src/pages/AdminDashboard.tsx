
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BarChart3, Users, Home, TrendingUp, Plus, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const AdminDashboard = () => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  const authorizedEmails = ['admin@realrate1', 'admin@realrate2'];

  useEffect(() => {
    // In a real app, this would check actual authentication
    // For demo purposes, we'll simulate checking user email
    const checkAuthorization = () => {
      // This would come from your auth system
      const currentUserEmail = 'admin@realrate1'; // Demo email
      setUserEmail(currentUserEmail);
      
      if (authorizedEmails.includes(currentUserEmail)) {
        setIsAuthorized(true);
      }
    };

    checkAuthorization();
  }, []);

  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-4xl font-bold mb-4">Access Denied</h1>
          <p className="text-gray-400 mb-8">You don't have permission to access this page.</p>
          <Link
            to="/"
            className="inline-flex items-center bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-orange-600 hover:to-orange-700 transition-all"
          >
            Return Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="bg-gray-900 border-b border-gray-800 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">R</span>
              </div>
              <span className="text-xl font-bold">RealRate Admin</span>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-gray-400">Welcome, {userEmail}</span>
            <Button variant="outline" className="border-gray-700 text-white hover:bg-gray-800">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Total Properties</CardTitle>
              <Home className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">2,847</div>
              <p className="text-xs text-gray-500">+12% from last month</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Active Users</CardTitle>
              <Users className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">8,642</div>
              <p className="text-xs text-gray-500">+5% from last month</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Total Revenue</CardTitle>
              <TrendingUp className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">₵124,580</div>
              <p className="text-xs text-gray-500">+18% from last month</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">AI Predictions</CardTitle>
              <BarChart3 className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">95.7%</div>
              <p className="text-xs text-gray-500">Accuracy rate</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button className="w-full justify-start bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700">
                <Plus className="w-4 h-4 mr-2" />
                Add New Property
              </Button>
              <Button variant="outline" className="w-full justify-start border-gray-700 text-white hover:bg-gray-800">
                <Users className="w-4 h-4 mr-2" />
                Manage Users
              </Button>
              <Button variant="outline" className="w-full justify-start border-gray-700 text-white hover:bg-gray-800">
                <BarChart3 className="w-4 h-4 mr-2" />
                View Analytics
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">New property listed</span>
                  <span className="text-xs text-gray-500">2 min ago</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">User registration</span>
                  <span className="text-xs text-gray-500">5 min ago</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">AI prediction updated</span>
                  <span className="text-xs text-gray-500">10 min ago</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Property Management Table */}
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Recent Properties</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-800">
                    <th className="text-left py-3 px-4 text-gray-400">Property</th>
                    <th className="text-left py-3 px-4 text-gray-400">Location</th>
                    <th className="text-left py-3 px-4 text-gray-400">Price</th>
                    <th className="text-left py-3 px-4 text-gray-400">Status</th>
                    <th className="text-left py-3 px-4 text-gray-400">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-800">
                    <td className="py-3 px-4 text-white">Modern Villa</td>
                    <td className="py-3 px-4 text-gray-400">East Legon, Accra</td>
                    <td className="py-3 px-4 text-white">₵2,500,000</td>
                    <td className="py-3 px-4">
                      <span className="bg-green-600 text-white px-2 py-1 rounded-full text-xs">Active</span>
                    </td>
                    <td className="py-3 px-4">
                      <Button size="sm" variant="outline" className="border-gray-700 text-white hover:bg-gray-800">
                        Edit
                      </Button>
                    </td>
                  </tr>
                  <tr className="border-b border-gray-800">
                    <td className="py-3 px-4 text-white">Luxury Penthouse</td>
                    <td className="py-3 px-4 text-gray-400">Cantonments, Accra</td>
                    <td className="py-3 px-4 text-white">₵1,800,000</td>
                    <td className="py-3 px-4">
                      <span className="bg-orange-600 text-white px-2 py-1 rounded-full text-xs">Pending</span>
                    </td>
                    <td className="py-3 px-4">
                      <Button size="sm" variant="outline" className="border-gray-700 text-white hover:bg-gray-800">
                        Edit
                      </Button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
