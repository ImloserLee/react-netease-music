const {
    override,
    fixBabelImports,
    addWebpackAlias,
    adjustStyleLoaders,
    addPostcssPlugins
} = require('customize-cra');
const path = require('path');

module.exports = override(
    addWebpackAlias({
        components: path.resolve(__dirname, 'src/components'),
        views: path.resolve(__dirname, 'src/views'),
        utils: path.resolve(__dirname, 'src/utils'),
        style: path.resolve(__dirname, 'src/style'),
        api: path.resolve(__dirname, 'src/api'),
        store: path.resolve(__dirname, 'src/store'),
        img: path.resolve(__dirname, 'src/img'),
        router: path.resolve(__dirname, 'src/router')
    }),
    fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: 'css'
    }),
    adjustStyleLoaders(rule => {
        if (rule.test.toString().includes('scss')) {
            rule.use.push({
                loader: require.resolve('sass-resources-loader'),
                options: {
                    resources: [
                        './src/style/variables.scss',
                        './src/style/mixin.scss',
                        './src/style/ant-overwrite.scss'
                    ]
                }
            });
        }
    }),
    addPostcssPlugins([
        require('postcss-pxtorem')({
            rootValue: 14,
            propList: ['*']
        })
    ])
);
