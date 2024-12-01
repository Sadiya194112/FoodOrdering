<template>
  <v-row class="table-grid">

    <FoodMenu></FoodMenu>


    <v-col :cols="4">
    <v-card-item class="bg-cyan-darken-4">
        <v-card-title>
          <span v-if="this.id != 0" class="text-h5">Order Id #{{  this.orderId }}</span>
        </v-card-title>
    </v-card-item>

    <v-list>
      <v-list-item>
        <div class="d-flex justify-space-between">
          <div>
            <v-table class="table">
              <thead class="thead">
                <tr>
                  <th class="text-center">ID</th>
                  <th class="text-center">Name</th>
                  <th class="text-center">Quantity</th>
                  <th class="text-center">Price</th>
                </tr>
              </thead>
              <tbody class="tbody">
                <tr
                  v-for="(item, index) in cart" :key="index" :id=item.id
                  class="trow-color"
                  >
                  <td>{{ item.id }}</td>
                  <td>{{ item.name }}</td>
                  <td>
                    <div v-if="isCartEmpty === true">
                      <v-btn icon size="30px" color="green" class="ml-10"><v-icon icon="mdi-plus" size="20px" @click="incrementItem(item.id)"></v-icon></v-btn>
                        <span class="px-2">{{ item.count }}</span>
                      <v-btn icon size="30px" color="red"><v-icon icon="mdi-minus" size="20px" @click="decrementItem(item.id)"></v-icon></v-btn>
                    </div>
                    <div v-else>
                      <span class="px-2">{{ item.count }}</span>
                    </div>
                  </td>
                  <td>{{  item.price  * item.count }}</td>
                </tr>
              </tbody>
            </v-table>
          </div>


      </div>
      </v-list-item>

      <v-divider inset></v-divider>
      <div class="d-flex justify-space-between">Sub Total Price<span>{{ subTotal }}</span></div>
        <div class="d-flex justify-space-between">VAT (5%)<span>{{ vat }}</span></div>
        <div class="d-flex justify-space-between">Service Charge (10%)<span>{{ serviceCharge }}</span></div>
        <div class="d-flex justify-space-between">Total Extra Charge <span>{{ totalExtraCharge }}</span></div>
        <div class="d-flex justify-space-between">Total Price <span>{{ totalPrice }}</span></div>

        <v-divider inset></v-divider>

        <div v-if="isCartEmpty">
          <v-btn
            class="confirm"
            width="750"
            @click="confirmOrder()"
            >
              Confirm Order
          </v-btn>
        </div>


      </v-list>
      </v-col>

    <!-- <SelectedMenu :isCartEmpty="isCartEmpty" :btn="'Confirm Order'" :text="'Confirm Order'"/> -->


  </v-row>

</template>



<script>
import FoodMenu from './FoodMenu.vue';

export default{

  components: {
    FoodMenu,
  },
  data(){
    return {
      orderId: 0,
      disabled: true,

      selectedItem: {
        id: 0,
        name: '',
        price: 0,
        type: "",
        rating: 0,
        reviews: 0,
        totalPrice: 0,
        icon: "",
        image: '',
      }
    }
  },
  methods: {
    addToCart(item){
      this.selectMenu = item;
      this.$store.commit('menuList/addToCart', item);
    },
    confirmOrder(){
      this.orderId = Date.now();
      let currOrder = {
        orderId: this.orderId,
        menu: this.cart,
      };
      this.$store.dispatch("addOrder", currOrder);
      // this.$store.commit("menuList/resetCart");
      this.$router.push('/selecttable/' + this.orderId);
    },

    incrementItem(itemId){
      this.$store.commit('menuList/incrementItem', itemId);
    },
    decrementItem(itemId){
      this.$store.commit('menuList/decrementItem', itemId);
    },

  },

  computed: {
    selectedProductList(){
      return this.$store.getters['menuList/getSelectedList'];
    },
    getProductList(){
      return this.$store.getters['menuList/getProductList'];
    },
    orderList(){
      return this.$store.getters['menuList/getOrderList'];
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

.confirm{
  background: rgb(20, 88, 20) !important;
  color: white;
}


.image{
  width: 300px;
  height: 250px;
  padding: 15px;
}

</style>
