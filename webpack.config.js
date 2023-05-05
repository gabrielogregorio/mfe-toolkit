const path = require('path');
const singleSpaDefaults = require('webpack-config-single-spa-react-ts');
const { mergeWithRules } = require('webpack-merge');

module.exports = (webpackConfigEnv, argv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: 'mfe',
    projectName: 'mfe-daily-tasks',
    webpackConfigEnv,
    argv,
  });

  const config = mergeWithRules({
    module: {
      rules: {
        test: 'match',
        use: 'replace',
      },
    },
  })(defaultConfig, {
    // customize the webpack config here
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: [
            require.resolve('style-loader', {
              paths: [require.resolve('webpack-config-single-spa')],
            }),
            require.resolve('css-loader', {
              paths: [require.resolve('webpack-config-single-spa')],
            }),
            'postcss-loader',
          ],
        },
      ],
    },

    resolve: {
      alias: {
        '@services': path.resolve(__dirname, 'src/common/services'),
        '@utils': path.resolve(__dirname, 'src/common/utils'),
        '@pages': path.resolve(__dirname, 'src/pages'),
      },
      extensions: ['.tsx', '.ts', '.jsx', '.js', '.json'],
    },
  });

  return config;
};
