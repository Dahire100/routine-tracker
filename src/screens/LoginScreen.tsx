
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { LogIn, UserPlus, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const LoginScreen: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [name, setName] = useState('');
  const { login, register, isLoading } = useAuth();
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleAuth = async () => {
    console.log("Attempting authentication:", { isRegistering, email, username });
    setError('');
    
    if (!email.trim() || !password.trim()) {
      setError('Email and password are required');
      return;
    }
    
    if (isRegistering && !name.trim()) {
      setError('Name is required for registration');
      return;
    }
    
    try {
      let success;
      
      if (isRegistering) {
        success = await register(email.trim(), password.trim(), name.trim(), username.trim());
      } else {
        success = await login(email.trim(), password.trim(), username.trim());
      }
      
      console.log("Authentication result:", success);
      
      if (success) {
        console.log("Authentication successful, navigating to home");
        navigate('/', { replace: true });
      } else {
        setError(isRegistering ? 'Registration failed' : 'Invalid credentials');
      }
    } catch (err) {
      console.error("Authentication error:", err);
      setError('An error occurred. Please try again.');
    }
  };

  const toggleMode = () => {
    setIsRegistering(!isRegistering);
    setError('');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-1">
          <div className="flex justify-center mb-6">
            <h1 className="text-3xl font-bold text-primary">MindfulMe</h1>
          </div>
          <CardTitle className="text-2xl font-bold text-center">
            {isRegistering ? 'Create Account' : 'Welcome Back'}
          </CardTitle>
          <CardDescription className="text-center">
            {isRegistering 
              ? 'Enter your information to create an account' 
              : 'Enter your credentials to sign in to your account'}
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {isRegistering && (
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          )}
          
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              placeholder="your_username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              placeholder="******"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
            />
          </div>
          
          {error && <p className="text-sm font-medium text-destructive">{error}</p>}
        </CardContent>
        
        <CardFooter className="flex flex-col gap-4">
          <Button 
            className="w-full"
            onClick={handleAuth}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {isRegistering ? 'Creating Account' : 'Signing In'}
              </>
            ) : (
              <>
                {isRegistering ? (
                  <>
                    <UserPlus className="mr-2 h-4 w-4" />
                    Sign Up
                  </>
                ) : (
                  <>
                    <LogIn className="mr-2 h-4 w-4" />
                    Sign In
                  </>
                )}
              </>
            )}
          </Button>
          
          <Button 
            variant="link" 
            className="w-full"
            onClick={toggleMode}
          >
            {isRegistering 
              ? 'Already have an account? Sign In' 
              : 'Don\'t have an account? Sign Up'}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default LoginScreen;
