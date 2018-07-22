let mutations = {
    /**
     * sets retrieved products from the backend
     * @param {Object} state - application state 
     * @param {Array} products - products array
     */
    SET_PRODUCTS: (state, products) => {
        state.products = products;
    },

    SET_COLUMNS: (state, columns) => {
        state.columns = columns;
    }
}

export default mutations;