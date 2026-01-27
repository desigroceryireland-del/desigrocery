import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, MapPin, ShoppingBag, LogOut, Plus, Trash2, Star, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Layout } from '@/components/layout/Layout';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';

const ProfilePage = () => {
  const { user, isAuthenticated, logout, addAddress, removeAddress, setDefaultAddress } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [newAddress, setNewAddress] = useState({
    label: '',
    street: '',
    city: '',
    eircode: '',
    isDefault: false,
  });

  if (!isAuthenticated || !user) {
    navigate('/login');
    return null;
  }

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
    navigate('/');
  };

  const handleAddAddress = () => {
    if (newAddress.label && newAddress.street && newAddress.city && newAddress.eircode) {
      addAddress(newAddress);
      setNewAddress({ label: '', street: '', city: '', eircode: '', isDefault: false });
      toast({
        title: "Address added",
        description: "Your new address has been saved.",
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'bg-green text-secondary-foreground';
      case 'shipped':
        return 'bg-primary text-primary-foreground';
      case 'processing':
        return 'bg-turmeric text-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <Layout>
      <div className="container py-8">
        <div className="max-w-4xl mx-auto">
          {/* Profile Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card rounded-xl p-6 shadow-card border mb-8"
          >
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full gradient-saffron flex items-center justify-center text-2xl text-primary-foreground font-bold">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1">
                <h1 className="text-2xl font-bold text-foreground">{user.name}</h1>
                <p className="text-muted-foreground">{user.email}</p>
                <p className="text-sm text-muted-foreground">{user.phone}</p>
              </div>
              <Button variant="outline" onClick={handleLogout} className="gap-2">
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            </div>
          </motion.div>

          {/* Tabs */}
          <Tabs defaultValue="orders" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="profile" className="gap-2">
                <User className="h-4 w-4" />
                Profile
              </TabsTrigger>
              <TabsTrigger value="addresses" className="gap-2">
                <MapPin className="h-4 w-4" />
                Addresses
              </TabsTrigger>
              <TabsTrigger value="orders" className="gap-2">
                <ShoppingBag className="h-4 w-4" />
                Orders
              </TabsTrigger>
            </TabsList>

            {/* Profile Tab */}
            <TabsContent value="profile">
              <div className="bg-card rounded-xl p-6 shadow-card border">
                <h2 className="text-xl font-bold text-foreground mb-6">Personal Information</h2>
                <div className="grid gap-4 max-w-md">
                  <div className="space-y-2">
                    <Label>Full Name</Label>
                    <Input value={user.name} readOnly />
                  </div>
                  <div className="space-y-2">
                    <Label>Email</Label>
                    <Input value={user.email} readOnly />
                  </div>
                  <div className="space-y-2">
                    <Label>Phone</Label>
                    <Input value={user.phone} readOnly />
                  </div>
                  <Button className="w-fit bg-primary hover:bg-saffron-dark text-primary-foreground">
                    Edit Profile
                  </Button>
                </div>
              </div>
            </TabsContent>

            {/* Addresses Tab */}
            <TabsContent value="addresses">
              <div className="bg-card rounded-xl p-6 shadow-card border">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-foreground">Saved Addresses</h2>
                  {user.addresses.length < 3 && (
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className="gap-2 bg-primary hover:bg-saffron-dark text-primary-foreground">
                          <Plus className="h-4 w-4" />
                          Add Address
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Add New Address</DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="space-y-2">
                            <Label>Label (e.g., Home, Work)</Label>
                            <Input
                              value={newAddress.label}
                              onChange={(e) => setNewAddress({ ...newAddress, label: e.target.value })}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Street Address</Label>
                            <Input
                              value={newAddress.street}
                              onChange={(e) => setNewAddress({ ...newAddress, street: e.target.value })}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>City</Label>
                            <Input
                              value={newAddress.city}
                              onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Eircode</Label>
                            <Input
                              value={newAddress.eircode}
                              onChange={(e) => setNewAddress({ ...newAddress, eircode: e.target.value })}
                            />
                          </div>
                          <Button onClick={handleAddAddress} className="bg-primary hover:bg-saffron-dark text-primary-foreground">
                            Save Address
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  )}
                </div>

                {user.addresses.length === 0 ? (
                  <p className="text-muted-foreground">No addresses saved yet.</p>
                ) : (
                  <div className="grid gap-4">
                    {user.addresses.map(address => (
                      <div
                        key={address.id}
                        className={`p-4 rounded-lg border ${
                          address.isDefault ? 'border-primary bg-saffron-light' : 'border-border'
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <span className="font-medium">{address.label}</span>
                              {address.isDefault && (
                                <Badge variant="secondary" className="bg-primary text-primary-foreground">
                                  Default
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground">{address.street}</p>
                            <p className="text-sm text-muted-foreground">
                              {address.city}, {address.eircode}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            {!address.isDefault && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setDefaultAddress(address.id)}
                              >
                                Set as Default
                              </Button>
                            )}
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-destructive"
                              onClick={() => removeAddress(address.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {user.addresses.length >= 3 && (
                  <p className="text-sm text-muted-foreground mt-4">
                    Maximum 3 addresses allowed. Remove an address to add a new one.
                  </p>
                )}
              </div>
            </TabsContent>

            {/* Orders Tab */}
            <TabsContent value="orders">
              <div className="bg-card rounded-xl p-6 shadow-card border">
                <h2 className="text-xl font-bold text-foreground mb-6">Order History</h2>

                {user.orders.length === 0 ? (
                  <div className="text-center py-8">
                    <ShoppingBag className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-muted-foreground mb-4">No orders yet</p>
                    <Link to="/category/all">
                      <Button className="bg-primary hover:bg-saffron-dark text-primary-foreground">
                        Start Shopping
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {user.orders.map(order => (
                      <div key={order.id} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <p className="font-medium">Order #{order.id}</p>
                            <p className="text-sm text-muted-foreground">{order.date}</p>
                          </div>
                          <Badge className={getStatusColor(order.status)}>
                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                          </Badge>
                        </div>

                        <div className="space-y-2 mb-4">
                          {order.items.map((item, idx) => (
                            <div key={idx} className="flex justify-between text-sm">
                              <span className="text-muted-foreground">
                                {item.name} x{item.quantity}
                              </span>
                              <span>€{(item.price * item.quantity).toFixed(2)}</span>
                            </div>
                          ))}
                        </div>

                        <div className="flex items-center justify-between pt-4 border-t">
                          <div>
                            <span className="text-sm text-muted-foreground">Total: </span>
                            <span className="font-bold">€{order.total.toFixed(2)}</span>
                          </div>
                          {order.status === 'delivered' && !order.rated && (
                            <Button variant="outline" size="sm" className="gap-2">
                              <Star className="h-4 w-4" />
                              Rate Products
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default ProfilePage;
