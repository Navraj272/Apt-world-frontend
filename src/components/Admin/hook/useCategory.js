/* eslint-disable no-console */
import { useState, useEffect, useCallback } from 'react';
import { getAllCategories } from '@/services/getRequests';
import { createCategory } from '@/services/postRequest';
import { updateCategory } from '@/services/putReguest';
import { deleteCategory } from '@/services/deleteRequest';
import { useToast } from '@/hooks/use-toast';

export default function useCategory() {
  const { toast } = useToast();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [search, setSearch] = useState('');

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null); // null means creating
  const [formData, setFormData] = useState({ nameEn: '', descriptionEn: '' });
  const [submitting, setSubmitting] = useState(false);

  const fetchCategories = useCallback(async () => {
    setLoading(true);
    try {
      const response = await getAllCategories({ pageNo: page, limit: 10 });
      if (response && response.categories) {
        setCategories(response.categories || []);
        setTotalPages(response.totalPages || 1);
        setTotalItems(
          response.total ||
            (response.categories ? response.categories.length : 0)
        );
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
      toast({
        title: 'Error',
        description: 'Failed to load categories list.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  }, [page, toast]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const handleCreateOpen = () => {
    setEditingCategory(null);
    setFormData({ nameEn: '', descriptionEn: '' });
    setIsModalOpen(true);
  };

  const handleEditOpen = (category) => {
    setEditingCategory(category);
    setFormData({
      nameEn: category.name?.en || '',
      descriptionEn: category.description?.en || '',
    });
    setIsModalOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.nameEn.trim()) {
      toast({
        title: 'Validation Error',
        description: 'Category name is required.',
        variant: 'destructive',
      });
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        name: {
          en: formData.nameEn.trim(),
        },
        description: {
          en: formData.descriptionEn.trim(),
        },
      };

      if (editingCategory) {
        await updateCategory(editingCategory.id, payload);
        toast({
          title: 'Success',
          description: 'Category updated successfully.',
        });
      } else {
        await createCategory(payload);
        toast({
          title: 'Success',
          description: 'Category created successfully.',
        });
      }
      setIsModalOpen(false);
      fetchCategories();
    } catch (error) {
      console.error('Error submitting category:', error);
      toast({
        title: 'Error',
        description: 'Failed to save category. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this category? This will also delete all subcategories and products associated with it.')) return;
    try {
      await deleteCategory(id);
      toast({ title: 'Success', description: 'Category deleted successfully.' });
      fetchCategories();
    } catch (error) {
      console.error('Error deleting category:', error);
      toast({ title: 'Error', description: 'Failed to delete category.', variant: 'destructive' });
    }
  };

  const filteredCategories = categories.filter((category) => {
    const name = category.name?.en || '';
    const description = category.description?.en || '';
    const slug = category.slug || '';
    return (
      name.toLowerCase().includes(search.toLowerCase()) ||
      description.toLowerCase().includes(search.toLowerCase()) ||
      slug.toLowerCase().includes(search.toLowerCase())
    );
  });

  return {
    categories: filteredCategories,
    loading,
    page,
    setPage,
    totalPages,
    totalItems,
    search,
    setSearch,
    isModalOpen,
    setIsModalOpen,
    editingCategory,
    formData,
    setFormData,
    submitting,
    handleCreateOpen,
    handleEditOpen,
    handleInputChange,
    handleSubmit,
    handleDelete,
    refetch: fetchCategories,
  };
}
