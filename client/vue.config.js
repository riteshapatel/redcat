/**
 * Webpack DevServer proxy to api
 * @author ritesh.patel
 * 
 */
module.exports = {
    devServer: {
        proxy:{
            '/api' : {
              target: 'http://127.0.0.1:8001',
              logLevel: 'debug',
              changeOrigin: true,
              pathRewrite: {
                  '/api': ''
              }
            }
          }
    }
}