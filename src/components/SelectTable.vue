<template>
  <v-main height="800">
    <v-row class="table-grid ma-0">
      <v-col :cols="7" class="ml-5">
        <h1 class="table-header mb-5 text-center">Select Table</h1>

        <v-row >
          <v-col
            v-for="table in tableList"
            :key="table.id"
            :cols="3"
          >
          <div v-if="table.allocated == false">
            <v-btn
              size="x-large"
              width="270"
              height="100"
              class="color"
              @click="selectTable(table.id)"
              >
                {{ table.name }} #{{ table.id }}
                <div>
                  <v-icon icon="mdi-table-furniture" size="20px"></v-icon>
                </div>
            </v-btn>
          </div>

          <div v-else>
            <v-btn
              size="x-large"
              width="270"
              height="100"
              class="reserved-color"
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


      <v-col :cols="4">
        <v-card-item class="bg-cyan-darken-4">
            <v-card-title>
              <span class="text-h5">Order Id</span> #{{ this.id }}
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

            <div>
              <v-btn
                class="confirm"
                width="750"
                @click="checkOut()"
                >
                  Checkout
              </v-btn>

            </div>

          </v-list>
        </v-col>



    </v-row>
  </v-main>


</template>

<script>

export default {

  props: ["id", "btn"],   //Received Order id

  data(){
    return {
      executed: false,


      orderData: {  //For
        orderId: 0,
        menu: null,
        tableNo: 0,
        isTableSelected: Boolean,
      }
    }
  },
  //To update value of data property
  created(){
    for(let i=0; i<this.orderList.length; i++){
      if(this.orderList[i].orderId == this.id){
        this.orderData.menu = this.orderList[i].menu;
      }
    }
  },

  computed: {
    orderList(){
      return this.$store.getters['menuList/getOrderList'];
    },
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
    getOrderDetails(clickedOrderId, tableId){
      for(let i=0; i < this.orderList.length; i++){
        console.log(clickedOrderId);
        if(this.orderList[i].orderId == clickedOrderId){
          this.orderList[i].tableNo = tableId;

          console.log("Ei order er table no: ", this.orderList[i].tableNo);

          this.orderData.menu = this.orderList[i].menu;
        }
      }
    },
    checkOut(){
      if(this.isTableSelected == true){
        this.$router.push("/showtables");
      }
    },
    selectTable(tableId){
      if(this.executed == false){
        for(let i=0; i < this.tableList.length; i++){
          if(this.tableList[i].id == tableId){
            this.tableList[i].allocated = true;
            this.tableList[i].orderId = this.id;  //this.id = orderId received as props:["id"]
            this.isTableSelected = true;
            this.getOrderDetails(this.id, tableId)  //passed orderId and tableId
            console.log("Order Id: ", this.tableList[i].orderId);
          }
        }
        this.executed = true;
        console.log("Full Order er list", this.orderList)
      }
    },

    findTableId(tableId){
      return this.reservedOrders.some((table) => table.id === tableId);
    },

  },

};
</script>

<style scoped>

.table-header {
  background: #012830;
  color: white;
  font-size: 20px;
}

.color{
  background: rgb(15, 56, 61);
  color: white;
  border: 2px solid #077c85;
  cursor: pointer;
}

.reserved-color{
  background: #0a7c76;
  color: black;
}

.BtnSize{
  font-size: 15px;
  border-radius: 4px;
  text-transform: uppercase;
}

.confirm{
  background: rgb(9, 53, 7);
  color: white;
}
</style>
