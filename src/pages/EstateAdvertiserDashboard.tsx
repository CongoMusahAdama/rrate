import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Home, Plus, Edit, Trash2, LogOut, Eye, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import ImageUpload from '@/components/ImageUpload';

const EstateAdvertiserDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [properties, setProperties] = useState([]);
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
    image: ''
  });

  useEffect(() => {
    if (!user || user.userType !== 'estate-advertiser') {
      toast({
        title: "Access Denied",
        description: "You need to be logged in as an Estate Advertiser to access this page.",
        variant: "destructive",
      });
      navigate('/login');
    }
  }, [user, navigate, toast]);

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
      image: ''
    });
  };

  const handleAddProperty = (e: React.FormEvent) => {
    e.preventDefault();
    const newProperty = {
      id: Date.now(),
      ...formData,
      beds: parseInt(formData.beds),
      baths: parseInt(formData.baths),
      image: formData.image || '/lovable-uploads/d35db465-e25d-4f59-b6dc-8b643a842ce7.png'
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
      image: property.image
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
              baths: parseInt(formData.baths)
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

  if (!user || user.userType !== 'estate-advertiser') {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center text-black">
          <h1 className="text-4xl font-bold mb-4 text-[#0ea5e9]">Access Denied</h1>
          <p className="text-gray-600 mb-8">You need to be logged in as an Estate Advertiser.</p>
          <Link
            to="/login"
            className="inline-flex items-center bg-[#0ea5e9] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#0284c7] transition-all"
          >
            Login as Estate Advertiser
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
              <span className="text-xl font-bold text-[#0ea5e9]">RealRate Estate</span>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-gray-600">Welcome, {user?.firstName} {user?.lastName}</span>
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
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-white border-gray-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">My Properties</CardTitle>
              <Home className="h-4 w-4 text-[#0ea5e9]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-black">{properties.length}</div>
              <p className="text-xs text-gray-500">Total listings</p>
            </CardContent>
          </Card>

          <Card className="bg-white border-gray-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Active Listings</CardTitle>
              <Eye className="h-4 w-4 text-[#0ea5e9]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-black">{properties.filter(p => p.status === 'For Sale').length}</div>
              <p className="text-xs text-gray-500">Currently available</p>
            </CardContent>
          </Card>

          <Card className="bg-white border-gray-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Views</CardTitle>
              <Users className="h-4 w-4 text-[#0ea5e9]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-black">1,247</div>
              <p className="text-xs text-gray-500">Property views</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="bg-white border-gray-200 mb-8">
          <CardHeader>
            <CardTitle className="text-black">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={() => setIsAddModalOpen(true)}
              className="bg-[#0ea5e9] hover:bg-[#0284c7] text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add New Property
            </Button>
          </CardContent>
        </Card>

        {/* Property Management Table */}
        <Card className="bg-white border-gray-200">
          <CardHeader>
            <CardTitle className="text-black">My Property Listings</CardTitle>
          </CardHeader>
          <CardContent>
            {properties.length === 0 ? (
              <div className="text-center py-8">
                <Home className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-600 mb-2">No properties yet</h3>
                <p className="text-gray-500 mb-4">Start by adding your first property listing</p>
                <Button 
                  onClick={() => setIsAddModalOpen(true)}
                  className="bg-[#0ea5e9] hover:bg-[#0284c7] text-white"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Property
                </Button>
              </div>
            ) : (
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
            )}
          </CardContent>
        </Card>
      </div>

      {/* Add Property Modal */}
      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <DialogContent className="sm:max-w-2xl max-h-[80vh] overflow-y-auto">
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
            
            <ImageUpload
              onImageSelect={(imageUrl) => setFormData({...formData, image: imageUrl})}
              currentImage={formData.image}
            />
            
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
        <DialogContent className="sm:max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-black">Edit Property</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleUpdateProperty} className="space-y-4">
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
            
            <ImageUpload
              onImageSelect={(imageUrl) => setFormData({...formData, image: imageUrl})}
              currentImage={formData.image}
            />
            
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

export default EstateAdvertiserDashboard;
