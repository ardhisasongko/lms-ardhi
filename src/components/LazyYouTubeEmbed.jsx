import { useState, useEffect, useRef } from 'react';

/**
 * Lazy YouTube Embed Component
 * Only loads iframe when user scrolls to it (Intersection Observer)
 * Saves ~500KB on initial page load
 */
const LazyYouTubeEmbed = ({ videoId, title, startTime = 0 }) => {
    const [loadIframe, setLoadIframe] = useState(false);
    const containerRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setLoadIframe(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.1, rootMargin: '50px' }
        );

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => observer.disconnect();
    }, []);

    const embedUrl = `https://www.youtube.com/embed/${videoId}${startTime ? `?start=${startTime}` : ''}`;
    const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

    return (
        <div
            ref={containerRef}
            className="relative w-full pt-[56.25%] rounded-lg overflow-hidden bg-gray-100"
        >
            {loadIframe ? (
                <iframe
                    src={embedUrl}
                    title={title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute top-0 left-0 w-full h-full rounded-lg shadow-lg"
                    loading="lazy"
                />
            ) : (
                <div
                    className="absolute top-0 left-0 w-full h-full cursor-pointer group"
                    onClick={() => setLoadIframe(true)}
                >
                    <img
                        src={thumbnailUrl}
                        alt={title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center group-hover:bg-opacity-40 transition-all">
                        <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                            <svg
                                className="w-10 h-10 text-white ml-1"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path d="M8 5v14l11-7z" />
                            </svg>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LazyYouTubeEmbed;
