import React from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from './../../components/Layout/AdminMenu';



const CreatePost = () => {
  return (
    <Layout title='Create-Post - SB'>
        <div className='container-fluid m-3 p-3'>
        <div className='row'>
          <div className='col-md-3'>
            <AdminMenu/>
            </div>  
          <div className='col-md-9'>
            <h1>CreatePost</h1>
            </div>  
        </div>
        </div>
    </Layout>
  )
}

export default CreatePost