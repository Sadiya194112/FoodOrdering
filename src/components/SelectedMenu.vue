<template>

  <v-col :cols="4">
    <v-card-item class="bg-cyan-darken-4">
        <v-card-title>
          <span class="text-h5">{{title}}</span>
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
                  v-for="(item, index) in cart" :key="index"
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

        <div v-if="text === 'Confirm Order'">
          <ConfirmButton :isEmpty="isEmpty" ></ConfirmButton>
        </div>
        <div v-else>
          <v-btn v-if="isHidden" @click="toggle"
            class="confirm"
            width="750"
            >
              Checkout
          </v-btn>
          <div v-if="!isHidden">
            <TableButton></TableButton>
          </div>
        </div>

      </v-list>
      </v-col>

</template>


<script>
import TableButton from './TableButton.vue';
import ConfirmButton from './ConfirmButton.vue'

export default {
  components: {
    TableButton,
    ConfirmButton,
  },
  data(){
    return {
      isHidden: true,
    }
  },
  props: {
    text: {
      type: String,
      required: true,
    },
    isCartEmpty: {
      type: Boolean,
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

    isEmpty(){
      if(this.cart.length > 0){
        return true
      }
      else return false
    },
    reservedOrders(){
      return this.$store.getters["menuList/getReservedOrders"];
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
    toggle(){
      this.isHidden = false;
    },
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
.thead{
  font-size: 20px !important;
}
.tbody{
  font-size: 15px;
  text-align: center;
}
.table{
  width: 670px;
}
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
