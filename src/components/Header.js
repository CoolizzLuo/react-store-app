import React from 'react';

const Header = ({nickname}) => {
  return (
    <div className="header">
      <div className="grid">
        <div className="start">
          <a href="/">Home</a>
        </div>
        <div className="end">
          {nickname ? (
            <span className="nickname">
              <i className="far fa-user"></i>
              {nickname}
            </span>
          ) : (
            <>
              <a href="/">Login</a>
              <a href="/">Register</a>
            </>
          )}
        </div>
      </div>
    </div>
  )
};

export default Header;