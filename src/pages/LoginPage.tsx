import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';
import { motion } from 'framer-motion';
import { GoogleLogin } from '@react-oauth/google';

// UI Components
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Layout } from '@/components/layout/Layout';

// Context & Hooks
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { api } from '@/lib/api';

const LoginPage = () => {
  const { googleLogin } = useAuth();
  const [searchParams] = useSearchParams();
  const redirect = searchParams.get('redirect') || '/';
  const navigate = useNavigate();
  const { toast } = useToast();
  const { login, signup } = useAuth();

  // Local State
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Form States
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');

  



  // Standard Login Handler
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

  // Standard Signup Handler
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const success = await signup(signupName, signupEmail, signupPassword);
    if (success) {
      toast({ title: "Account created!", description: "Welcome to Desi Grocery." });
      navigate(redirect);
    } else {
      toast({ title: "Signup failed", description: "Try a different email.", variant: "destructive" });
    }
    setIsLoading(false);
  };

  // ✅ Google Authentication Handler
  const handleGoogleSuccess = async (credentialResponse: any) => {
    setIsLoading(true);
    try {
      // ✅ Use the context method we just created
      const success = await googleLogin(credentialResponse.credential);

      if (success) {
        toast({ 
          title: "Success!", 
          description: "Logged in with Google." 
        });
        navigate(redirect); // ✅ This will now work instantly
      } else {
        throw new Error("Backend verification failed");
      }
    } catch (err: any) {
      toast({ 
        title: "Google Login Failed", 
        description: "Could not authenticate with Google.", 
        variant: "destructive" 
      });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Layout>
      <div className="container py-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="max-w-md mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-full bg-orange-500 flex items-center justify-center mx-auto mb-4 text-3xl shadow-lg">
              🛒
            </div>
            <h1 className="text-2xl font-bold tracking-tight">Desi Grocery Ireland</h1>
            <p className="text-muted-foreground text-sm">Authentic tastes delivered to your door</p>
          </div>

          <div className="bg-card rounded-2xl p-6 shadow-xl border">
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>

              {/* --- LOGIN SECTION --- */}
              <TabsContent value="login">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input 
                        id="email"
                        type="email" 
                        className="pl-10" 
                        placeholder="name@example.com"
                        value={loginEmail} 
                        onChange={(e) => setLoginEmail(e.target.value)} 
                        required 
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input 
                        id="password"
                        type={showPassword ? 'text' : 'password'} 
                        className="pl-10 pr-10" 
                        value={loginPassword} 
                        onChange={(e) => setLoginPassword(e.target.value)} 
                        required 
                      />
                      <button 
                        type="button" 
                        onClick={() => setShowPassword(!showPassword)} 
                        className="absolute right-3 top-1/2 -translate-y-1/2 hover:text-primary transition-colors"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>

                  <Button type="submit" className="w-full h-11" disabled={isLoading}>
                    {isLoading ? "Authenticating..." : "Sign In"}
                  </Button>
                </form>
              </TabsContent>

              {/* --- SIGNUP SECTION --- */}
              <TabsContent value="signup">
                <form onSubmit={handleSignup} className="space-y-4">
                  <div className="space-y-2">
                    <Label>Full Name</Label>
                    <Input 
                      placeholder="John Doe"
                      value={signupName} 
                      onChange={(e) => setSignupName(e.target.value)} 
                      required 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Email</Label>
                    <Input 
                      type="email" 
                      placeholder="name@example.com"
                      value={signupEmail} 
                      onChange={(e) => setSignupEmail(e.target.value)} 
                      required 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Password</Label>
                    <Input 
                      type="password" 
                      value={signupPassword} 
                      onChange={(e) => setSignupPassword(e.target.value)} 
                      required 
                    />
                  </div>
                  <Button type="submit" className="w-full h-11" disabled={isLoading}>
                    {isLoading ? "Creating account..." : "Create Account"}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>

            {/* --- GOOGLE SOCIAL LOGIN --- */}
            <div className="mt-8">
              <div className="relative mb-6">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
                </div>
              </div>

              <div className="flex justify-center">
                <GoogleLogin 
                  onSuccess={handleGoogleSuccess}
                  onError={() => toast({ 
                    title: "Google Sign-In Error", 
                    description: "Please try again later.",
                    variant: "destructive" 
                  })}
                  useOneTap
                  theme="outline"
                  shape="pill"
                  width="320"
                />
              </div>
            </div>
          </div>
          
          <p className="text-center text-xs text-muted-foreground mt-8">
            By continuing, you agree to our Terms of Service and Privacy Policy.
          </p>
        </motion.div>
      </div>
    </Layout>
  );
};

export default LoginPage;