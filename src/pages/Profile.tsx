
import React from 'react';
import UserProfile from '../components/UserProfile';

const Profile: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Your Profile</h1>
      <UserProfile />
    </div>
  );
};

export default Profile;
