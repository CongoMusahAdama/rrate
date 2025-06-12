import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BarChart3, Users, Home, TrendingUp, Plus, Settings, LogOut, Edit, Trash2, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, LineChart, Line } from 'recharts';

const AdminDashboard = () => {
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [properties, setProperties] = useState([
    {
      id: 1,
      name: 'Modern Villa in East Legon',
      price: '₵2,500,000',
      image: '/lovable-uploads/d35db465-e25d-4f59-b6dc-8b643a842ce7.png',
      beds: 5,
      baths: 4,
      sqft: '3200 sq ft',
      location: 'East Legon, Accra',
      type: 'Villa',
      status: 'For Sale',
      description: 'Beautiful modern villa with premium finishes'
    },
    {
      id: 2,
      name: 'Luxury Penthouse Cantonments',
      price: '₵1,800,000',
      image: '/lovable-uploads/dbe9155c-45cc-425a-9f2a-6f9eddd106e2.png',
      beds: 3,
      baths: 3,
      sqft: '2400 sq ft',
      location: 'Cantonments, Accra',
      type: 'Penthouse',
      status: 'For Sale',
      description: 'Luxury penthouse with city views'
    }
  ]);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingProperty, setEditingProperty] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    beds: '',
    baths: '',
    sqft: '',
    location: '',
    type: '',
    status: 'For Sale',
    description: '',
    image: '',
    imageFile: null,
    imagePreview: ''
  });

  // Chart data
  const chartConfig = {
    users: { label: "Users", color: "#0ea5e9" },
    properties: { label: "Properties", color: "#10b981" },
    bookings: { label: "Bookings", color: "#f59e0b" }
  };

  const monthlyData = [
    { month: 'Jan', users: 100, properties: 20, bookings: 15 },
    { month: 'Feb', users: 150, properties: 25, bookings: 22 },
    { month: 'Mar', users: 200, properties: 30, bookings: 28 },
    { month: 'Apr', users: 250, properties: 35, bookings: 35 },
    { month: 'May', users: 300, properties: 40, bookings: 42 },
    { month: 'Jun', users: 350, properties: 45, bookings: 48 }
  ];

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({
          ...formData,
          imageFile: file,
          imagePreview: reader.result as string,
          image: ''
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const resetForm = () => {
    setFormData({
      name: '',
      price: '',
      beds: '',
      baths: '',
      sqft: '',
      location: '',
      type: '',
      status: 'For Sale',
      description: '',
      image: '',
      imageFile: null,
      imagePreview: ''
    });
  };

  const handleAddProperty = (e: React.FormEvent) => {
    e.preventDefault();
    const newProperty = {
      id: Date.now(),
      ...formData,
      beds: parseInt(formData.beds),
      baths: parseInt(formData.baths),
      image: formData.imagePreview || formData.image || '/lovable-uploads/d35db465-e25d-4f59-b6dc-8b643a842ce7.png'
    };
    setProperties([...properties, newProperty]);
    setIsAddModalOpen(false);
    resetForm();
    toast({
      title: "Property Added",
      description: "New property has been added successfully.",
    });
  };

  const handleEditProperty = (property: any) => {
    setEditingProperty(property);
    setFormData({
      name: property.name,
      price: property.price,
      beds: property.beds.toString(),
      baths: property.baths.toString(),
      sqft: property.sqft,
      location: property.location,
      type: property.type,
      status: property.status,
      description: property.description,
      image: property.image,
      imageFile: null,
      imagePreview: ''
    });
    setIsEditModalOpen(true);
  };

  const handleUpdateProperty = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingProperty) {
      const updatedProperties = properties.map(prop =>
        prop.id === editingProperty.id
          ? {
              ...prop,
              ...formData,
              beds: parseInt(formData.beds),
              baths: parseInt(formData.baths),
              image: formData.imagePreview || formData.image
            }
          : prop
      );
      setProperties(updatedProperties);
      setIsEditModalOpen(false);
      setEditingProperty(null);
      resetForm();
      toast({
        title: "Property Updated",
        description: "Property has been updated successfully.",
      });
    }
  };

  const handleDeleteProperty = (id: number) => {
    setProperties(properties.filter(prop => prop.id !== id));
    toast({
      title: "Property Deleted",
      description: "Property has been deleted successfully.",
    });
  };

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center text-black">
          <h1 className="text-4xl font-bold mb-4 text-[#0ea5e9]">Access Denied</h1>
          <p className="text-gray-600 mb-8">You don't have permission to access this page.</p>
          <Link
            to="/admin-login"
            className="inline-flex items-center bg-[#0ea5e9] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#0284c7] transition-all"
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
              <div className="w-10 h-10 bg-[#0ea5e9] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">R</span>
              </div>
              <span className="text-xl font-bold text-[#0ea5e9]">RealRate Admin</span>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-gray-600">Welcome, {user?.email}</span>
            <Button 
              onClick={handleLogout}
              variant="outline" 
              className="border-[#0ea5e9] text-[#0ea5e9] hover:bg-[#0ea5e9] hover:text-white"
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
              <Home className="h-4 w-4 text-[#0ea5e9]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-black">{properties.length}</div>
              <p className="text-xs text-gray-500">+12% from last month</p>
            </CardContent>
          </Card>

          <Card className="bg-white border-gray-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Active Users</CardTitle>
              <Users className="h-4 w-4 text-[#0ea5e9]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-black">8,642</div>
              <p className="text-xs text-gray-500">+5% from last month</p>
            </CardContent>
          </Card>

          <Card className="bg-white border-gray-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Revenue</CardTitle>
              <TrendingUp className="h-4 w-4 text-[#0ea5e9]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-black">GHS 124,580</div>
              <p className="text-xs text-gray-500">+18% from last month</p>
            </CardContent>
          </Card>

          <Card className="bg-white border-gray-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">AI Predictions</CardTitle>
              <BarChart3 className="h-4 w-4 text-[#0ea5e9]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-black">95.7%</div>
              <p className="text-xs text-gray-500">Accuracy rate</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card className="bg-white border-gray-200">
            <CardHeader>
              <CardTitle className="text-black">Monthly Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthlyData}>
                    <XAxis dataKey="month" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="users" fill="#0ea5e9" />
                    <Bar dataKey="properties" fill="#10b981" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card className="bg-white border-gray-200">
            <CardHeader>
              <CardTitle className="text-black">Growth Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={monthlyData}>
                    <XAxis dataKey="month" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line type="monotone" dataKey="bookings" stroke="#f59e0b" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
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
              <Button 
                onClick={() => setIsAddModalOpen(true)}
                className="w-full justify-start bg-[#0ea5e9] hover:bg-[#0284c7] text-white"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add New Property
              </Button>
              <Button variant="outline" className="w-full justify-start border-[#0ea5e9] text-[#0ea5e9] hover:bg-[#0ea5e9] hover:text-white">
                <Users className="w-4 h-4 mr-2" />
                Manage Users
              </Button>
              <Button variant="outline" className="w-full justify-start border-[#0ea5e9] text-[#0ea5e9] hover:bg-[#0ea5e9] hover:text-white">
                <BarChart3 className="w-4 h-4 mr-2" />
                View Analytics
              </Button>
              <Button variant="outline" className="w-full justify-start border-[#0ea5e9] text-[#0ea5e9] hover:bg-[#0ea5e9] hover:text-white">
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
            <CardTitle className="text-black">Property Management</CardTitle>
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
                  {properties.map((property) => (
                    <tr key={property.id} className="border-b border-gray-200">
                      <td className="py-3 px-4 text-black">{property.name}</td>
                      <td className="py-3 px-4 text-gray-600">{property.location}</td>
                      <td className="py-3 px-4 text-black">{property.price}</td>
                      <td className="py-3 px-4">
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                          {property.status}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex space-x-2">
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="border-[#0ea5e9] text-[#0ea5e9] hover:bg-[#0ea5e9] hover:text-white"
                            onClick={() => handleEditProperty(property)}
                          >
                            <Edit className="w-3 h-3" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                            onClick={() => handleDeleteProperty(property.id)}
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Add Property Modal */}
      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <DialogContent className="sm:max-w-md max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-black">Add New Property</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleAddProperty} className="space-y-4">
            <div>
              <Label htmlFor="name">Property Name</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="price">Price (GHS)</Label>
              <Input
                id="price"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                placeholder="₵1,000,000"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="beds">Bedrooms</Label>
                <Input
                  id="beds"
                  name="beds"
                  type="number"
                  value={formData.beds}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="baths">Bathrooms</Label>
                <Input
                  id="baths"
                  name="baths"
                  type="number"
                  value={formData.baths}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div>
              <Label htmlFor="sqft">Square Feet</Label>
              <Input
                id="sqft"
                name="sqft"
                value={formData.sqft}
                onChange={handleInputChange}
                placeholder="2000 sq ft"
                required
              />
            </div>
            <div>
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="type">Property Type</Label>
                <Select onValueChange={(value) => handleSelectChange('type', value)} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="House">House</SelectItem>
                    <SelectItem value="Apartment">Apartment</SelectItem>
                    <SelectItem value="Villa">Villa</SelectItem>
                    <SelectItem value="Penthouse">Penthouse</SelectItem>
                    <SelectItem value="Townhouse">Townhouse</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="status">Status</Label>
                <Select onValueChange={(value) => handleSelectChange('status', value)} defaultValue="For Sale">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="For Sale">For Sale</SelectItem>
                    <SelectItem value="For Rent">For Rent</SelectItem>
                    <SelectItem value="Sold">Sold</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={3}
              />
            </div>
            <div>
              <Label htmlFor="image">Image URL or Upload</Label>
              <Input
                id="image"
                name="image"
                value={formData.image}
                onChange={handleInputChange}
                placeholder="https://example.com/image.jpg"
                disabled={!!formData.imageFile}
              />
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="mt-2"
              />
              {formData.imagePreview && (
                <img
                  src={formData.imagePreview}
                  alt="Preview"
                  className="mt-2 w-32 h-32 object-cover rounded-lg"
                />
              )}
            </div>
            <div className="flex gap-3">
              <Button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                variant="outline"
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-[#0ea5e9] hover:bg-[#0284c7] text-white"
              >
                Add Property
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Edit Property Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="sm:max-w-md max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-black">Edit Property</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleUpdateProperty} className="space-y-4">
            {/* Same form fields as Add Property Modal */}
            <div>
              <Label htmlFor="name">Property Name</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="price">Price (GHS)</Label>
              <Input
                id="price"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                placeholder="₵1,000,000"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="beds">Bedrooms</Label>
                <Input
                  id="beds"
                  name="beds"
                  type="number"
                  value={formData.beds}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="baths">Bathrooms</Label>
                <Input
                  id="baths"
                  name="baths"
                  type="number"
                  value={formData.baths}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div>
              <Label htmlFor="sqft">Square Feet</Label>
              <Input
                id="sqft"
                name="sqft"
                value={formData.sqft}
                onChange={handleInputChange}
                placeholder="2000 sq ft"
                required
              />
            </div>
            <div>
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="type">Property Type</Label>
                <Select value={formData.type} onValueChange={(value) => handleSelectChange('type', value)} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="House">House</SelectItem>
                    <SelectItem value="Apartment">Apartment</SelectItem>
                    <SelectItem value="Villa">Villa</SelectItem>
                    <SelectItem value="Penthouse">Penthouse</SelectItem>
                    <SelectItem value="Townhouse">Townhouse</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="status">Status</Label>
                <Select value={formData.status} onValueChange={(value) => handleSelectChange('status', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="For Sale">For Sale</SelectItem>
                    <SelectItem value="For Rent">For Rent</SelectItem>
                    <SelectItem value="Sold">Sold</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={3}
              />
            </div>
            <div>
              <Label htmlFor="image">Image URL</Label>
              <Input
                id="image"
                name="image"
                value={formData.image}
                onChange={handleInputChange}
                placeholder="https://example.com/image.jpg"
              />
            </div>
            <div className="flex gap-3">
              <Button
                type="button"
                onClick={() => {
                  setIsEditModalOpen(false);
                  setEditingProperty(null);
                  resetForm();
                }}
                variant="outline"
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-[#0ea5e9] hover:bg-[#0284c7] text-white"
              >
                Update Property
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminDashboard;
