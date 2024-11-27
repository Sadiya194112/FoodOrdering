<template>
  <!-- <v-main height="600"> -->
  <div class="d-flex justify-space-between">
    <div>
      <v-btn
          color="info"
          width="220"
          class="text-decorate"
          @click="clearCart"
          >
          Order Again
        </v-btn>

        <v-btn
          color="primary"
          width="220"
          >
          <router-link to="/tables" class="text-decorate">
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
  },
  methods: {
    clearCart(){
      this.$store.commit('menuList/clearCart')
      this.$router.push('/menus');
    }
  }
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




