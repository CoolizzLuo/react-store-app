import React, { useMemo } from 'react';
import Header from 'components/Header';

const Layout = ({ children }) => {
  const user = useMemo(() => {
    return global.auth.getUser() || {}
  }, [])
  
  return (
    <div className="main">
      <Header user={user}/>
      { children }
    </div>
  )
};

export default Layout;