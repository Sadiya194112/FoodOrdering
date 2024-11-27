import { createWebHistory, createRouter } from "vue-router";
import TablePage from "@/components/TablePage.vue";
import MenuCard from "@/components/MenuCard.vue";
import ListPage from "@/components/ListPage.vue";

import SelectedMenu from "@/components/SelectedMenu.vue";
import TableButton from "@/components/TableButton.vue";
import UpdateMenu from "@/components/UpdateMenu.vue";
import PayBill from "@/components/PayBill.vue";

const routes = [
  { path: '/', name: 'Home', component: MenuCard},
  { path:'/buttons', name: 'Button', component: TableButton},
  { path: '/tables', name: 'Table', component: TablePage },
  { path: '/menus', name: 'Menu', component: MenuCard},
  { path: '/list', name: 'List', component: ListPage},
  { path: '/orderList', name: 'OrderList', component: SelectedMenu},

  { path: '/update', name: 'Update', component: UpdateMenu},
  { path: '/bill', name: 'Bill', component: PayBill}
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router
