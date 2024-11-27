<template>
  <!-- <router-link to="/tables" class="text-decorate"> -->
  <v-btn v-if="isEmpty === true"
    class="confirm"
    width="750"
    @click="confirmOrder()"
    >
      Confirm Order
    </v-btn>
  <!-- </router-link> -->
</template>

<script>

export default {
  data(){
    return {
      orderId: 0,
    }
  },
  props: {
    isEmpty: {
      type: Boolean,
      required: true,
    }
  },
  computed: {

  },
  methods: {
    confirmOrder(){

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
