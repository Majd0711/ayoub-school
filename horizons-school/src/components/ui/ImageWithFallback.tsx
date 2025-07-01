import React, { useState } from 'react';

interface ImageWithFallbackProps {
  src?: string;
  alt: string;
  fallbackIcon?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  [key: string]: any;
}

const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  alt,
  fallbackIcon = <i className='bx bx-image-alt'></i>,
  className = '',
  style = {},
  ...props
}) => {
  const [error, setError] = useState(false);
  
  // If no src or error occurred, show fallback
  if (!src || error) {
    return <div className={`d-flex align-items-center justify-content-center ${className}`} style={style}>
      {fallbackIcon}
    </div>;
  }
  
  // Determine the correct source path
  const imageSrc = src.startsWith('http') || src.startsWith('data:') 
    ? src 
    : `${process.env.PUBLIC_URL}${src.startsWith('/') ? '' : '/'}${src}`;
  
  return (
    <img 
      src={imageSrc}
      alt={alt}
      onError={() => setError(true)}
      className={className}
      style={{ ...style, objectFit: 'contain' }}
      {...props}
    />
  );
};

export default ImageWithFallback;
