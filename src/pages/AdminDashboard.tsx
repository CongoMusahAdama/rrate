
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BarChart3, Users, Home, TrendingUp, Plus, Settings, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

const AdminDashboard = () => {
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (!isAdmin) {
      toast({
        title: "Access Denied",
        description: "You don't have permission to access this page.",
        variant: "destructive",
      });
      navigate('/admin-login');
    }
  }, [isAdmin, navigate, toast]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center text-black">
          <h1 className="text-4xl font-bold mb-4 text-orange-500">Access Denied</h1>
          <p className="text-gray-600 mb-8">You don't have permission to access this page.</p>
          <Link
            to="/admin-login"
            className="inline-flex items-center orange-gradient text-white px-6 py-3 rounded-xl font-semibold hover:orange-gradient-hover transition-all"
          >
            Admin Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 orange-gradient rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">R</span>
              </div>
              <span className="text-xl font-bold text-orange-500">RealRate Admin</span>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-gray-600">Welcome, {user?.email}</span>
            <Button 
              onClick={handleLogout}
              variant="outline" 
              className="border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white border-gray-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Properties</CardTitle>
              <Home className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-black">2,847</div>
              <p className="text-xs text-gray-500">+12% from last month</p>
            </CardContent>
          </Card>

          <Card className="bg-white border-gray-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Active Users</CardTitle>
              <Users className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-black">8,642</div>
              <p className="text-xs text-gray-500">+5% from last month</p>
            </CardContent>
          </Card>

          <Card className="bg-white border-gray-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Revenue</CardTitle>
              <TrendingUp className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-black">₵124,580</div>
              <p className="text-xs text-gray-500">+18% from last month</p>
            </CardContent>
          </Card>

          <Card className="bg-white border-gray-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">AI Predictions</CardTitle>
              <BarChart3 className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-black">95.7%</div>
              <p className="text-xs text-gray-500">Accuracy rate</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card className="bg-white border-gray-200">
            <CardHeader>
              <CardTitle className="text-black">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button className="w-full justify-start orange-gradient hover:orange-gradient-hover text-white">
                <Plus className="w-4 h-4 mr-2" />
                Add New Property
              </Button>
              <Button variant="outline" className="w-full justify-start border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white">
                <Users className="w-4 h-4 mr-2" />
                Manage Users
              </Button>
              <Button variant="outline" className="w-full justify-start border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white">
                <BarChart3 className="w-4 h-4 mr-2" />
                View Analytics
              </Button>
              <Button variant="outline" className="w-full justify-start border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white">
                <Settings className="w-4 h-4 mr-2" />
                Settle Disputes
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-white border-gray-200">
            <CardHeader>
              <CardTitle className="text-black">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">New property listed</span>
                  <span className="text-xs text-gray-500">2 min ago</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">User registration</span>
                  <span className="text-xs text-gray-500">5 min ago</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">AI prediction updated</span>
                  <span className="text-xs text-gray-500">10 min ago</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Dispute resolved</span>
                  <span className="text-xs text-gray-500">15 min ago</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Property Management Table */}
        <Card className="bg-white border-gray-200">
          <CardHeader>
            <CardTitle className="text-black">Recent Properties</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 text-gray-600">Property</th>
                    <th className="text-left py-3 px-4 text-gray-600">Location</th>
                    <th className="text-left py-3 px-4 text-gray-600">Price</th>
                    <th className="text-left py-3 px-4 text-gray-600">Status</th>
                    <th className="text-left py-3 px-4 text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-200">
                    <td className="py-3 px-4 text-black">Modern Villa</td>
                    <td className="py-3 px-4 text-gray-600">East Legon, Accra</td>
                    <td className="py-3 px-4 text-black">₵2,500,000</td>
                    <td className="py-3 px-4">
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">Active</span>
                    </td>
                    <td className="py-3 px-4">
                      <Button size="sm" variant="outline" className="border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white">
                        Edit
                      </Button>
                    </td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-3 px-4 text-black">Luxury Penthouse</td>
                    <td className="py-3 px-4 text-gray-600">Cantonments, Accra</td>
                    <td className="py-3 px-4 text-black">₵1,800,000</td>
                    <td className="py-3 px-4">
                      <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs">Pending</span>
                    </td>
                    <td className="py-3 px-4">
                      <Button size="sm" variant="outline" className="border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white">
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
