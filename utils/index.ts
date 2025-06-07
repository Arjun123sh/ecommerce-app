export const getStatusColor = (status:string) => {
    switch (status) {
      case 'pending':
        return '#ffa500';
      case 'processing':
        return '#007bff';
      case 'shipped':
        return '#17a2b8';
      case 'delivered':
        return '#28a745';
      case 'cancelled':
        return '#dc3545';
      default:
        return '#6c757d';
    }
  };

 export const getStatusText = (status:string) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

export  const formatDate = (timestamp:any) => {
    if (!timestamp) return 'N/A';
    
    let date;
    if (timestamp.toDate) {
      date = timestamp.toDate();
    } else if (timestamp instanceof Date) {
      date = timestamp;
    } else {
      date = new Date(timestamp);
    }
    
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };
