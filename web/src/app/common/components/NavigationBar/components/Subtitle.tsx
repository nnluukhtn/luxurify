import React from 'react';
import { User } from 'utils/SessionActions/types';

interface ComponentProps {
  user?: User;
  isAuthenticated?: boolean;
}

const Subtitle = ({ user, isAuthenticated }: ComponentProps) => {
  return !!user && isAuthenticated ? (
    <>
      {user.isAdmin ? 'Admin: ' : 'welcome'} {user.email}
    </>
  ) : (
    <>Decentralized luxury watch database</>
  );
};

export default Subtitle;
