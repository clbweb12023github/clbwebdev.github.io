const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const mode = process.env.NODE_ENV === "production" ? "production" : "development";

module.exports = {
    mode: mode, // Set the mode to 'production'
    entry: {
        'bundle': './src/assets/app.js', // Your main entry point (using Tailwind CSS)
        'bootstrap': './src/assets/bootstrap/app-bootstrap.js', // New entry point for bootstrap js
        'pokeapi-js-wrapper': './src/assets/pokedex/pokedex.js', // New entry point for pokeapi-js-wrapper
    }, 
    output: {
        filename: '[name].js', // Use the entry point name as the output filename
        path: path.resolve(__dirname, 'dist'), // Output directory for the bundled files
    },
    module: {
        rules: [
            // Add rules for processing font files (e.g., Font Awesome)
            {
                test: /\.(woff(2)?|eot|ttf|otf|svg)$/,
                type: 'asset/resource', // Copy font files to output directory
                generator: {
                    filename: 'fonts/[name][ext]', // Place font files in a 'fonts' subdirectory
                },
            },
            {
                test: /\.(scss)$/,
                use: [ 
                    MiniCssExtractPlugin.loader, // Extracts CSS for each JS file that includes CSS
                    'css-loader', // Interprets `@import` and `url()` like `import/require()` and will resolve them
                    {
                        // Loader for webpack to process CSS with PostCSS
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: () => [
                                    autoprefixer
                                ]
                            }
                        }
                    },
                    {
                        // Loads a SASS/SCSS file and compiles it to CSS
                        loader: 'sass-loader'
                    }
                ]
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader, // Extract CSS into separate file
                    'css-loader',
                    'postcss-loader',
                ],
            },
        ],
    },
    devServer: {
        static: {
            directory: path.join(__dirname, '/'),
        },
        compress: true,
        port: 3000,
    },
    plugins: [
        // Main CSS output (Tailwind)
        new MiniCssExtractPlugin({  
            filename: '[name].css', // Use a different filename pattern for CSS
            chunkFilename: 'css/[id].[contenthash].css', // Use a custom chunkFilename for CSS files
        }),
    ],
    optimization: {
        minimizer: [
            new CssMinimizerPlugin(),
        ],
    },
};
