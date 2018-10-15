import clone from 'clone';
import { DateCell, ImageCell, LinkCell, TextCell } from './helperCells';

var fieldValue ="";
const renderCell = (record, type, key) => {
  if (key==="total"){
    fieldValue = record[key].toFixed(2);
  }else {
    fieldValue = record[key];  
  }
  switch (type) {
    case 'ImageCell':
      return ImageCell(fieldValue);
    case 'DateCell':
      return DateCell(fieldValue);
    case 'LinkCell':
      return LinkCell(fieldValue);
    default:
      return TextCell(fieldValue);
  }
};

const allColumns = [
  /**
   * order by vendor
   */
  { // 0
    title: 'ITEM',
    key: 'item',
    default: '',
    editable: true,
    editType: 'input',
    // width: 100,
    render: record => renderCell(record, '', 'item')
  },
  { // 1
    title: ' ',
    key: 'active',
    default: 1,
    className: 'column-align-center',
    render: record => renderCell(record, '', 'active')
  },
  { // 2
    title: 'LOCATION',
    key: 'location',
    default: '',
    editable: true,
    editType: 'dropdown',
    render: record => renderCell(record, '', 'location')
  },
  { // 3
    title: 'CODE',
    key: 'catalog',
    default: '',
    editable: true,
    render: record => renderCell(record, '', 'catalog')
  },
  { // 4
    title: 'DESCRIPTION',
    key: 'description',
    default: '',
    editable: true,
    render: record => renderCell(record, '', 'description')
  },
  { // 5
    title: 'PRICE',
    key: 'price',
    default: 0,
    className: 'column-align-right',
    editable: true,
    render: record => renderCell(record, '', 'price')
  },
  { // 6
    title: 'PAR',
    key: 'par',
    default: 0,
    className: 'column-align-center',
    editable: true,
    render: record => renderCell(record, '', 'par')
  },
  { // 7
    title: 'ORDER',
    key: 'qty',
    default: 0,
    className: 'column-align-center',
    render: record => renderCell(record, '', 'qty')
  },
  { // 8
    title: 'TOTAL',
    key: 'total',
    default: 0,
    className: 'column-align-right',
    render: record => renderCell(record, '', 'total')
  },

  /**
   * order by location
   */
  { // 9
    title: 'VENDOR',
    key: 'vendor',
    default: '',
    editable: true,
    editType: 'dropdown',
    render: record => renderCell(record, '', 'vendor')
  },

  /**
   * order history
   */
  { // 10
    title: 'ORDER DATE',
    key: 'orderDate',
    render: record => renderCell(record, 'DateCell', 'orderDate')
  },
  { // 11
    title: 'TIME',
    key: 'time',
    render: record => renderCell(record, '', 'time')
  },
  { // 12
    title: 'ORDER #',
    key: 'order',
    render: record => renderCell(record, '', 'order')
  },
  { // 13
    title: 'SENT BY',
    key: 'sentBy',
    render: record => renderCell(record, '', 'sentBy')
  },
  { // 14
    title: 'DELIVERY DATE',
    key: 'deliveryDate',
    render: record => renderCell(record, 'DateCell', 'deliveryDate')
  },
  { // 15
    title: 'DELIVERY DATE',
    key: 'deliveryDate',
    render: record => renderCell(record, 'DateCell', 'deliveryDate')
  },
  /**
   * common
   */
  { // 
    title: 'eMail',
    key: 'email',
    render: record => renderCell(record, 'LinkCell', 'email')
  },
  { // 
    title: 'Date',
    key: 'date',
    render: record => renderCell(record, 'DateCell', 'date')
  },
  { // 
    title: 'Image',
    key: 'avatar',
    width: '1%',
    className: 'isoImageCell',
    render: record => renderCell(record, 'ImageCell', 'avatar')
  },
];

const byVendorColumns = [
  { ...allColumns[0] },
  { ...allColumns[1] },
  allColumns[6],
  allColumns[7],
  allColumns[2],
  allColumns[3],
  allColumns[4],
  allColumns[5],
  allColumns[8],
];
const byLocationColumns = [
  allColumns[0],
  allColumns[1],
  allColumns[6],
  allColumns[7],
  allColumns[9],
  allColumns[3],
  allColumns[4],
  allColumns[5],
  allColumns[8],
];

const historyColumns = [
  { ...allColumns[10], sorter: true },  
//  allColumns[10],
  allColumns[11],
  // allColumns[12], //Remove Order#
  { ...allColumns[9], sorter: true },
  allColumns[13],
  { ...allColumns[14], sorter: true},
  allColumns[8],
];

const historyExpandColumns = [
  allColumns[0],
  allColumns[3],
  allColumns[4],
  allColumns[5],
  {...allColumns[7],title:'QTY'},
  allColumns[8]
];

const tableInfos = [
  {
    title: 'Order By Vendor Table',
    value: 'order-vendor',
    columns: clone(byVendorColumns)
  },
  {
    title: 'Order By Location Table',
    value: 'order-location',
    columns: clone(byLocationColumns)
  },
  {
    title: 'Order History Table',
    value: 'order-history',
    columns: clone(historyColumns)
  },
  {
    title: 'Order History Expand Table',
    value: 'order-history-expand',
    columns: clone(historyExpandColumns)
  }
];

export { tableInfos };
