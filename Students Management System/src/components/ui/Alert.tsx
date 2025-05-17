import React from 'react';
import { AlertCircle, CheckCircle, Info, XCircle } from 'lucide-react';

type AlertVariant = 'info' | 'success' | 'warning' | 'error';

interface AlertProps {
  title?: string;
  message: string;
  variant?: AlertVariant;
  onClose?: () => void;
  className?: string;
}

export const Alert: React.FC<AlertProps> = ({
  title,
  message,
  variant = 'info',
  onClose,
  className = '',
}) => {
  const getIcon = () => {
    switch (variant) {
      case 'info':
        return <Info className="h-5 w-5 text-blue-400" />;
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-400" />;
      case 'warning':
        return <AlertCircle className="h-5 w-5 text-amber-400" />;
      case 'error':
        return <XCircle className="h-5 w-5 text-red-400" />;
      default:
        return <Info className="h-5 w-5 text-blue-400" />;
    }
  };

  const getVariantClasses = (): string => {
    switch (variant) {
      case 'info':
        return 'bg-blue-50 border-blue-200 text-blue-800';
      case 'success':
        return 'bg-green-50 border-green-200 text-green-800';
      case 'warning':
        return 'bg-amber-50 border-amber-200 text-amber-800';
      case 'error':
        return 'bg-red-50 border-red-200 text-red-800';
      default:
        return 'bg-blue-50 border-blue-200 text-blue-800';
    }
  };

  return (
    <div className={`rounded-md border p-4 ${getVariantClasses()} ${className}`}>
      <div className="flex">
        <div className="flex-shrink-0">{getIcon()}</div>
        <div className="ml-3 flex-grow">
          {title && <h3 className="text-sm font-medium">{title}</h3>}
          <div className={`text-sm ${title ? 'mt-1' : ''}`}>{message}</div>
        </div>
        {onClose && (
          <div className="pl-3">
            <button
              type="button"
              onClick={onClose}
              className={`inline-flex rounded-md ${
                variant === 'info'
                  ? 'bg-blue-50 text-blue-500 hover:bg-blue-100'
                  : variant === 'success'
                  ? 'bg-green-50 text-green-500 hover:bg-green-100'
                  : variant === 'warning'
                  ? 'bg-amber-50 text-amber-500 hover:bg-amber-100'
                  : 'bg-red-50 text-red-500 hover:bg-red-100'
              }`}
            >
              <span className="sr-only">Dismiss</span>
              <XCircle className="h-5 w-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};