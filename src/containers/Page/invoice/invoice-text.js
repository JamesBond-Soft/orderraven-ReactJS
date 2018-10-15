import React from 'react';
import { Input, Button } from 'antd';

// const columns = [
//   {
//     title: 'ITEM',
//     dataIndex: 'item',
//     key: 'item',
//     className: 'itemName',
//   },{
//     title: 'CATALOG #',
//     dataIndex: 'catalog',
//     key: 'catalog',
//     className: 'itemName',
//   }, {
//     title: 'DESCRIPTION',
//     dataIndex: 'description',
//     key: 'description',
//     className: 'itemName',
//   }, {
//     title: 'ORDER',
//     dataIndex: 'order',
//     key: 'order',
//   }
// ];

// const data = [{
//   key: '1',
//   index: '1',
//   item: 'Applewood Bacon',
//   catalog: '81819',
//   description: 'aaaaa',
//   order: '2',
// }, {
//   key: '2',
//   index: '2',
//   item: 'Applewood Bacon',
//   catalog: '81819',
//   description: 'bbbb',
//   order: '2',
// }, {
//   key: '3',
//   index: '3',
//   item: 'Applewood Bacon',
//   catalog: '81819',
//   description: 'ccc',
//   order: '2',
// }];

const { TextArea } = Input;

export default class InvoiceText extends React.Component {
  state = {
    pagination: false,
  }

  render() {
    const restaurantName = "xxx";
    const value = `ORDER FROM: ${restaurantName}\n
For: 06/14/2016\n
------------------------------
Applewood Bacon 1012\n
81819\n
QTY: 2\n`;

    return (
      <div className="isoInvoicePageWrapper">
        <div className="isoPageHeader">
          <h1 className="isoPageTitle">Send by Text</h1>
        </div>
        
        <div className="isoPageContent">
          <TextArea rows={20} disabled={true} autosize={true} value={value} />
          <div className="isoButtonWrapper">
            <Button type="primary">Send</Button>
          </div>
        </div>
      </div>
    );
  }

}
