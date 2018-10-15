import React, { Component } from 'react';
import PageHeader from '../../components/utility/pageHeader';
import Box from '../../components/utility/box';
import { connect } from 'react-redux';
import LayoutWrapper from '../../components/utility/layoutWrapper';
import { Spin } from 'antd';
import { firebaseApp } from '../../helpers/firebase';
import OrderHistoryTableView from '../Order/antTable/OrderHistoryTableView';
import { tableInfos } from '../Order/antTable/tableConfig';

// import {fake_dataHistory} from '../Order/antTable/tableTestData';

class OrderHistory extends Component {

  constructor(props) {
    super(props);

    // firebase
    this.ordersHistoryRef = firebaseApp.database().ref(`/orders_history/-user${this.props.userInfo.uuid}`);

    this.getOrdersHistory = this.getOrdersHistory.bind(this);
    
    this.state = {
      loading: true,
      dataByHistory: []
    }
  }

  componentDidMount() {
    this.setState({ loading: true });
    this.ordersHistoryRef.on('value', this.getOrdersHistory);
  }
  componentWillUnmount() {
    this.ordersHistoryRef.off('value');
  }

  getOrdersHistory(snap) {
    const orders_history = snap.val();
    console.log('ordersHistoryRef.on');
    //
    // for ByHistory
    //
    const dataByHistory = [];
    if (orders_history) {
      const vendorKeys = Object.keys(orders_history);
      vendorKeys.forEach((vendorKey,index) => {
        
        // get vendor name
        firebaseApp.database().ref(`/vendors/-user${this.props.userInfo.uuid}/${vendorKey}/name`).once('value').then(snapVName => {
          const vendor_name = snapVName.val();
          orders_history[vendorKey].forEach(orderItem => {
            const one = {
              key: vendorKey+orderItem.index_num,
              orderDate: orderItem.order_date,
              time: orderItem.order_time,
              order: orderItem.index_num,
              vendor: vendor_name,
              sentBy: orderItem.sent_by,
              deliveryDate: orderItem.delivery_date,
              total: orderItem.total,
              products: []
            };
            Object.keys(orderItem.products).forEach(productKey => {
              one.products.push(orderItem.products[productKey]);
            });
            dataByHistory.push(one);
          });
          
          if (index === (vendorKeys.length-1)) {
            this.setState({ dataByHistory, loading: false });
          }
        });

      });
    } else {
      this.setState({ loading: false });
    }
  }

  render() {
    const { loading, dataByHistory } = this.state;
    return (
      <LayoutWrapper>
        <PageHeader>ORDER HISTORY</PageHeader>

        <Box>
          { loading && 
            <Spin size="large" style={{marginLeft: 30}} />
          }
          <OrderHistoryTableView tableInfo={tableInfos[2]} dataList={dataByHistory}/>
        </Box>

      </LayoutWrapper>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    userInfo: state.Auth.get('userInfo'),
  }
};

export default connect(mapStateToProps,
null)(OrderHistory)