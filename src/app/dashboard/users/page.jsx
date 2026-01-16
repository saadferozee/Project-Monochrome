'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import DashboardHeader from '@/components/DashboardHeader';

const UsersPage = () => {
  const router = useRouter();
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'user'
  });

  useEffect(() => {
    if (user?.role !== 'admin') {
      router.push('/dashboard');
      return;
    }
    fetchUsers();
  }, [user, router]);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setUsers(data.data || []);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const openEditModal = (user) => {
    setEditingUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      role: user.role
    });
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/${editingUser._id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        fetchUsers();
        setShowModal(false);
      } else {
        const error = await response.json();
        alert(error.message || 'Failed to update user');
      }
    } catch (error) {
      console.error('Error updating user:', error);
      alert('Failed to update user');
    }
  };

  const deleteUser = async (userId) => {
    if (!confirm('Are you sure you want to delete this user? All their bookings will also be deleted.')) return;
    
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/${userId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        fetchUsers();
      } else {
        const error = await response.json();
        alert(error.message || 'Failed to delete user');
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      alert('Failed to delete user');
    }
  };

  const filteredUsers = filter === 'all' ? users : users.filter(u => u.role === filter);

  if (user?.role !== 'admin') {
    return null;
  }

  return (
    <>
      <DashboardHeader 
        title="USERS MANAGEMENT" 
        description="View and manage registered users"
      >
        <div className="flex flex-wrap gap-2">
          <button 
            onClick={() => setFilter('all')} 
            className={`px-3 py-1 text-xs font-bold tracking-wider transition-colors ${
              filter === 'all' 
                ? 'bg-black dark:bg-white text-white dark:text-black' 
                : 'border border-black/20 dark:border-white/20 hover:bg-black/10 dark:hover:bg-white/10'
            }`}
          >
            ALL ({users.length})
          </button>
          <button 
            onClick={() => setFilter('admin')} 
            className={`px-3 py-1 text-xs font-bold tracking-wider transition-colors ${
              filter === 'admin' 
                ? 'bg-black dark:bg-white text-white dark:text-black' 
                : 'border border-black/20 dark:border-white/20 hover:bg-black/10 dark:hover:bg-white/10'
            }`}
          >
            ADMINS ({users.filter(u => u.role === 'admin').length})
          </button>
          <button 
            onClick={() => setFilter('user')} 
            className={`px-3 py-1 text-xs font-bold tracking-wider transition-colors ${
              filter === 'user' 
                ? 'bg-black dark:bg-white text-white dark:text-black' 
                : 'border border-black/20 dark:border-white/20 hover:bg-black/10 dark:hover:bg-white/10'
            }`}
          >
            USERS ({users.filter(u => u.role === 'user').length})
          </button>
        </div>
      </DashboardHeader>

      <div className="flex-1 overflow-y-auto p-6">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-2xl animate-pulse">[LOADING...]</div>
          </div>
        ) : filteredUsers.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-xl font-bold">NO USERS FOUND</p>
          </div>
        ) : (
          <div className="max-w-7xl mx-auto space-y-4">
            {filteredUsers.map((userData) => (
              <div key={userData._id} className="border border-black/20 dark:border-white/20 bg-white dark:bg-black p-6">
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-lg font-bold">{userData.name}</h3>
                      <span className={`px-3 py-1 text-xs border ${
                        userData.role === 'admin' 
                          ? 'border-purple-500 text-purple-600 dark:text-purple-500 bg-purple-500/10' 
                          : 'border-blue-500 text-blue-600 dark:text-blue-500 bg-blue-500/10'
                      }`}>
                        {userData.role.toUpperCase()}
                      </span>
                      {userData._id === user.id && (
                        <span className="px-3 py-1 text-xs border border-green-500 text-green-600 dark:text-green-500 bg-green-500/10">
                          YOU
                        </span>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm mb-4">
                      <div>
                        <p className="text-zinc-500 dark:text-zinc-400">Contact</p>
                        <p className="text-xs font-mono">{userData.email}</p>
                      </div>
                      <div>
                        <p className="text-zinc-500 dark:text-zinc-400">Details</p>
                        <p className="text-xs">Bookings: {userData.bookingCount || 0}</p>
                        <p className="text-xs">Joined: {new Date(userData.createdAt).toLocaleDateString()}</p>
                      </div>
                    </div>
                  </div>

                  <div className="lg:text-right space-y-2">
                    <button
                      onClick={() => openEditModal(userData)}
                      className="w-full lg:w-auto border border-black dark:border-white px-4 py-2 text-xs font-bold hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
                    >
                      [EDIT]
                    </button>
                    
                    {userData._id !== user.id && (
                      <button
                        onClick={() => deleteUser(userData._id)}
                        className="w-full lg:w-auto border border-red-500 text-red-500 px-4 py-2 text-xs font-bold hover:bg-red-500 hover:text-white transition-colors"
                      >
                        [DELETE]
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {showModal && editingUser && (
        <div className="fixed inset-0 bg-black/50 dark:bg-white/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-black border border-black dark:border-white w-full max-w-md">
            <div className="border-b border-black/20 dark:border-white/20 p-6">
              <h2 className="text-xl font-bold tracking-wider">[EDIT USER]</h2>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold mb-2">NAME *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="w-full border border-black dark:border-white bg-transparent px-3 py-2 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold mb-2">EMAIL *</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="w-full border border-black dark:border-white bg-transparent px-3 py-2 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold mb-2">ROLE *</label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full border border-black dark:border-white bg-transparent px-3 py-2 text-sm"
                  disabled={editingUser._id === user.id}
                >
                  <option value="user">USER</option>
                  <option value="admin">ADMIN</option>
                </select>
                {editingUser._id === user.id && (
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                    You cannot change your own role
                  </p>
                )}
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-black dark:bg-white text-white dark:text-black px-4 py-3 text-sm font-bold tracking-wider hover:opacity-80 transition-opacity"
                >
                  [UPDATE USER]
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 border border-black dark:border-white px-4 py-3 text-sm font-bold tracking-wider hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
                >
                  [CANCEL]
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default UsersPage;
