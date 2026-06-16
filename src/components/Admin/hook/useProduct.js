/* eslint-disable no-console */
import { useState, useEffect, useCallback } from 'react';
import { getAllProducts, getAllCategories } from '@/services/getRequests';
import { createProduct } from '@/services/postRequest';
import { updateProduct } from '@/services/putReguest';
import { useToast } from '@/hooks/use-toast';

export default function useProduct() {
  const { toast } = useToast();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
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
    nameEn: '',
    descriptionEn: '',
    baseCode: '',
    powerSpec: '',
    voltageSpec: '',
    weightSpec: '',
    customSpecs: [] // array of { key: '', value: '' }
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

  // Open modal for creating new product
  const handleCreateOpen = () => {
    setEditingProduct(null);
    setFormData({
      categoryId: categories.length > 0 ? categories[0].id.toString() : '',
      nameEn: '',
      descriptionEn: '',
      baseCode: '',
      powerSpec: '',
      voltageSpec: '',
      weightSpec: '',
      customSpecs: []
    });
    setIsModalOpen(true);
  };

  // Open modal for editing existing product
  const handleEditOpen = (product) => {
    setEditingProduct(product);
    
    // Parse specs
    const specs = product.specs || {};
    const power = specs.power || '';
    const voltage = specs.voltage || '';
    const weight = specs.weight || '';
    
    // Parse any other custom specs
    const custom = [];
    Object.keys(specs).forEach(key => {
      if (key !== 'power' && key !== 'voltage' && key !== 'weight') {
        custom.push({ key, value: specs[key] });
      }
    });

    setFormData({
      categoryId: product.categoryId ? product.categoryId.toString() : '',
      nameEn: product.name?.en || '',
      descriptionEn: product.description?.en || '',
      baseCode: product.baseCode || '',
      powerSpec: power,
      voltageSpec: voltage,
      weightSpec: weight,
      customSpecs: custom
    });
    setIsModalOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Custom spec handlers
  const addCustomSpec = () => {
    setFormData(prev => ({
      ...prev,
      customSpecs: [...prev.customSpecs, { key: '', value: '' }]
    }));
  };

  const removeCustomSpec = (index) => {
    setFormData(prev => ({
      ...prev,
      customSpecs: prev.customSpecs.filter((_, idx) => idx !== index)
    }));
  };

  const handleCustomSpecChange = (index, field, value) => {
    setFormData(prev => {
      const newSpecs = [...prev.customSpecs];
      newSpecs[index] = { ...newSpecs[index], [field]: value };
      return { ...prev, customSpecs: newSpecs };
    });
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
      const specs = {};
      if (formData.powerSpec.trim()) specs.power = formData.powerSpec.trim();
      if (formData.voltageSpec.trim()) specs.voltage = formData.voltageSpec.trim();
      if (formData.weightSpec.trim()) specs.weight = formData.weightSpec.trim();
      
      formData.customSpecs.forEach(spec => {
        if (spec.key.trim() && spec.value.trim()) {
          specs[spec.key.trim()] = spec.value.trim();
        }
      });

      const payload = {
        categoryId: parseInt(formData.categoryId, 10),
        name: {
          en: formData.nameEn.trim()
        },
        description: {
          en: formData.descriptionEn.trim()
        },
        baseCode: formData.baseCode.trim(),
        specs: specs
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

  // Client side search filtering
  const filteredProducts = products.filter(product => {
    const name = product.name?.en || '';
    const description = product.description?.en || '';
    const code = product.baseCode || '';
    const categoryName = product.category?.name?.en || '';
    return name.toLowerCase().includes(search.toLowerCase()) ||
           description.toLowerCase().includes(search.toLowerCase()) ||
           code.toLowerCase().includes(search.toLowerCase()) ||
           categoryName.toLowerCase().includes(search.toLowerCase());
  });

  return {
    products: filteredProducts,
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
    editingProduct,
    formData,
    setFormData,
    submitting,
    handleCreateOpen,
    handleEditOpen,
    handleInputChange,
    addCustomSpec,
    removeCustomSpec,
    handleCustomSpecChange,
    handleSubmit,
    refetch: fetchProducts
  };
}
