/**
 * store actions 
 * @author ritesh.patel
 */
import Api from '../services/Api';
import _ from 'lodash';

let actions = {
    loadFile: (context, payload) => {
        return Api().post('api/payload', payload)
                .then(response => response.data) 
                .then(data => {
                    if (data && data.status) {
                        if (data.status === 'failure') {
                            alert('Ooops! ' + data.error);
                        }
                    } else {
                        context.dispatch('loadProducts');    
                    }
                }).catch(error => {
                    alert('Error uploading file' + error);
                })
    },

    /**
     * @function loadProducts 
     * @param {Object} context - current context 
     * loads products from the backend
     */
    loadProducts: (context) => {
        return Api().get('api/products')
            .then(response => response.data)
            .then(data => {
                // first row is columns
                let columns = _.first(data),
                    rawProducts = _.drop(data), 
                    products = [],
                    product = {};

                for (let i = 0; i < rawProducts.length; i++) {
                    let arr = rawProducts[i];
                    product = {
                        "city": arr[0],
                        "product": arr[1],
                        "units": parseInt(arr[2]),
                        "price": parseInt(arr[3])
                    }

                    products.push(product);
                }
                context.commit('SET_COLUMNS', columns);
                context.commit('SET_PRODUCTS', products);
            })
            .catch(error => {
                // eslint-disable-next-line
                console.log('Error retrieving products');

                alert('Error retrieving products ', error);
            })
    },

    /**
     * @function 
     * sets new column 
     * @param {Object} context - current context 
     * @param {Object} payload - payload with new column name
     */
    setNewColumn: (context, payload) => {
        let columns = context.getters.columns;
        columns.push(payload);
        context.commit('SET_COLUMNS', columns);
    },

    /**
     * @function 
     * sets new product for each product row 
     * @param {Object} context - current context 
     * @param {Object} payload - current payload with column name and results
     */
    setNewValues: (context, payload) => {
        let products = context.getters.products,
            modified_products = [];

        for (let i = 0; i < products.length; i++) {
            let product = products[i];
            let result = payload.results[i];

            product[payload.colname] = result;
            modified_products.push(product);
        }

        context.commit('SET_PRODUCTS', modified_products);
    }
}

export default actions;