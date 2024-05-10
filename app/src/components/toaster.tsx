import { Toaster } from 'react-hot-toast';

const Toast = () => {
  return (
    <Toaster
      position='top-right'
      reverseOrder={false}
      toastOptions={{
        duration: 3000,
        style: {
          background: '#FFFFFF',
          color: '#000000',
          borderRadius: '0.5rem',
        }
      }}
    />
  );
};

export default Toast;
