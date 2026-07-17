import React from 'react';
import useAuth from '../../../hooks/useAuth';
import useRole from '../../../hooks/useRole';

const Profile = () => {
  const {user} = useAuth();
  const [role] = useRole();
  console.log(role)
  return (
    <div>
       <h1>{user?.displayName}</h1>
      <h2>{role}</h2>
    </div>
  );
};

export default Profile;