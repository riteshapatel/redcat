<!--
@Component Grid Component
@author ritesh.patel
@description - pass grid columns and data to build the data table
-->
<template>
    <div>
        <table class="table table-striped">
            <thead>
                <tr>
                    <th v-for="(column, index) in gridColumns" :key="`col-${index}`">
                        {{column | capitalize}}
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(row, index) in gridData" :key="`data-${index}`">
                    <td v-for="(item, key, index) in row" :key="`column-${index}`">
                        {{row[key]}}
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    // export component
    export default {
        name: 'grid',
        props: {
            gridData: {
                required: true
            }, 
            gridColumns: {
                required: true
            }
        },
        // filters
        filters: {
            /**
             * custom filter 
             * @param {string} value - column value
             */
            capitalize: function (value) {
                if (!value) return ''
                value = value.toString()
                return value.charAt(0).toUpperCase() + value.slice(1)
            }
        }
    }
</script>