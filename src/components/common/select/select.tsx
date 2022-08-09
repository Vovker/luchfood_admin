import {SelectOption, SelectOptions} from "./select.types";
import React from "react";
import {Select, Form} from "antd";

export const SelectInput: React.FC<SelectOptions> = ({options, name, initialValue}) => {
  return (
    <Form.Item
      name={name}
      initialValue={initialValue || options[0].id}
    >
      <Select
        defaultValue={options[0].id}
        style={{width: 250}}
      >
        {options.map((option: SelectOption) => <Select.Option key={option.id} value={option.id}>{option.name}</Select.Option>)}
      </Select>
    </Form.Item>
  )
}
