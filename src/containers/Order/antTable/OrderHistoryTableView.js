import React, { Component } from 'react';
import Table from '../../../components/uielements/table';
import { tableInfos } from './tableConfig';
import moment from 'moment';
import { DATETIMEformat } from '../../../config.js';

const expandedRowRender = (dataList) => {
  return (
    <div className="isoEditableTable">
      <Table
        columns={tableInfos[3].columns}
        dataSource={dataList}
        pagination={false}
        size="small"
      />
    </div>
  );
};

export default class OrderHistoryTableView extends Component {

  constructor(props) {
    super(props);

    this.handleRowClick = this.handleRowClick.bind(this);
    this.handleExpandedRowsChange = this.handleExpandedRowsChange.bind(this);
    this.handleExpandIconClick = this.handleExpandIconClick.bind(this);
    this.onChange = this.onChange.bind(this);

    this.expandedRows = [];

    this.state = {
      expandedRows: [],
      dataList: this.props.dataList,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.dataList !== nextProps.dataList) {
      var sorter={columnKey: "orderDate", order: "descend", dataList: nextProps.dataList};
      this.onChange(null, null, sorter);
    }
  }
//sort change
  onChange(pagination, filter, sorter) {
    var { dataList } = this.state;
    if (sorter.dataList !== undefined)
      dataList = sorter.dataList;
    var dataListNew = [];
    if (sorter && sorter.columnKey && sorter.order) {
      if (sorter.order === 'ascend') {
        dataListNew = dataList.sort((a, b) => {
          var aVal = a[sorter.columnKey];
          var bVal = b[sorter.columnKey];
          if (aVal === null) aVal = "";
          if (bVal === null) bVal = "";
          if (aVal !== "") aVal = aVal.toUpperCase();
          if (bVal !== "") bVal = bVal.toUpperCase();

          if (sorter.columnKey === "orderDate") {
            // need to sort date & time
            aVal = moment(aVal + ' ' + a.time, DATETIMEformat).unix();
            bVal = moment(bVal + ' ' + b.time, DATETIMEformat).unix();
          }
    
          if (aVal > bVal) {
            return 1;
          } else if (aVal < bVal) {
            return -1;
          }
          return 0;
        })
      } else {
        dataListNew = dataList.sort((a, b) => {
          var aVal = a[sorter.columnKey];
          var bVal = b[sorter.columnKey];
          if (aVal === null) aVal = "";
          if (bVal === null) bVal = "";
          if (aVal !== "") aVal = aVal.toUpperCase();
          if (bVal !== "") bVal = bVal.toUpperCase();

          if (sorter.columnKey === "orderDate") {
            // need to sort date & time
            aVal = moment(aVal + ' ' + a.time, DATETIMEformat).unix();
            bVal = moment(bVal + ' ' + b.time, DATETIMEformat).unix();
            console.log('aTime = ' + aVal + ', bTime = ' + bVal);
          }
    
          if (aVal < bVal) {
            return 1;
          } else if (aVal > bVal) {
            return -1;
          }
          return 0;
        })
      }
      this.setState({ dataList: dataListNew });
    }
  }

  handleRowClick(record, index, event) {
    if (event !== null) {
      var pos = this.expandedRows.indexOf(record.key);
      if (pos === -1) {
        // it doesn't expand yet.
        this.expandedRows.push(record.key);
      } else {
        // it is already expanded.
        this.expandedRows.splice(pos, 1);
      }
    }
    this.setState({
      expandedRows: this.expandedRows
    });
  }

  handleExpandedRowsChange(expandedRows) {
    this.expandedRows = expandedRows;
  }

  handleExpandIconClick(expaned, record) {
    this.handleRowClick(record, null, null);
  }

  render() {
    const { tableInfo } =this.props;
    const { expandedRows } = this.state;
    return (
      <div className="isoHistoryTable">
        <Table
          columns={tableInfo.columns}
          dataSource={this.state.dataList}
          bordered={false}
          pagination={true}
          expandedRowRender={(record) => expandedRowRender(record.products)}
          expandedRowKeys={expandedRows}
          onRowClick={this.handleRowClick}
          onExpand={this.handleExpandIconClick}
          onExpandedRowsChange={this.handleExpandedRowsChange}
          onChange={this.onChange} />
      </div>
    );
  }
}
