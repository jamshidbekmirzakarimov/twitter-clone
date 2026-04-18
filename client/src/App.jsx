import { Routes, Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './contexts/AuthContext';
import Auth from './pages/Auth';
import Layout from './components/Layout';
import Home from './pages/Home';
import Profile from './pages/Profile';
import MyPosts from './pages/MyPosts';
import MyLikes from './pages/MyLikes';

// Protected Route wrapper
const ProtectedRoute = ({ children }) => {
    const { user } = useContext(AuthContext);
    if (!user) {
        return <Navigate to="/login" replace />;
    }
    return <Layout>{children}</Layout>;
};

function App() {
  const { user } = useContext(AuthContext);

  return (
    <Routes>
      <Route path="/login" element={user ? <Navigate to="/" replace /> : <Auth />} />
      <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
      <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
      <Route path="/myposts" element={<ProtectedRoute><MyPosts /></ProtectedRoute>} />
      <Route path="/mylikes" element={<ProtectedRoute><MyLikes /></ProtectedRoute>} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
