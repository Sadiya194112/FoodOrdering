<template>

  <v-col :cols="4" width="750">
    <v-card-item class="bg-cyan-darken-4">
        <v-card-title>
          <span class="text-h5">{{title}}</span>
        </v-card-title>
    </v-card-item>

    <v-list width="750">
      <v-list-item >
        <div class="d-flex justify-space-between">
          <div>
            <v-table>
              <thead class="thead-color">
                <tr>
                  <th class="text-center" size="30px">ID</th>
                  <th class="text-center">Name</th>
                  <th class="text-center">Quantity</th>
                  <th class="text-center">Price</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(item, index) in cart" :key="index"
                  class="trow-color"
                  >
                  <td>{{ item.id }}</td>
                  <td>{{ item.name }}</td>
                  <td>
                    <div v-if="!isCartEmpty">
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

        <div v-if="text === 'Confirm Order'">
          <ConfirmButton ></ConfirmButton>
        </div>
        <div v-else-if="text === 'Checkout'">
          <CheckoutButton></CheckoutButton>
        </div>
        <div v-else-if="text === 'Order'">
          <TableButton></TableButton>
        </div>
      </v-list>
      </v-col>

</template>


<script>
import TableButton from './TableButton.vue';
import ConfirmButton from './ConfirmButton.vue'
import CheckoutButton from './CheckoutButton.vue'

export default {
  components: {
    TableButton,
    ConfirmButton,
    CheckoutButton
  },
  props: {
    text: {
      type: String,
      required: true,
    }
  },
  computed: {
    menuItems(){
      return this.$store.getters['menuList/getMenus'];
    },
    cart() {
      return this.$store.getters["menuList/getCart"];
    },
    reservedOrders(){
      return this.$store.getters["menuList/getReservedOrders"];
    },
    isCartEmpty(){
      if (this.cart.length > 0){
        return true;
      }
      else return false;
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

  methods: {
    incrementItem(itemId){
      this.$store.commit('menuList/incrementItem', itemId);
    },
    decrementItem(itemId){
      this.$store.commit('menuList/decrementItem', itemId);
    },
  }
}
</script>


<style scoped>
.summary{
  width: 750px;
  height: 790px;
}


.confirm{
  background: rgb(20, 88, 20) !important;
}

.text-decorate{
  text-decoration: none;
  color: white;
}
</style>
