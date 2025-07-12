//src/components/ErrorMessage.tsx
'use client';

import React from 'react';

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <div className='flex h-screen items-center justify-center'>
      <p className='text-2xl text-red-500'>{message}</p>
    </div>
  );
};

export default ErrorMessage;
