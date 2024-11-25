<template>
  <!-- <v-main height="600"> -->
  <div class="d-flex justify-space-between">
    <div>
      <v-btn
          color="info"
          width="220"
          >
          <router-link to="/menus" class="text-decorate">
            Order Again
          </router-link>
        </v-btn>

        <v-btn
          color="primary"
          width="220"
          class="text-decorate"
          >
            <router-link to="/tables">
              Update Order
            </router-link>
        </v-btn>

        <v-btn
          class="confirm"
          width="220"
          >
          <router-link to="/bill" class="text-decorate">
            Pay Bill
          </router-link>
        </v-btn>
    </div>
  </div>
<!-- </v-main> -->

</template>

<script>


export default {
  computed: {
    cart() {
      return this.$store.getters["menuList/getCart"];
    },

    isCartEmpty(){
      if(this.cart.length > 0){
        return true
      }
      else return false
    },

  },

}
</script>



<style scoped>
.confirm{
  background: rgb(20, 88, 20) !important;
}

.text-decorate{
  text-decoration: none;
  color: white;
}


</style>




