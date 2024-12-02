<template>
  <v-main height="950">
    <h2 class="main-head">Transactions</h2>
    <v-table class="table">
      <thead class="thead-color">
        <tr>
          <th class="text-center">ORDER ID</th>
          <th class="text-center">TABLE NO</th>
          <th class="text-center">BILL AMOUNT</th>
          <th class="text-center">BILL PAID</th>
        </tr>
      </thead>
      <tbody class="tbody">
        <tr v-for="(item) in paidOrderList" :key="item">
          <td>#{{ item.orderId }}</td>
          <td>{{ item.tableNo }}</td>
          <td>{{ item.totalPrice }}</td>
          <td>{{ item.paidBill }}</td>
        </tr>
      </tbody>
    </v-table>
  </v-main>
</template>

<script>
export default {
  data(){
    return {
      paidOrderList: [],
    }
  },
  created(){
    this.paidBillOrderList();
  },
  methods: {
    paidBillOrderList(){
      const orderList = this.$store.getters['menuList/getOrderList'];
      for(let i=0; i < orderList.length; i++){
        console.log(orderList[i].paidBill);

        if(orderList[i].paidBill == true){
          console.log(orderList[i]);
          this.paidOrderList.push(orderList[i]);
        }
      }
    }
  },

}
</script>

<style scoped>
.thead-color{
  background: rgb(154, 175, 172);
  color: white;
  font-size: 20px;
  box-shadow: 5px 5px;
}
.main-head{
  background: rgb(75, 88, 88);
  color: white;
  height: 40px;
  box-shadow: 5px 5px;
  text-align: center;
}
</style>
