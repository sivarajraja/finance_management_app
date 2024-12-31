import React from 'react';
import { Sidebar } from './Sidebar';

export const ParentComponent = ({ children }) => {
  return (
    <div className="flex h-screen w-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col relative overflow-auto snap-y snap-mandatory scrollbar-hide scroll-smooth">
        {children}
      </div>
    </div>
  );
};
