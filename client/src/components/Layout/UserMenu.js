import React from 'react'
import { NavLink } from 'react-router-dom'
const UserMenu = () => {
  return (
    <>
    <div className='text-center'>
    <div className="list-group">
   <h1>User Admin Panel</h1>
  <NavLink to ="/dashboard/user/profile" className="list-group-item list-group-item-action " aria-current="true">
    User Profile
  </NavLink>
  <NavLink to = "/dashboard/user/posts" className="list-group-item list-group-item-action " aria-current="true">
    User Posts
  </NavLink>
  </div>
</div>

    </>
  )
}

export default UserMenu