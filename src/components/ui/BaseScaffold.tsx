import React from 'react';
import { AppColors } from '../../theme/colors';

interface BaseScaffoldProps {
  children: React.ReactNode;
  header?: React.ReactNode;
}

export const BaseScaffold: React.FC<BaseScaffoldProps> = ({ 
  children, 
  header 
}) => {
  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: AppColors.background,
    }}>
      {header}
      <main style={{
        flex: 1,
        position: 'relative',
      }}>
        {children}
      </main>
    </div>
  );
};