'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import DashboardHeader from '@/components/DashboardHeader';

const ServicesPage = () => {
  const router = useRouter();
  const { user } = useAuth();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    fullDescription: '',
    category: '',
    price: '',
    deliveryTime: '2-4 weeks',
    features: '',
    tags: ''
  });

  useEffect(() => {
    if (user?.role !== 'admin') {
      router.push('/dashboard');
      return;
    }
    fetchServices();
  }, [user, router]);

  const fetchServices = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/services`);
      if (response.ok) {
        const data = await response.json();
        setServices(data.data || []);
      }
    } catch (error) {
      console.error('Error fetching services:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (name === 'name' && !editingService) {
      const slug = value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      setFormData(prev => ({ ...prev, slug }));
    }
  };

  const openCreateModal = () => {
    setEditingService(null);
    setFormData({
      name: '',
      slug: '',
      description: '',
      fullDescription: '',
      category: '',
      price: '',
      deliveryTime: '2-4 weeks',
      features: '',
      tags: ''
    });
    setShowModal(true);
  };

  const openEditModal = (service) => {
    setEditingService(service);
    setFormData({
      name: service.name,
      slug: service.slug,
      description: service.description,
      fullDescription: service.fullDescription || '',
      category: service.category,
      price: service.price.toString(),
      deliveryTime: service.deliveryTime || '2-4 weeks',
      features: service.features?.join(', ') || '',
      tags: service.tags?.join(', ') || ''
    });
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const serviceData = {
      ...formData,
      price: parseFloat(formData.price),
      features: formData.features.split(',').map(f => f.trim()).filter(f => f),
      tags: formData.tags.split(',').map(t => t.trim()).filter(t => t)
    };

    try {
      const token = localStorage.getItem('token');
      const url = editingService 
        ? `${process.env.NEXT_PUBLIC_API_URL}/api/services/${editingService._id}`
        : `${process.env.NEXT_PUBLIC_API_URL}/api/services`;
      
      const response = await fetch(url, {
        method: editingService ? 'PUT' : 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(serviceData)
      });
      
      if (response.ok) {
        fetchServices();
        setShowModal(false);
      } else {
        const error = await response.json();
        alert(error.message || 'Failed to save service');
      }
    } catch (error) {
      console.error('Error saving service:', error);
      alert('Failed to save service');
    }
  };

  const deleteService = async (serviceId) => {
    if (!confirm('Are you sure you want to delete this service?')) return;
    
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/services/${serviceId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        fetchServices();
      }
    } catch (error) {
      console.error('Error deleting service:', error);
    }
  };

  if (user?.role !== 'admin') {
    return null;
  }

  return (
    <>
      <DashboardHeader 
        title="SERVICES MANAGEMENT" 
        description="Add, edit, or remove services"
      >
        <button
          onClick={openCreateModal}
          className="px-4 py-2 bg-black dark:bg-white text-white dark:text-black text-xs font-bold tracking-wider hover:opacity-80 transition-opacity"
        >
          [+ ADD SERVICE]
        </button>
      </DashboardHeader>

      <div className="flex-1 overflow-y-auto p-6">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-2xl animate-pulse">[LOADING...]</div>
          </div>
        ) : services.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-xl font-bold">NO SERVICES FOUND</p>
          </div>
        ) : (
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {services.map((service) => (
              <div key={service._id} className="border border-black/20 dark:border-white/20 bg-white dark:bg-black p-6 flex flex-col">
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg font-bold">{service.name}</h3>
                    <span className="text-xs px-2 py-1 border border-black/20 dark:border-white/20">
                      {service.category}
                    </span>
                  </div>

                  <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4 line-clamp-3">
                    {service.description}
                  </p>

                  <div className="space-y-2 text-xs mb-4">
                    <p><span className="font-bold">Price:</span> ${service.price.toLocaleString()}</p>
                    <p><span className="font-bold">Delivery:</span> {service.deliveryTime}</p>
                    <p><span className="font-bold">Slug:</span> {service.slug}</p>
                  </div>

                  {service.features && service.features.length > 0 && (
                    <div className="mb-4">
                      <p className="text-xs font-bold mb-1">FEATURES:</p>
                      <div className="flex flex-wrap gap-1">
                        {service.features.slice(0, 3).map((feature, idx) => (
                          <span key={idx} className="text-xs px-2 py-1 bg-black/5 dark:bg-white/5">
                            {feature}
                          </span>
                        ))}
                        {service.features.length > 3 && (
                          <span className="text-xs px-2 py-1 bg-black/5 dark:bg-white/5">
                            +{service.features.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => openEditModal(service)}
                    className="flex-1 border border-black dark:border-white px-3 py-2 text-xs font-bold hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
                  >
                    [EDIT]
                  </button>
                  <button
                    onClick={() => deleteService(service._id)}
                    className="flex-1 border border-red-500 text-red-500 px-3 py-2 text-xs font-bold hover:bg-red-500 hover:text-white transition-colors"
                  >
                    [DELETE]
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 dark:bg-white/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-black border border-black dark:border-white w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white dark:bg-black border-b border-black/20 dark:border-white/20 p-6">
              <h2 className="text-xl font-bold tracking-wider">
                {editingService ? '[EDIT SERVICE]' : '[ADD SERVICE]'}
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold mb-2">SERVICE NAME *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full border border-black dark:border-white bg-transparent px-3 py-2 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold mb-2">SLUG *</label>
                <input
                  type="text"
                  name="slug"
                  value={formData.slug}
                  onChange={handleInputChange}
                  required
                  className="w-full border border-black dark:border-white bg-transparent px-3 py-2 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold mb-2">CATEGORY *</label>
                <input
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  required
                  placeholder="e.g., Web Development, Design, Marketing"
                  className="w-full border border-black dark:border-white bg-transparent px-3 py-2 text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold mb-2">PRICE ($) *</label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    required
                    min="0"
                    step="0.01"
                    className="w-full border border-black dark:border-white bg-transparent px-3 py-2 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold mb-2">DELIVERY TIME</label>
                  <input
                    type="text"
                    name="deliveryTime"
                    value={formData.deliveryTime}
                    onChange={handleInputChange}
                    placeholder="e.g., 2-4 weeks"
                    className="w-full border border-black dark:border-white bg-transparent px-3 py-2 text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold mb-2">SHORT DESCRIPTION *</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  rows="3"
                  className="w-full border border-black dark:border-white bg-transparent px-3 py-2 text-sm resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold mb-2">FULL DESCRIPTION</label>
                <textarea
                  name="fullDescription"
                  value={formData.fullDescription}
                  onChange={handleInputChange}
                  rows="5"
                  className="w-full border border-black dark:border-white bg-transparent px-3 py-2 text-sm resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold mb-2">FEATURES (comma-separated)</label>
                <textarea
                  name="features"
                  value={formData.features}
                  onChange={handleInputChange}
                  rows="3"
                  placeholder="Feature 1, Feature 2, Feature 3"
                  className="w-full border border-black dark:border-white bg-transparent px-3 py-2 text-sm resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold mb-2">TAGS (comma-separated)</label>
                <input
                  type="text"
                  name="tags"
                  value={formData.tags}
                  onChange={handleInputChange}
                  placeholder="tag1, tag2, tag3"
                  className="w-full border border-black dark:border-white bg-transparent px-3 py-2 text-sm"
                />
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-black dark:bg-white text-white dark:text-black px-4 py-3 text-sm font-bold tracking-wider hover:opacity-80 transition-opacity"
                >
                  [{editingService ? 'UPDATE' : 'CREATE'} SERVICE]
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

export default ServicesPage;
