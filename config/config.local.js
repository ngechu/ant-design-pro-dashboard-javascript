// https://umijs.org/config/
import { defineConfig } from 'umi';
export default defineConfig({
  plugins: [
    // https://github.com/zthxxx/react-dev-inspector
    'react-dev-inspector/plugins/umi/react-inspector',
  ],
  // https://github.com/zthxxx/react-dev-inspector#inspector-loader-props
  // inspectorConfig: {
  //   exclude: [],
  //   babelPlugins: [],
  //   babelOptions: {},
  // },
  define: {
    'process.env.UMI_APP_BASE_URL': 'MY_APP_BASE_URL' || "none",
    'process.env.UMI_APP_WEBSOCKET_URL': 'MY_APP_WEBSOCKET_URL' || "none"
  }
})

