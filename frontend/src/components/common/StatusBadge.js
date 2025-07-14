import React from 'react';
import clsx from 'clsx';

const StatusBadge = ({ status, size = 'medium' }) => {
  const getStatusClass = (status) => {
    switch (status?.toLowerCase()) {
      case 'pending':
      case 'scheduled':
        return 'status-pending';
      case 'in-progress':
      case 'in_progress':
      case 'started':
        return 'status-in-progress';
      case 'completed':
      case 'finished':
        return 'status-completed';
      case 'cancelled':
      case 'canceled':
        return 'status-cancelled';
      default:
        return 'status-pending';
    }
  };

  const sizeClasses = {
    small: 'px-2 py-0.5 text-xs',
    medium: 'px-2.5 py-0.5 text-xs',
    large: 'px-3 py-1 text-sm'
  };

  return (
    <span className={clsx(
      getStatusClass(status),
      sizeClasses[size],
      'inline-flex items-center font-medium rounded-full'
    )}>
      {status?.replace('_', ' ') || 'Unknown'}
    </span>
  );
};

export default StatusBadge;