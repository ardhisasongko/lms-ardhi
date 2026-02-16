import { Toaster } from 'react-hot-toast';

const ToastProvider = () => {
    return (
        <Toaster
            position="top-center"
            reverseOrder={false}
            gutter={8}
            containerClassName=""
            containerStyle={{}}
            toastOptions={{
                // Define default options
                className: '',
                duration: 4000,
                style: {
                    background: '#363636',
                    color: '#fff',
                },
                // Default options for specific types
                success: {
                    duration: 3000,
                    theme: {
                        primary: '#4aed88',
                        secondary: 'black',
                    },
                    style: {
                        background: '#10B981', // green-500
                    },
                },
                error: {
                    duration: 5000,
                    style: {
                        background: '#EF4444', // red-500
                    },
                },
            }}
        />
    );
};

export default ToastProvider;
