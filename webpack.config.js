const path = require('path');
const singleSpaDefaults = require('webpack-config-single-spa-react-ts');
const { mergeWithRules } = require('webpack-merge');

const ruleProcessTailwindStyles = {
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
};

const ruleProcessMusicFiles = {
  test: /\.(mp3|wav|ogg)$/,
  use: 'file-loader',
};

module.exports = (webpackConfigEnv, argv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: 'mfe',
    projectName: 'toolkit',
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
    module: {
      rules: [ruleProcessMusicFiles, ruleProcessTailwindStyles],
    },
    resolve: {
      alias: {
        '@/services': path.resolve(__dirname, 'src/common/services'),
        '@utils': path.resolve(__dirname, 'src/common/utils'),

        '@/common': path.resolve(__dirname, 'src/common'),

        '@/tasks': path.resolve(__dirname, 'src/pages/tasks'),
        '@/financing': path.resolve(__dirname, 'src/pages/financing'),
        '@/uxGuide': path.resolve(__dirname, 'src/pages/uxGuide'),
      },
      extensions: ['.tsx', '.ts', '.jsx', '.js', '.json'],
    },
  });

  return config;
};
