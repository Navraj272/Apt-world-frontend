/* eslint-disable no-console */
import { useState, useEffect, useCallback } from 'react';
import { getAllFranchiseLocations } from '@/services/getRequests';
import { createFranchiseLocation } from '@/services/postRequest';
import { updateFranchiseLocation } from '@/services/putReguest';
import { deleteFranchiseLocation } from '@/services/deleteRequest';
import { useToast } from '@/hooks/use-toast';

const EMPTY_FORM = {
  state: '',
  city: '',
  address: '',
  contactName: '',
  email: '',
  phone: '',
  isActive: true,
};

export default function useFranchiseLocation() {
  const { toast } = useToast();
  const [franchiseLocations, setFranchiseLocations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [search, setSearch] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingFranchiseLocation, setEditingFranchiseLocation] = useState(null);
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [submitting, setSubmitting] = useState(false);

  const fetchFranchiseLocations = useCallback(async () => {
    setLoading(true);
    try {
      const response = await getAllFranchiseLocations({ pageNo: page, limit: 10 });
      if (response && response.franchiseLocations) {
        setFranchiseLocations(response.franchiseLocations || []);
        setTotalPages(response.totalPages || 1);
        setTotalItems(response.total || response.franchiseLocations.length);
      }
    } catch (error) {
      console.error('Error fetching franchise locations:', error);
      toast({
        title: 'Error',
        description: 'Failed to load franchise locations list.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  }, [page, toast]);

  useEffect(() => {
    fetchFranchiseLocations();
  }, [fetchFranchiseLocations]);

  const handleCreateOpen = () => {
    setEditingFranchiseLocation(null);
    setFormData(EMPTY_FORM);
    setIsModalOpen(true);
  };

  const handleEditOpen = (franchiseLocation) => {
    setEditingFranchiseLocation(franchiseLocation);
    setFormData({
      state: franchiseLocation.state || '',
      city: franchiseLocation.city || '',
      address: franchiseLocation.address || '',
      contactName: franchiseLocation.contactName || '',
      email: franchiseLocation.email || '',
      phone: franchiseLocation.phone || '',
      isActive: franchiseLocation.isActive !== false,
    });
    setIsModalOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.state || !formData.city.trim() || !formData.address.trim() || !formData.email.trim() || !formData.phone.trim()) {
      toast({
        title: 'Validation Error',
        description: 'State, city, address, email and phone are required.',
        variant: 'destructive',
      });
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        state: formData.state,
        city: formData.city.trim(),
        address: formData.address.trim(),
        contactName: formData.contactName.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        isActive: formData.isActive,
      };

      if (editingFranchiseLocation) {
        await updateFranchiseLocation(editingFranchiseLocation.id, payload);
        toast({ title: 'Success', description: 'Franchise location updated successfully.' });
      } else {
        await createFranchiseLocation(payload);
        toast({ title: 'Success', description: 'Franchise location created successfully.' });
      }
      setIsModalOpen(false);
      fetchFranchiseLocations();
    } catch (error) {
      console.error('Error submitting franchise location:', error);
      toast({
        title: 'Error',
        description: 'Failed to save franchise location. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this franchise location?')) return;
    try {
      await deleteFranchiseLocation(id);
      toast({ title: 'Success', description: 'Franchise location deleted successfully.' });
      fetchFranchiseLocations();
    } catch (error) {
      console.error('Error deleting franchise location:', error);
      toast({ title: 'Error', description: 'Failed to delete franchise location.', variant: 'destructive' });
    }
  };

  const filteredFranchiseLocations = franchiseLocations.filter((f) => {
    const haystack = `${f.state} ${f.city} ${f.address} ${f.email} ${f.phone}`.toLowerCase();
    return haystack.includes(search.toLowerCase());
  });

  return {
    franchiseLocations: filteredFranchiseLocations,
    loading,
    page,
    setPage,
    totalPages,
    totalItems,
    search,
    setSearch,
    isModalOpen,
    setIsModalOpen,
    editingFranchiseLocation,
    formData,
    submitting,
    handleCreateOpen,
    handleEditOpen,
    handleInputChange,
    handleSubmit,
    handleDelete,
    refetch: fetchFranchiseLocations,
  };
}
