import { createWebHistory, createRouter } from "vue-router";

import PayBill from "@/components/PayBill.vue";
import SelectMenu from "@/components/SelectMenu.vue";
import SelectTable from "@/components/SelectTable.vue";
import ShowTables from "@/components/ShowTables.vue";
import TransAction from "@/components/TransAction.vue";

const routes = [

  { path: '/', name: 'Home', component: SelectMenu},
  { path: '/selectmenu', name: 'selectmenu', component: SelectMenu},
  { path: '/selecttable/:id', name: 'selecttable', props: true, component: SelectTable},
  { path: '/showtables', name: 'showtables', component: ShowTables},
  { path: '/transaction', name: 'transaction', component: TransAction},
  {
    path: "/paybill/:orderId",
    name: "payBill",
    component: PayBill,
    props: true,
  },


];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router
