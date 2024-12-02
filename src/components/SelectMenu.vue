<template>
  <v-main height="950">

    <!-- Confirmation Dialog -->
    <v-dialog v-model="isAlert" class="dialog-box">
      <v-card>
        <v-card-text>
          <p>Are you sure you want to remove this item?</p>
        </v-card-text>
        <div class="d-flex justify-end pa-2">
          <v-btn @click="isAlert = false" color="grey" class="mr-2">Cancel</v-btn>
          <v-btn @click="removeProduct()" color="red">Yes</v-btn>
        </div>
      </v-card>
    </v-dialog>

    <v-row class="table-grid">

      <FoodMenu @selectProduct="addedProduct"></FoodMenu>

      <v-col :cols="4" class="mt-4">
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
                    v-for="(item, index) in selectedProductList" :key="index" :id=item.id
                    class="trow-color"
                    >
                    <td>{{ item.id }}</td>
                    <td>{{ item.name }}</td>
                    <td>
                      <v-btn icon size="30px" color="green" class="ml-10"><v-icon icon="mdi-plus" size="20px" @click="increaseQuantity(item)"></v-icon></v-btn>
                        <span class="px-2">{{ item.quantity }}</span>
                      <v-btn icon size="30px" color="red"><v-icon icon="mdi-minus" size="20px" @click="decreaseQuantity(item)"></v-icon></v-btn>
                    </td>
                    <td>{{  item.price  }}</td>
                  </tr>
                </tbody>
              </v-table>
            </div>


        </div>
        </v-list-item>

        <v-divider inset></v-divider>
        <div class="d-flex justify-space-between">Sub Total Price<span>{{ selectCharge }} BDT</span></div>
          <div class="d-flex justify-space-between">VAT (5%)<span>{{ vat }} BDT</span></div>
          <div class="d-flex justify-space-between">Service Charge (10%)<span>{{ serviceCharge }} BDT</span></div>
          <div class="d-flex justify-space-between">Total Extra Charge <span>{{ extraCharge }} BDT</span></div>
          <div class="d-flex justify-space-between">Total Price <span>{{ totalCharge }} BDT</span></div>

          <v-divider inset></v-divider>

          <div v-if="disabled == false">
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
      </v-row>
  </v-main>



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
      vat: 0,

      selectCharge: 0,
      serviceCharge: 0,
      extraCharge: 0,
      totalCharge: 0,

      disabled: true,
      isAlert: false,
      removeItem: false,
      chargeFromOrder: 0,

      productQuantity: 0,
      increasedProductPrice: 0,
      chargesWithVat: 0,
      chargesWithOutVat: 0,


      menu: {
        id: 0,
        name: '',
        type: "",
        rating: 0,
        reviews: 0,
        price: 0,
        totalPrice: 0,
        quantity: 0,
        vat: Boolean,
        icon: "",
        image: '',
      },

      selectedItem: {
        id: 0,
        name: '',
        type: "",
        rating: 0,
        reviews: 0,
        price: 0,
        totalPrice: 0,
        quantity: 0,
        vat: Boolean,
        icon: "",
        image: '',
      }
    }
  },

  computed: {
    selectedProductList(){
      return this.$store.getters['menuList/getSelectedList'];
    },
    getProductList(){
      return this.$store.getters['menuList/getProductList'];
    },
    orderList(){
      console.log(this.$store.getters['menuList/getOrderList'].length);
      return this.$store.getters['menuList/getOrderList'];
    },
  },


  methods: {

    confirmOrder(){
      this.orderId = Math.floor(Math.random() * Math.floor(Math.random() * Date.now()));
      let currOrder = {
        orderId: this.orderId,
        menu: this.selectedProductList,
        vat: this.vat,
        tableNo: null,
        basicCharge: this.selectCharge,
        serviceCharge: this.serviceCharge,
        totalPrice: this.totalCharge,
        paidBill: false,
      };
      this.$store.dispatch("menuList/addOrder", currOrder);
      this.$store.commit("menuList/resetSelectState");
      this.$router.push('/selecttable/' + this.orderId);
    },

    removeProduct(){
      this.removeItem = true;
      if(this.removeItem == true){
        this.selectedProductList.find(ele => ele.id == this.selectedItem.id).quantity -= 1;
        this.$store.dispatch('menuList/removeMenu', this.selectedItem);
        this.calculateCharges();
        this.isAlert = false;
        //try this if with computed property and see if it works or not
        if(this.$store.getters['menuList/selectListLength'] == 0){
          this.disabled = true;
        }
        else{
          this.isAlert = false;
        }
      }
    },

    decreaseQuantity(item){
      if(item.quantity == 1){
        this.isAlert = true;
        this.selectedItem = item;
      }
      else{
        this.selectedProductList.find(ele => ele.id == item.id).quantity -= 1;
        this.calculateCharges();
      }
    },

    increaseQuantity(item){
      this.selectedProductList.find(ele => ele.id == item.id).quantity += 1;
      this.calculateCharges();
    },



    calculateCharges(){
      this.selectCharge = 0;
      this.vat = 0;
      this.serviceCharge = 0;
      this.extraCharge = 0;
      this.totalCharge = 0;
      this.chargesWithVat = 0;
      this.chargesWithOutVat = 0;

      for(let i=0; i < this.selectedProductList.length; i++){
        let selectedProductQuantity = this.selectedProductList[i].quantity;
        let productOriginalPrice =  this.getProductList.find(item => item.id == this.selectedProductList[i].id).price;   //selected item er original price ber korchi
        this.selectedProductList[i].price = selectedProductQuantity * productOriginalPrice;

        if(this.selectedProductList[i].vat == true){
          this.chargesWithVat += this.selectedProductList[i].price;
          this.vat = .05 * this.chargesWithVat;
          this.serviceCharge = .10 * this.chargesWithVat;
          this.extraCharge += this.vat + this.serviceCharge;
          this.totalCharge += this.chargesWithVat + this.extraCharge;
        }
        else{
          this.chargesWithOutVat += this.selectedProductList[i].price;
          this.totalCharge += this.chargesWithOutVat + this.extraCharge;
        }
      }
      this.selectCharge = this.chargesWithVat + this.chargesWithOutVat;
      this.totalCharge = this.chargesWithVat + this.extraCharge;
    },

    selectedProduct(menuLength){
      if(menuLength < 1){
        this.menu.quantity += 1;
        this.$store.dispatch('menuList/addMenu', this.menu);
      }
      else{
        let flag = 0;
        for(let i=0; i < menuLength; i++){
          if(this.menu.id === this.selectedProductList[i].id){
            //agei menu te add korchi ei item
            flag = 1;
            this.selectedProductList[i].quantity += 1;
          }
        }
        if(flag == 0){ //notun item menu te add korbo
          this.menu.quantity += 1;
          this.$store.dispatch('menuList/addMenu', this.menu);
        }
      }
      this.disabled = false;
    },

    addedProduct(getMenu){
      this.menu = JSON.parse(JSON.stringify(getMenu));  //deep cloning an object
      let selectListLength = this.$store.getters['menuList/selectListLength'];
      this.selectedProduct(selectListLength);
      this.calculateCharges();
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

.dialog-box {
  width: 600px;
  height: 400px;
}
</style>
