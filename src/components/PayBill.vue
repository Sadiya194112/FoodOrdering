<template>
  <v-main height="800">
    <v-row class="table-grid ma-0">
      <v-col :cols="7" class="ml-5 d-flex justify-center align-center">
        <div v-if="billPaid == false">
          <div class="d-flex align-center" style="width: 600px">
            <input
              v-model.number="billAmount"
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
          <v-icon><span class="material-symbols-outlined">BILL PAID</span></v-icon>
        </div>
      </v-col>

      <v-col :cols="4">
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
                      v-for="(item, index) in cart" :key="index"
                      class="trow-color"
                      >
                      <td>{{ item.id }}</td>
                      <td>{{ item.name }}</td>
                      <td>{{ item.count }}</td>
                      <td>{{  item.price  * item.count }}</td>
                    </tr>
                  </tbody>
                </v-table>
              </div>


          </div>
          </v-list-item>

          <v-divider inset></v-divider>
            <div class="d-flex justify-space-between">VAT (5%)<span>{{ vat }}</span></div>
            <div class="d-flex justify-space-between">Service Charge (10%)<span>{{ serviceCharge }}</span></div>
            <div class="d-flex justify-space-between">Total Price <span>{{ totalPrice }}</span></div>

            <v-divider inset></v-divider>


          </v-list>
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
      orderData: {
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
        this.orderData.orderId = this.orderId;
        this.orderData.menu = orderList[i].menu;
        this.orderData.vat = orderList[i].vat;
        this.orderData.basicCharge = orderList[i].basicCharge;
        this.orderData.serviceCharge = orderList[i].serviceCharge;
        this.orderData.totalPrice = orderList[i].totalPrice;
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
  watch: {
  billAmount() {
    const enteredAmount = parseFloat(this.billAmount); // Convert to number
    console.log("Entered Amount:", enteredAmount);
    this.disabled = true; // Default state

    for (let i = 0; i < this.orderList.length; i++) {
      console.log("Checking Order:", this.orderList[i]);
      if (this.orderList[i].orderId === this.orderId) {
        console.log(
          "Comparing:",
          this.orderList[i].totalPrice,
          "with",
          enteredAmount
        );
        if (Math.abs(this.orderList[i].totalPrice - enteredAmount) < 0.01) {
          this.disabled = false; // Enable button if matched
          console.log("Match found, enabling button");
          break;
        }
      }
    }
  },
},


  methods: {
    payBill() {
      for (let i = 0; i < this.orderList.length; i++) {
        if (this.orderList[i].orderId === this.orderId && this.orderList[i].totalPrice === parseFloat(this.billAmount)) {
          const table = this.tableList.find(element => element.orderId === this.orderId);
          if (table) {
            table.select = false;
          }
          this.orderList[i].paidBill = true;
          this.billPaid = true;
          break;
        }
      }
    },
    getOrderDetails(clickedOrderId, tableId) {
      for (let i = 0; i < this.orderList.length; i++) {
        console.log(clickedOrderId);
        if (this.orderList[i].orderId == clickedOrderId) {
          this.orderList[i].tableNo = tableId;
          this.orderData.menu = this.orderList[i].menu;
          this.orderData.vat = this.orderList[i].vat;
          this.orderData.serviceCharge = this.orderList[i].serviceCharge;
          this.orderData.totalPrice = this.orderList[i].totalPrice;
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
            this.tableList[i].select = true;
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

</style>
