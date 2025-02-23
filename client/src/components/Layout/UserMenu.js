import React from 'react'
import { NavLink } from 'react-router-dom'
const UserMenu = () => {
  return (
    <div className='text-center'>
      <div className="list-group">
        <h1>User Admin Panel</h1>
        <NavLink to="/dashboard/user/profile" className="list-group-item list-group-item-action">
          User Profile
        </NavLink>
        <NavLink to="/dashboard/user/posts" className="list-group-item list-group-item-action">
          User Posts
        </NavLink>
        <NavLink to="/dashboard/user/transactions" className="list-group-item list-group-item-action">
          Transactions
        </NavLink>
        <NavLink to="/dashboard/user/reports" className="list-group-item list-group-item-action">
          Reports
        </NavLink>
      </div>
    </div>
  )
}

export default UserMenu