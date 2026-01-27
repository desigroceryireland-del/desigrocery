import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock, Facebook, Instagram, Linkedin } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-foreground text-background mt-auto">
      {/* Main Footer */}
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-full gradient-saffron flex items-center justify-center text-xl">
                🛒
              </div>
              <div>
                <h3 className="text-lg font-bold">Desi Grocery</h3>
                <p className="text-xs text-muted-foreground">Ireland</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Your trusted source for authentic Indian groceries in Ireland. Fresh produce, spices, and essentials delivered to your door.
            </p>
            <div className="flex gap-4">
              <a
                href="https://www.facebook.com/desigroceryireland"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://www.instagram.com/desigrocery_ireland"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-sm text-muted-foreground">
                <Phone className="h-4 w-4 text-primary shrink-0" />
                <a href="tel:0860103103" className="hover:text-primary transition-colors">
                  086 010 3103
                </a>
              </li>
              <li className="flex items-center gap-3 text-sm text-muted-foreground">
                <Mail className="h-4 w-4 text-primary shrink-0" />
                <a href="mailto:desigroceryireland@gmail.com" className="hover:text-primary transition-colors">
                  desigroceryireland@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                <span>123 O'Connell Street, Dublin 1, Ireland</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-muted-foreground">
                <Clock className="h-4 w-4 text-primary shrink-0" />
                <span>9 AM – 7 PM (Every Day)</span>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/category/fruits-vegetables" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Fruits & Vegetables
                </Link>
              </li>
              <li>
                <Link to="/category/spices-masala" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Spices & Masala
                </Link>
              </li>
              <li>
                <Link to="/category/rice-atta" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Rice & Atta
                </Link>
              </li>
              <li>
                <Link to="/category/snacks-sweets" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Snacks & Sweets
                </Link>
              </li>
              <li>
                <Link to="/offers" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Special Offers
                </Link>
              </li>
            </ul>
          </div>

          {/* Policies */}
          <div>
            <h4 className="font-semibold mb-4">Policies</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/privacy-policy" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="/refund-policy" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Refund Policy
                </Link>
              </li>
              <li>
                <Link to="/shipping-policy" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Shipping Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-background/10">
        <div className="container py-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} Desi Grocery Ireland. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <span>We accept:</span>
              <div className="flex flex-wrap gap-2">
                <div className="h-8 px-3 bg-white rounded flex items-center justify-center">
                  <span className="text-[#1A1F71] font-bold text-sm italic">VISA</span>
                </div>
                <div className="h-8 px-2 bg-white rounded flex items-center justify-center">
                  <div className="flex">
                    <div className="w-4 h-4 rounded-full bg-[#EB001B] -mr-1"></div>
                    <div className="w-4 h-4 rounded-full bg-[#F79E1B] opacity-90"></div>
                  </div>
                </div>
                <div className="h-8 px-3 bg-white rounded flex items-center justify-center">
                  <span className="text-[#003087] font-bold text-xs">Pay</span>
                  <span className="text-[#009CDE] font-bold text-xs">Pal</span>
                </div>
                <div className="h-8 px-3 bg-white rounded flex items-center justify-center">
                  <span className="text-[#862165] font-bold text-xs">Skrill</span>
                </div>
                <div className="h-8 px-2 bg-white rounded flex items-center justify-center">
                  <div className="flex items-center gap-0.5">
                    <div className="w-3 h-3 rounded-full bg-[#CC0000]"></div>
                    <div className="w-3 h-3 rounded-full bg-[#0099DF]"></div>
                  </div>
                </div>
                <div className="h-8 px-2 bg-white rounded flex flex-col items-center justify-center leading-none">
                  <span className="text-[#1A1F71] font-bold text-[10px] italic">VISA</span>
                  <span className="text-[#F7B600] font-bold text-[8px]">Electron</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
