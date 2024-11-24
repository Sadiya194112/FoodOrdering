<template>
    <v-table height="850">
      <thead class="thead-color">
        <tr>
          <th class="text-center">ORDER ID</th>
          <th class="text-center">TABLE NO</th>
          <th class="text-center">BILL AMOUNT</th>
          <th class="text-center">BILL PAID</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="transaction in transactions"
          :key="transaction"
          class="trow-color"
        >
        <td>{{ transaction.orderId }}</td>
        <td>{{ transaction.tableId }}</td>
        <td>{{ transaction.billAmount }}</td>
        <td>{{ transaction.billPaid }}</td>
        </tr>
      </tbody>
    </v-table>

</template>

<script>

export default {
data(){
  return {
    transactions: [
      { orderId: 1,
        tableId: 1,
        billAmount: 500,
        billPaid: 500,
      },
      { orderId: 2,
        tableId: 2,
        billAmount: 600,
        billPaid: 600,
      },
      { orderId: 3,
        tableId: 3,
        billAmount: 800,
        billPaid: 800,
      },
      { orderId: 5,
        tableId: 4,
        billAmount: 1500,
        billPaid: 1500,
      },
    ]
  }
  }
}
</script>

<style scoped>
.thead-color{
  background: rgb(8, 95, 95);
  color: white;
  font-size: 20px;
}
.trow-color{
  background: rgb(71, 80, 80);
  color: white;
  font-size: 18px;
  text-align: center;
}
</style>
