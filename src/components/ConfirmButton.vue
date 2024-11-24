<template>
  <v-btn
    class="confirm"
    width="750"
    >
    <router-link to="/tables" class="text-decorate">
      Confirm Order
    </router-link>
  </v-btn>
</template>

<script>

export default {

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
