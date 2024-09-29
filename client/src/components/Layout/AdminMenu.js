import React from 'react'
import { NavLink } from 'react-router-dom'

const AdminMenu = () => {
  return (
    <>
    <div className='text-center'>
    <div className="list-group">
   <h1>Admin Panel</h1>
  <NavLink to ="/dashboard/admin/create-stream" className="list-group-item list-group-item-action " aria-current="true">
    Create Stream
  </NavLink>
  <NavLink to = "/dashboard/admin/create-post" className="list-group-item list-group-item-action " aria-current="true">
    Create Post
  </NavLink>
  <NavLink to ="/dashboard/admin/users" className="list-group-item list-group-item-action " aria-current="true">
    Users
  </NavLink>
  </div>
</div>

    </>
  )
}

export default AdminMenu