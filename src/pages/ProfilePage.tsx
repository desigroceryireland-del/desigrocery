// import { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import {
//   User,
//   MapPin,
//   ShoppingBag,
//   LogOut,
//   Plus,
//   Trash2,
//   Loader2,
//   Edit2,
// } from "lucide-react";
// import { motion } from "framer-motion";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Badge } from "@/components/ui/badge";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { Checkbox } from "@/components/ui/checkbox";
// import { Layout } from "@/components/layout/Layout";
// import { useAuth } from "@/context/AuthContext";
// import { useToast } from "@/hooks/use-toast";
// import { api } from "@/lib/api";

// // ✅ Types matching Backend Serializers
// interface OrderItem {
//   product_name: string;
//   quantity: number;
//   price: number;
// }

// interface OrderType {
//   id: number;
//   status: string;
//   payment_status: string;
//   created_at: string;
//   amount_total: number;
//   items: OrderItem[];
// }

// interface AddressType {
//   id: number;
//   name: string;
//   street: string;
//   city: string;
//   state: string;
//   zip_code: string;
//   phone: string;
//   is_default: boolean;
// }

// const ProfilePage = () => {
//   const { user, isAuthenticated, logout } = useAuth(); // Assuming useAuth provides a way to refresh user data
//   const navigate = useNavigate();
//   const { toast } = useToast();

//   const [orders, setOrders] = useState<OrderType[]>([]);
//   const [addresses, setAddresses] = useState<AddressType[]>([]);
//   const [loading, setLoading] = useState(true);

//   // Dialog States
//   const [addressDialogOpen, setAddressDialogOpen] = useState(false);
//   const [profileDialogOpen, setProfileDialogOpen] = useState(false);
//   const [editingAddress, setEditingAddress] = useState<AddressType | null>(
//     null,
//   );
//   const [isSaving, setIsSaving] = useState(false);

//   // Form States
//   const [fullName, setFullName] = useState(user?.name || "");
//   const [addressForm, setAddressForm] = useState({
//     name: "",
//     street: "",
//     city: "",
//     state: "",
//     zip_code: "",
//     phone: "",
//     is_default: false,
//   });

//   // ✅ Fetch Data on Load
//   const fetchData = async () => {
//     try {
//       const [ordersData, addressesData] = await Promise.all([
//         api.getOrders(),
//         api.getAddresses(),
//       ]);
//       setOrders(ordersData);
//       setAddresses(addressesData);
//     } catch (error) {
//       console.error("Failed to fetch profile data", error);
//       toast({
//         title: "Error",
//         description: "Could not load profile data.",
//         variant: "destructive",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (!isAuthenticated) {
//       navigate("/login");
//       return;
//     }
//     fetchData();
//   }, [isAuthenticated, navigate]);

//   const handleLogout = () => {
//     logout();
//     toast({ title: "Logged out", description: "Successfully logged out." });
//     navigate("/");
//   };

//   // ✅ Open Address Dialog (Add or Edit Mode)
//   const openAddressDialog = (address?: AddressType) => {
//     if (address) {
//       setEditingAddress(address);
//       setAddressForm({
//         name: address.name,
//         street: address.street,
//         city: address.city,
//         state: address.state,
//         zip_code: address.zip_code,
//         phone: address.phone,
//         is_default: address.is_default,
//       });
//     } else {
//       setEditingAddress(null);
//       setAddressForm({
//         name: "",
//         street: "",
//         city: "",
//         state: "",
//         zip_code: "",
//         phone: "",
//         is_default: false,
//       });
//     }
//     setAddressDialogOpen(true);
//   };

//   // ✅ Handle Address Submit
//   const handleAddressSubmit = async () => {
//     if (
//       !addressForm.name ||
//       !addressForm.street ||
//       !addressForm.city ||
//       !addressForm.zip_code
//     ) {
//       toast({
//         title: "Validation Error",
//         description: "Please fill all required fields.",
//         variant: "destructive",
//       });
//       return;
//     }

//     try {
//       setIsSaving(true);
//       if (editingAddress) {
//         // Edit existing
//         await api.updateAddress(editingAddress.id, addressForm);
//         toast({ title: "Address updated" });
//       } else {
//         // Add new
//         await api.addAddress(addressForm);
//         toast({ title: "Address added" });
//       }
//       setAddressDialogOpen(false);
//       fetchData(); // Refresh list
//     } catch (error: any) {
//       toast({
//         title: "Error",
//         description: error.detail || "Failed to save address.",
//         variant: "destructive",
//       });
//     } finally {
//       setIsSaving(false);
//     }
//   };

//   const handleDeleteAddress = async (id: number) => {
//     if (!window.confirm("Are you sure you want to delete this address?"))
//       return;
//     try {
//       await api.deleteAddress(id);
//       setAddresses(addresses.filter((a) => a.id !== id));
//       toast({ title: "Deleted", description: "Address removed." });
//     } catch (error) {
//       toast({
//         title: "Error",
//         description: "Could not delete address.",
//         variant: "destructive",
//       });
//     }
//   };

//   // ✅ Handle Profile Update
//   const handleProfileUpdate = async () => {
//     try {
//       setIsSaving(true);
//       // Assuming api.updateProfile exists or construct the call here
//       // await api.updateProfile({ name: fullName });

//       // Since updateProfile might not be in your api.ts yet, here is a fetch example:
//       /*
//       await fetch('http://127.0.0.1:8000/api/auth/profile/', {
//           method: 'PATCH',
//           headers: { ...getAuthHeaders() },
//           body: JSON.stringify({ first_name: fullName }) // Adjust field name based on backend
//       });
//       */

//       toast({
//         title: "Profile updated",
//         description: "Your name has been updated.",
//       });
//       setProfileDialogOpen(false);
//       // Ideally refresh user context here
//     } catch (error) {
//       toast({
//         title: "Error",
//         description: "Failed to update profile.",
//         variant: "destructive",
//       });
//     } finally {
//       setIsSaving(false);
//     }
//   };

//   const getStatusColor = (status: string) => {
//     switch (status) {
//       case "delivered":
//         return "bg-green-100 text-green-800 border-green-200";
//       case "shipped":
//         return "bg-blue-100 text-blue-800 border-blue-200";
//       case "processing":
//         return "bg-yellow-100 text-yellow-800 border-yellow-200";
//       case "cancelled":
//         return "bg-red-100 text-red-800 border-red-200";
//       default:
//         return "bg-gray-100 text-gray-800 border-gray-200";
//     }
//   };

//   if (loading) {
//     return (
//       <Layout>
//         <div className="container py-32 flex flex-col items-center justify-center min-h-[50vh]">
//           <Loader2 className="h-10 w-10 animate-spin text-primary mb-4" />
//           <p className="text-muted-foreground">Loading your profile...</p>
//         </div>
//       </Layout>
//     );
//   }

//   return (
//     <Layout>
//       <div className="container py-8">
//         <div className="max-w-4xl mx-auto">
//           {/* Profile Header */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="bg-card rounded-xl p-6 shadow-sm border mb-8 flex items-center justify-between"
//           >
//             <div className="flex items-center gap-4">
//               <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-2xl text-primary font-bold">
//                 {user?.name?.charAt(0).toUpperCase() || "U"}
//               </div>
//               <div>
//                 <h1 className="text-2xl font-bold">{user?.name}</h1>
//                 <p className="text-muted-foreground">{user?.email}</p>
//               </div>
//             </div>
//             <div className="flex gap-2">
//               <Button
//                 variant="outline"
//                 onClick={() => setProfileDialogOpen(true)}
//                 className="gap-2"
//               >
//                 <Edit2 className="h-4 w-4" /> Edit Profile
//               </Button>
//               <Button
//                 //variant="destructive"
//                 variant="outline"
//                 onClick={handleLogout}
//                 className="gap-2 text-destructive border-destructive/20 hover:bg-destructive/10"
//               >
//                 <LogOut className="h-4 w-4" /> Logout
//               </Button>
//             </div>
//           </motion.div>

//           <Tabs defaultValue="orders" className="space-y-6">
//             <TabsList className="grid w-full grid-cols-3">
//               <TabsTrigger value="profile" className="gap-2">
//                 <User className="h-4 w-4" /> Profile
//               </TabsTrigger>
//               <TabsTrigger value="addresses" className="gap-2">
//                 <MapPin className="h-4 w-4" /> Addresses
//               </TabsTrigger>
//               <TabsTrigger value="orders" className="gap-2">
//                 <ShoppingBag className="h-4 w-4" /> Orders
//               </TabsTrigger>
//             </TabsList>

//             {/* Profile Tab */}
//             <TabsContent value="profile">
//               <div className="bg-card rounded-xl p-6 shadow-sm border space-y-4">
//                 <div className="flex justify-between items-center">
//                   <h2 className="text-xl font-bold">Personal Information</h2>
//                   <Button
//                     variant="ghost"
//                     size="sm"
//                     onClick={() => setProfileDialogOpen(true)}
//                   >
//                     <Edit2 className="h-4 w-4 mr-2" /> Edit
//                   </Button>
//                 </div>
//                 <div className="grid gap-4 max-w-md">
//                   <div>
//                     <Label>Full Name</Label>
//                     <Input
//                       value={user?.name || ""}
//                       readOnly
//                       className="bg-muted"
//                     />
//                   </div>
//                   <div>
//                     <Label>Email</Label>
//                     <Input
//                       value={user?.email || ""}
//                       readOnly
//                       className="bg-muted"
//                     />
//                   </div>
//                 </div>
//               </div>

//               {/* Profile Edit Dialog */}
//               <Dialog
//                 open={profileDialogOpen}
//                 onOpenChange={setProfileDialogOpen}
//               >
//                 <DialogContent>
//                   <DialogHeader>
//                     <DialogTitle>Update Profile</DialogTitle>
//                   </DialogHeader>
//                   <div className="space-y-4 py-4">
//                     <div className="space-y-2">
//                       <Label>Full Name</Label>
//                       <Input
//                         value={fullName}
//                         onChange={(e) => setFullName(e.target.value)}
//                       />
//                     </div>
//                     <div className="space-y-2">
//                       <Label>Email</Label>
//                       <Input
//                         value={user?.email}
//                         disabled
//                         className="bg-muted"
//                       />
//                       <p className="text-xs text-muted-foreground">
//                         Email cannot be changed.
//                       </p>
//                     </div>
//                     <Button
//                       onClick={handleProfileUpdate}
//                       disabled={isSaving}
//                       className="w-full"
//                     >
//                       {isSaving ? (
//                         <Loader2 className="h-4 w-4 animate-spin mr-2" />
//                       ) : (
//                         "Save Changes"
//                       )}
//                     </Button>
//                   </div>
//                 </DialogContent>
//               </Dialog>
//             </TabsContent>

//             {/* Addresses Tab */}
//             <TabsContent value="addresses">
//               <div className="bg-card rounded-xl p-6 shadow-sm border">
//                 <div className="flex items-center justify-between mb-6">
//                   <h2 className="text-xl font-bold">
//                     Saved Addresses ({addresses.length}/3)
//                   </h2>

//                   {addresses.length < 3 && (
//                     <Button
//                       className="gap-2"
//                       onClick={() => openAddressDialog()}
//                     >
//                       <Plus className="h-4 w-4" /> Add Address
//                     </Button>
//                   )}
//                 </div>

//                 {addresses.length === 0 ? (
//                   <div className="text-center py-12 border rounded-lg border-dashed">
//                     <MapPin className="h-8 w-8 mx-auto mb-3 text-muted-foreground" />
//                     <p className="text-muted-foreground">
//                       No addresses saved yet.
//                     </p>
//                     <Button variant="link" onClick={() => openAddressDialog()}>
//                       Add one now
//                     </Button>
//                   </div>
//                 ) : (
//                   <div className="grid gap-4 md:grid-cols-2">
//                     {addresses.map((addr) => (
//                       <div
//                         key={addr.id}
//                         className="p-4 rounded-lg border flex justify-between items-start bg-card group hover:border-primary/50 transition-colors"
//                       >
//                         <div>
//                           <div className="flex items-center gap-2 mb-1">
//                             <span className="font-semibold">{addr.name}</span>
//                             {addr.is_default && (
//                               <Badge variant="secondary">Default</Badge>
//                             )}
//                           </div>
//                           <p className="text-sm text-muted-foreground">
//                             {addr.street}
//                           </p>
//                           <p className="text-sm text-muted-foreground">
//                             {addr.city}, {addr.state} {addr.zip_code}
//                           </p>
//                           <p className="text-sm text-muted-foreground mt-1">
//                             {addr.phone}
//                           </p>
//                         </div>
//                         <div className="flex gap-1">
//                           <Button
//                             variant="ghost"
//                             size="icon"
//                             className="h-8 w-8 text-muted-foreground hover:text-foreground"
//                             onClick={() => openAddressDialog(addr)}
//                           >
//                             <Edit2 className="h-4 w-4" />
//                           </Button>
//                           <Button
//                             variant="ghost"
//                             size="icon"
//                             className="text-destructive hover:bg-destructive/10 h-8 w-8"
//                             onClick={() => handleDeleteAddress(addr.id)}
//                           >
//                             <Trash2 className="h-4 w-4" />
//                           </Button>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 )}

//                 {/* Address Dialog (Add & Edit) */}
//                 <Dialog
//                   open={addressDialogOpen}
//                   onOpenChange={setAddressDialogOpen}
//                 >
//                   <DialogContent>
//                     <DialogHeader>
//                       <DialogTitle>
//                         {editingAddress ? "Edit Address" : "Add New Address"}
//                       </DialogTitle>
//                     </DialogHeader>
//                     <div className="grid gap-4 py-4">
//                       <div className="space-y-2">
//                         <Label>Label / Name</Label>
//                         <Input
//                           placeholder="e.g. Home, Office"
//                           value={addressForm.name}
//                           onChange={(e) =>
//                             setAddressForm({
//                               ...addressForm,
//                               name: e.target.value,
//                             })
//                           }
//                         />
//                       </div>
//                       <div className="space-y-2">
//                         <Label>Street Address</Label>
//                         <Input
//                           placeholder="123 Main St"
//                           value={addressForm.street}
//                           onChange={(e) =>
//                             setAddressForm({
//                               ...addressForm,
//                               street: e.target.value,
//                             })
//                           }
//                         />
//                       </div>

//                       <div className="grid grid-cols-2 gap-4">
//                         <div className="space-y-2">
//                           <Label>City</Label>
//                           <Input
//                             value={addressForm.city}
//                             onChange={(e) =>
//                               setAddressForm({
//                                 ...addressForm,
//                                 city: e.target.value,
//                               })
//                             }
//                           />
//                         </div>
//                         <div className="space-y-2">
//                           <Label>State / County</Label>
//                           <Input
//                             value={addressForm.state}
//                             onChange={(e) =>
//                               setAddressForm({
//                                 ...addressForm,
//                                 state: e.target.value,
//                               })
//                             }
//                           />
//                         </div>
//                       </div>

//                       <div className="grid grid-cols-2 gap-4">
//                         <div className="space-y-2">
//                           <Label>Zip Code</Label>
//                           <Input
//                             value={addressForm.zip_code}
//                             onChange={(e) =>
//                               setAddressForm({
//                                 ...addressForm,
//                                 zip_code: e.target.value,
//                               })
//                             }
//                           />
//                         </div>
//                         <div className="space-y-2">
//                           <Label>Phone</Label>
//                           <Input
//                             value={addressForm.phone}
//                             onChange={(e) =>
//                               setAddressForm({
//                                 ...addressForm,
//                                 phone: e.target.value,
//                               })
//                             }
//                           />
//                         </div>
//                       </div>

//                       <div className="flex items-center space-x-2 pt-2">
//                         <Checkbox
//                           id="is_default"
//                           checked={addressForm.is_default}
//                           onCheckedChange={(checked) =>
//                             setAddressForm({
//                               ...addressForm,
//                               is_default: checked as boolean,
//                             })
//                           }
//                         />
//                         <Label htmlFor="is_default" className="cursor-pointer">
//                           Set as default address
//                         </Label>
//                       </div>

//                       <Button
//                         onClick={handleAddressSubmit}
//                         disabled={isSaving}
//                         className="w-full mt-2"
//                       >
//                         {isSaving ? (
//                           <Loader2 className="h-4 w-4 animate-spin mr-2" />
//                         ) : null}
//                         {isSaving
//                           ? "Saving..."
//                           : editingAddress
//                             ? "Update Address"
//                             : "Save Address"}
//                       </Button>
//                     </div>
//                   </DialogContent>
//                 </Dialog>
//               </div>
//             </TabsContent>

//             {/* Orders Tab */}
//             <TabsContent value="orders">
//               <div className="bg-card rounded-xl p-6 shadow-sm border">
//                 <h2 className="text-xl font-bold mb-6">Order History</h2>
//                 {orders.length === 0 ? (
//                   <div className="text-center py-12 text-muted-foreground">
//                     <ShoppingBag className="h-12 w-12 mx-auto mb-4 opacity-20" />
//                     <p className="mb-4">No orders placed yet</p>
//                     <Link to="/">
//                       <Button variant="outline">Start Shopping</Button>
//                     </Link>
//                   </div>
//                 ) : (
//                   <div className="space-y-4">
//                     {orders.map((order) => (
//                       <div
//                         key={order.id}
//                         className="border rounded-lg p-4 bg-card"
//                       >
//                         <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-4 border-b pb-3 gap-2">
//                           <div>
//                             <p className="font-bold text-lg">
//                               Order #{order.id}
//                             </p>
//                             <p className="text-xs text-muted-foreground">
//                               {new Date(order.created_at).toLocaleDateString()}{" "}
//                               at{" "}
//                               {new Date(order.created_at).toLocaleTimeString()}
//                             </p>
//                           </div>
//                           <div className="flex gap-2">
//                             <Badge
//                               variant="outline"
//                               className={`${getStatusColor(order.status)} border capitalize`}
//                             >
//                               {order.status}
//                             </Badge>
//                             <Badge variant="secondary" className="capitalize">
//                               {order.payment_status}
//                             </Badge>
//                           </div>
//                         </div>

//                         <div className="space-y-3 mb-3 bg-muted/30 p-3 rounded-md">
//                           {order.items.map((item, idx) => (
//                             <div
//                               key={idx}
//                               className="flex justify-between text-sm"
//                             >
//                               <span className="text-muted-foreground font-medium">
//                                 <span className="text-foreground mr-2">
//                                   {item.quantity}x
//                                 </span>
//                                 {item.product_name}
//                               </span>
//                               <span>
//                                 €{Number(item.price * item.quantity).toFixed(2)}
//                               </span>
//                             </div>
//                           ))}
//                         </div>

//                         <div className="flex justify-between items-center pt-2 font-bold text-lg">
//                           <span>Total</span>
//                           <span>€{Number(order.amount_total).toFixed(2)}</span>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             </TabsContent>
//           </Tabs>
//         </div>
//       </div>
//     </Layout>
//   );
// };

// export default ProfilePage;
// import { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import {
//   User,
//   MapPin,
//   ShoppingBag,
//   LogOut,
//   Plus,
//   Trash2,
//   Loader2,
//   Edit2,
// } from "lucide-react";
// import { motion } from "framer-motion";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Badge } from "@/components/ui/badge";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import { Checkbox } from "@/components/ui/checkbox";
// import { Layout } from "@/components/layout/Layout";
// import { useAuth } from "@/context/AuthContext";
// import { useToast } from "@/hooks/use-toast";
// import { api } from "@/lib/api";

// // ✅ Types
// interface OrderItem {
//   product_name: string;
//   quantity: number;
//   price: number;
// }

// interface OrderType {
//   id: number;
//   status: string;
//   payment_status: string;
//   created_at: string;
//   amount_total: number;
//   items: OrderItem[];
// }

// interface AddressType {
//   id: number;
//   name: string;
//   street: string;
//   city: string;
//   state: string;
//   zip_code: string;
//   phone: string;
//   is_default: boolean;
// }

// const ProfilePage = () => {
//   const { user, isAuthenticated, logout } = useAuth();
//   const navigate = useNavigate();
//   const { toast } = useToast();

//   const [orders, setOrders] = useState<OrderType[]>([]);
//   const [addresses, setAddresses] = useState<AddressType[]>([]);
//   const [loading, setLoading] = useState(true);

//   // Dialog States
//   const [addressDialogOpen, setAddressDialogOpen] = useState(false);
//   const [profileDialogOpen, setProfileDialogOpen] = useState(false);
//   const [editingAddress, setEditingAddress] = useState<AddressType | null>(
//     null,
//   );
//   const [isSaving, setIsSaving] = useState(false);

//   // Form States
//   const [fullName, setFullName] = useState(user?.name || "");
//   const [addressForm, setAddressForm] = useState({
//     name: "",
//     street: "",
//     city: "",
//     state: "",
//     zip_code: "",
//     phone: "",
//     is_default: false,
//   });

//   // ✅ Fetch Data on Load
//   const fetchData = async () => {
//     try {
//       const [ordersData, addressesData] = await Promise.all([
//         api.getOrders(),
//         api.getAddresses(),
//       ]);
//       setOrders(ordersData);
//       setAddresses(addressesData);
//     } catch (error) {
//       console.error("Failed to fetch profile data", error);
//       toast({
//         title: "Error",
//         description: "Could not load profile data.",
//         variant: "destructive",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (!isAuthenticated) {
//       navigate("/login");
//       return;
//     }
//     fetchData();
//   }, [isAuthenticated, navigate]);

//   const handleLogout = () => {
//     logout();
//     toast({ title: "Logged out", description: "Successfully logged out." });
//     navigate("/");
//   };

//   // ✅ Open Address Dialog (Add or Edit Mode)
//   const openAddressDialog = (address?: AddressType) => {
//     if (address) {
//       setEditingAddress(address);
//       setAddressForm({
//         name: address.name,
//         street: address.street,
//         city: address.city,
//         state: address.state,
//         zip_code: address.zip_code,
//         phone: address.phone,
//         is_default: address.is_default,
//       });
//     } else {
//       setEditingAddress(null);
//       setAddressForm({
//         name: "",
//         street: "",
//         city: "",
//         state: "",
//         zip_code: "",
//         phone: "",
//         is_default: false,
//       });
//     }
//     setAddressDialogOpen(true);
//   };

//   // ✅ Handle Address Submit
//   const handleAddressSubmit = async () => {
//     if (
//       !addressForm.name ||
//       !addressForm.street ||
//       !addressForm.city ||
//       !addressForm.zip_code
//     ) {
//       toast({
//         title: "Validation Error",
//         description: "Please fill all required fields.",
//         variant: "destructive",
//       });
//       return;
//     }

//     try {
//       setIsSaving(true);
//       if (editingAddress) {
//         await api.updateAddress(editingAddress.id, addressForm);
//         toast({ title: "Address updated" });
//       } else {
//         await api.addAddress(addressForm);
//         toast({ title: "Address added" });
//       }
//       setAddressDialogOpen(false);
//       fetchData(); // Refresh list
//     } catch (error: any) {
//       toast({
//         title: "Error",
//         description: error.detail || "Failed to save address.",
//         variant: "destructive",
//       });
//     } finally {
//       setIsSaving(false);
//     }
//   };

//   const handleDeleteAddress = async (id: number) => {
//     if (!window.confirm("Are you sure you want to delete this address?"))
//       return;
//     try {
//       await api.deleteAddress(id);
//       setAddresses(addresses.filter((a) => a.id !== id));
//       toast({ title: "Deleted", description: "Address removed." });
//     } catch (error) {
//       toast({
//         title: "Error",
//         description: "Could not delete address.",
//         variant: "destructive",
//       });
//     }
//   };

//   // ✅ Handle Profile Update
//   const handleProfileUpdate = async () => {
//     if (!fullName.trim()) return;

//     try {
//       setIsSaving(true);
//       await api.updateProfile({ name: fullName });

//       toast({
//         title: "Profile updated",
//         description: "Your name has been updated.",
//       });

//       setProfileDialogOpen(false);

//       // Manually update the local user object if context doesn't auto-refresh
//       if (user) user.name = fullName;
//     } catch (error: any) {
//       console.error(error);
//       toast({
//         title: "Error",
//         description: "Failed to update profile. Please try again.",
//         variant: "destructive",
//       });
//     } finally {
//       setIsSaving(false);
//     }
//   };

//   const getStatusColor = (status: string) => {
//     switch (status) {
//       case "delivered":
//         return "bg-green-100 text-green-800 border-green-200";
//       case "shipped":
//         return "bg-blue-100 text-blue-800 border-blue-200";
//       case "processing":
//         return "bg-yellow-100 text-yellow-800 border-yellow-200";
//       case "cancelled":
//         return "bg-red-100 text-red-800 border-red-200";
//       default:
//         return "bg-gray-100 text-gray-800 border-gray-200";
//     }
//   };

//   if (loading) {
//     return (
//       <Layout>
//         <div className="container py-32 flex flex-col items-center justify-center min-h-[50vh]">
//           <Loader2 className="h-10 w-10 animate-spin text-primary mb-4" />
//           <p className="text-muted-foreground">Loading your profile...</p>
//         </div>
//       </Layout>
//     );
//   }

//   return (
//     <Layout>
//       <div className="container py-8">
//         <div className="max-w-4xl mx-auto">
//           {/* Profile Header */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="bg-card rounded-xl p-6 shadow-sm border mb-8 flex items-center justify-between"
//           >
//             <div className="flex items-center gap-4">
//               <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-2xl text-primary font-bold">
//                 {user?.name?.charAt(0).toUpperCase() || "U"}
//               </div>
//               <div>
//                 <h1 className="text-2xl font-bold">{user?.name}</h1>
//                 <p className="text-muted-foreground">{user?.email}</p>
//               </div>
//             </div>
//             <div className="flex gap-2">
//               <Button
//                 variant="outline"
//                 onClick={() => setProfileDialogOpen(true)}
//                 className="gap-2"
//               >
//                 <Edit2 className="h-4 w-4" /> Edit Profile
//               </Button>

//               {/* ✅ FIXED LOGOUT BUTTON STYLING */}
//               <Button
//                 variant="outline"
//                 onClick={handleLogout}
//                 className="gap-2 text-destructive border-destructive/20 hover:bg-destructive/10 hover:text-destructive hover:border-destructive/50"
//               >
//                 <LogOut className="h-4 w-4" /> Logout
//               </Button>
//             </div>
//           </motion.div>

//           <Tabs defaultValue="orders" className="space-y-6">
//             <TabsList className="grid w-full grid-cols-3">
//               <TabsTrigger value="profile" className="gap-2">
//                 <User className="h-4 w-4" /> Profile
//               </TabsTrigger>
//               <TabsTrigger value="addresses" className="gap-2">
//                 <MapPin className="h-4 w-4" /> Addresses
//               </TabsTrigger>
//               <TabsTrigger value="orders" className="gap-2">
//                 <ShoppingBag className="h-4 w-4" /> Orders
//               </TabsTrigger>
//             </TabsList>

//             {/* Profile Tab */}
//             <TabsContent value="profile">
//               <div className="bg-card rounded-xl p-6 shadow-sm border space-y-4">
//                 <div className="flex justify-between items-center">
//                   <h2 className="text-xl font-bold">Personal Information</h2>
//                   <Button
//                     variant="ghost"
//                     size="sm"
//                     onClick={() => setProfileDialogOpen(true)}
//                   >
//                     <Edit2 className="h-4 w-4 mr-2" /> Edit
//                   </Button>
//                 </div>
//                 <div className="grid gap-4 max-w-md">
//                   <div>
//                     <Label>Full Name</Label>
//                     <Input
//                       value={user?.name || ""}
//                       readOnly
//                       className="bg-muted"
//                     />
//                   </div>
//                   <div>
//                     <Label>Email</Label>
//                     <Input
//                       value={user?.email || ""}
//                       readOnly
//                       className="bg-muted"
//                     />
//                   </div>
//                 </div>
//               </div>

//               {/* Profile Edit Dialog */}
//               <Dialog
//                 open={profileDialogOpen}
//                 onOpenChange={setProfileDialogOpen}
//               >
//                 <DialogContent>
//                   <DialogHeader>
//                     <DialogTitle>Update Profile</DialogTitle>
//                   </DialogHeader>
//                   <div className="space-y-4 py-4">
//                     <div className="space-y-2">
//                       <Label>Full Name</Label>
//                       <Input
//                         value={fullName}
//                         onChange={(e) => setFullName(e.target.value)}
//                       />
//                     </div>
//                     <div className="space-y-2">
//                       <Label>Email</Label>
//                       <Input
//                         value={user?.email}
//                         disabled
//                         className="bg-muted"
//                       />
//                       <p className="text-xs text-muted-foreground">
//                         Email cannot be changed.
//                       </p>
//                     </div>
//                     <Button
//                       onClick={handleProfileUpdate}
//                       disabled={isSaving}
//                       className="w-full"
//                     >
//                       {isSaving ? (
//                         <Loader2 className="h-4 w-4 animate-spin mr-2" />
//                       ) : (
//                         "Save Changes"
//                       )}
//                     </Button>
//                   </div>
//                 </DialogContent>
//               </Dialog>
//             </TabsContent>

//             {/* Addresses Tab */}
//             <TabsContent value="addresses">
//               <div className="bg-card rounded-xl p-6 shadow-sm border">
//                 <div className="flex items-center justify-between mb-6">
//                   <h2 className="text-xl font-bold">
//                     Saved Addresses ({addresses.length}/3)
//                   </h2>

//                   {addresses.length < 3 && (
//                     <Button
//                       className="gap-2"
//                       onClick={() => openAddressDialog()}
//                     >
//                       <Plus className="h-4 w-4" /> Add Address
//                     </Button>
//                   )}
//                 </div>

//                 {addresses.length === 0 ? (
//                   <div className="text-center py-12 border rounded-lg border-dashed">
//                     <MapPin className="h-8 w-8 mx-auto mb-3 text-muted-foreground" />
//                     <p className="text-muted-foreground">
//                       No addresses saved yet.
//                     </p>
//                     <Button variant="link" onClick={() => openAddressDialog()}>
//                       Add one now
//                     </Button>
//                   </div>
//                 ) : (
//                   <div className="grid gap-4 md:grid-cols-2">
//                     {addresses.map((addr) => (
//                       <div
//                         key={addr.id}
//                         className="p-4 rounded-lg border flex justify-between items-start bg-card group hover:border-primary/50 transition-colors"
//                       >
//                         <div>
//                           <div className="flex items-center gap-2 mb-1">
//                             <span className="font-semibold">{addr.name}</span>
//                             {addr.is_default && (
//                               <Badge variant="secondary">Default</Badge>
//                             )}
//                           </div>
//                           <p className="text-sm text-muted-foreground">
//                             {addr.street}
//                           </p>
//                           <p className="text-sm text-muted-foreground">
//                             {addr.city}, {addr.state} {addr.zip_code}
//                           </p>
//                           <p className="text-sm text-muted-foreground mt-1">
//                             {addr.phone}
//                           </p>
//                         </div>
//                         <div className="flex gap-1">
//                           <Button
//                             variant="ghost"
//                             size="icon"
//                             className="h-8 w-8 text-muted-foreground hover:text-foreground"
//                             onClick={() => openAddressDialog(addr)}
//                           >
//                             <Edit2 className="h-4 w-4" />
//                           </Button>
//                           <Button
//                             variant="ghost"
//                             size="icon"
//                             className="text-destructive hover:bg-destructive/10 h-8 w-8"
//                             onClick={() => handleDeleteAddress(addr.id)}
//                           >
//                             <Trash2 className="h-4 w-4" />
//                           </Button>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 )}

//                 {/* Address Dialog (Add & Edit) */}
//                 <Dialog
//                   open={addressDialogOpen}
//                   onOpenChange={setAddressDialogOpen}
//                 >
//                   <DialogContent>
//                     <DialogHeader>
//                       <DialogTitle>
//                         {editingAddress ? "Edit Address" : "Add New Address"}
//                       </DialogTitle>
//                     </DialogHeader>
//                     <div className="grid gap-4 py-4">
//                       <div className="space-y-2">
//                         <Label>Label / Name</Label>
//                         <Input
//                           placeholder="e.g. Home, Office"
//                           value={addressForm.name}
//                           onChange={(e) =>
//                             setAddressForm({
//                               ...addressForm,
//                               name: e.target.value,
//                             })
//                           }
//                         />
//                       </div>
//                       <div className="space-y-2">
//                         <Label>Street Address</Label>
//                         <Input
//                           placeholder="123 Main St"
//                           value={addressForm.street}
//                           onChange={(e) =>
//                             setAddressForm({
//                               ...addressForm,
//                               street: e.target.value,
//                             })
//                           }
//                         />
//                       </div>

//                       <div className="grid grid-cols-2 gap-4">
//                         <div className="space-y-2">
//                           <Label>City</Label>
//                           <Input
//                             value={addressForm.city}
//                             onChange={(e) =>
//                               setAddressForm({
//                                 ...addressForm,
//                                 city: e.target.value,
//                               })
//                             }
//                           />
//                         </div>
//                         <div className="space-y-2">
//                           <Label>State / County</Label>
//                           <Input
//                             value={addressForm.state}
//                             onChange={(e) =>
//                               setAddressForm({
//                                 ...addressForm,
//                                 state: e.target.value,
//                               })
//                             }
//                           />
//                         </div>
//                       </div>

//                       <div className="grid grid-cols-2 gap-4">
//                         <div className="space-y-2">
//                           <Label>Zip Code</Label>
//                           <Input
//                             value={addressForm.zip_code}
//                             onChange={(e) =>
//                               setAddressForm({
//                                 ...addressForm,
//                                 zip_code: e.target.value,
//                               })
//                             }
//                           />
//                         </div>
//                         <div className="space-y-2">
//                           <Label>Phone</Label>
//                           <Input
//                             value={addressForm.phone}
//                             onChange={(e) =>
//                               setAddressForm({
//                                 ...addressForm,
//                                 phone: e.target.value,
//                               })
//                             }
//                           />
//                         </div>
//                       </div>

//                       <div className="flex items-center space-x-2 pt-2">
//                         <Checkbox
//                           id="is_default"
//                           checked={addressForm.is_default}
//                           onCheckedChange={(checked) =>
//                             setAddressForm({
//                               ...addressForm,
//                               is_default: checked as boolean,
//                             })
//                           }
//                         />
//                         <Label htmlFor="is_default" className="cursor-pointer">
//                           Set as default address
//                         </Label>
//                       </div>

//                       <Button
//                         onClick={handleAddressSubmit}
//                         disabled={isSaving}
//                         className="w-full mt-2"
//                       >
//                         {isSaving ? (
//                           <Loader2 className="h-4 w-4 animate-spin mr-2" />
//                         ) : null}
//                         {isSaving
//                           ? "Saving..."
//                           : editingAddress
//                             ? "Update Address"
//                             : "Save Address"}
//                       </Button>
//                     </div>
//                   </DialogContent>
//                 </Dialog>
//               </div>
//             </TabsContent>

//             {/* Orders Tab */}
//             <TabsContent value="orders">
//               <div className="bg-card rounded-xl p-6 shadow-sm border">
//                 <h2 className="text-xl font-bold mb-6">Order History</h2>
//                 {orders.length === 0 ? (
//                   <div className="text-center py-12 text-muted-foreground">
//                     <ShoppingBag className="h-12 w-12 mx-auto mb-4 opacity-20" />
//                     <p className="mb-4">No orders placed yet</p>
//                     <Link to="/">
//                       <Button variant="outline">Start Shopping</Button>
//                     </Link>
//                   </div>
//                 ) : (
//                   <div className="space-y-4">
//                     {orders.map((order) => (
//                       <div
//                         key={order.id}
//                         className="border rounded-lg p-4 bg-card"
//                       >
//                         <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-4 border-b pb-3 gap-2">
//                           <div>
//                             <p className="font-bold text-lg">
//                               Order #{order.id}
//                             </p>
//                             <p className="text-xs text-muted-foreground">
//                               {new Date(order.created_at).toLocaleDateString()}{" "}
//                               at{" "}
//                               {new Date(order.created_at).toLocaleTimeString()}
//                             </p>
//                           </div>
//                           <div className="flex gap-2">
//                             <Badge
//                               variant="outline"
//                               className={`${getStatusColor(order.status)} border capitalize`}
//                             >
//                               {order.status}
//                             </Badge>
//                             <Badge variant="secondary" className="capitalize">
//                               {order.payment_status}
//                             </Badge>
//                           </div>
//                         </div>

//                         <div className="space-y-3 mb-3 bg-muted/30 p-3 rounded-md">
//                           {order.items.map((item, idx) => (
//                             <div
//                               key={idx}
//                               className="flex justify-between text-sm"
//                             >
//                               <span className="text-muted-foreground font-medium">
//                                 <span className="text-foreground mr-2">
//                                   {item.quantity}x
//                                 </span>
//                                 {item.product_name}
//                               </span>
//                               <span>
//                                 €{Number(item.price * item.quantity).toFixed(2)}
//                               </span>
//                             </div>
//                           ))}
//                         </div>

//                         <div className="flex justify-between items-center pt-2 font-bold text-lg">
//                           <span>Total</span>
//                           <span>€{Number(order.amount_total).toFixed(2)}</span>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             </TabsContent>
//           </Tabs>
//         </div>
//       </div>
//     </Layout>
//   );
// };

// export default ProfilePage;

// import { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import {
//   User,
//   MapPin,
//   ShoppingBag,
//   LogOut,
//   Plus,
//   Trash2,
//   Loader2,
//   Edit2,
// } from "lucide-react";
// import { motion } from "framer-motion";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Badge } from "@/components/ui/badge";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import { Checkbox } from "@/components/ui/checkbox";
// import { Layout } from "@/components/layout/Layout";
// import { useAuth } from "@/context/AuthContext";
// import { useToast } from "@/hooks/use-toast";
// import { api } from "@/lib/api";

// // ✅ Types
// interface OrderItem {
//   product_name: string;
//   quantity: number;
//   price: number;
// }

// interface OrderType {
//   id: number;
//   order_number: string; // ✅ Add this
//   status: string;
//   payment_status: string;
//   created_at: string;
//   amount_total: number;
//   items: OrderItem[];
// }

// interface AddressType {
//   id: number;
//   name: string;
//   street: string;
//   city: string;
//   state: string;
//   zip_code: string;
//   phone: string;
//   is_default: boolean;
// }

// // ✅ 1. HELPER FUNCTION (Moved here to fix "Cannot find name" error)
// const formatOrderId = (id: number | string) => {
//   if (!id) return "---";
//   const numericId = Number(id) + 5000;
//   const alphanumeric = numericId.toString(36).toUpperCase();
//   return `ORD-${alphanumeric.padStart(5, '0')}`;
// };

// const ProfilePage = () => {
//   const { user, isAuthenticated, logout } = useAuth();
//   const navigate = useNavigate();
//   const { toast } = useToast();

//   const [orders, setOrders] = useState<OrderType[]>([]);
//   const [addresses, setAddresses] = useState<AddressType[]>([]);
//   const [loading, setLoading] = useState(true);

//   // Dialog States
//   const [addressDialogOpen, setAddressDialogOpen] = useState(false);
//   const [profileDialogOpen, setProfileDialogOpen] = useState(false);
//   const [editingAddress, setEditingAddress] = useState<AddressType | null>(null);
//   const [isSaving, setIsSaving] = useState(false);

//   // Form States
//   const [fullName, setFullName] = useState(user?.name || "");
//   const [addressForm, setAddressForm] = useState({
//     name: "",
//     street: "",
//     city: "",
//     state: "",
//     zip_code: "",
//     phone: "",
//     is_default: false,
//   });

//   const fetchData = async () => {
//     try {
//       const [ordersData, addressesData] = await Promise.all([
//         api.getOrders(),
//         api.getAddresses(),
//       ]);
//       setOrders(ordersData);
//       setAddresses(addressesData);
//     } catch (error) {
//       console.error("Failed to fetch profile data", error);
//       toast({
//         title: "Error",
//         description: "Could not load profile data.",
//         variant: "destructive",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (!isAuthenticated) {
//       navigate("/login");
//       return;
//     }
//     fetchData();
//   }, [isAuthenticated, navigate]);

//   const handleLogout = () => {
//     logout();
//     toast({ title: "Logged out", description: "Successfully logged out." });
//     navigate("/");
//   };

//   const openAddressDialog = (address?: AddressType) => {
//     if (address) {
//       setEditingAddress(address);
//       setAddressForm({
//         name: address.name,
//         street: address.street,
//         city: address.city,
//         state: address.state,
//         zip_code: address.zip_code,
//         phone: address.phone,
//         is_default: address.is_default,
//       });
//     } else {
//       setEditingAddress(null);
//       setAddressForm({
//         name: "",
//         street: "",
//         city: "",
//         state: "",
//         zip_code: "",
//         phone: "",
//         is_default: false,
//       });
//     }
//     setAddressDialogOpen(true);
//   };

//   const handleAddressSubmit = async () => {
//     if (!addressForm.name || !addressForm.street || !addressForm.city || !addressForm.zip_code) {
//       toast({
//         title: "Validation Error",
//         description: "Please fill all required fields.",
//         variant: "destructive",
//       });
//       return;
//     }

//     try {
//       setIsSaving(true);
//       if (editingAddress) {
//         await api.updateAddress(editingAddress.id, addressForm);
//         toast({ title: "Address updated" });
//       } else {
//         await api.addAddress(addressForm);
//         toast({ title: "Address added" });
//       }
//       setAddressDialogOpen(false);
//       fetchData();
//     } catch (error: any) {
//       toast({
//         title: "Error",
//         description: error.detail || "Failed to save address.",
//         variant: "destructive",
//       });
//     } finally {
//       setIsSaving(false);
//     }
//   };

//   const handleDeleteAddress = async (id: number) => {
//     if (!window.confirm("Are you sure you want to delete this address?")) return;
//     try {
//       await api.deleteAddress(id);
//       setAddresses(addresses.filter((a) => a.id !== id));
//       toast({ title: "Deleted", description: "Address removed." });
//     } catch (error) {
//       toast({
//         title: "Error",
//         description: "Could not delete address.",
//         variant: "destructive",
//       });
//     }
//   };

//   const handleProfileUpdate = async () => {
//     if (!fullName.trim()) return;
//     try {
//       setIsSaving(true);
//       await api.updateProfile({ name: fullName });
//       toast({ title: "Profile updated", description: "Your name has been updated." });
//       setProfileDialogOpen(false);
//       if (user) user.name = fullName;
//     } catch (error: any) {
//       toast({
//         title: "Error",
//         description: "Failed to update profile.",
//         variant: "destructive",
//       });
//     } finally {
//       setIsSaving(false);
//     }
//   };

//   const getStatusColor = (status: string) => {
//     switch (status) {
//       case "delivered": return "bg-green-100 text-green-800 border-green-200";
//       case "shipped": return "bg-blue-100 text-blue-800 border-blue-200";
//       case "processing": return "bg-yellow-100 text-yellow-800 border-yellow-200";
//       case "cancelled": return "bg-red-100 text-red-800 border-red-200";
//       default: return "bg-gray-100 text-gray-800 border-gray-200";
//     }
//   };

//   if (loading) {
//     return (
//       <Layout>
//         <div className="container py-32 flex flex-col items-center justify-center min-h-[50vh]">
//           <Loader2 className="h-10 w-10 animate-spin text-primary mb-4" />
//           <p className="text-muted-foreground">Loading your profile...</p>
//         </div>
//       </Layout>
//     );
//   }

//   return (
//     <Layout>
//       <div className="container py-8">
//         <div className="max-w-4xl mx-auto">
//           {/* Profile Header */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="bg-card rounded-xl p-6 shadow-sm border mb-8 flex items-center justify-between"
//           >
//             <div className="flex items-center gap-4">
//               <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-2xl text-primary font-bold">
//                 {user?.name?.charAt(0).toUpperCase() || "U"}
//               </div>
//               <div>
//                 <h1 className="text-2xl font-bold">{user?.name}</h1>
//                 <p className="text-muted-foreground">{user?.email}</p>
//               </div>
//             </div>
//             <div className="flex gap-2">
//               <Button variant="outline" onClick={() => setProfileDialogOpen(true)} className="gap-2">
//                 <Edit2 className="h-4 w-4" /> Edit Profile
//               </Button>
//               <Button variant="outline" onClick={handleLogout} className="gap-2 text-destructive border-destructive/20 hover:bg-destructive/10">
//                 <LogOut className="h-4 w-4" /> Logout
//               </Button>
//             </div>
//           </motion.div>

//           <Tabs defaultValue="orders" className="space-y-6">
//             <TabsList className="grid w-full grid-cols-3">
//               <TabsTrigger value="profile"><User className="h-4 w-4 mr-2" /> Profile</TabsTrigger>
//               <TabsTrigger value="addresses"><MapPin className="h-4 w-4 mr-2" /> Addresses</TabsTrigger>
//               <TabsTrigger value="orders"><ShoppingBag className="h-4 w-4 mr-2" /> Orders</TabsTrigger>
//             </TabsList>

//             <TabsContent value="profile">
//                <div className="bg-card rounded-xl p-6 shadow-sm border space-y-4">
//                   <div className="flex justify-between items-center">
//                     <h2 className="text-xl font-bold">Personal Information</h2>
//                   </div>
//                   <div className="grid gap-4 max-w-md">
//                     <div>
//                       <Label>Full Name</Label>
//                       <Input value={user?.name || ""} readOnly className="bg-muted" />
//                     </div>
//                     <div>
//                       <Label>Email</Label>
//                       <Input value={user?.email || ""} readOnly className="bg-muted" />
//                     </div>
//                   </div>
//                 </div>
//             </TabsContent>

//             <TabsContent value="addresses">
//                 <div className="bg-card rounded-xl p-6 shadow-sm border">
//                   <div className="flex items-center justify-between mb-6">
//                     <h2 className="text-xl font-bold">Saved Addresses</h2>
//                     {addresses.length < 3 && (
//                       <Button onClick={() => openAddressDialog()}><Plus className="h-4 w-4 mr-2" /> Add Address</Button>
//                     )}
//                   </div>
//                   <div className="grid gap-4 md:grid-cols-2">
//                     {addresses.map((addr) => (
//                       <div key={addr.id} className="p-4 rounded-lg border flex justify-between bg-card">
//                         <div>
//                           <p className="font-semibold">{addr.name}</p>
//                           <p className="text-sm text-muted-foreground">{addr.street}, {addr.city}</p>
//                         </div>
//                         <div className="flex gap-1">
//                           <Button variant="ghost" size="icon" onClick={() => openAddressDialog(addr)}><Edit2 className="h-4 w-4" /></Button>
//                           <Button variant="ghost" size="icon" className="text-destructive" onClick={() => handleDeleteAddress(addr.id)}><Trash2 className="h-4 w-4" /></Button>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//             </TabsContent>

//             {/* ✅ FIXED ORDERS TAB */}
//             <TabsContent value="orders">
//               <div className="bg-card rounded-xl p-6 shadow-sm border">
//                 <h2 className="text-xl font-bold mb-6">Order History</h2>
//                 {orders.length === 0 ? (
//                   <div className="text-center py-12 text-muted-foreground">
//                     <ShoppingBag className="h-12 w-12 mx-auto mb-4 opacity-20" />
//                     <p className="mb-4">No orders placed yet</p>
//                     <Link to="/"><Button variant="outline">Start Shopping</Button></Link>
//                   </div>
//                 ) : (
//                   <div className="space-y-4">
//   {orders.map((order) => (
//     <div key={order.id} className="border rounded-lg p-4 bg-card">
//       <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-4 border-b pb-3 gap-2">
//         <div>
//           {/* ✅ Swapped helper function for real order_number & changed color to black */}
//           <p className="font-black text-lg text-black italic tracking-tight">
//             Order #{order.order_number || order.id} 
//           </p>
//           <p className="text-xs text-muted-foreground">
//             {new Date(order.created_at).toLocaleDateString()} at {new Date(order.created_at).toLocaleTimeString()}
//           </p>
//         </div>
//                           <div className="flex gap-2">
//                             <Badge variant="outline" className={`${getStatusColor(order.status)} border capitalize`}>
//                               {order.status}
//                             </Badge>
//                             <Badge variant="secondary" className="capitalize">
//                               {order.payment_status}
//                             </Badge>
//                           </div>
//                         </div>

//                         <div className="space-y-3 mb-3 bg-muted/30 p-3 rounded-md">
//                           {order.items.map((item, idx) => (
//                             <div key={idx} className="flex justify-between text-sm">
//                               <span className="text-muted-foreground font-medium">
//                                 <span className="text-foreground mr-2">{item.quantity}x</span>
//                                 {item.product_name}
//                               </span>
//                               <span>€{Number(item.price * item.quantity).toFixed(2)}</span>
//                             </div>
//                           ))}
//                         </div>

//                         <div className="flex justify-between items-center pt-2 font-bold text-lg">
//                           <span>Total</span>
//                           <span>€{Number(order.amount_total).toFixed(2)}</span>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             </TabsContent>
//           </Tabs>
//         </div>
//       </div>

//       {/* Profile & Address Dialogs would go here (same as your original code) */}
//     </Layout>
//   );
// };

// export default ProfilePage;
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  User,
  MapPin,
  ShoppingBag,
  LogOut,
  Plus,
  Trash2,
  Loader2,
  Edit2,
} from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Layout } from "@/components/layout/Layout";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { api } from "@/lib/api";

// ✅ Types
interface OrderItem {
  product_name: string;
  quantity: number;
  price: number;
}

interface OrderType {
  id: number;
  order_number: string;
  status: string;
  payment_status: string;
  created_at: string;
  amount_total: number;
  items: OrderItem[];
}

interface AddressType {
  id: number;
  name: string;
  street: string;
  city: string;
  state: string;
  zip_code: string;
  phone: string;
  is_default: boolean;
}

const ProfilePage = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [orders, setOrders] = useState<OrderType[]>([]);
  const [addresses, setAddresses] = useState<AddressType[]>([]);
  const [loading, setLoading] = useState(true);

  // Dialog States
  const [addressDialogOpen, setAddressDialogOpen] = useState(false);
  const [profileDialogOpen, setProfileDialogOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<AddressType | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // Form States
  const [fullName, setFullName] = useState(user?.name || "");
  const [addressForm, setAddressForm] = useState({
    name: "",
    street: "",
    city: "",
    state: "",
    zip_code: "",
    phone: "",
    is_default: false,
  });

  const fetchData = async () => {
    try {
      const [ordersData, addressesData] = await Promise.all([
        api.getOrders(),
        api.getAddresses(),
      ]);
      setOrders(ordersData);
      setAddresses(addressesData);
    } catch (error) {
      console.error("Failed to fetch profile data", error);
      toast({
        title: "Error",
        description: "Could not load profile data.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    fetchData();
  }, [isAuthenticated, navigate]);

  const handleLogout = () => {
    logout();
    toast({ title: "Logged out", description: "Successfully logged out." });
    navigate("/");
  };

  const openAddressDialog = (address?: AddressType) => {
    if (address) {
      setEditingAddress(address);
      setAddressForm({
        name: address.name,
        street: address.street,
        city: address.city,
        state: address.state,
        zip_code: address.zip_code,
        phone: address.phone,
        is_default: address.is_default,
      });
    } else {
      setEditingAddress(null);
      setAddressForm({
        name: "",
        street: "",
        city: "",
        state: "",
        zip_code: "",
        phone: "",
        is_default: false,
      });
    }
    setAddressDialogOpen(true);
  };

  const handleAddressSubmit = async () => {
    if (!addressForm.name || !addressForm.street || !addressForm.city || !addressForm.zip_code) {
      toast({
        title: "Validation Error",
        description: "Please fill all required fields.",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsSaving(true);
      if (editingAddress) {
        await api.updateAddress(editingAddress.id, addressForm);
        toast({ title: "Address updated" });
      } else {
        await api.addAddress(addressForm);
        toast({ title: "Address added" });
      }
      setAddressDialogOpen(false);
      fetchData();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.detail || "Failed to save address.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteAddress = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this address?")) return;
    try {
      await api.deleteAddress(id);
      setAddresses(addresses.filter((a) => a.id !== id));
      toast({ title: "Deleted", description: "Address removed." });
    } catch (error) {
      toast({
        title: "Error",
        description: "Could not delete address.",
        variant: "destructive",
      });
    }
  };

  const handleProfileUpdate = async () => {
    if (!fullName.trim()) return;
    try {
      setIsSaving(true);
      await api.updateProfile({ name: fullName });
      toast({ title: "Profile updated", description: "Your name has been updated." });
      setProfileDialogOpen(false);
      if (user) user.name = fullName;
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to update profile.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered": return "bg-green-100 text-green-800 border-green-200";
      case "shipped": return "bg-blue-100 text-blue-800 border-blue-200";
      case "processing": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "cancelled": return "bg-red-100 text-red-800 border-red-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="container py-32 flex flex-col items-center justify-center min-h-[50vh]">
          <Loader2 className="h-10 w-10 animate-spin text-primary mb-4" />
          <p className="text-muted-foreground">Loading your profile...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container py-8">
        <div className="max-w-4xl mx-auto">
          {/* Profile Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card rounded-xl p-6 shadow-sm border mb-8 flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-2xl text-primary font-bold">
                {user?.name?.charAt(0).toUpperCase() || "U"}
              </div>
              <div>
                <h1 className="text-2xl font-bold">{user?.name}</h1>
                <p className="text-muted-foreground">{user?.email}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                onClick={() => {
                  setFullName(user?.name || ""); // Pre-fill with current name
                  setProfileDialogOpen(true);
                }} 
                className="gap-2"
              >
                <Edit2 className="h-4 w-4" /> Edit Profile
              </Button>
              <Button variant="outline" onClick={handleLogout} className="gap-2 text-destructive border-destructive/20 hover:bg-destructive/10">
                <LogOut className="h-4 w-4" /> Logout
              </Button>
            </div>
          </motion.div>

          <Tabs defaultValue="orders" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="profile"><User className="h-4 w-4 mr-2" /> Profile</TabsTrigger>
              <TabsTrigger value="addresses"><MapPin className="h-4 w-4 mr-2" /> Addresses</TabsTrigger>
              <TabsTrigger value="orders"><ShoppingBag className="h-4 w-4 mr-2" /> Orders</TabsTrigger>
            </TabsList>

            <TabsContent value="profile">
               <div className="bg-card rounded-xl p-6 shadow-sm border space-y-4">
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-bold">Personal Information</h2>
                  </div>
                  <div className="grid gap-4 max-w-md">
                    <div>
                      <Label>Full Name</Label>
                      <Input value={user?.name || ""} readOnly className="bg-muted" />
                    </div>
                    <div>
                      <Label>Email</Label>
                      <Input value={user?.email || ""} readOnly className="bg-muted" />
                    </div>
                  </div>
                </div>
            </TabsContent>

            <TabsContent value="addresses">
                <div className="bg-card rounded-xl p-6 shadow-sm border">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold">Saved Addresses</h2>
                    {addresses.length < 3 && (
                      <Button onClick={() => openAddressDialog()}><Plus className="h-4 w-4 mr-2" /> Add Address</Button>
                    )}
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    {addresses.map((addr) => (
                      <div key={addr.id} className="p-4 rounded-lg border flex justify-between bg-card">
                        <div>
                          <p className="font-semibold">{addr.name}</p>
                          <p className="text-sm text-muted-foreground">{addr.street}, {addr.city}</p>
                        </div>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="icon" onClick={() => openAddressDialog(addr)}><Edit2 className="h-4 w-4" /></Button>
                          <Button variant="ghost" size="icon" className="text-destructive" onClick={() => handleDeleteAddress(addr.id)}><Trash2 className="h-4 w-4" /></Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
            </TabsContent>

            <TabsContent value="orders">
              <div className="bg-card rounded-xl p-6 shadow-sm border">
                <h2 className="text-xl font-bold mb-6">Order History</h2>
                {orders.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground">
                    <ShoppingBag className="h-12 w-12 mx-auto mb-4 opacity-20" />
                    <p className="mb-4">No orders placed yet</p>
                    <Link to="/"><Button variant="outline">Start Shopping</Button></Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <div key={order.id} className="border rounded-lg p-4 bg-card">
                        <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-4 border-b pb-3 gap-2">
                          <div>
                            <p className="font-black text-lg text-black italic tracking-tight">
                              Order #{order.order_number || order.id} 
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {new Date(order.created_at).toLocaleDateString()} at {new Date(order.created_at).toLocaleTimeString()}
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <Badge variant="outline" className={`${getStatusColor(order.status)} border capitalize`}>
                              {order.status}
                            </Badge>
                            <Badge variant="secondary" className="capitalize">
                              {order.payment_status}
                            </Badge>
                          </div>
                        </div>

                        <div className="space-y-3 mb-3 bg-muted/30 p-3 rounded-md">
                          {order.items.map((item, idx) => (
                            <div key={idx} className="flex justify-between text-sm">
                              <span className="text-muted-foreground font-medium">
                                <span className="text-foreground mr-2">{item.quantity}x</span>
                                {item.product_name}
                              </span>
                              <span>€{Number(item.price * item.quantity).toFixed(2)}</span>
                            </div>
                          ))}
                        </div>

                        <div className="flex justify-between items-center pt-2 font-bold text-lg">
                          <span>Total</span>
                          <span>€{Number(order.amount_total).toFixed(2)}</span>
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

      {/* ✅ Profile Edit Dialog */}
      <Dialog open={profileDialogOpen} onOpenChange={setProfileDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Full Name</Label>
              <Input
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Enter your full name"
              />
            </div>
            <Button 
              onClick={handleProfileUpdate} 
              disabled={isSaving || !fullName.trim()}
              className="w-full"
            >
              {isSaving && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
              Save Changes
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* ✅ Address Edit/Add Dialog */}
      <Dialog open={addressDialogOpen} onOpenChange={setAddressDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{editingAddress ? "Edit Address" : "Add New Address"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Name (e.g., Home, Work)</Label>
              <Input
                value={addressForm.name}
                onChange={(e) => setAddressForm({ ...addressForm, name: e.target.value })}
                placeholder="Home"
              />
            </div>
            <div className="space-y-2">
              <Label>Street Address</Label>
              <Input
                value={addressForm.street}
                onChange={(e) => setAddressForm({ ...addressForm, street: e.target.value })}
                placeholder="123 Main St"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>City</Label>
                <Input
                  value={addressForm.city}
                  onChange={(e) => setAddressForm({ ...addressForm, city: e.target.value })}
                  placeholder="New York"
                />
              </div>
              <div className="space-y-2">
                <Label>State</Label>
                <Input
                  value={addressForm.state}
                  onChange={(e) => setAddressForm({ ...addressForm, state: e.target.value })}
                  placeholder="NY"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>ZIP Code</Label>
                <Input
                  value={addressForm.zip_code}
                  onChange={(e) => setAddressForm({ ...addressForm, zip_code: e.target.value })}
                  placeholder="10001"
                />
              </div>
              <div className="space-y-2">
                <Label>Phone</Label>
                <Input
                  value={addressForm.phone}
                  onChange={(e) => setAddressForm({ ...addressForm, phone: e.target.value })}
                  placeholder="123-456-7890"
                />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="is_default"
                checked={addressForm.is_default}
                onCheckedChange={(checked) => 
                  setAddressForm({ ...addressForm, is_default: checked === true })
                }
              />
              <Label htmlFor="is_default">Set as default address</Label>
            </div>
            <Button 
              onClick={handleAddressSubmit} 
              disabled={isSaving}
              className="w-full"
            >
              {isSaving && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
              {editingAddress ? "Update Address" : "Save Address"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default ProfilePage;
