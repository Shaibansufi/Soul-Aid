import { Routes, Route } from 'react-router-dom';
import HomePage from "./pages/HomePage";
import PageNotFound from './pages/PageNotFound.js';
import Policy from './pages/Policy';
import Contact from './pages/Contact';
import About from './pages/About';
import Register from './pages/auth/Register.js';
import Login from './pages/auth/Login.js';
import Dashboard from './user/Dashboard.js';
import PrivateRoute from './components/Layout/routes/Private.js';
import ForgotPassword from './pages/auth/ForgotPassword.js';
import AdminRoute from './components/Layout/routes/AdminRoute.js';
import AdminDashboard from './pages/Admin/AdminDashboard.js';
import CreateStream from './pages/Admin/CreateStream.js';
import CreatePost from './pages/Admin/CreatePost.js';
import Users from './pages/Admin/Users';
import Posts from './user/Posts.js';
import Profile from './user/Profile.js';
import Ai from '../src/pages/Ai.js';
import MyPage from './pages/Bart.js';
import Internship from './pages/Internship.js';
import Freelancers from './pages/Freelancers.js';
import Transactions from './pages/Transactions.js';
import Reports from './pages/Reports.js';
import Projects from './pages/Projects.js';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="user" element={<Dashboard />} />
          <Route path="user/posts" element={<Posts />} />
          <Route path="user/profile" element={<Profile />} />
          <Route path="user/transactions" element={<Transactions />} />
          <Route path="user/reports" element={<Reports />} />
        </Route>
        <Route path="/dashboard" element={<AdminRoute />}>
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/create-stream" element={<CreateStream />} />
          <Route path="admin/create-post" element={<CreatePost />} />
          <Route path="admin/users" element={<Users />} />
          <Route path="admin/reports" element={<Reports />} />
        </Route>
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/login" element={<Login />} />
        <Route path='/about-us' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/bart' element={<MyPage />} />
        <Route path='*' element={<PageNotFound />} />
        <Route path='/policy' element={<Policy />} />
        <Route path="/ask-ai-for-help" element={<Ai />} />
        <Route path="/internships" element={<Internship />} />
        <Route path="/freelancers" element={<Freelancers />} />
        <Route path="/projects" element={<Projects />} />
      </Routes>
    </>
  );
}

export default App;
