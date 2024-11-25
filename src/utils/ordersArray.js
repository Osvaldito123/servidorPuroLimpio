const ordersArray = [
    {
      status: "confirmada",
      clientName: "Facu",
      employee:"Jose",
      wholSale: false,
      createdAt: "2024-11-10T15:30:00Z",
      delivery: true,
      payMethod: "efectivo",
      newPromotionsId: [1, 2],
      productId: [
        { id: 1, quantity: 1 },
        { id: 2, quantity: 2 }
      ]
    },
    {
      status: "confirmada",
      clientName: "Lucía",
      employee:"Jose",
      wholSale: true,
      createdAt: "2024-11-10T18:45:00Z",
      delivery: false,
      payMethod: "tarjeta",
      newPromotionsId: [3],
      productId: [
        { id: 3, quantity: 5 },
        { id: 4, quantity: 3 }
      ]
    },
    {
      status: "cancelada",
      clientName: "Carlos",
      employee:"Jose",
      wholSale: false,
      createdAt: "2024-11-10T20:00:00Z",
      delivery: true,
      payMethod: "transferencia",
      newPromotionsId: [2],
      productId: [
        { id: 5, quantity: 3 },
        { id: 6, quantity: 1 }
      ]
    },
    {
      status: "confirmada",
      clientName: "María",
      employee:"Jose",
      wholSale: true,
      createdAt: "2024-10-01T09:30:00Z",
      delivery: false,
      payMethod: "efectivo",
      newPromotionsId: [1, 4],
      productId: [
        { id: 7, quantity: 2 },
        { id: 8, quantity: 4 }
      ]
    },
    {
      status: "confirmada",
      clientName: "Pedro",
      employee:"Jose",
      wholSale: false,
      createdAt: "2024-10-01T12:00:00Z",
      delivery: true,
      payMethod: "tarjeta",
      newPromotionsId: [2],
      productId: [
        { id: 9, quantity: 1 },
        { id: 10, quantity: 2 }
      ]
    },
    {
      status: "confirmada",
      clientName: "Ana",
      employee:"Jose",
      wholSale: false,
      createdAt: "2024-10-01T14:45:00Z",
      delivery: false,
      payMethod: "transferencia",
      newPromotionsId: [4, 5],
      productId: [
        { id: 11, quantity: 3 },
        { id: 12, quantity: 1 }
      ]
    },
    {
      status: "confirmada",
      clientName: "Miguel",
      employee:"Jose",
      wholSale: false,
      createdAt: "2024-10-05T08:30:00Z",
      delivery: true,
      payMethod: "efectivo",
      newPromotionsId: [3],
      productId: [
        { id: 9, quantity: 2 },
        
      ]
    },
    {
      status: "confirmada",
      clientName: "Sofía",
      employee:"Jose",
      wholSale: true,
      createdAt: "2024-10-05T13:15:00Z",
      delivery: false,
      payMethod: "tarjeta",
      newPromotionsId: [1],
      productId: [
        { id: 4, quantity: 2 },
        
      ]
    },
    {
      status: "cancelada",
      clientName: "David",
      employee:"Jose",
      wholSale: false,
      createdAt: "2024-10-05T16:00:00Z",
      delivery: true,
      payMethod: "transferencia",

      productId: [
        { id: 6, quantity: 1 },
        
      ]
    },
    {
      status: "confirmada",
      clientName: "Laura",
      employee:"Jose",
      wholSale: false,
      createdAt: "2024-10-10T10:30:00Z",
      delivery: false,
      payMethod: "efectivo",

      productId: [
        { id: 5, quantity: 4 },
        
      ]
    },
    {
      status: "confirmada",
      clientName: "Felipe",
      employee:"Jose",
      wholSale: false,
      createdAt: "2024-10-10T14:00:00Z",
      delivery: true,
      payMethod: "tarjeta",

      productId: [
        { id: 1, quantity: 1 },
        
      ]
    },
    {
      status: "confirmada",
      clientName: "Jorge",
      employee:"Jose",
      wholSale: true,
      createdAt: "2024-10-10T19:30:00Z",
      delivery: true,
      payMethod: "transferencia",

      productId: [
        { id: 7, quantity: 4 },
        
      ]
    },
    {
      status: "confirmada",
      clientName: "Natalia",
      employee:"Jose",
      wholSale: true,
      createdAt: "2024-10-15T09:00:00Z",
      delivery: true,
      payMethod: "efectivo",

      productId: [
        { id: 5, quantity: 5 },
        
      ]
    },
    {
      status: "confirmada",
      clientName: "Luis",
      employee:"Jose",
      wholSale: false,
      createdAt: "2024-10-15T12:45:00Z",
      delivery: false,
      payMethod: "tarjeta",

      productId: [
        { id: 6, quantity: 2 },
        
      ]
    },
    {
      status: "cancelada",
      clientName: "Verónica",
      employee:"Jose",
      wholSale: false,
      createdAt: "2024-10-15T18:00:00Z",
      delivery: true,
      payMethod: "transferencia",
      newPromotionsId: [],
      productId: [
        { id: 1, quantity: 1 },
        
      ]
    }
  ];
  module.exports = ordersArray;
  //console.log(orders);
  