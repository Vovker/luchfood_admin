import {SelectOption, SelectOptions} from "./select.types";
import React from "react";
import {Select, Form} from "antd";

export const SelectInput: React.FC<SelectOptions> = ({options, name, initialValue, label}) => {
  return (
    <Form.Item
      label={label}
      name={name}
      initialValue={initialValue || (options.length > 0 ? options[0].id : undefined)}
      rules={[
        {
          required: true,
          message: 'Обязательное поле!',
        },
      ]}
    >
      <Select
        defaultValue={options.length > 0 ? options[0].id : undefined}
        style={{width: 250}}
      >
        {options.map((option: SelectOption) => <Select.Option key={option.id} value={option.id}>{option.name}</Select.Option>)}
      </Select>
    </Form.Item>
  )
}
