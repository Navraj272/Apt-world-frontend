/* eslint-disable no-console */
import { useState, useEffect, useCallback } from 'react';
import { getAllSubcategories, getAllCategories } from '@/services/getRequests';
import { createSubcategory } from '@/services/postRequest';
import { updateSubcategory } from '@/services/putReguest';
import { deleteSubcategory } from '@/services/deleteRequest';
import { useToast } from '@/hooks/use-toast';

export default function useSubcategory() {
  const { toast } = useToast();
  const [subcategories, setSubcategories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [search, setSearch] = useState('');

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSubcategory, setEditingSubcategory] = useState(null);
  const [formData, setFormData] = useState({ categoryId: '', nameEn: '', descriptionEn: '' });
  const [submitting, setSubmitting] = useState(false);

  const fetchCategories = useCallback(async () => {
    try {
      const response = await getAllCategories({ limit: 100 });
      if (response && response.categories) {
        setCategories(response.categories || []);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  }, []);

  const fetchSubcategories = useCallback(async () => {
    setLoading(true);
    try {
      const params = { pageNo: page, limit: 10 };
      if (search.trim()) params.search = search.trim();
      const response = await getAllSubcategories(params);
      if (response && response.subcategories) {
        setSubcategories(response.subcategories || []);
        setTotalPages(response.totalPages || 1);
        setTotalItems(response.total || response.subcategories?.length || 0);
      }
    } catch (error) {
      console.error('Error fetching subcategories:', error);
      toast({
        title: 'Error',
        description: 'Failed to load subcategories list.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  }, [page, search, toast]);

  useEffect(() => {
    fetchSubcategories();
    fetchCategories();
  }, [fetchSubcategories, fetchCategories]);

  useEffect(() => {
    setPage(1);
  }, [search]);

  const handleCreateOpen = () => {
    setEditingSubcategory(null);
    setFormData({
      categoryId: categories.length > 0 ? categories[0].id.toString() : '',
      nameEn: '',
      descriptionEn: ''
    });
    setIsModalOpen(true);
  };

  const handleEditOpen = (sub) => {
    setEditingSubcategory(sub);
    setFormData({
      categoryId: sub.categoryId ? sub.categoryId.toString() : '',
      nameEn: sub.name?.en || '',
      descriptionEn: sub.description?.en || '',
    });
    setIsModalOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.categoryId) {
      toast({ title: 'Validation Error', description: 'Category is required.', variant: 'destructive' });
      return;
    }
    if (!formData.nameEn.trim()) {
      toast({ title: 'Validation Error', description: 'Subcategory name is required.', variant: 'destructive' });
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        categoryId: parseInt(formData.categoryId, 10),
        name: { en: formData.nameEn.trim() },
        description: { en: formData.descriptionEn.trim() },
      };

      if (editingSubcategory) {
        await updateSubcategory(editingSubcategory.id, payload);
        toast({ title: 'Success', description: 'Subcategory updated successfully.' });
      } else {
        await createSubcategory(payload);
        toast({ title: 'Success', description: 'Subcategory created successfully.' });
      }
      setIsModalOpen(false);
      fetchSubcategories();
    } catch (error) {
      console.error('Error submitting subcategory:', error);
      toast({ title: 'Error', description: 'Failed to save subcategory.', variant: 'destructive' });
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this subcategory?')) return;
    try {
      await deleteSubcategory(id);
      toast({ title: 'Success', description: 'Subcategory deleted successfully.' });
      fetchSubcategories();
    } catch (error) {
      console.error('Error deleting subcategory:', error);
      toast({ title: 'Error', description: 'Failed to delete subcategory.', variant: 'destructive' });
    }
  };

  return {
    subcategories,
    categories,
    loading,
    page,
    setPage,
    totalPages,
    totalItems,
    search,
    setSearch,
    isModalOpen,
    setIsModalOpen,
    editingSubcategory,
    formData,
    submitting,
    handleCreateOpen,
    handleEditOpen,
    handleInputChange,
    handleSubmit,
    handleDelete,
    refetch: fetchSubcategories,
  };
}
