<template>
  <v-main height="800">
    <v-row class="table-grid ma-0">
      <v-col :cols="7" class="ml-5">
        <v-row >
          <v-col
            v-for="(table,index) in tableList"
            :key="'table'+index"
            :cols="3"
          >
          <div v-if="table.allocated == false">
            <v-btn
              size="x-large"
              width="270"
              height="100"
              class="color"
              >
                {{ table.name }} #{{ table.id }}
                <div>
                  <v-icon icon="mdi-table-furniture" size="20px"></v-icon>
                </div>
            </v-btn>
          </div>

          <div v-else-if="table.allocated == true && table.orderId">
            <v-btn
              size="x-large"
              width="270"
              height="100"
              class="reserved-color"
              @click="assignTable(table.id)"
              >
                {{ table.name }} #{{ table.id }}
                <div>
                  <v-icon icon="mdi-table-furniture" size="20px"></v-icon>
                </div>
              </v-btn>
            </div>

          </v-col>
        </v-row>
      </v-col>


      <SelectedMenu :isCartEmpty="isCartEmpty" :text = "'Checkout'"/>

    </v-row>
  </v-main>


</template>

<script>
import SelectedMenu from './SelectedMenu.vue';

export default {
  components: {
    SelectedMenu,
  },
  data(){
    return {
      isTableSelect: false,

    }
  },
  props: {
    btn: {
      type: String,
      required: true,
    }
  },

  methods: {
    async assignTable(tableId,index){

      const result = await this.$store.dispatch('menuList/assignTable', {tableId});
      // this.tableList[index].allocated = true
      console.log(result);
    },

    findTableId(tableId){
      return this.reservedOrders.some((table) => table.id === tableId);
    },

    showTables(tableId){
      console.log("Table Id: ", tableId);
      for(let i=0; i < this.tableList.length; i++){
        if(this.tableList[i].id == tableId){
          this.orderId = this.tableList[i].orderId;
          this.allocated = true;
        }
      }
    }
  },
  computed: {
    tableList(){
      return this.$store.getters['menuList/getTableList'];
    },
    cart(){
      return this.$store.getters['menuList/getCart'];
    },
    isCartEmpty(){
      if(this.cart.length > 0){
        return true
      }
      else return false
    },
    reservedOrders(){
      return this.$store.getters["menuList/getReservedOrders"];
    },

  },
};
</script>

<style scoped>

.color{
  background: rgb(15, 56, 61);
  color: white;
  border: 2px solid #077c85;
  cursor: pointer;
}

.reserved-color{
  background: #07e4d9;
  color: black;
}
/* .clickedColor{
  background: green;
} */
.BtnSize{
  font-size: 15px;
  border-radius: 4px;
  text-transform: uppercase;
}

.confirm{
  color: rgb(9, 53, 7)
}
</style>
