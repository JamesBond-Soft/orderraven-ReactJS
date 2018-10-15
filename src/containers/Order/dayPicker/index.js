import React, { Component } from 'react';
import { Select } from 'antd';
import { DATEformat, DAYformat } from '../../../config.js';
import moment from 'moment';


type Props = {
    onChange: (date: string) => {},
    defaultValue: string,   // DATEformat : 'MM/DD/YYYY'
};

export default class DayPicker extends Component<void, Props, *> {
    props: Props;

    constructor(props) {
        super(props)

        const todayString = moment(Date.now()).format(DATEformat)

        this.defaultIndex = 0
        if (this.props.defaultValue !== 'Next Available') {
            const selectDay = moment(this.props.defaultValue, DATEformat)
            const today = moment(todayString, DATEformat)
            this.defaultIndex = selectDay.diff(today, 'days')
            if (this.defaultIndex < 0 || this.defaultIndex > 7)
                this.defaultIndex = 0
        }
        
        this.days = ['Next Available']
        for (let i = 1; i < 8; i++) {
            const today = moment(todayString, DATEformat)
            this.days.push(today.add(i,'days').format(DAYformat))
        }
        this.options = this.days.map((day, index) => {
            return <Select.Option value={day} key={index}>{day}</Select.Option>
        })
    }

    handleChange = (value) => {
        const date = moment(value, DAYformat)
        this.props.onChange(date, date.format(DATEformat))
    }

    render() {
        return (
            <Select
                defaultValue={this.days[this.defaultIndex]}
                style={{width:120}} size="small" 
                onChange={this.handleChange} 
                allowClear={false}
            >
                {this.options}
            </Select>
        )
    }
}
