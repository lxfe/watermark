import path from 'path';
import { fileURLToPath } from 'url';

export default {
    mode:"production",
    entry: './src/index.ts',
    output: {
        path: path.resolve(path.dirname(fileURLToPath(import.meta.url)), 'dist'),
        filename: 'index.js',
        libraryTarget:"umd",
        library:"Watermark",
        globalObject: "this",
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    module: {
        rules: [
            {
                test: /\.(ts|js)$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-typescript','@babel/preset-env']
                    }
                },
                exclude: /node_modules/
            }
        ],
    }
};