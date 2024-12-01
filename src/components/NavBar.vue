<template>
<v-layout>
  <v-app-bar elevation="0" border>
    <v-list class="d-flex">
      <v-list-item>
        <router-link to="/">
          <v-btn icon size="30px" color="black"><v-icon icon="mdi-food" size="20px"></v-icon></v-btn>
        </router-link>
      </v-list-item>

      <v-list-item>
        <v-btn icon size="30px" color="black">
          <router-link to="/showtables">
            <v-icon icon="mdi-table-furniture" size="20px"></v-icon>
          </router-link>
        </v-btn>
      </v-list-item>

      <v-list-item>
          <router-link to="/transaction">
            <v-btn icon size="30px" color="black"><v-icon icon="mdi-list-box" size="20px"></v-icon></v-btn>
          </router-link>
      </v-list-item>
    </v-list>
  </v-app-bar>
</v-layout>

</template>

<script>

export default {
  data(){
  },
}
</script>


<style scoped>
</style>

