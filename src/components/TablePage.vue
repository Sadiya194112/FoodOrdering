<template>
  <v-main height="800">
    <v-row class="table-grid ma-0">
      <v-col :cols="7" class="ml-5">
        <v-row class="d-flex">
          <v-col
            v-for="table in tableList"
            :key="table"
            :cols="3"
          >
            <v-card  width="250" height="85" class="color" @click="reserveTable(table.id)">
              <div class="cardSize color justify-center">
                {{ table.name }} #{{ table.id }}
                <div>
                  <v-icon icon="mdi-table-furniture" size="20px"></v-icon>
                </div>
              </div>
            </v-card>

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
    }
  },
  props: {
    btn: {
      type: String,
      required: true,
    }
  },

  methods: {
    async reserveTable(tableId){
      const result = await this.$store.dispatch('menuList/reserveTable', {tableId});
      console.log(result);
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
    }
  },
};
</script>

<style scoped>

.color{
  background: rgb(15, 56, 61);
  color: white;
  border: 2px solid #077c85;
}
.color:hover{
  background: #023a53;
  color: white;
}

.cardSize{
  font-size: 15px;
  padding: 20px 30px;
  border-radius: 4px;
  text-transform: uppercase;
  transition: transform 0.
}

/* .table-button:hover {
  transform: scale(1.05);
} */

.v-layout {
  gap: 1rem;
}

.confirm{
  color: rgb(9, 53, 7)
}
</style>
