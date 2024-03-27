/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [{
			hostname: "i.imgur.com"
		}, {
			hostname: "i.ytimg.com"
		}, {
			hostname: "kajabi-storefronts-production.kajabi-cdn.com"
		},
		{
			hostname: "t3.ftcdn.net"
		}]
	}
};

export default nextConfig;
