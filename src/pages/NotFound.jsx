import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 text-center">
                <div>
                    <h1 className="text-9xl font-extrabold text-primary-600">404</h1>
                    <h2 className="mt-6 text-3xl font-bold text-gray-900">
                        Halaman tidak ditemukan
                    </h2>
                    <p className="mt-2 text-sm text-gray-600">
                        Maaf, halaman yang Anda cari tidak ada atau telah dipindahkan.
                    </p>
                </div>
                <div className="mt-8">
                    <Link
                        to="/"
                        className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors duration-200"
                    >
                        Kembali ke Beranda
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default NotFound;
