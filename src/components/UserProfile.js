import React, { useCallback } from 'react'

const UserProfile = ({ user, close }) => {
  const handleLogout = useCallback(() => {
    global.auth.logout()
    close('logout');
  }, [close])

  return (
    <div className="user-profile has-text-left">
      <p className="title has-text-centered">Profile</p>
      <fieldset disabled>
        <div className="field">
          <div className="control">
            <label className="label">Nickname</label>
            <input
              className="input"
              type="text"
              defaultValue={user.nickname}
            />
          </div>
        </div>
        <div className="field">
          <div className="control">
            <label className="label">Email</label>
            <input
              className="input"
              type="text"
              defaultValue={user.email}
            />
          </div>
        </div>
        <div className="field">
          <div className="control">
            <label className="label">Type</label>
            <input
              className="input"
              type="text"
              defaultValue={user.type === 1 ? 'Manager' : 'General User'}
            />
          </div>
        </div>
      </fieldset>

      <br />
      <br />
      <div className="field is-grouped is-grouped-centered">
        <div className="control">
          <button className="button is-danger" type="button" onClick={handleLogout}>
            Logout
          </button>
        </div>
        <div className="control">
          <button
            className="button"
            type="button"
            onClick={() => close()}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}

export default UserProfile