const menuList = {
  namespaced: true,
  state: {

  productList: [
      {
        id: 1,
        name: "Nanna Kacchi",
        type: "Rice Dishes",
        rating: 4.5,
        reviews: 100,
        price: 350,
        totalPrice: 350,
        quantity: 0,
        vat: true,
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
        quantity: 0,
        vat: true,
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
        quantity: 0,
        vat: true,
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
        quantity: 0,
        vat: true,
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
        quantity: 0,
        vat: true,
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
        quantity: 0,
        vat: true,
        icon: "mdi-fire-circle",
        image:
          "https://www.pumpkinnspice.com/wp-content/uploads/2021/07/end-of-june-401.jpg",
      },
    ],

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

    selectedList: [],
    orderList: [],    //To store all orders(each order = orderId + menu)

  },
  getters: {
    getProductList: (state) => state.productList,
    getSelectedList: (state) => state.selectedList,
    selectListLength: (state) => state.selectedList.length,
    getOrderList: (state) => state.orderList,

    getTableList: (state) => state.tableList,
  },
  mutations: {
    //Added all orders in OrderList
    addInList(state, currOrder){
      state.orderList.push(currOrder);
    },


    addMenu(state, menu){
      state.selectedList.push(menu);
    },
    removeMenu(state, menu){
      let menuIndex = state.selectedList.findIndex(ele => ele.id == menu.id);
      state.selectedList.splice(menuIndex, 1);
    },
    resetSelectState(state){
      state.selectedList = [];
    }

  },


  actions: {
    addOrder({commit}, currOrder){
      commit("addInList", currOrder);
    },

    addMenu(context, menu){
      context.commit("addMenu", menu);
    },

    removeMenu(context, menu){
      context.commit('removeMenu', menu);
    },
  },
};

export default menuList
