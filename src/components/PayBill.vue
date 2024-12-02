<template>
  <v-main height="950">
    <v-row class="table-grid ml-10">

      <v-col :cols="4" class="mr-5">
        <v-card-item class="bg-cyan-darken-4">
          <v-card-title>
            <span class="text-h5">Order Id</span> #{{ this.orderId }}
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
                    v-for="item in currOrder.menu" :key="item.id"
                    class="trow-color"
                    >
                    <td>{{ item.id }}</td>
                    <td>{{ item.name }}</td>
                    <td>{{ item.quantity }}</td>
                    <td>{{ item.price }}</td>
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


      </v-list>
      </v-col>

      <v-col :cols="7" class="ml-5 ">
        <h1 class="table-header mb-5 text-center">Pay the Bill</h1>
        <div v-if="billPaid == false" class="d-flex justify-center">
          <div class="d-flex align-center" style="width: 600px">
            <input
              v-model="billAmount"
              class="input-box"
              type="text"
              style="flex: 1; padding: 10px; border: 1px solid #ccc; border-radius: 4px;"
            />
            <v-btn
              v-if="disabled == false"
              @click="payBill()"
              color="secondary"
              type="submit"
              style="margin-left: 10px;"
            >
              Pay
            </v-btn>
          </div>
        </div>
        <div v-else>
          <div class="d-flex justify-center">
            <v-icon class="green-block" icon="mdi mdi-currency-usd"><span color="black">BILL PAID</span></v-icon>
          </div>
        </div>
      </v-col>



    </v-row>
  </v-main>

</template>


<script>

export default {

  props: ["orderId"],
  data() {
    return {
      disabled: true,
      executed: false,

      currOrder: {
        orderId: 0,
        menu: null,
        vat: 0,
        tableNo: 0,
        basicCharge: 0,
        serviceCharge: 0,
        totalPrice: 0,
      },
      billAmount: null,
      billPaid: false,
    };
  },
  created() {
    const orderList = this.$store.getters['menuList/getOrderList'];

    for (let i = 0; i < orderList.length; i++) {
      if (orderList[i].orderId == this.orderId) {
        this.currOrder.orderId = this.orderId;
        this.currOrder.menu = orderList[i].menu;
        this.currOrder.vat = orderList[i].vat;
        this.currOrder.basicCharge = orderList[i].basicCharge;
        this.currOrder.serviceCharge = orderList[i].serviceCharge;
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
  watch: {
    billAmount() {
      for(let i=0; i < this.orderList.length; i++){
        console.log(this.orderList[i].totalPrice);
        console.log(this.billAmount);
        if(this.orderList[i].totalPrice == this.billAmount){
          this.disabled = false;
          break;
        }
        else{
          this.disabled = true;
        }
      }
    },
  },


  methods: {
    payBill() {
      for (let i = 0; i < this.orderList.length; i++) {
        if (this.orderList[i].totalPrice == this.billAmount){
          this.tableList.find(ele => ele.orderId == this.orderId).allocated = false;
          this.orderList[i].paidBill = true;
          this.billPaid = true;
        }
      }
    },
    getOrderDetails(clickedOrderId, tableId) {
      for (let i = 0; i < this.orderList.length; i++) {
        console.log(clickedOrderId);
        if (this.orderList[i].orderId == clickedOrderId) {
          this.orderList[i].tableNo = tableId;
          this.currOrder.menu = this.orderList[i].menu;
          this.currOrder.vat = this.orderList[i].vat;
          this.currOrder.serviceCharge = this.orderList[i].serviceCharge;
          this.currOrder.totalPrice = this.orderList[i].totalPrice;
        }
      }
    },
    checkOut() {
      this.$router.push("/showtables/");
    },
    selectTable(tableId) {
      if (this.executed == false) {
        for (let i = 0; i < this.tableList.length; i++) {
          if (this.tableList[i].id == tableId) {
            this.tableList[i].allocated = true;
            this.tableList[i].orderId = this.id;
            console.log(this.id);
            this.getOrderDetails(this.id, tableId);
          }
        }
        this.executed = true;
        console.log("full order er list", this.orderList);
      }
    },
  },
};
</script>

<style>
.table-header {
  color: rgb(26, 24, 24);
  border-style: solid;
  border-width: 2px;
}

.green-block{
  border-radius: 80px;
  background: green;
  color: white;
  height: 10%;
}
</style>
