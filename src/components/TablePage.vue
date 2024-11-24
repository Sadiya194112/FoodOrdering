<template>
    <v-main>
      <div class="outer">
      <v-row class="table-grid">
        <v-col :cols="7" class="mx-10">
          <v-row class="d-flex">
            <v-col
              v-for="table in tableList"
              :key="table"
              :cols="3"
            >
              <v-card width="250" height="85" @click="reserveTable(table.id)">
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


        <div v-if="btn === 'Confirm Order'">
          <SelectedMenu :text = "'Checkout'"/>
        </div>
        <div v-else>
          <SelectedMenu :text = "'Order'"/>
        </div>


        </v-row>
      </div>
    </v-main>
</template>

<script>
import SelectedMenu from './SelectedMenu.vue';

export default {
  components: {
    SelectedMenu,
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
    reservedOrders(){
      return this.$store.getters["menuList/getReservedOrders"];
    }
  },
};
</script>

<style scoped>
.outer {
  margin: 10px;
  height: 800px;

}
.cardSize{
  font-size: 15px;
  padding: 20px 30px;
  border-radius: 4px;
  text-transform: uppercase;
  transition: transform 0.
}

.table-button:hover {
  transform: scale(1.05);
}

.v-layout {
  gap: 1rem;
}
.color{
  background: rgb(37, 34, 34);
  color: white;
}
.confirm{
  color: rgb(9, 53, 7)
}
</style>
