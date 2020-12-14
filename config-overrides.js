const { override, fixBabelImports, addLessLoader } = require('customize-cra');

module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true
  }),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: {
      '@primary-color': '#00bbd8',
      '@secondary-color': '#2370B8',
      '@layout-sider-background': '#e6efee',
      '@layout-header-background': '#37474f',
      '@layout-header-color': '#fff',
      '@layout-body-background': '#f7f7f7',
      '@form-item-label-font-size': '17px',
      '@page-header-back-color': '#fff',
      '@font-family': `Lato, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial,
        'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol',
        'Noto Color Emoji'`
    }
  })
);
