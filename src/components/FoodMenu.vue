<template>
  <v-col :cols="7">
    <v-row class="d-flex ml-5">
      <v-col
        v-for="(item) in findProductList" :key="item" :id=item.id
        :cols="4"
      >
      <v-card width="300" @click="addProduct(item)" class="pointer">
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

export default{

  data(){
    return {
      selectMenu: {
        id: 0,
        name: '',
        type: "",
        rating: 0,
        reviews: 0,
        price: 0,
        totalPrice: 0,
        quantity: 0,
        icon: "",
        image: '',
      }
    }
  },
  computed: {
    findProductList(){
      return this.$store.getters['menuList/getProductList'];
    },
  },
  methods: {
    addProduct(item){
      this.selectMenu = item;
      this.$emit('selectProduct', this.selectMenu)
    },
  },
}
</script>




<style scoped>
.pointer{
  cursor: pointer;
}
.image{
  width: 300px;
  height: 250px;
  padding: 15px;
}

</style>
