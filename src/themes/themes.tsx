import { ConfigProvider } from 'antd';
import { FC, PropsWithChildren } from 'react';

export const Theme: FC<PropsWithChildren> = ({ children }) => {
  return (
    <ConfigProvider
      theme={{
        components: {        
          Switch: {
            colorPrimary: 'var(--color-green-text)',
            colorPrimaryHover: 'var(--color-main-primary)'
          }, 
          Spin: {
            colorPrimary: 'var(--color-green-text)',
          }
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
};
