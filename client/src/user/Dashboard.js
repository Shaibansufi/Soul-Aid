import React from 'react'
import Layout from '../components/Layout/Layout'
import { useAuth } from '../context/auth'
import UserMenu from './../components/Layout/UserMenu';

function Dashboard() {
  const [auth] = useAuth()
  return (
    <Layout title={'AdminDashBoard -SB'}>
    <div className='container-fluid m-3 p-3'>
        <div className='row'>
          <div className='col-md-3'>
            <UserMenu/>
          </div>
          <div className='col-md-9'>
            <div className='card w-75 p-3'>
              <h3>User Name :{auth?.user?.name}</h3>
              <h3>User Email :{auth?.user?.email}</h3>
              <h3>User Contact :{auth?.user?.address}</h3>
              {/* {console.log(auth?.user?.phone)} */}

            </div>
          </div>
       </div>
    </div>
        </Layout>
  )
}

export default Dashboard