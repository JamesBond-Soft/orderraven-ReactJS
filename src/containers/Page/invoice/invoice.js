import React from 'react';
import { Button, Table } from 'antd';

const columns = [
  {
    title: 'ITEM',
    dataIndex: 'item',
    key: 'item',
    className: 'itemName',
  },{
    title: 'CATALOG #',
    dataIndex: 'catalog',
    key: 'catalog',
    className: 'itemName',
  }, {
    title: 'DESCRIPTION',
    dataIndex: 'description',
    key: 'description',
    className: 'itemName',
  }, {
    title: 'ORDER',
    dataIndex: 'order',
    key: 'order',
  }
];

const data = [{
  key: '1',
  index: '1',
  item: 'Applewood Bacon',
  catalog: '81819',
  description: 'aaaaa',
  order: '2',
}, {
  key: '2',
  index: '2',
  item: 'Applewood Bacon',
  catalog: '81819',
  description: 'bbbb',
  order: '2',
}, {
  key: '3',
  index: '3',
  item: 'Applewood Bacon',
  catalog: '81819',
  description: 'ccc',
  order: '2',
}];


export default class Invoice extends React.Component {
  state = {
    pagination: false,
  }

  render() {
    return (
      <div className="isoInvoicePageWrapper">
        <div className="isoPageHeader">
          <h1 className="isoPageTitle">Send by Email</h1>
        </div>

        <div className="isoPageContent">
          <div className="isoOrderInfo">
            <div className="isoLeftSideContent">
              <p className="isoNameEmail">
                <span className="isoEmail">To: vendor-email@test.com</span>
              </p>
              <p className="isoNameEmail">
                <span className="isoEmail">From: your-email@test.com</span>
              </p>
            </div>
          </div>

          <div className="isoLeftSideContent" style={{marginTop:20, marginBottom:20}}>
            <h3 className="isoTitle">Subject: Restaurat-Name order for Delivery-Date</h3>
          </div>

          <div className="isoInvoiceTable">
            <div className="isoSimpleTable">
              <Table {...this.state} columns={columns} dataSource={data} />
            </div>
            <div style={{marginTop:30}}>
              If there are any problems with this order please reply to this email or contact NAME at PHONE.
            </div>
          </div>

          <div className="isoButtonWrapper">
            <Button type="primary">Send</Button>
          </div>

        </div>
      </div>
    );
  }

}
