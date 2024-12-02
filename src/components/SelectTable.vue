<template>
  <v-main height="950">
    <v-row class="table-grid ma-0">

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
                      v-for="(item, index) in currOrder.menu" :key="index" :id=item.id
                      class="trow-color"
                      >
                      <td>{{ item.id }}</td>
                      <td>{{ item.name }}</td>
                      <td>
                        <span class="px-2">{{ item.quantity }}</span>
                      </td>
                      <td>{{  item.price }}</td>
                    </tr>
                  </tbody>
                </v-table>
              </div>
          </div>
          </v-list-item>

          <v-divider inset></v-divider>
            <div class="d-flex justify-space-between">VAT (5%)<span>{{ currOrder.vat }}</span></div>
            <div class="d-flex justify-space-between">Service Charge (10%)<span>{{ currOrder.serviceCharge }}</span></div>
            <div class="d-flex justify-space-between">Total Price <span>{{ currOrder.totalPrice }}</span></div>

            <v-divider inset></v-divider>

            <div
              class="confirm"
              @click="checkOut()"
              >
                  Checkout
            </div>

          </v-list>
        </v-col>


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
              width="280"
              height="100"
              class="btn-color"
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

    </v-row>
  </v-main>


</template>

<script>

export default {

  props: ["id"],   //Received Order id

  data(){
    return {
      disabled: true,
      executed: false,

      currOrder: {  //To get currOrder data
        orderId: 0,
        menu: null,
        vat: 0,
        tableNo: 0,
        basicCharge: 0,
        serviceCharge: 0,
        totalPrice: 0,
        isTableSelected: Boolean,
      }
    }
  },
  //To update value of data property
  created(){
    const orderList = this.$store.getters['menuList/getOrderList'];
    for(let i=0; i < orderList.length; i++){
      if(orderList[i].orderId == this.id){
        this.currOrder.menu = orderList[i].menu;
        this.currOrder.vat = orderList[i].vat;
        this.currOrder.serviceCharge = orderList[i].serviceCharge;


        console.log(this.currOrder.menu);
        console.log(this.currOrder.vat);
        console.log(orderList[i]);


        this.currOrder.totalPrice = orderList[i].totalPrice;
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
  },

  methods: {
    getOrderDetails(clickedOrderId, tableId){
      for(let i=0; i < this.orderList.length; i++){
        console.log(clickedOrderId);
        if(this.orderList[i].orderId == clickedOrderId){
          this.orderList[i].tableNo = tableId;

          console.log("Ei order er table no: ", this.orderList[i].tableNo);

          this.currOrder.menu = this.orderList[i].menu;
          this.currOrder.vat = this.orderList[i].vat;
          this.currOrder.serviceCharge = this.orderList[i].serviceCharge;

          console.log(this.currOrder.serviceCharge);

          this.currOrder.totalPrice = this.orderList[i].totalPrice;
        }
      }
    },
    checkOut(){
      if(this.isTableSelected == true){
        this.$router.push("/showtables/");
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

  },

};
</script>

<style scoped>

.table-header {
  background: #012830;
  color: white;
  font-size: 20px;
}

.btn-color{
  background: rgb(15, 56, 61);
  font-size: 15px;
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
  height: 30px;
  text-align: center;
}
</style>
