import { useState, useEffect, useCallback } from 'react';
import { getAllProducts, getAllCategories, getAllSubcategories } from '@/services/getRequests';
import { createProduct } from '@/services/postRequest';
import { updateProduct } from '@/services/putReguest';
import { deleteProduct } from '@/services/deleteRequest';
import { useToast } from '@/hooks/use-toast';

export default function useProduct() {
  const { toast } = useToast();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [search, setSearch] = useState('');

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null); // null means creating
  const [formData, setFormData] = useState({
    categoryId: '',
    subcategoryId: '',
    nameEn: '',
    descriptionEn: '',
    baseCode: '',
    specs: [{ key: '', value: '' }], // Array of { key, value }
    images: [], // Selected files (as base64 or URLs)
    thumbnail: null
  });
  const [submitting, setSubmitting] = useState(false);

  // Fetch categories (for select dropdown)
  const fetchAllCategoriesList = useCallback(async () => {
    try {
      const response = await getAllCategories({ limit: 100 });
      if (response && response.data) {
        setCategories(response.data.categories || []);
      }
    } catch (error) {
      console.error('Error fetching categories for dropdown:', error);
    }
  }, []);

  // Fetch subcategories for a specific category
  const fetchSubcategoriesForCategory = useCallback(async (categoryId) => {
    if (!categoryId) {
      setSubcategories([]);
      return;
    }
    try {
      const response = await getAllSubcategories({ categoryId, limit: 100 });
      if (response && response.data) {
        setSubcategories(response.data.subcategories || []);
      }
    } catch (error) {
      console.error('Error fetching subcategories:', error);
    }
  }, []);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const response = await getAllProducts({ pageNo: page, limit: 10 });
      if (response && response.data) {
        setProducts(response.data.products || []);
        setTotalPages(response.data.totalPages || 1);
        setTotalItems(response.data.total || (response.data.products ? response.data.products.length : 0));
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      toast({
        title: 'Error',
        description: 'Failed to load products list.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  }, [page, toast]);

  useEffect(() => {
    fetchProducts();
    fetchAllCategoriesList();
  }, [fetchProducts, fetchAllCategoriesList]);

  // Fetch subcategories whenever categoryId in formData changes
  useEffect(() => {
    if (formData.categoryId) {
      fetchSubcategoriesForCategory(formData.categoryId);
    } else {
      setSubcategories([]);
    }
  }, [formData.categoryId, fetchSubcategoriesForCategory]);

  // Open modal for creating new product
  const handleCreateOpen = () => {
    setEditingProduct(null);
    setFormData({
      categoryId: '',
      subcategoryId: '',
      nameEn: '',
      descriptionEn: '',
      baseCode: '',
      specs: [{ key: '', value: '' }],
      images: [],
      thumbnail: null
    });
    setIsModalOpen(true);
  };

  // Open modal for editing existing product
  const handleEditOpen = (product) => {
    setEditingProduct(product);
    
    // Parse specs
    const specs = product.specs || {};
    const parsedSpecs = Object.entries(specs).map(([key, value]) => ({ key, value }));
    if (parsedSpecs.length === 0) parsedSpecs.push({ key: '', value: '' });

    setFormData({
      categoryId: product.categoryId ? product.categoryId.toString() : '',
      subcategoryId: product.subcategoryId ? product.subcategoryId.toString() : '',
      nameEn: product.name?.en || '',
      descriptionEn: product.description?.en || '',
      baseCode: product.baseCode || '',
      specs: parsedSpecs,
      images: product.images || [],
      thumbnail: product.thumbnail || null
    });
    setIsModalOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => {
      const newData = { ...prev, [name]: value };
      // Reset subcategory if category changes
      if (name === 'categoryId') {
        newData.subcategoryId = '';
      }
      return newData;
    });
  };

  // Spec handlers
  const addSpec = () => {
    setFormData(prev => ({
      ...prev,
      specs: [...prev.specs, { key: '', value: '' }]
    }));
  };

  const removeSpec = (index) => {
    setFormData(prev => ({
      ...prev,
      specs: prev.specs.filter((_, idx) => idx !== index)
    }));
  };

  const handleSpecChange = (index, field, value) => {
    setFormData(prev => {
      const newSpecs = [...prev.specs];
      newSpecs[index] = { ...newSpecs[index], [field]: value };
      return { ...prev, specs: newSpecs };
    });
  };

  const handleImageChange = async (e, isThumbnail = false) => {
    const files = Array.from(e.target.files);
    const base64Files = await Promise.all(files.map(file => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(file);
      });
    }));

    if (isThumbnail) {
      setFormData(prev => ({ ...prev, thumbnail: base64Files[0] }));
    } else {
      setFormData(prev => ({ ...prev, images: [...prev.images, ...base64Files] }));
    }
  };

  const removeImage = (index) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, idx) => idx !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.categoryId) {
      toast({
        title: 'Validation Error',
        description: 'Please select a category.',
        variant: 'destructive',
      });
      return;
    }
    if (!formData.nameEn.trim()) {
      toast({
        title: 'Validation Error',
        description: 'Product name is required.',
        variant: 'destructive',
      });
      return;
    }
    if (!formData.baseCode.trim()) {
      toast({
        title: 'Validation Error',
        description: 'Base code is required.',
        variant: 'destructive',
      });
      return;
    }

    setSubmitting(true);
    try {
      // Build specs object
      const finalSpecs = {};
      formData.specs.forEach(spec => {
        if (spec.key.trim() && spec.value.trim()) {
          finalSpecs[spec.key.trim()] = spec.value.trim();
        }
      });

      const payload = {
        categoryId: parseInt(formData.categoryId, 10),
        subcategoryId: formData.subcategoryId ? parseInt(formData.subcategoryId, 10) : null,
        name: { en: formData.nameEn.trim() },
        description: { en: formData.descriptionEn.trim() },
        baseCode: formData.baseCode.trim(),
        specs: finalSpecs,
        images: formData.images,
        thumbnail: formData.thumbnail
      };

      if (editingProduct) {
        // Update product
        await updateProduct(editingProduct.id, payload);
        toast({
          title: 'Success',
          description: 'Product updated successfully.',
        });
      } else {
        // Create product
        await createProduct(payload);
        toast({
          title: 'Success',
          description: 'Product created successfully.',
        });
      }
      setIsModalOpen(false);
      fetchProducts();
    } catch (error) {
      console.error('Error submitting product:', error);
      toast({
        title: 'Error',
        description: 'Failed to save product. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    try {
      await deleteProduct(id);
      toast({ title: 'Success', description: 'Product deleted successfully.' });
      fetchProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
      toast({ title: 'Error', description: 'Failed to delete product.', variant: 'destructive' });
    }
  };

  // Client side search filtering
  const filteredProducts = products.filter(product => {
    const name = product.name?.en || '';
    const description = product.description?.en || '';
    const code = product.baseCode || '';
    const categoryName = product.category?.name?.en || '';
    const subcategoryName = product.subcategory?.name?.en || '';
    return name.toLowerCase().includes(search.toLowerCase()) ||
           description.toLowerCase().includes(search.toLowerCase()) ||
           code.toLowerCase().includes(search.toLowerCase()) ||
           categoryName.toLowerCase().includes(search.toLowerCase()) ||
           subcategoryName.toLowerCase().includes(search.toLowerCase());
  });

  return {
    products: filteredProducts,
    categories,
    subcategories,
    loading,
    page,
    setPage,
    totalPages,
    totalItems,
    search,
    setSearch,
    isModalOpen,
    setIsModalOpen,
    editingProduct,
    formData,
    setFormData,
    submitting,
    handleCreateOpen,
    handleEditOpen,
    handleInputChange,
    addSpec,
    removeSpec,
    handleSpecChange,
    handleImageChange,
    removeImage,
    handleSubmit,
    handleDelete,
    refetch: fetchProducts
  };
}
