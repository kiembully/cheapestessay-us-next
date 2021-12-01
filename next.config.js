// const optimizedImages = require('next-optimized-images');
const withPlugins = require('next-compose-plugins');
const withImages = require('next-images');
const withFonts = require('next-fonts');

module.exports = withPlugins([
  withImages, [withFonts]
], {
  trailingSlash: false,
  basePath: '',
  env: {
    basePath: '',
    defaultMeta: {
      title: "Cheapest Essay Writing Service by Professional Essay Writer",
      description: "Cheapest essay writing service: Hire professional essay writers &amp; get your 100 % plagiarism-free paper delivered on time. Avail of 15% discount on first order.",
      keywords: "cheapest essay writing service, essay service, essay writing service, professional essay writers, essay writers"
    },
    hostBaseUrl: 'https://multi-site-ssr.web.app'
    // hostBaseUrl: 'http://localhost:3000'
  },
  defaultLocale: 'en',
  // assetPrefix: "/uk",
  webpack: (config, { dev }) => {
    config.module.rules.push(
      {
        test: /\.(css|scss)/,
        loader: 'emit-file-loader',
        options: {
          name: 'dist/[path][name].[ext]'
        }
      },  
      {
        test: /\.css$/,
        loader: 'babel-loader!raw-loader'
      },
      {
        test: /\.scss$/,
        loader: 'babel-loader!raw-loader!sass-loader'
      }
    )
    return config
  }
})