import React from 'react'
import { Link, withRouter  } from 'react-router-dom'
import Panel from 'components/Panel'
import UserProfile from 'components/UserProfile'

const Header = ({ user, history }) => {
  const toProfile = () => {
    Panel.open({
      component: UserProfile,
      props: {
        user
      },
      callback: (data) => {
        if (data === 'logout') {
          history.go(0);
        }
      }
    })
  }
  return (
    <div className="header">
      <div className="grid">
        <div className="start">
          <a href="/">Home</a>
        </div>
        <div className="end">
          {user?.nickname ? (
            <span className="nickname" onClick={toProfile}>
              <i className="far fa-user"></i>
              {user.nickname}
            </span>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </div>
      </div>
    </div>
  )
};

export default withRouter(Header);