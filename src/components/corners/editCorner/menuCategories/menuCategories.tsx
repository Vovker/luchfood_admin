import {PageTitle} from "../../../common/pageTitle/pageTitle";
import {useAppDispatch} from "../../../../hooks/useAppDispatch";
import React, {useLayoutEffect, useState} from "react";
import {
  createMenuCategory,
  deleteMenuCategory,
  getMenuCategories,
  updateMenuCategory
} from "../../../../store/actions/menuCategory.action";
import {useAppSelector} from "../../../../hooks/useAppSelector";
import {Button, Form, Input, Popconfirm, Row, Table} from "antd";
import {EditableMenuCategoryTypes} from "./menuCategories.types";
import {Loader} from "../../../common/loader/loader";

export const MenuCategories: React.FC<{id: number}> = ({id}) => {

  const dispatch = useAppDispatch();

  useLayoutEffect(() => {
    dispatch(getMenuCategories(id));
  }, [dispatch, id])

  const {menuCategories, isLoading} = useAppSelector(state => state.menuCategories);

  const onFinish = (values: any) => {
    dispatch(createMenuCategory({name: values.name, cornerId: id}))
  }

  const [editingKey, setEditingKey] = useState('');

  const handleDelete = (id: number) => {
    dispatch(deleteMenuCategory(id));
  }

  const [form] = Form.useForm();

  const isEditing = (record: any) => record.key === editingKey;

  const edit = (record: any) => {
    form.setFieldsValue({
      id: '',
      name: record.name,
      ...record,
    });
    setEditingKey(record.key);
  };

  const save = async (key: number) => {
    try {
      const row = await form.validateFields();
      dispatch(updateMenuCategory(key, row));
      setEditingKey('');
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

  const EditableCell: React.FC<EditableMenuCategoryTypes> = ({
     editing,
     dataIndex,
     title,
     record,
     index,
     children,
     ...restProps
   }) => {
    const inputNode = <Input/>;
    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item
            name={dataIndex}
            style={{
              margin: 0,
            }}
            rules={[
              {
                required: true,
                message: `?????????????? ${title}!`,
              },
            ]}
          >
            {inputNode}
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      width: '50px',
      editable: false
    },
    {
      title: '????????????????',
      dataIndex: 'name',
      width: '100px',
      editable: true
    },
    {
      title: '????????????????',
      dataIndex: 'operation',
      key: 'operation',
      width: '300px',
      render: (_: any, record: any) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Button
              type={'primary'}
              onClick={() => save(record.key)}
              style={{
                marginRight: 8,
              }}
            >
              ????????????????
            </Button>
            <Popconfirm title="?????????????????" onConfirm={() => setEditingKey('')}>
              <a>????????????????</a>
            </Popconfirm>
          </span>
        ) : (
          <Row style={{gap: '40px'}}>
            <Button type={'primary'} disabled={editingKey !== ''} onClick={() => edit(record)}>
              ??????????????????????????
            </Button>
            <Popconfirm
              title={'?????????????? ???????????????????'}
              onConfirm={() => handleDelete(record.id)}
            >
              <Button type="primary" danger ghost>
                ??????????????
              </Button>
            </Popconfirm>
          </Row>
        );
      }
    }
  ];

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record: any) => ({
        record,
        inputType: col.dataIndex === 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        width: col.width,
        editing: isEditing(record),
      }),
    };
  });

  return(
    <>
      <PageTitle>?????????????????? ????????</PageTitle>
      <Form
        style={{display: 'flex', gap: '40px', alignItems: 'flex-end'}}
        size={'large'}
        layout={'vertical'}
        onFinish={onFinish}
      >
        <Form.Item
          style={{width: '300px'}}
          label={'??????????????????'}
          name={'name'}
          rules={[
            {
              required: true,
              message: '???????????????????????? ????????!',
            },
          ]}
        >
          <Input
            placeholder={'?????????????? ????????????????...'}
            maxLength={70}
          />
        </Form.Item>
        <Form.Item>
          <Button type={'primary'} htmlType={'submit'}>
            ????????????????
          </Button>
        </Form.Item>
      </Form>
      {
        !isLoading && menuCategories ?
          <Form form={form} component={false}>
            <Table
              components={{
                body: {
                  cell: EditableCell,
                },
              }}
              style={{width: 'auto', minWidth: 'unset'}}
              columns={mergedColumns}
              rowClassName="editable-row"
              pagination={{
                onChange: () => setEditingKey(''),
              }}
              dataSource={
                menuCategories.map(item => {
                  return {
                    ...item,
                    key: item.id,
                  }
                })
              }
            />
          </Form>
          : <Loader alert={'???????????????? ?????????????????? ????????'} description={'?????????????????? ??????????????...'}/>
      }
    </>
  )
}
