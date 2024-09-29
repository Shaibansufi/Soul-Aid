import React from 'react'
import Header from '../Layout/Header'
import Footer from '../Layout/Footer'
import {Helmet} from 'react-helmet'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
const Layout = ({title="Skill Barter - Zone",
  description="A Skill Exchange Platform",
  keywords='skills,exchange,credits,Hiring',
  author='Shaiban_sufi',children}) => {
  return (
    <div>
    <Helmet>

    <meta charSet="UTF-8" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
        <title>{title}</title>

    </Helmet>
    <Header/>
    <main style={{minHeight:'70vh'}}>
      <ToastContainer/>
      {children}
      </main>
    <Footer/>
    </div>
    
  )
}

// Layout.defaultProps = {
//   title:"Skill Barter - Zone",
//   description:"A Skill Exchange Platform",
//   keywords:'skills,exchange,credits,Hiring',
//   author:'Shaiban_sufi'
// }

export default Layout