
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button } from '@/components/ui/button';
import { LogOut, User } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const UserProfile: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  if (!user) {
    return null;
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="pb-2">
        <CardTitle className="text-2xl">Profile</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-center mb-6">
          <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
            <User size={40} className="text-primary" />
          </div>
        </div>
        
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">Name</p>
          <p className="font-medium">{user.name}</p>
        </div>
        
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">Email</p>
          <p className="font-medium">{user.email}</p>
        </div>
        
        <Button 
          variant="outline" 
          className="w-full border-destructive text-destructive hover:bg-destructive/10"
          onClick={handleLogout}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </CardContent>
    </Card>
  );
};

export default UserProfile;
