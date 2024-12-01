<template>
  <v-col :cols="7">
    <v-row class="d-flex ml-5">
      <v-col
        v-for="(item) in findProductList" :key="item" :id=item.id
        :cols="4"
      >
      <v-card width="300" @click="addToCart(item)">
        <div class="image">
          <v-img :src="item.image"></v-img>
        </div>
        <v-card-item>
          <v-card-title>
            <div class="d-flex justify-space-between">
              <h4> {{item.name}}</h4>
              <span>{{ item.price }}</span>
            </div>
          </v-card-title>
          <v-card-subtitle>
            {{item.type}}
            <v-icon color="red">{{item.icon}}</v-icon>
          </v-card-subtitle>
          <div class="d-flex align-center">
            <v-rating
            :model-value="4.5"
            half-increments
            color="amber"
            density="compact"
            >
            </v-rating>
            <span class="text-grey ml-3">{{ item.rating }}({{ item.reviews }})</span>
          </div>
        </v-card-item>
      </v-card>

    </v-col>
    </v-row>
  </v-col>
</template>


<script>
// import SelectedMenu from './SelectedMenu.vue';

export default{

  components: {
    // SelectedMenu,
  },
  data(){
    return {
      selectMenu: {
        id: 0,
        name: '',
        price: 0,
        type: "",
        rating: 0,
        reviews: 0,
        totalPrice: 0,
        icon: "",
        image: '',
      }
    }
  },
  methods: {
    addToCart(item){
      this.selectMenu = item;
      this.$store.commit('menuList/addToCart', item);
    },
  },

  computed: {
    findProductList(){
      return this.$store.getters['menuList/getProductList'];
    },
    cart(){
      return this.$store.getters['menuList/getCart'];
    },

  },
}
</script>




<style scoped>

.image{
  width: 300px;
  height: 250px;
  padding: 15px;
}

</style>
