<template>
  <v-main>
    <MenuCard />
</v-main>
</template>

<script>
import MenuCard from '@/components/MenuCard.vue';

export default{
  components: {
    MenuCard,
  },

}
</script>

<style scoped>
.outer{
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.inner1{
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;

}
.image{
  width: 300px;
  height: 250px;
  padding: 15px;
}

</style>
