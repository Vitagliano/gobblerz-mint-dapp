/** @type {import('next').NextConfig} */
const nextConfig = {

    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "w3s.link",
                port: "",
                pathname: "/ipfs/**",
            },
        ],
    },
};

export default nextConfig;
