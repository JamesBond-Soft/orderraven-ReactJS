const fake_dataByVendor = [
  {
    "vendor": "Chef's Warehouse",
    "products": [
      {
        "key": "0",
        "item": "Applewood Bacon 10-12",
        "active": 1,
        "location": "Kitchen",
        "catalog": "81819",
        "description": "15 lb. case",
        "price": 55.20,
        "par": 2,
        "order": 2,
        "total": 110.40
      },
      {
        "key": "1",
        "item": "Brie Wheel",
        "active": 0,
        "location": "Kitchen",
        "catalog": "CB155",
        "description": "2lb EA",
        "price": 9.54,
        "par": 9,
        "order": 4,
        "total": 38.16
      },
      {
        "key": "2",
        "item": "Carr's Water Crackers-case",
        "active": 1,
        "location": "Kitchen",
        "catalog": "VN170165",
        "description": "4.25oz pack, 12 in case",
        "price": 48.80,
        "par": 1.5,
        "order": 0,
        "total": 0
      },
    ]
  },
  {
    "vendor": "Sysco",
    "products": [
      {
        "key": "0",
        "item": "Applewood Bacon 10-12",
        "active": 0,
        "location": "Kitchen",
        "catalog": "81819",
        "description": "15 lb. case",
        "price": 55.20,
        "par": 2,
        "order": 2,
        "total": 110.40
      },
      {
        "key": "1",
        "item": "Brie Wheel",
        "active": 1,
        "location": "Kitchen",
        "catalog": "CB155",
        "description": "2lb EA",
        "price": 9.54,
        "par": 9,
        "order": 4,
        "total": 38.16
      },
      {
        "key": "2",
        "item": "Carr's Water Crackers-case",
        "active": 0,
        "location": "Kitchen",
        "catalog": "VN170165",
        "description": "4.25oz pack, 12 in case",
        "price": 48.80,
        "par": 1.5,
        "order": 0,
        "total": 0
      },
    ]
  },
];

const fake_dataByLocation = [
  {
    "location": "Kitchen",
    "products": [
      {
        "key": "0",
        "item": "Applewood Bacon 10-12",
        "active": 1,
        "vendor": "Chef's Warehouse",
        "catalog": "81819",
        "description": "15 lb. case",
        "price": 55.20,
        "par": 2,
        "order": 2,
        "total": 110.40
      },
      {
        "key": "1",
        "item": "Brie Wheel",
        "active": 1,
        "vendor": "Chef's Warehouse",
        "catalog": "CB155",
        "description": "2lb EA",
        "price": 9.54,
        "par": 9,
        "order": 4,
        "total": 38.16
      },
    ]
  },
  {
    "location": "Storage",
    "products": [
      {
        "key": "0",
        "item": "Applewood Bacon 10-12",
        "active": 1,
        "vendor": "Chef's Warehouse",
        "catalog": "81819",
        "description": "15 lb. case",
        "price": 55.20,
        "par": 2,
        "order": 2,
        "total": 110.40
      },
      {
        "key": "1",
        "item": "Brie Wheel",
        "active": 1,
        "vendor": "Chef's Warehouse",
        "catalog": "CB155",
        "description": "2lb EA",
        "price": 9.54,
        "par": 9,
        "order": 4,
        "total": 38.16
      },
    ]
  },
];

const fake_dataHistory = [
  {
    "key": "0",
    "orderDate": "04/27/2016",
    "time": "1:36pm",
    "order": "1535",
    "vendor": "Ace Beverage",
    "sentBy": "email",
    "deliveryDate": "04/28/2016",
    "total": 110.40
  },
  {
    "key": "1",
    "orderDate": "05/01/2016",
    "time": "1:36pm",
    "order": "1535",
    "vendor": "Ace Beverage",
    "sentBy": "email",
    "deliveryDate": "05/02/2016",
    "total": 210.40
  },
  {
    "key": "2",
    "orderDate": "04/27/2016",
    "time": "1:36pm",
    "order": "1535",
    "vendor": "Ace Beverage",
    "sentBy": "email",
    "deliveryDate": "04/28/2016",
    "total": 310.40
  },
]

export { fake_dataByVendor, fake_dataByLocation, fake_dataHistory }