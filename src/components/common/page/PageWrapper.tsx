import React from 'react';

type PageWrapperProps = {
  children: React.ReactNode;
  className?: string;
};

const PageWrapperCustom: React.FC<PageWrapperProps> = ({ children, className }) => {
  return (
    <div className={`bg-light ${className ?? ''} w-screen h-screen px-8`}>
      <main className="w-full h-full pt-4">{children}</main>
    </div>
  );
};

export default PageWrapperCustom;
