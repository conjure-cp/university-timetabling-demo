import React from 'react';
import Header from './Header'; 
import Banner from './Banner';

const Layout = ({ children }) => {
  return (
      <div id="root" className='flex flex-col min-h-screen w-full'>
        <Header />
        <main className="min-h-80" style={{ padding: '150px 120px' }}>
          {children}
        </main>
        <div className="relative border-t border-black">
          <Banner />
        </div>
      </div>
  );
};

export default Layout;
