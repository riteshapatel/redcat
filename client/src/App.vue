<template>
  <div id="app" class="container">
    <div class="card offset-md-1 col-md-11">
      <div class="card-header">
        <h4>RedCAT Project</h4>
      </div>
      <div class="card-body">
        <div class="row">
          <div class="col">   
            <form>
                <div class="row">
                  <div class="col">
                    <input type="file" class="form-control-file" id="csvfile" ref="csvfile">
                  </div>
                  <div class="col">
                    <button type="button" class="btn btn-danger pull-left" v-on:click="loadFile"><i class="fa fa-upload"></i> Load</button>
                  </div>
                </div>
            </form>    
          </div>
          <div class="col">
            <form>
              <div class="row">
                <div class="col">
                  <input type="text" class="form-control" placeholder="Column Name" v-model="colname">
                  <br />
                </div>
              </div>
              <div class="row">
                <div class="col">
                  <input type="text" class="form-control" placeholder="Formula" v-model="formula">
                  <br />
                  <i><font style="color:#909090">** Formula must have space and valid columns from the table below. Valid operands are +-*/&</font></i>
                </div>
              </div>
              <div class="row">         
                <div class="col-md-7">
                  <br />
                  <button type="button" class="btn btn-primary" v-on:click="addColumn"><i class="fa fa-plus"></i> Add Column</button>
                </div>
                <div class="col-md-5"></div>
              </div>
            </form> 
          </div>
        </div>
      </div>
    </div>
    <br />
    <div class="row">
      <div class="col-md-4"></div>
      <div class="col-md-4">
        <products />
      </div>
    </div>
    <div class="row">
      <div class="col">
        <hr />
        <font style="color:#909090">
          I am built with Vue \\ I am running to be SLIM
          <br /><br />
          <i class="fab fa-aws text-warning"></i> I am on Amazon Cloud
        </font>
      </div>
    </div>
  </div>
</template>

<script>
import products from './components/Products';
import { isFormulaValid, calculateResults } from './processor';

export default {
  name: 'app',
  components: {
    products
  },
  methods: {
    loadFile: function () {
      let formData = new FormData();
      let files = this.$refs.csvfile.files;
      // eslint-disable-next-line
      console.log('files ', files);

      formData.append('csvfile', files[0]);
      this.$store.dispatch('loadFile', formData);
    },

    /**
     * @function 
     * add a new column
     */
    addColumn: function () {
        let gridData = this.$store.getters.products;
        
        if (this.checkFormula() && this.validColumnName()) {
            let results = calculateResults(this.formula, this.gridColumns, gridData);
            // eslint-disable-next-line
            console.log('results ', results);

            if (!isNaN(results[0])) {
              // if valid results 
              let colname = this.colname.replace(' ', '_');

              // eslint-disable-next-line
              this.$store.dispatch('setNewColumn', colname);
              this.$store.dispatch('setNewValues', {colname: colname, results: results});
            }
        } else {
          alert('Missing new column name or an invalid formula');
        }

    },

    /**
     * @function 
     * check if a new column name is valid
     */
    validColumnName: function () {
      let validName = this.colname.trim().length > 0 && 
                      !this.gridColumns.includes(this.colname.toLowerCase());
      return validName;
    },

    /**
     * @function 
     * check if formula is valid
     */
    checkFormula: function () {
        let validFormula = isFormulaValid(this.formula, this.gridColumns);

        if (!validFormula) {
          alert('Invalid formula');
          return false;
        }

        return true;
    }
  },

  computed: {
    /**
     * @property
     * retrieves grid columns from the store getter
     */
    gridColumns () {
        return this.$store.getters.columns;
    }
  },
  data () {
    return {
      colname: '',
      formula: ''
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
