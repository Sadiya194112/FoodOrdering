<template>
  <v-main height="800">
    <v-row class="table-grid ma-0">
      <v-col :cols="7" class="ml-5">
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
              >
                {{ table.name }} #{{ table.id }}
                <div>
                  <v-icon icon="mdi-table-furniture" size="20px"></v-icon>
                </div>
            </v-btn>
          </div>

          <div v-else @click="showTables(table.id)">
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
                  <tbody v-if="isTableSelected == true" class="tbody">
                    <tr
                    v-for="(item) in currOrder.menu" :key="item.id"

                      class="trow-color"
                      >
                      <td>{{ item.id }}</td>
                      <td>{{ item.name }}</td>
                      <td>
                        <v-btn v-if="isUpdateOrder == true" icon size="30px" color="green" class="ml-10"><v-icon icon="mdi-plus" size="20px" @click="increaseQuantity(item)"></v-icon></v-btn>
                          <span class="px-2">{{ item.quantity }}</span>
                        <v-btn v-if="isUpdateOrder == true" icon size="30px" color="red"><v-icon icon="mdi-minus" size="20px" @click="decreaseQuantity(item)"></v-icon></v-btn>
                      </td>
                      <td>{{  item.price }}</td>
                    </tr>
                  </tbody>
                </v-table>
              </div>


          </div>
          </v-list-item>

          <v-divider inset></v-divider>
            <div class="d-flex justify-space-between">VAT (5%)<span>{{ currOrder.vat }} BDT</span></div>
            <div class="d-flex justify-space-between">Service Charge (10%)<span>{{ currOrder.serviceCharge }} BDT</span></div>
            <div class="d-flex justify-space-between">Total Price <span>{{ currOrder.totalPrice }} BDT</span></div>

            <v-divider inset></v-divider>

            <div class="d-flex justify-space-between">
              <div>
                <v-btn
                  color="info"
                  width="220"
                  class="text-decorate"
                  @click="orderAgain()"
                  >
                  Order Again
                </v-btn>

                  <v-btn
                    color="primary"
                    width="220"
                    class="text-decorate"
                    @click="updateOrder()"
                    >
                      Update Order
                  </v-btn>

                <v-btn
                  width="220"
                  class="text-decorate confirm"

                  @click="goToPayBill()"
                  >
                    Pay Bill
                </v-btn>
              </div>
            </div>

          </v-list>
        </v-col>

    </v-row>
  </v-main>

</template>




<script>

export default {

  data(){
    return {
      orderId: 0,
      disabled: true,
      isAlert: false,
      isTableSelect: false,

      currOrder: {  //For
        orderId: 0,
        menu: null,
        vat: 0,
        tableNo: 0,
        basicCharge: 0,
        serviceCharge: 0,
        totalPrice: 0,
      },
      removeItem: false,
      itemToRemove: null,
      isUpdateOrder: false,
    }
  },


  computed: {
    orderList(){
      return this.$store.getters['menuList/getOrderList'];
    },
    tableList(){
      return this.$store.getters['menuList/getTableList'];
    },
    productList(){
      return this.$store.getters['menuList/getProductList'];
    }

  },

  methods: {
    goToPayBill(){
      this.$router.push('/paybill/' + this.orderId);
    },
    updateOrder(){
      this.isTableSelect = true;
    },

    getOrderDetails(){
      for(let i=0; i < this.orderList.length; i++){
        console.log(this.orderId);
        if(this.orderList[i].orderId == this.orderId){
          this.currOrder.menu = this.orderList[i].menu;
          this.currOrder.vat = this.orderList[i].vat;
          this.currOrder.basicCharge = this.orderList[i].basicCharge;
          this.currOrder.serviceCharge = this.orderList[i].serviceCharge;
          this.currOrder.totalPrice = this.orderList[i].totalPrice;
        }
      }
    },

    decreaseQuantity(item){
      for(let i=0; i < this.orderList.length; i++){
        for(let j=0; j < this.orderList[i].menu.length; j++){
          if(this.orderList[i].menu[j].id == item.id){
            let productFromProductList = this.productList.find(ele => ele.id == item.id);
            console.log(productFromProductList);

            if(this.removeItem == true){
              this.orderList[i].menu[j].quantity -= 1;
              this.orderList[i].menu[j].price -= productFromProductList.price;
              this.orderList[i].basicCharge -= productFromProductList.price;
              this.orderList[i].vat = .05 * this.orderList[i].basicCharge;
              this.orderList[i].serviceCharge = .10 * this.orderList[i].basicCharge;
              this.orderList[i].totalPrice = this.orderList[i].basicCharge + this.orderList[i].vat + this.orderList[i].serviceCharge;
              this.orderList[i].menu.splice(this.orderList[i].menu[j], 1);

              this.removeItem = false;
              this.isAlert = false;
              this.getOrderDetails();
            }
            else{
              if(this.orderList[i].menu[j].quantity == 1){
                this.itemToRemove = item;
              }
              else{
                this.orderList[i].menu[j].quantity -= 1;
                this.orderList[i].menu[j].price -= productFromProductList.price;
                this.orderList[i].basicCharge -= productFromProductList.price;

                if(this.orderList[i].menu[j].vat == true){
                  this.orderList[i].vat = .05 * this.orderList[i].basicCharge;
                  this.orderList[i].serviceCharge = .10 * this.orderList[i].basicCharge;
                }
                this.orderList[i].totalPrice = this.orderList[i].basicCharge + this.orderList[i].vat + this.orderList[i].serviceCharge;
                this.getOrderDetails();
              }
            }

          }
        }
      }
    },

    showTables(tableId){
      console.log("Table Id: ", tableId);
      for(let i=0; i < this.tableList.length; i++){
        if(this.tableList[i].id == tableId){
          this.orderId = this.tableList[i].orderId;
          this.getOrderDetails();
          this.isTableSelected = true;
        }
      }
    },
    orderAgain(){
      this.$store.commit("menuList/resetCart");
      this.$router.push("/selectMenu");
    },



  },

};
</script>

<style scoped>
.text-decorate{
  text-decoration: none;
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
