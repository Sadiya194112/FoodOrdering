<template>
  <v-row class="table-grid">
      <v-col :cols="7">
        <v-row class="d-flex ml-5">
          <v-col
            v-for="(item, index) in menuItems" :key="index"
            :cols="4"
          >
          <v-card width="300" @click="addToCart(item)">
            <div class="image">
              <v-img :src="item.image"></v-img>
            </div>
            <v-card-item>
              <v-card-title>
                <div class="d-flex justify-space-between">
                  <h4> {{item.name}}</h4>
                  <span>{{ item.price }}</span>
                </div>
              </v-card-title>
              <v-card-subtitle>
                {{item.type}}
                <v-icon color="red">{{item.icon}}</v-icon>
              </v-card-subtitle>
              <div class="d-flex align-center">
                <v-rating
                :model-value="4.5"
                half-increments
                color="amber"
                density="compact"
                >
                </v-rating>
                <span class="text-grey ml-3">{{ item.rating }}({{ item.reviews }})</span>
              </div>
            </v-card-item>
          </v-card>

        </v-col>
      </v-row>
    </v-col>


    <SelectedMenu :isCartEmpty="isCartEmpty" :btn="'Confirm Order'" :text="'Confirm Order'"/>


  </v-row>

</template>



<script>
import SelectedMenu from './SelectedMenu.vue';

export default{

  components: {
    SelectedMenu,
  },
  data(){
    return {
      orderId: 0,
    }
  },
  methods: {
    addToCart(item){
      this.$store.commit('menuList/addToCart', item);
    },
  },

  computed: {
    menuItems(){
      return this.$store.getters['menuList/getMenus'];
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
    subTotal(){
      return this.cart.reduce((total, item) => total + item.totalPrice, 0);
    },
    vat(){
      return (this.subTotal * 0.05);
    },
    serviceCharge(){
      return (this.subTotal * 0.1);
    },
    totalExtraCharge(){
      return this.vat + this.serviceCharge;
    },
    totalPrice(){
      return this.subTotal + this.totalExtraCharge;
    }
  },
}
</script>




<style scoped>

.image{
  width: 300px;
  height: 250px;
  padding: 15px;
}

</style>
