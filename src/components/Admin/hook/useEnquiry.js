/* eslint-disable no-console */
import { useState, useEffect, useCallback } from 'react';
import { getEnquiryList } from '@/services/getRequests';
import { updateEnquiry } from '@/services/putReguest';
import { useToast } from '@/hooks/use-toast';

export default function useEnquiry() {
  const { toast } = useToast();
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all'); // all, pending, resolved
  
  // Modal for viewing full message
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);

  const fetchEnquiries = useCallback(async () => {
    setLoading(true);
    try {
      const response = await getEnquiryList({ pageNo: page, limit: 10 });
      if (response && response.enquiries) {
        setEnquiries(response.enquiries || []);
        setTotalPages(response.totalPages || 1);
        setTotalItems(response.total || (response.enquiries ? response.enquiries.length : 0));
      }
    } catch (error) {
      console.error('Error fetching enquiries:', error);
      toast({
        title: 'Error',
        description: 'Failed to load enquiries list.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  }, [page, toast]);

  useEffect(() => {
    fetchEnquiries();
  }, [fetchEnquiries]);

  // Handle status update
  const handleStatusChange = async (enquiryId, newStatus) => {
    try {
      await updateEnquiry(enquiryId, { status: newStatus });
      toast({
        title: 'Status Updated',
        description: `Enquiry status updated to ${newStatus}.`,
      });
      // Update local state to avoid full refetch
      setEnquiries(prev => prev.map(enq => 
        enq.id === enquiryId ? { ...enq, status: newStatus } : enq
      ));
    } catch (error) {
      console.error('Error updating enquiry status:', error);
      toast({
        title: 'Error',
        description: 'Failed to update status. Please try again.',
        variant: 'destructive',
      });
    }
  };

  // Filter enquiries client-side by status + search string
  const filteredEnquiries = enquiries.filter(enquiry => {
    // Status filter
    if (statusFilter !== 'all' && enquiry.status !== statusFilter) {
      return false;
    }
    
    // Search query filter
    const name = enquiry.name || '';
    const email = enquiry.email || '';
    const phone = enquiry.phone || '';
    const message = enquiry.message || '';
    const productName = enquiry.product?.name?.en || '';
    const productCode = enquiry.product?.baseCode || '';
    const query = search.toLowerCase();

    return name.toLowerCase().includes(query) ||
           email.toLowerCase().includes(query) ||
           phone.toLowerCase().includes(query) ||
           message.toLowerCase().includes(query) ||
           productName.toLowerCase().includes(query) ||
           productCode.toLowerCase().includes(query);
  });

  return {
    enquiries: filteredEnquiries,
    loading,
    page,
    setPage,
    totalPages,
    totalItems,
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    selectedEnquiry,
    setSelectedEnquiry,
    handleStatusChange,
    refetch: fetchEnquiries
  };
}
