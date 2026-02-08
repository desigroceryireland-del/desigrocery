import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, User } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Layout } from '@/components/layout/Layout';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';

const LoginPage = () => {
  const [searchParams] = useSearchParams();
  const redirect = searchParams.get('redirect') || '/';
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');

  const { login, signup } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const success = await login(loginEmail, loginPassword);

    if (success) {
      toast({ title: "Welcome back!", description: "You have successfully logged in." });
      navigate(redirect);
    } else {
      toast({ title: "Login failed", description: "Invalid email or password.", variant: "destructive" });
    }

    setIsLoading(false);
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const success = await signup(signupName, signupEmail, signupPassword);

    if (success) {
      toast({ title: "Account created!", description: "Welcome to Desi Grocery Ireland." });
      navigate(redirect);
    } else {
      toast({ title: "Signup failed", description: "Try a different email.", variant: "destructive" });
    }

    setIsLoading(false);
  };

  return (
    <Layout>
      <div className="container py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-md mx-auto">
          
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-full gradient-saffron flex items-center justify-center mx-auto mb-4 text-3xl">🛒</div>
            <h1 className="text-2xl font-bold">Welcome to Desi Grocery</h1>
            <p className="text-muted-foreground">Sign in to continue shopping</p>
          </div>

          <div className="bg-card rounded-xl p-6 shadow-card border">
            <Tabs defaultValue="login">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>

              {/* LOGIN */}
              <TabsContent value="login">
                <form onSubmit={handleLogin} className="space-y-4">
                  <Label>Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input type="email" className="pl-10" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} required />
                  </div>

                  <Label>Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input type={showPassword ? 'text' : 'password'} className="pl-10 pr-10" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} required />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2">
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>

                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Logging in..." : "Login"}
                  </Button>
                </form>
              </TabsContent>

              {/* SIGNUP */}
              <TabsContent value="signup">
                <form onSubmit={handleSignup} className="space-y-4">
                  <Label>Full Name</Label>
                  <Input value={signupName} onChange={(e) => setSignupName(e.target.value)} required />

                  <Label>Email</Label>
                  <Input type="email" value={signupEmail} onChange={(e) => setSignupEmail(e.target.value)} required />

                  <Label>Password</Label>
                  <Input type="password" value={signupPassword} onChange={(e) => setSignupPassword(e.target.value)} required />

                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Creating account..." : "Create Account"}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>

            {/* GOOGLE BUTTON CENTERED */}
            <div className="mt-6 flex justify-center">
              <Button variant="outline" className="w-3/4" type="button">
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25..." />
                </svg>
                Continue with Google
              </Button>
            </div>

          </div>
        </motion.div>
      </div>
    </Layout>
  );
};

export default LoginPage;
