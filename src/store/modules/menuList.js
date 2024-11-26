const menuList = {
  namespaced: true,
  state: {
    menuItems: [
      {
        id: 1,
        name: "Nanna Kacchi",
        type: "Rice Dishes",
        rating: 4.5,
        reviews: 100,
        price: 350,
        totalPrice: 350,
        icon: "mdi-fire-circle",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR--lqU6oVMP5ujOvsGA7mUithMoZaacsIOEg&s",
      },
      {
        id: 2,
        name: "Burger",
        type: "Fast Food",
        rating: 3.5,
        reviews: 50,
        price: 250,
        totalPrice: 250,
        icon: "mdi-fire-circle",
        image:
          "https://www.shutterstock.com/image-photo/burger-tomateoes-lettuce-pickles-on-600nw-2309539129.jpg",
      },
      {
        id: 3,
        name: "Pizza",
        type: "Italian",
        rating: 4.5,
        reviews: 75,
        price: 250,
        totalPrice: 250,
        icon: "mdi-fire-circle",
        image:
          "https://t3.ftcdn.net/jpg/00/27/57/96/360_F_27579652_tM7V4fZBBw8RLmZo0Bi8WhtO2EosTRFD.jpg",
      },
      {
        id: 4,
        name: "Shawarma",
        type: "Middle Eastern",
        rating: 4.0,
        reviews: 60,
        price: 200,
        totalPrice: 200,
        icon: "mdi-fire-circle",
        image:
          "https://www.recipetineats.com/tachyon/2022/02/Chicken-Shawarma-Wrap_2-SQ.jpg?resize=500%2C375",
      },
      {
        id: 5,
        name: "Kebab Platter",
        type: "Middle Eastern",
        rating: 4.0,
        reviews: 60,
        price: 700,
        totalPrice: 700,
        icon: "mdi-fire-circle",
        image:
          "https://www.tandooriculture.com.sg/wp-content/uploads/2022/06/Veg-Kebab-Platter.jpg",
      },
      {
        id: 6,
        name: "Waffles",
        type: "Middle Eastern",
        rating: 4.0,
        reviews: 60,
        price: 220,
        totalPrice: 220,
        icon: "mdi-fire-circle",
        image:
          "https://www.pumpkinnspice.com/wp-content/uploads/2021/07/end-of-june-401.jpg",
      },
    ],
    cart: [],
    tableList: [
      {
        orderId: 0,
        id: 1,
        name: 'Table',
        allocated: false,
      },
      {
        orderId: 0,
        id: 2,
        name: 'Table',
        allocated: false,
      },
      {
        orderId: 0,
        id: 3,
        name: 'Table',
        allocated: false,
      },
      {
        orderId: 0,
        id: 4,
        name: 'Window Side North',
        allocated: false,
      },
      {
        orderId: 0,
        id: 5,
        name: 'Table',
        allocated: false,
      },
      {
        orderId: 0,
        id: 6,
        name: 'Table',
        allocated: false,
      },
      {
        orderId: 0,
        id: 7,
        name: 'Window Side South',
        allocated: false,
      },
    ],
    reservedOrders: [],
  },
  getters: {
    getMenus: (state) => state.menuItems,
    getCart: (state) => state.cart,
    getTableList: (state) => state.tableList,
    getReservedOrders: (state) => state.reservedOrders,
  },
  mutations: {
    addToCart(state, menuItem){
      let exists = false;

      state.cart.forEach((item) => {
        if(menuItem.id === item.id){
          item.count++;
          item.totalPrice = item.price + item.totalPrice;
          exists = true;
        }
      })
      if(!exists){
        state.cart.push({...menuItem, 'count': 1});
      }
    },

    assignTable(state, tableId){
      const table = state.tableList.find((table) => table.id === tableId);

      if(table && !table.allocated){
        if(table.orderId == 0){
          table.allocated = true;
          table.orderId = Date.now();
        }

        // state.tableList.push({...table})

        state.reservedOrders.push({
          tableId: tableId,
          allocated: table.allocated,
          orderId: table.orderId,
          cart: [...state.cart]
        });
      }

    },

    incrementItem(state, itemId){
      const item = state.cart.find((item) => item.id === itemId);
      if(item){
        item.count++;
        item.totalPrice = item.price + item.totalPrice;
      }
    },
    decrementItem(state, itemId){
      const index = state.cart.findIndex((item) => item.id === itemId);
      if(index != -1){
        if(state.cart[index].count > 1){
          state.cart[index].count--;
          state.cart[index].totalPrice = state.cart[index].totalPrice - state.cart[index].price;

        }
        else{
          state.cart.splice(index, 1);
        }
      }
    },
    clearCart(state){
      state.cart = [];
    }
  },
  actions: {
    assignTable({commit, state}, {tableId}){
      // const orderId = Date.now();
      const table = state.tableList.find((table) => table.id === tableId);
      if(table && !table.allocated){
        commit("assignTable", tableId);
        return `Order has reserved table ${tableId}.`;
      }
      else{
        return "Table is already reserved.";
      }
    },
  },
};

export default menuList
