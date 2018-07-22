<!--
@Component Products Component
@author ritesh.patel
@description - calls grid component with the data from store
-->
<template>
    <div>
        <h5>RedCAT Products</h5>
        <grid :gridData="gridData" :gridColumns="gridColumns" />
    </div>
</template>

<script>
    import grid from './Grid';

    // export component
    export default {
        name: 'products',
        components: {
            grid
        },
        computed: {
            /**
             * @property 
             * retrieves grid data from store getter
             */
            gridData () {
                return this.$store.getters.products;
            },

            /**
             * @property
             * retrieves grid columns from the store getter
             */
            gridColumns () {
                return this.$store.getters.columns;
            }
        }
    }
</script>