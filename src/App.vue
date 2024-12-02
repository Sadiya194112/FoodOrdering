<template>
<v-app>
    <v-layout>
      <div class="head-color">
        <div class="d-flex justify-end pt-3 btn">
          <div class="px-3">
            <router-link to="/">
              <v-btn icon size="30px" color="black"><v-icon icon="mdi-food" size="20px"></v-icon></v-btn>
            </router-link>
          </div>

          <div class="px-3">
            <router-link to="/showtables">
            <v-btn icon size="30px" color="black">
                <v-icon icon="mdi-table-furniture" size="20px"></v-icon>
              </v-btn>
            </router-link>
          </div>

          <div class="px-3">
            <router-link to="/transaction">
              <v-btn icon size="30px" color="black"><v-icon icon="mdi-list-box" size="20px"></v-icon></v-btn>
            </router-link>
          </div>
        </div>
      </div>

    </v-layout>
    <router-view />
  </v-app>
</template>

<script>

export default {
  name: 'App',

};
</script>


<style scoped>
.head-color{
  background: rgb(51, 48, 48);
  color: rgb(107, 100, 100);
  width: 100%;
  height: 60px;
}

.btn{
  align-items: flex-end;
}
</style>
