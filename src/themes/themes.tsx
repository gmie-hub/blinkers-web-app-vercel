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
          },
          Tabs: {
            itemColor: '#707070',
            itemActiveColor: '#28a745',
            itemSelectedColor: '#28a745',
            inkBarColor: '#28a745',
            itemHoverColor: '#28a745',
            titleFontSize: 16,
            
          },
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
};
