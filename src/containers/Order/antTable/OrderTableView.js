import React, { Component } from 'react';
import { connect } from 'react-redux';
import clone from 'clone';
import Table from '../rcTable/src/index';
import '../rcTable/assets/index.less';
import '../rcTable/assets/animation.less';
//import '../../../style/style.less';
import Button from '../../../components/uielements/button';
// import DatePicker from '../../../components/uielements/datePicker';
import DayPicker from '../dayPicker';
import Menu from '../../../components/uielements/menu';
import Input from '../../../components/uielements/input';
import Dropdown from '../../../components/uielements/dropdown';
import Switch from '../../../components/uielements/switch';
// import moment from 'moment';
import { Icon, Row, Col, Select, Popconfirm, notification } from 'antd';
import { EditableCell } from './helperCells';
import StarCell from './starCell';
import OrderCell from './orderCell';
// import { DATEformat } from '../../../config.js';
import { firebaseApp } from '../../../helpers/firebase';
import { round } from '../../../helpers/common';
import ReactDragListView from 'react-drag-listview';
import OrderActions from '../../../redux/order/actions';
// import jsonQuery from 'json-query';

const setVendorMemo = OrderActions.setVendorMemo;

type MemoProps = {
  vendorUuid: number,
  vendorMemos: any,
  setVendorMemo: (vendorUuid, memo) => {}
}
class MemoInput extends Component<void, MemoProps, *> {
  props: MemoProps;

  onChange(e) {
    this.props.setVendorMemo(this.props.vendorUuid, e.target.value);
    this.forceUpdate();
  }

  render() {
    const { vendorMemos, vendorUuid } = this.props;
    let memo = vendorMemos[vendorUuid];
    if (!memo) memo = '';
    return (
      <Input onChange={this.onChange.bind(this)} value={memo} placeholder="ADD DELIVERY MEMO" size="small" style={{width: 200, backgroundColor: "#fafa90"}} />
    )
  }
}
const MemoComp = connect((state) => {
  return {
    vendorMemos: state.Order.vendorMemos
  }
}, { setVendorMemo })(MemoInput);

class OrderTableView extends Component {

  constructor(props) {
    super(props);
    this.renderTableHeader = this.renderTableHeader.bind(this);
    this.renderTableFooter = this.renderTableFooter.bind(this);
    this.onSendClick = this.onSendClick.bind(this);
    this.onStarCellClick = this.onStarCellClick.bind(this);
    this.onOrderCellChange = this.onOrderCellChange.bind(this);
    this.onDeleteCell = this.onDeleteCell.bind(this);
    this.onAddProduct = this.onAddProduct.bind(this);
    this.recreateColumns = this.recreateColumns.bind(this);
    this.updateDataState = this.updateDataState.bind(this);
    this.onShowInactives = this.onShowInactives.bind(this);
    this.handleSendbyChange = this.handleSendbyChange.bind(this);
    this.renderOrderCell = this.renderOrderCell.bind(this); //bind renderOrderCell
    this.handleMemoChange = this.handleMemoChange.bind(this)//bind Memo value
    this.dragSort = this.dragSort.bind(this);
    this.setSortingState = this.setSortingState.bind(this);
    
    this.firstEditableColumnKey = null;
    this.indexWillEdit = -1;
    this.objectDidEditByLocation = undefined;
    this.showInactives = false;
    this.dataList_filtered = this.props.dataList;
    this.state = {
      data: [],     // filtered data
      sorting: false,
      memo: 'aaaaa',
    }
    this.columns = this.recreateColumns(clone(this.props.tableInfo.columns));

    const that = this;
    this.dragProps = {
        onDragEnd(fromIndex, toIndex) {
          that.dragSort(fromIndex, toIndex);
        },
        handleSelector: "button"
    };
  }

  setSortingState(value) {
    this.setState({ sorting: value });
  }

  dragSort(fromIndex, toIndex) {
    const { vendor, header, userInfo, dataList } = this.props;
    const { data } = this.state;
    const targetUuid = data[fromIndex].key;

    var array = [];
    if (vendor === true) {
      array = header.order.products_sort;
    } else {
      array = dataList.map(product => {
        return product.key;
      });
    }
    let arrayIndex = array.indexOf(targetUuid);
    array.splice(arrayIndex, 1);
    array.splice(toIndex, 0, targetUuid);
  
    if (vendor === true) {
      const vendorUuid = header.uuid;
      firebaseApp.database().ref(`/vendors/-user${userInfo.uuid}/-vendor${vendorUuid}/order/products_sort`).set(array).then(value => {
      }).catch(err => {
        notification['error']({
          message: 'Could not change the order',
          description: err.message,
        });
      })
    } else {
      firebaseApp.database().ref(`/locations/-user${userInfo.uuid}/${header.array_index}/products_sort`).set(array).then(value => {
      }).catch(err => {
        notification['error']({
          message: 'Could not change the order',
          description: err.message,
        });
      })
    }
  }

  updateDataState(dataList) {
    this.dataList_filtered = dataList;
    if (this.showInactives === false) {
      this.dataList_filtered = dataList.filter(record => {
        return record.active === 1;
      });
    }
    this.setState({
      data: this.recreateDataAll(this.props.tableInfo.columns, this.dataList_filtered)
    });
  }

  componentDidMount() {
    this.updateDataState(this.props.dataList);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.contentChanged !== nextProps.contentChanged || this.props.header !== nextProps.header || this.props.dataList !== nextProps.dataList) {
      this.updateDataState(nextProps.dataList);
    }
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.contentChanged !== nextProps.contentChanged || this.props.header !== nextProps.header || this.props.dataList !== nextProps.dataList || this.state.data !== nextState.data) {
      return true;
    }
    return false;
  }
  componentDidUpdate(prevProps, prevState) {
    if ((!this.props.vendor) || (this.props.vendor && this.props.header.order.products_sort.length !== prevProps.header.order.products_sort.length)) {
      if (this.indexWillEdit >= 0) {
        this.edit(this.indexWillEdit);
        this.indexWillEdit = -1;
      }
    }
    if (this.objectDidEditByLocation !== undefined) {
      this.updateLocationFirebase(this.objectDidEditByLocation);
      this.objectDidEditByLocation = undefined;
    }
  }
  
  
  recreateDataOne(columns, record, isNew=false) {
    const newRecord = {...record};
    for (let i=0; i<columns.length; i++) {
      const recordKey = columns[i].key;
      if (columns[i].editable === true) {
        const obj = {};
        obj.editable = false;
        if (isNew === false)
          obj.value = record[recordKey];
        else
          obj.value = columns[i].default;
        newRecord[recordKey] = obj;
      } else if (isNew === true) {
        newRecord[recordKey] = columns[i].default;
      }
    }
    return newRecord;
  }

  recreateDataAll(columns, dataList) {
    const data = dataList.map((record) => {
      return this.recreateDataOne(columns, record);
    });
    return data;
  }
  //Handle Input change


  recreateColumns(columns) {

    // editable columns
    for (let i=0; i<columns.length; i++) {
      if (columns[i].editable === true) {
        const key = columns[i].key;
        if (this.firstEditableColumnKey === null) {
          this.firstEditableColumnKey = key;
        }

        columns[i].render = (text, record, index) => this.renderEditableColumns(this.state.data, index, key, record, columns[i].className, columns[i].editType, this.props.vendor)
      }
    }

    // action column
    const actionMenu = (index) => (
      <Menu>
        <Menu.Item>
          <a onClick={() => this.edit(index)} ><Icon type="edit" style={{paddingRight:8}} />Edit</a>
        </Menu.Item>
        <Menu.Item>
          <Popconfirm
            title="Sure to delete?"
            okText="DELETE"
            cancelText="No"
            onConfirm={() => this.onDeleteCell(index)}>
            <a ><Icon type="delete" style={{paddingRight:8}} />Delete</a>
          </Popconfirm>
          
        </Menu.Item>
      </Menu>
    );
    const actionColumn = {
      title: ' ',
      dataIndex: 'operation',
      className: 'column-align-center',
      render: (text, record, index) => {
        const { editable } = this.state.data[index][this.firstEditableColumnKey];
        return (
          <div>
            { editable ?
              <div>
                <div>
                  <Button icon="check-square-o" size="small" onClick={() => this.editDone(index, 'save')} ></Button>
                </div>
                <div>
                  <Popconfirm title="Sure to cancel?" onConfirm={() => this.editDone(index, 'cancel')}>
                    <Button icon="close-circle" size="small" ></Button>
                  </Popconfirm>
                </div>
              </div>
              :
              <Dropdown overlay={actionMenu(index)} placement="bottomCenter" trigger={['click']}>
                <Button icon="bars" size="small" ></Button>
              </Dropdown>
            }
          </div>
        );
      },
    };
    columns.push(actionColumn);

    const colStarCell = 1;
    columns[colStarCell].render = (text, record, index) => 
      <StarCell
        index={index}
        columnsKey={columns[colStarCell].key}
        isActive={text[columns[colStarCell].key]===1 ? true : false}
        onClick={this.onStarCellClick} />;

    const colOrderCell = 3;
    columns[colOrderCell].render = (text, record, index) => {
      return this.renderOrderCell(text, index, columns);
    }

    return columns;
  }
//OrderCell render
  renderOrderCell(text, index, columns) {
    const colOrderCell = 3;
    const {data} = this.state;
    return <OrderCell
        index={index}
        columnsKey={columns[colOrderCell].key}
        value={text[columns[colOrderCell].key]}
        isEditing={data[index]['item'].editable} //Prop get state when click edit.
        onClick={this.onOrderCellChange} />;
  }

  // for rendering of editableCell
  renderEditableColumns(data, index, key, record, alignClass, editType, vendor) {
    const { editable, value, status } = data[index][key];
    if (typeof editable === 'undefined') {
      return record[key];
    }
    let textAlign = 'left';
    if (alignClass === 'column-align-right')
      textAlign = 'right';
    else if (alignClass === 'column-align-center')
      textAlign = 'center';

    return (<EditableCell
      isSelectCell={editType==="dropdown"?true:false}
      valuesSelectCell={vendor===true ? this.props.locationNames : this.props.vendorNames}
      editable={editable}
      value={value}
      onChange={(org_value, value) => this.onEditableCellChange(value, key, index, org_value)}
      status={status}
      textAlign={textAlign}
    />);
  }
  // for editableCell
  onEditableCellChange(value, key, index, org_value) {
    // const { data } = this.state;
    // console.log('data = ', data);
    // data[tableRowIndex][key].value = value;
    // this.setState({ data });
    // this.forceUpdate();

    if (this.props.vendor === true) {
      if (org_value !== value) {
        this.updateSpecFirebase(value, key, index);
      }
    } else {
      if (org_value !== value) {
        if (this.objectDidEditByLocation === undefined) {
          this.objectDidEditByLocation = this.dataList_filtered[index];
        }
        this.objectDidEditByLocation[key] = value;
      }
    }
  }
  // for edit button & action
  edit(index) {
    const { data } = this.state;
    if (index >= data.length)
      return;
    Object.keys(data[index]).forEach((item) => {
      if (data[index][item] && typeof data[index][item].editable !== 'undefined') {
        data[index][item].editable = true;
      }
    });
    this.setState({ data });
    this.forceUpdate();
  }
  editDone(index, type) {
    const { data } = this.state;
    Object.keys(data[index]).forEach((item) => {
      if (data[index][item] && typeof data[index][item].editable !== 'undefined') {
        data[index][item].editable = false;
        data[index][item].status = type;
      }
    });
    this.setState({ data }, () => {
      Object.keys(data[index]).forEach((item) => {
        if (data[index][item] && typeof data[index][item].editable !== 'undefined') {
          delete data[index][item].status;
        }
      });
    });
    this.forceUpdate();
  }


  onSendClick() {
    console.log("onSendClick...");
    this.props.onSend(this.props.header, this.props.tableInfo.columns, this.props.dataList);
  }

  onStarCellClick(isActive, key, index) {
    // const { data } = this.state;
    // data[index][key] = isActive?1:0;
    // this.setState({ data });

    const value = isActive?1:0;
    this.updateSpecFirebase(value, key, index);
  }
  onOrderCellChange(value, key, index) {
    // const { data } = this.state;
    // data[index][key] = value;
    // data[index]['total'] = data[index]['price'] * value;
    // this.setState({ data });

    const org_value = this.dataList_filtered[index][key];  // console.log('org_value = ' + org_value);
    if (value !== org_value) {
      this.updateSpecFirebase(value, key, index);

      const countDiff = value - org_value;
      const totalDiff = countDiff * this.dataList_filtered[index].price;
      const total = round(this.dataList_filtered[index].total + totalDiff, 2);
      this.updateSpecFirebase(total, 'total', index);
      this.readAndUpdateOrderCarts(index, countDiff, totalDiff);
    }
  }
  onDeleteCell(index) {
    // const { data } = this.state;
    // data.splice(index, 1);
    // this.setState({ data });

    const { vendor, header, userInfo } = this.props;
    const vendorUuid = vendor===true ? header.uuid : this.dataList_filtered[index].vendor_uuid;

    // delete on products_sort array first...
    let productUuid = this.dataList_filtered[index].key;

    // let arrayIndex = header.order.products_sort.indexOf(productUuid);
    firebaseApp.database().ref(`/vendors/-user${userInfo.uuid}/-vendor${vendorUuid}/order/products_sort`).once('value').then(snap => {
      const products_sort = snap.val();
      let arrayIndex = products_sort.indexOf(productUuid);
      products_sort.splice(arrayIndex, 1);
      firebaseApp.database().ref(`/vendors/-user${userInfo.uuid}/-vendor${vendorUuid}/order/products_sort`).set(products_sort).then(value => {

        // before delete, need to update order.countOfCarts, order.total
        const productRef = firebaseApp.database().ref(`/vendors/-user${userInfo.uuid}/-vendor${vendorUuid}/order/products/-product${productUuid}`);
        productRef.once('value').then(snap => {
          const product = snap.val();
          this.readAndUpdateOrderCarts(index, -product.qty, -product.total);
          // and then delete
          productRef.remove().then(err => {
            if (err) {
              notification['error']({
                message: 'Could not change new value',
                description: err.message,
              });
            } else {
              notification['success']({
                message: 'Deleted one product',
                description: '',
              });
            }
          });
        });
      }).catch(err => {
        notification['error']({
          message: 'Could not delete the product information',
          description: err.message,
        })
      })
    }).catch(error => {
      notification['error']({
        message: 'Could not delete the product information',
        description: error.message,
      })
    })
  };

  readAndUpdateOrderCarts(index, countDiff, totalDiff) {
    const { vendor, header, userInfo } = this.props;
    const vendorUuid = vendor===true ? header.uuid : this.dataList_filtered[index].vendor_uuid;
    const countRef = firebaseApp.database().ref(`/vendors/-user${userInfo.uuid}/-vendor${vendorUuid}/order/countOfCarts`);
    countRef.once('value').then(snap => {
      const countOfCarts = snap.val() + countDiff;
      countRef.set(countOfCarts).then(err => {
        if (err) {
          notification['error']({
            message: 'Could not change new value',
            description: err.message,
          });
        }
      });
    });
    const totalRef = firebaseApp.database().ref(`/vendors/-user${userInfo.uuid}/-vendor${vendorUuid}/order/total`);
    totalRef.once('value').then(snap => {
      const totalWhole = round(snap.val() + totalDiff, 2);
      totalRef.set(totalWhole).then(err => {
        if (err) {
          notification['error']({
            message: 'Could not change new value',
            description: err.message,
          });
        }
      });
    });
  }
  updateSpecFirebase(value, key, index) {
    const { vendor, header, userInfo } = this.props;
    const vendorUuid = (vendor === true) ? header.uuid : this.dataList_filtered[index].vendor_uuid;
    firebaseApp.database().ref(`/vendors/-user${userInfo.uuid}/-vendor${vendorUuid}/order/products/-product${this.dataList_filtered[index].key}/${key}`).set(value).then(err => {
      if (err) {
        notification['error']({
          message: 'Could not change new value',
          description: err.message,
        });
      }
    });
  }
  updateLocationFirebase(product) {
    /* prodcut = {
      "item": "cake",
      "active": 1,
      "location": "location0",
      "catalog": "BY7283",
      "description": "deasss dfd",
      "price": 55.2,
      "par": 2,
      "qty": 0,
      "total": 0,
      "key": "123121231231",
      "vendor": "vendor0",
      "vendor_uuid": ""
    } */
    const { vendorNames, vendorUuids, userInfo } = this.props;
    // const isNew = product.vendor_uuid === "" ? true : false;
    // update vendor_uuid with vendor-name
    const i = vendorNames.indexOf(product.vendor);
    if (i < 0) {
      notification['error']({
        message: 'Please select a vendor!',
      });
      return;
    }
    // build newValue
    const newValue = {
      "item": product.item,
      "active": product.active,
      "location": product.location,
      "catalog": product.catalog,
      "description": product.description,
      "price": product.price,
      "par": product.par,
      "qty": product.qty,
      "total": product.total,
      "key": product.key
    };
    firebaseApp.database().ref(`/vendors/-user${userInfo.uuid}/-vendor${vendorUuids[i]}/order/products/-product${product.key}`).update(newValue).then(err => {
      if (err) {
        notification['error']({
          message: 'Could not update the product information',
          description: err.message,
        });
      } else {
        firebaseApp.database().ref(`/vendors/-user${userInfo.uuid}/-vendor${vendorUuids[i]}/order/products_sort`).once('value').then(snap => {
          const newIndex = snap.numChildren();
          firebaseApp.database().ref(`/vendors/-user${userInfo.uuid}/-vendor${vendorUuids[i]}/order/products_sort/${newIndex}`).set(product.key);
        }).catch(error => {
          notification['error']({
            message: 'Could not add the product information',
            description: err.message,
          });
        })
      }
    });
  }
  onAddProduct() {
    const { vendor, header, userInfo } = this.props;
    const newIndex = this.dataList_filtered.length;
    this.indexWillEdit = newIndex;
    const newUuid = Date.now();
    const newKey = "-product" + newUuid;
    if (vendor===true) {  // ByVendor
      const newData = {
        "item": "",
        "active": 1,
        "location": "Select Location...",
        "catalog": "",
        "description": "",
        "price": 0,
        "par": 0,
        "qty": 0,
        "total": 0,
        "key": newUuid
      }
      firebaseApp.database().ref(`/vendors/-user${userInfo.uuid}/-vendor${header.uuid}/order/products/${newKey}`).set(newData).then((err) => {
        if (err) {
          notification['error']({
            message: 'Could not add new product',
            description: err.message,
          });
        } else {
          firebaseApp.database().ref(`/vendors/-user${userInfo.uuid}/-vendor${header.uuid}/order/products_sort/${header.order.products_sort.length}`).set(newUuid);
          notification['success']({
            message: 'Added new product',
            description: 'You can edit the information of the product! Or if you want to cancel this action then touch the delete button on right side!',
          });
        }
      });

    } else {  // ByLocation
      var newDataList = this.dataList_filtered;
      const newData = {
        "item": "",
        "active": 1,
        "location": header.name,
        "catalog": "",
        "description": "",
        "price": 0,
        "par": 0,
        "qty": 0,
        "total": 0,
        "key": newUuid,
        "vendor": "Select Vendor...",
        "vendor_uuid": ""
      };
      newDataList.push(newData);
      this.updateDataState(newDataList);
    }
  }

  onShowInactives(checked) {
    this.showInactives = checked;
    this.updateDataState(this.props.dataList);
  }

  handleSendbyChange(value) {
    console.log(`selected ${value}`);
    const vendorUuid = this.props.header.uuid;
    const userInfo = this.props.userInfo;
    firebaseApp.database().ref(`/vendors/-user${userInfo.uuid}/-vendor${vendorUuid}/order/sent_by`).set(value).then(err => {
      if (err) {
        notification['error']({
          message: 'Could not update the sent-by method',
          description: err.message,
        });
      }
    });
  }
  // only for vendor tab
  handleDeliveryDateChange = (date, dateString) => {
    // must change 'vendors/-vendor123/order/delivery_date'
    const vendorUuid = this.props.header.uuid;
    const userInfo = this.props.userInfo;
    firebaseApp.database().ref(`/vendors/-user${userInfo.uuid}/-vendor${vendorUuid}/order/delivery_date`).set(dateString).catch(err => {
      notification['error']({
        message: 'Could not update the delivery date',
        description: err.message
      });
    });
  }

  renderTableHeader() {
    const { header } = this.props;
    return (
      <div>
        <Row type="flex" justify="space-between" align="middle">
          <Col>Rep: {header.rep}</Col>
          <Col>{header.phone}</Col>
          <Col>{header.email}</Col>
          <Col>{header.notes}</Col>
          <Col>
            <span style={{paddingRight:5}}>Send by:</span>
            <Select defaultValue={header.order.sent_by} size="small" onChange={this.handleSendbyChange}>
              <Select.Option value="email">email</Select.Option>
              <Select.Option value="text">text</Select.Option>
            </Select>
          </Col>
        </Row>
      </div>
    );
  }

  handleMemoChange(value) {
    console.log(value);
    this.setState({ memo: 'B' })
  }
  
  renderTableFooter(currentPageData, vendor) {
    const { header } = this.props;
    let delivery_date;
    if (vendor === true) {
      delivery_date = header.order.delivery_date!=="" ? header.order.delivery_date : 'Next Available';
    }
    
    return (
      <div>
        <Row type="flex" align="middle" style={{paddingTop:8}} >
          <Button icon="plus-square" size="small" type="primary" onClick={this.onAddProduct}>Add Product</Button>
          <Switch checkedChildren={<img src="/images/star-white.png" width="20" alt="Hide inactive products" />}
                  unCheckedChildren={<img src="/images/star-red.png" width="20" alt="Show inactive products" />}
                  style={{marginLeft:7}}
                  onChange={this.onShowInactives} />
          <font size="1" style={{marginLeft:4}}>Show/Hide Inactive Products</font>
          {/* <Button icon="star-o" size="small" type="dashed" style={{paddingLeft:10}} >Show inactive products</Button> */}
          { vendor &&
          <Col style={{marginLeft: "auto"}}>
            <font size="4">${header.order.total.toFixed(2)}</font>
          </Col>
          }
        </Row>
        { vendor &&
        <Row type="flex" justify="space-between" align="middle">
          <Col>
            <font size="4" style={{marginLeft:300}}>DELIVER ON </font>
            {/* <DatePicker onChange={this.handleDeliveryDateChange} size="small" defaultValue={moment(delivery_date, DATEformat)} format={DATEformat} ></DatePicker> */}
            <DayPicker onChange={this.handleDeliveryDateChange} defaultValue={delivery_date} />
        </Col>
          <Col>
            <MemoComp vendorUuid={header.uuid} />
          </Col>
          <Col>
            <Button size="small" type="secondary" onClick={this.onSendClick}>SEND</Button>
          </Col>
        </Row>
        }
      </div>
    );
  }

  render() {
    const { vendor } = this.props;
    const { data } = this.state;
    // console.log("userInfo-----", this.props.userInfo);
    var dataSource = data.map((record, index) => {
     // record[total] = record[total].toFixed(2);
      const obj = {};
      Object.keys(record).forEach(key => {
        const val = record[key];
        obj[key] = record[key].value===undefined ? val : record[key].value;
      });
      return obj;
    });

    return (
      <div>
        {vendor && this.renderTableHeader(vendor)}
        <div className="isoEditableTable">
          {/* <Spin spinning={this.state.sorting}> */}
            <ReactDragListView {...this.dragProps}>
              <Table 
                columns={this.columns}
                data={dataSource}
                bordered={false}
                pagination={false}
                scroll={{ x: 500 }}//horizon scroll
                footer={(currentPageData) => this.renderTableFooter(currentPageData, vendor)} />
            </ReactDragListView>
          {/* </Spin> */}
        </div>
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    contentChanged: state.Order.contentChanged,
    locationNames: state.Order.locationNames,
    vendorNames: state.Order.vendorNames,
    vendorUuids: state.Order.vendorUuids,
  }
};

export default connect(mapStateToProps, { setVendorMemo })(OrderTableView);
