// // import { useState, useEffect } from "react";
// // import { Link, useNavigate } from 'react-router-dom';
// // import { Search, ShoppingCart, User, MapPin, ChevronDown, Menu, X } from 'lucide-react';
// // import { Button } from '@/components/ui/button';
// // import { Input } from '@/components/ui/input';
// // import {
// //   DropdownMenu,
// //   DropdownMenuContent,
// //   DropdownMenuItem,
// //   DropdownMenuTrigger,
// // } from '@/components/ui/dropdown-menu';
// // import { useCart } from '@/context/CartContext';
// // import { useAuth } from '@/context/AuthContext';
// // import { Product } from '@/data/products';

// // export const Navbar = () => {
// //   const [searchQuery, setSearchQuery] = useState('');
// //   const [searchResults, setSearchResults] = useState<Product[]>([]);
  
// //   // ✅ 1. Update: Dynamic Locations state
// //   const [locations, setLocations] = useState<any[]>([]);
// //   const [selectedLocation, setSelectedLocation] = useState<any>(null);
  
// //   const [announcements, setAnnouncements] = useState<any[]>([]);
// //   const [categories, setCategories] = useState<any[]>([]);

// //   const { totalItems } = useCart();
// //   const { isAuthenticated } = useAuth();
// //   const navigate = useNavigate();

// //   // ✅ 2. Fetch Locations from your new backend endpoint
// //   useEffect(() => {
// //     fetch("http://127.0.0.1:8000/api/store/locations/")
// //       .then(res => res.json())
// //       .then(data => {
// //         setLocations(data);
// //         if (data.length > 0) setSelectedLocation(data[0]); // Default to first location
// //       })
// //       .catch(err => console.error("Failed to load locations", err));
// //   }, []);

// //   // Fetch categories
// //   useEffect(() => {
// //     fetch("http://127.0.0.1:8000/api/store/categories/")
// //       .then(res => res.json())
// //       .then(data => setCategories(data))
// //       .catch(err => console.error("Failed to load categories", err));
// //   }, []);

// //   // Fetch announcements
// //   useEffect(() => {
// //     fetch("http://127.0.0.1:8000/api/announcements/")
// //       .then(res => res.json())
// //       .then(data => setAnnouncements(data))
// //       .catch(err => console.error("Failed to load announcements", err));
// //   }, []);

// //   // ✅ 3. Update: Live search now sends the location ID
// //   useEffect(() => {
// //     if (searchQuery.length < 2 || !selectedLocation) {
// //       setSearchResults([]);
// //       return;
// //     }

// //     fetch(`http://127.0.0.1:8000/api/store/products/?search=${searchQuery}&location=${selectedLocation.id}`)
// //       .then(res => res.json())
// //       .then(data => setSearchResults(data.slice(0, 5)))
// //       .catch(err => console.error("Navbar search failed", err));
// //   }, [searchQuery, selectedLocation]);

// //   return (
// //     <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md border-b">
      
// //       {/* Announcement Marquee (unchanged style) */}
// //       <div className="bg-green-600 overflow-hidden whitespace-nowrap py-2 border-b border-orange-700/20">
// //         <div className="marquee">
// //           <div className="marquee-content flex items-center">
// //             {announcements.map(item => (
// //               <span key={item.id} className="mx-10 flex items-center gap-2 text-white font-bold text-xs uppercase tracking-widest antialiased">
// //                 <span className="text-sm">📢</span> {item.message}
// //               </span>
// //             ))}
// //           </div>
// //           <div className="marquee-content flex items-center">
// //             {announcements.map(item => (
// //               <span key={`dup-${item.id}`} className="mx-10 flex items-center gap-2 text-white font-bold text-xs uppercase tracking-widest antialiased">
// //                 <span className="text-sm">📢</span> {item.message}
// //               </span>
// //             ))}
// //           </div>
// //         </div>
// //       </div>

// //       <div className="container py-4">
// //         <div className="flex items-center justify-between gap-4">

// //           {/* Logo */}
// //           <Link to="/" className="flex items-center gap-2 shrink-0">
// //             <div className="w-10 h-10 rounded-full gradient-saffron flex items-center justify-center text-xl">🛒</div>
// //             <div>
// //               <h1 className="text-xl font-extrabold tracking-tight text-slate-900 leading-none">
// //                 DESI <span className="text-orange-600">GROCERY</span>
// //               </h1>
// //               <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Ireland</p>
// //             </div>
// //           </Link>

// //           {/* ✅ 4. Update: Location Selector Dropdown */}
// //           <div className="hidden lg:block ml-4">
// //             <DropdownMenu>
// //               <DropdownMenuTrigger asChild>
// //                 <Button variant="ghost" className="flex items-center gap-2 text-sm font-medium">
// //                   <MapPin className="h-4 w-4 text-orange-600" />
// //                   <span className="max-w-[150px] truncate">
// //                     {selectedLocation ? selectedLocation.name : "Select Store"}
// //                   </span>
// //                   <ChevronDown className="h-3 w-3 opacity-50" />
// //                 </Button>
// //               </DropdownMenuTrigger>
// //               <DropdownMenuContent align="start" className="w-56">
// //                 {locations.map((loc) => (
// //                   <DropdownMenuItem 
// //                     key={loc.id} 
// //                     onClick={() => setSelectedLocation(loc)}
// //                     className="cursor-pointer"
// //                   >
// //                     <div>
// //                       <p className="font-medium text-sm">{loc.name}</p>
// //                       <p className="text-xs text-muted-foreground truncate">{loc.address}</p>
// //                     </div>
// //                   </DropdownMenuItem>
// //                 ))}
// //               </DropdownMenuContent>
// //             </DropdownMenu>
// //           </div>

// //           {/* Desktop Search */}
// //           <div className="hidden md:flex flex-1 max-w-xl relative">
// //             <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
// //             <Input
// //               type="search"
// //               placeholder="Search for groceries..."
// //               className="pl-10 pr-4 bg-muted border-0"
// //               value={searchQuery}
// //               onChange={(e) => setSearchQuery(e.target.value)}
// //             />
// //             {/* ... search results mapping ... */}
// //           </div>

// //           {/* Right Actions */}
// //           <div className="flex items-center gap-2">
// //             <Link to="/cart">
// //               <Button variant="ghost" size="icon" className="relative">
// //                 <ShoppingCart className="h-5 w-5" />
// //                 {totalItems > 0 && (
// //                   <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-primary text-xs flex items-center justify-center">
// //                     {totalItems}
// //                   </span>
// //                 )}
// //               </Button>
// //             </Link>
// //             {/* User Profile/Login remains the same */}
// //           </div>
// //         </div>
// //       </div>

// //       {/* Categories Bar */}
// //       <div className="hidden md:block border-t bg-background">
// //         <div className="container">
// //           <div className="flex items-center gap-8 py-3 text-[11px] font-bold uppercase tracking-wider overflow-x-auto no-scrollbar">
// //             {categories.map(category => (
// //               <Link
// //                 key={category.id}
// //                 to={`/category/${category.slug}?location=${selectedLocation?.id}`}
// //                 className="whitespace-nowrap text-slate-500 hover:text-orange-600 transition-colors duration-200"
// //               >
// //                 {category.name}
// //               </Link>
// //             ))}
// //           </div>
// //         </div>
// //       </div>
// //     </header>
// //   );
// // };
// // import { useState, useEffect } from "react";
// // import { Link, useNavigate } from 'react-router-dom';
// // import { Search, ShoppingCart, User, MapPin, ChevronDown } from 'lucide-react';
// // import { Button } from '@/components/ui/button';
// // import { Input } from '@/components/ui/input';
// // import {
// //   DropdownMenu,
// //   DropdownMenuContent,
// //   DropdownMenuItem,
// //   DropdownMenuTrigger,
// // } from '@/components/ui/dropdown-menu';
// // import { useCart } from '@/context/CartContext';
// // import { useAuth } from '@/context/AuthContext';

// // export const Navbar = () => {
// //   const [searchQuery, setSearchQuery] = useState('');
// //   const [searchResults, setSearchResults] = useState<any[]>([]);
  
// //   // ✅ 1. Dynamic Locations state
// //   const [locations, setLocations] = useState<any[]>([]);
// //   const [selectedLocation, setSelectedLocation] = useState<any>(null);
  
// //   const [announcements, setAnnouncements] = useState<any[]>([]);
// //   const [categories, setCategories] = useState<any[]>([]);

// //   const { totalItems } = useCart();
// //   const { isAuthenticated } = useAuth();

// //   // ✅ 2. Fetch Locations from backend
// //   useEffect(() => {
// //     fetch("http://127.0.0.1:8000/api/store/locations/")
// //       .then(res => res.json())
// //       .then(data => {
// //         setLocations(data);
// //         // Default to the first location if available
// //         if (data.length > 0) setSelectedLocation(data[0]);
// //       })
// //       .catch(err => console.error("Failed to load locations", err));
// //   }, []);

// //   // Fetch categories
// //   useEffect(() => {
// //     fetch("http://127.0.0.1:8000/api/store/categories/")
// //       .then(res => res.json())
// //       .then(data => setCategories(data))
// //       .catch(err => console.error("Failed to load categories", err));
// //   }, []);

// //   // Fetch announcements
// //   useEffect(() => {
// //     fetch("http://127.0.0.1:8000/api/announcements/")
// //       .then(res => res.json())
// //       .then(data => setAnnouncements(data))
// //       .catch(err => console.error("Failed to load announcements", err));
// //   }, []);

// //   // ✅ 3. Live search now sends the location ID
// //   useEffect(() => {
// //     if (searchQuery.length < 2 || !selectedLocation) {
// //       setSearchResults([]);
// //       return;
// //     }

// //     fetch(`http://127.0.0.1:8000/api/store/products/?search=${searchQuery}&location=${selectedLocation.id}`)
// //       .then(res => res.json())
// //       .then(data => setSearchResults(data.slice(0, 5)))
// //       .catch(err => console.error("Navbar search failed", err));
// //   }, [searchQuery, selectedLocation]);

// //   return (
// //     <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md border-b">
      
// //       {/* Announcement Marquee */}
// //       <div className="bg-green-600 overflow-hidden whitespace-nowrap py-2 border-b border-orange-700/20">
// //         <div className="marquee">
// //           <div className="marquee-content flex items-center">
// //             {announcements.map(item => (
// //               <span key={item.id} className="mx-10 flex items-center gap-2 text-white font-bold text-xs uppercase tracking-widest antialiased">
// //                 <span className="text-sm">📢</span> {item.message}
// //               </span>
// //             ))}
// //           </div>
// //           <div className="marquee-content flex items-center">
// //             {announcements.map(item => (
// //               <span key={`dup-${item.id}`} className="mx-10 flex items-center gap-2 text-white font-bold text-xs uppercase tracking-widest antialiased">
// //                 <span className="text-sm">📢</span> {item.message}
// //               </span>
// //             ))}
// //           </div>
// //         </div>
// //       </div>

// //       <div className="container py-4">
// //         <div className="flex items-center justify-between gap-4">

// //           {/* Logo */}
// //           <Link to="/" className="flex items-center gap-2 shrink-0">
// //             <div className="w-10 h-10 rounded-full gradient-saffron flex items-center justify-center text-xl">🛒</div>
// //             <div>
// //               <h1 className="text-xl font-extrabold tracking-tight text-slate-900 leading-none">
// //                 DESI <span className="text-orange-600">GROCERY</span>
// //               </h1>
// //               <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Ireland</p>
// //             </div>
// //           </Link>

// //           {/* ✅ 4. Location Selector Dropdown */}
// //           <div className="hidden lg:block ml-4">
// //             <DropdownMenu>
// //               <DropdownMenuTrigger asChild>
// //                 <Button variant="ghost" className="flex items-center gap-2 text-sm font-medium">
// //                   <MapPin className="h-4 w-4 text-orange-600" />
// //                   <span className="max-w-[150px] truncate">
// //                     {selectedLocation ? selectedLocation.name : "Select Store"}
// //                   </span>
// //                   <ChevronDown className="h-3 w-3 opacity-50" />
// //                 </Button>
// //               </DropdownMenuTrigger>
// //               <DropdownMenuContent align="start" className="w-56">
// //                 {locations.map((loc) => (
// //                   <DropdownMenuItem 
// //                     key={loc.id} 
// //                     onClick={() => setSelectedLocation(loc)}
// //                     className="cursor-pointer"
// //                   >
// //                     <div>
// //                       <p className="font-medium text-sm">{loc.name}</p>
// //                       <p className="text-xs text-muted-foreground truncate">{loc.address}</p>
// //                     </div>
// //                   </DropdownMenuItem>
// //                 ))}
// //               </DropdownMenuContent>
// //             </DropdownMenu>
// //           </div>

// //           {/* Desktop Search */}
// //           <div className="hidden md:flex flex-1 max-w-xl relative">
// //             <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
// //             <Input
// //               type="search"
// //               placeholder="Search for groceries..."
// //               className="pl-10 pr-4 bg-muted border-0"
// //               value={searchQuery}
// //               onChange={(e) => setSearchQuery(e.target.value)}
// //             />
// //             {/* Search results popup */}
// //             {searchResults.length > 0 && (
// //               <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg border z-50 overflow-hidden">
// //                 {searchResults.map(product => (
// //                   <Link
// //                     key={product.id}
// //                     to={`/product/${product.slug}?location=${selectedLocation?.id}`}
// //                     className="flex items-center gap-3 p-3 hover:bg-slate-50 transition-colors"
// //                     onClick={() => setSearchQuery('')}
// //                   >
// //                     <img src={product.image} alt={product.name} className="w-10 h-10 rounded object-cover" />
// //                     <div className="flex-1">
// //                       <p className="text-sm font-medium">{product.name}</p>
// //                       <p className="text-xs text-orange-600 font-bold">
// //                         €{Number(product.price).toFixed(2)}
// //                       </p>
// //                     </div>
// //                   </Link>
// //                 ))}
// //               </div>
// //             )}
// //           </div>

// //           {/* Right Actions */}
// //           <div className="flex items-center gap-2">
// //             <Link to="/cart">
// //               <Button variant="ghost" size="icon" className="relative">
// //                 <ShoppingCart className="h-5 w-5" />
// //                 {totalItems > 0 && (
// //                   <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-orange-600 text-white text-[10px] flex items-center justify-center font-bold">
// //                     {totalItems}
// //                   </span>
// //                 )}
// //               </Button>
// //             </Link>

// //             {isAuthenticated ? (
// //               <Link to="/profile">
// //                 <Button variant="ghost" size="icon"><User className="h-5 w-5" /></Button>
// //               </Link>
// //             ) : (
// //               <Link to="/login">
// //                 <Button size="sm" className="bg-orange-600 hover:bg-orange-700 text-white font-bold">Login</Button>
// //               </Link>
// //             )}
// //           </div>
// //         </div>
// //       </div>

// //       {/* Categories Bar */}
// //       <div className="hidden md:block border-t bg-slate-50">
// //         <div className="container">
// //           <div className="flex items-center gap-8 py-3 text-[11px] font-bold uppercase tracking-wider overflow-x-auto no-scrollbar">
// //             {categories.map(category => (
// //               <Link
// //                 key={category.id}
// //                 to={`/category/${category.slug}?location=${selectedLocation?.id}`}
// //                 className="whitespace-nowrap text-slate-500 hover:text-orange-600 transition-all duration-200"
// //               >
// //                 {category.name}
// //               </Link>
// //             ))}
// //           </div>
// //         </div>
// //       </div>
// //     </header>
// //   );
// // };

// import { useState, useEffect } from "react";
// import { Link, useNavigate, useSearchParams } from 'react-router-dom';
// import { Search, ShoppingCart, User, MapPin, ChevronDown } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from '@/components/ui/dropdown-menu';
// import { useCart } from '@/context/CartContext';
// import { useAuth } from '@/context/AuthContext';

// export const Navbar = () => {
//   const [searchQuery, setSearchQuery] = useState('');
//   const [searchResults, setSearchResults] = useState<any[]>([]);
//   const [searchParams] = useSearchParams();
//   const navigate = useNavigate();

//   // 1. Core State
//   const [locations, setLocations] = useState<any[]>([]);
//   const [selectedLocation, setSelectedLocation] = useState<any>(null);
//   const [announcements, setAnnouncements] = useState<any[]>([]);
//   const [categories, setCategories] = useState<any[]>([]);

//   const { totalItems } = useCart();
//   const { isAuthenticated } = useAuth();

//   // 2. Fetch Initial Data (Locations, Categories, Announcements)
//   useEffect(() => {
//     // Fetch Locations
//     fetch("http://127.0.0.1:8000/api/store/locations/")
//       .then(res => res.json())
//       .then(data => {
//         setLocations(data);
//         // Sync selected location with URL param or default to first
//         const urlLocId = searchParams.get('location');
//         const initialLoc = data.find((l: any) => l.id.toString() === urlLocId) || data[0];
//         if (initialLoc) setSelectedLocation(initialLoc);
//       })
//       .catch(err => console.error("Failed to load locations", err));

//     // Fetch Categories
//     fetch("http://127.0.0.1:8000/api/store/categories/")
//       .then(res => res.json())
//       .then(data => setCategories(data))
//       .catch(err => console.error("Failed to load categories", err));

//     // Fetch Announcements
//     fetch("http://127.0.0.1:8000/api/announcements/")
//       .then(res => res.json())
//       .then(data => setAnnouncements(data))
//       .catch(err => console.error("Failed to load announcements", err));
//   }, []);

//   // 3. Handle Location Change
//   const handleLocationChange = (loc: any) => {
//     setSelectedLocation(loc);
//     // Update URL without losing other params
//     const newParams = new URLSearchParams(searchParams);
//     newParams.set('location', loc.id.toString());
//     navigate({ search: newParams.toString() });
//   };

//   // 4. Live Search (Location-Aware)
//   useEffect(() => {
//     if (searchQuery.length < 2 || !selectedLocation) {
//       setSearchResults([]);
//       return;
//     }

//     const delayDebounceFn = setTimeout(() => {
//       fetch(`http://127.0.0.1:8000/api/store/products/?search=${searchQuery}&location=${selectedLocation.id}`)
//         .then(res => res.json())
//         .then(data => setSearchResults(data.slice(0, 5)))
//         .catch(err => console.error("Search failed", err));
//     }, 300);

//     return () => clearTimeout(delayDebounceFn);
//   }, [searchQuery, selectedLocation]);

//   return (
//     <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md border-b">
//       {/* Announcement Marquee */}
//       {announcements.length > 0 && (
//         <div className="bg-green-600 overflow-hidden whitespace-nowrap py-2 border-b">
//           <div className="marquee flex">
//             <div className="marquee-content flex items-center animate-marquee">
//               {announcements.map(item => (
//                 <span key={item.id} className="mx-10 text-white font-bold text-xs uppercase flex items-center gap-2">
//                   <span>📢</span> {item.message}
//                 </span>
//               ))}
//             </div>
//           </div>
//         </div>
//       )}

//       <div className="container py-4 flex items-center justify-between gap-4">
//         {/* Logo */}
//         <Link to={`/${selectedLocation ? `?location=${selectedLocation.id}` : ''}`} className="flex items-center gap-2 shrink-0">
//           <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center text-xl">🛒</div>
//           <div>
//             <h1 className="text-xl font-black text-slate-900 leading-none">DESI <span className="text-orange-600">GROCERY</span></h1>
//             <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Ireland</p>
//           </div>
//         </Link>

//         {/* Location Dropdown */}
//         <div className="hidden lg:block">
//           <DropdownMenu>
//             <DropdownMenuTrigger asChild>
//               <Button variant="ghost" className="flex items-center gap-2 text-sm font-bold">
//                 <MapPin className="h-4 w-4 text-orange-600" />
//                 <span className="max-w-[120px] truncate">{selectedLocation?.name || "Select Store"}</span>
//                 <ChevronDown className="h-3 w-3" />
//               </Button>
//             </DropdownMenuTrigger>
//             <DropdownMenuContent align="start" className="w-56 font-bold">
//               {locations.map((loc) => (
//                 <DropdownMenuItem key={loc.id} onClick={() => handleLocationChange(loc)} className="cursor-pointer">
//                   <div className="flex flex-col">
//                     <span className="text-sm">{loc.name}</span>
//                     <span className="text-[10px] text-muted-foreground font-normal">{loc.address}</span>
//                   </div>
//                 </DropdownMenuItem>
//               ))}
//             </DropdownMenuContent>
//           </DropdownMenu>
//         </div>

//         {/* Search Input */}
//         <div className="hidden md:flex flex-1 max-w-xl relative">
//           <Input
//             type="search"
//             placeholder="Search fresh groceries..."
//             className="pl-4 bg-slate-100 border-none font-medium"
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//           />
//           {searchResults.length > 0 && (
//             <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border overflow-hidden z-[100]">
//               {searchResults.map(product => (
//                 <Link
//                   key={product.id}
//                   to={`/product/${product.slug}?location=${selectedLocation?.id}`}
//                   className="flex items-center gap-3 p-3 hover:bg-slate-50 border-b last:border-none"
//                   onClick={() => setSearchQuery('')}
//                 >
//                   <img src={product.image} className="w-10 h-10 rounded object-cover" alt="" />
//                   <div className="flex-1">
//                     <p className="text-sm font-bold">{product.name}</p>
//                     <p className="text-xs text-orange-600 font-black">€{Number(product.price).toFixed(2)}</p>
//                   </div>
//                 </Link>
//               ))}
//             </div>
//           )}
//         </div>

//         {/* Actions */}
//         <div className="flex items-center gap-3">
//           <Link to={`/cart${selectedLocation ? `?location=${selectedLocation.id}` : ''}`} className="relative">
//             <Button variant="ghost" size="icon">
//               <ShoppingCart className="h-5 w-5" />
//               {totalItems > 0 && (
//                 <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-orange-600 text-white text-[10px] flex items-center justify-center font-bold">
//                   {totalItems}
//                 </span>
//               )}
//             </Button>
//           </Link>
//           {isAuthenticated ? (
//             <Link to="/profile"><Button variant="ghost" size="icon"><User className="h-5 w-5" /></Button></Link>
//           ) : (
//             <Link to="/login"><Button size="sm" className="bg-orange-600 hover:bg-orange-700 font-bold">Login</Button></Link>
//           )}
//         </div>
//       </div>

//       {/* Category Nav */}
//       <div className="hidden md:block border-t bg-slate-50 overflow-x-auto no-scrollbar">
//         <div className="container flex items-center gap-8 py-3">
//           {categories.map(cat => (
//             <Link
//               key={cat.id}
//               to={`/category/${cat.slug}?location=${selectedLocation?.id}`}
//               className="text-[11px] font-black uppercase tracking-widest text-slate-500 hover:text-orange-600 whitespace-nowrap transition-colors"
//             >
//               {cat.name}
//             </Link>
//           ))}
//         </div>
//       </div>
//     </header>
//   );
// };
import { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Search, ShoppingCart, User, MapPin, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';

export const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // 1. Core State
  const [locations, setLocations] = useState<any[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<any>(null);
  const [announcements, setAnnouncements] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);

  const { totalItems } = useCart();
  const { isAuthenticated } = useAuth();

  // 2. Fetch Initial Data
  useEffect(() => {
    fetch("http://api.desigrocery.ie/api/store/locations/")
      .then(res => res.json())
      .then(data => {
        setLocations(data);
        const urlLocId = searchParams.get('location');
        const initialLoc = data.find((l: any) => l.id.toString() === urlLocId) || data[0];
        if (initialLoc) setSelectedLocation(initialLoc);
      })
      .catch(err => console.error("Failed to load locations", err));

    fetch("http://api.desigrocery.ie/api/store/categories/")
      .then(res => res.json())
      .then(data => setCategories(data))
      .catch(err => console.error("Failed to load categories", err));

    fetch("http://api.desigrocery.ie/api/announcements/")
      .then(res => res.json())
      .then(data => setAnnouncements(data))
      .catch(err => console.error("Failed to load announcements", err));
  }, []);

  // 3. Handle Location Change
  const handleLocationChange = (loc: any) => {
    setSelectedLocation(loc);
    const newParams = new URLSearchParams(searchParams);
    newParams.set('location', loc.id.toString());
    navigate({ search: newParams.toString() });
  };

  // 4. Live Search
  useEffect(() => {
    if (searchQuery.length < 2 || !selectedLocation) {
      setSearchResults([]);
      return;
    }

    const delayDebounceFn = setTimeout(() => {
      fetch(`http://api.desigrocery.ie/api/store/products/?search=${searchQuery}&location=${selectedLocation.id}`)
        .then(res => res.json())
        .then(data => setSearchResults(data.slice(0, 5)))
        .catch(err => console.error("Search failed", err));
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery, selectedLocation]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md border-b">
      {/* Announcement Marquee */}
      {announcements.length > 0 && (
  <div className="bg-green-600 overflow-hidden py-3 border-b border-green-700 flex">
    {/* Container for the marquee */}
    <div className="flex whitespace-nowrap">
      <div className="flex animate-marquee">
        {/* First set of items */}
        {announcements.map((item) => (
          <span key={`a-${item.id}`} className="mx-12 text-white font-medium tracking-wide text-sm flex items-center gap-3">
            <span className="opacity-80 text-lg"></span> 
            {item.message}
          </span>
        ))}
        {/* Duplicate set for seamless looping */}
        {announcements.map((item) => (
          <span key={`b-${item.id}`} className="mx-12 text-white font-medium tracking-wide text-sm flex items-center gap-3">
            <span className="opacity-80 text-lg"></span> 
            {item.message}
          </span>
        ))}
      </div>
    </div>
  </div>
)}

      <div className="container py-4 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link to={`/${selectedLocation ? `?location=${selectedLocation.id}` : ''}`} className="flex items-center gap-2 shrink-0">
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-xl text-primary-foreground font-bold shadow-sm">
            🛒
          </div>
          <div>
            <h1 className="text-xl font-black text-slate-900 leading-none tracking-tight">
              DESI <span className="text-primary">GROCERY</span>
            </h1>
            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Ireland</p>
          </div>
        </Link>

        {/* Location Dropdown */}
        <div className="hidden lg:block">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2 text-sm font-bold hover:text-primary transition-colors">
                <MapPin className="h-4 w-4 text-primary" />
                <span className="max-w-[120px] truncate">{selectedLocation?.name || "Select Store"}</span>
                <ChevronDown className="h-3 w-3 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56 font-bold shadow-xl border-slate-100">
              {locations.map((loc) => (
                <DropdownMenuItem 
                  key={loc.id} 
                  onClick={() => handleLocationChange(loc)} 
                  className="cursor-pointer focus:bg-primary/10 focus:text-primary transition-colors"
                >
                  <div className="flex flex-col py-1">
                    <span className="text-sm font-bold">{loc.name}</span>
                    <span className="text-[10px] text-muted-foreground font-normal">{loc.address}</span>
                  </div>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Search Input */}
        <div className="hidden md:flex flex-1 max-w-xl relative">
          <Input
            type="search"
            placeholder="Search fresh groceries..."
            className="pl-4 bg-slate-100 border-none font-medium focus-visible:ring-primary focus-visible:ring-1 transition-all"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchResults.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border border-slate-100 overflow-hidden z-[100]">
              {searchResults.map(product => (
                <Link
                  key={product.id}
                  to={`/product/${product.slug}?location=${selectedLocation?.id}`}
                  className="flex items-center gap-3 p-3 hover:bg-primary/5 transition-colors border-b border-slate-50 last:border-none"
                  onClick={() => setSearchQuery('')}
                >
                  <img src={product.image} className="w-10 h-10 rounded-md object-cover bg-slate-50" alt="" />
                  <div className="flex-1">
                    <p className="text-sm font-bold text-slate-900 leading-tight">{product.name}</p>
                    <p className="text-xs text-primary font-black mt-1">€{Number(product.price).toFixed(2)}</p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Link to={`/cart${selectedLocation ? `?location=${selectedLocation.id}` : ''}`}>
            <Button variant="ghost" size="icon" className="relative hover:text-primary transition-all">
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-primary text-primary-foreground text-[10px] flex items-center justify-center font-black shadow-sm ring-2 ring-white">
                  {totalItems}
                </span>
              )}
            </Button>
          </Link>
          {isAuthenticated ? (
            <Link to="/profile">
              <Button variant="ghost" size="icon" className="hover:text-primary transition-all">
                <User className="h-5 w-5" />
              </Button>
            </Link>
          ) : (
            <Link to="/login">
              <Button size="sm" className="bg-primary hover:opacity-90 text-primary-foreground font-bold shadow-sm px-5">
                Login
              </Button>
            </Link>
          )}
        </div>
      </div>

      {/* Category Nav */}
      <div className="container mx-auto flex items-center gap-4 py-4 px-4">
  {categories.map((cat, index) => (
    <div key={cat.id} className="flex items-center">
      <Link
        to={`/category/${cat.slug}?location=${selectedLocation?.id}`}
        className="px-4 py-2 text-base font-semibold tracking-tight text-slate-900 hover:text-primary whitespace-nowrap transition-all duration-200 hover:bg-slate-50 rounded-lg"
      >
        {cat.name}
      </Link>
      
      {/* Vertical Borderline - hides on the last item */}
      {index !== categories.length - 1 && (
        <div className="h-4 w-[1px] bg-slate-200 mx-2" />
      )}
    </div>
  ))}
</div>
    </header>
  );
};