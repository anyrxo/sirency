/** @type {import('next').NextConfig} */
const nextConfig = {
    // Ensure static files are served correctly
    // No special config needed for basic public folder serving
    typescript: {
        ignoreBuildErrors: true,
    },
    eslint: {
        ignoreDuringBuilds: true,
    }
}

module.exports = nextConfig

