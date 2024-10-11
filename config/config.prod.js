// https://umijs.org/config/
import { defineConfig } from 'umi';
export default defineConfig({
  plugins: [
    // https://github.com/zthxxx/react-dev-inspector
    // 'react-dev-inspector/plugins/umi/react-inspector',
  ],
  // https://github.com/zthxxx/react-dev-inspector#inspector-loader-props
  // inspectorConfig: {
  //   exclude: [],
  //   babelPlugins: [],
  //   babelOptions: {},
  // },
  define: {
    UMI_APP_BASE_URL: 'LANGO_BASE_URL' || "none",
    UMI_APP_WEBSOCKET_URL: 'LANGO_WEBSOCKET_URL' || "none"
  }
})

