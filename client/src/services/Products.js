import Api from '@/services/Api';

export default {
    getProducts () {
        return Api().get('api/products')
    }
}