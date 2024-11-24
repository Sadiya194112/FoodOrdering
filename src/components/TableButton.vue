<template>
  <div class="d-flex justify-space-between">
    <v-btn
        color="info"
        width="250"
        >
        <router-link to="/menus" class="text-decorate">
          Order Again
        </router-link>
      </v-btn>

      <v-btn
        color="primary"
        width="250"
        >
        <router-link to="/update" class="text-decorate">
          Update Order
        </router-link>
      </v-btn>

      <v-btn
        class="confirm"
        width="250"
        >
        <router-link to="/bill" class="text-decorate">
          Pay Bill
        </router-link>
      </v-btn>
  </div>

</template>

<style scoped>
.confirm{
  background: rgb(20, 88, 20) !important;
}

.text-decorate{
  text-decoration: none;
  color: white;
}


</style>




