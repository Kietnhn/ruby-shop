/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ["res.cloudinary.com"],
    },
    async redirects() {
        return [
            {
                source: "/",
                destination: "/shop",
                permanent: true,
            },
        ];
    },
};

export default nextConfig;
