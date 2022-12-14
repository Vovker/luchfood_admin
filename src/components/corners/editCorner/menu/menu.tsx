import {useAppDispatch} from "../../../../hooks/useAppDispatch";
import React, {useLayoutEffect, useState} from "react";
import {PageTitle} from "../../../common/pageTitle/pageTitle";
import {createMenu, deleteMenu, getMenus, updateMenu} from "../../../../store/actions/menu.action";
import {useAppSelector} from "../../../../hooks/useAppSelector";
import {Button, Form, Input, Popconfirm, Row, Table} from "antd";
import {EditableMenuCategoryTypes} from "../menuCategories/menuCategories.types";
import {Loader} from "../../../common/loader/loader";
import {SelectInput} from "../../../common/select/select";
import {CreateMenuTyped} from "../../../../store/types/menu.types";
import {MenuCategoryTyped} from "../../../../store/types/menuCategory.types";

export const Menu: React.FC<{ id: number }> = ({id}) => {
  const dispatch = useAppDispatch();

  useLayoutEffect(() => {
    dispatch(getMenus(id))
  }, [dispatch, id]);

  const {menu, isLoading} = useAppSelector(state => state.menu);
  const {menuCategories} = useAppSelector(state => state.menuCategories);

  const onFinish = (values: any) => {
    const data: CreateMenuTyped = {
      name: values.name,
      price: values.price,
      weight: values.weight,
      menuCategoryId: values.menuCategoryId
    }

    dispatch(createMenu(data))
  }

  const [editingKey, setEditingKey] = useState('');

  const handleDelete = (id: number) => {
    dispatch(deleteMenu(id));
  }

  const [form] = Form.useForm();

  const isEditing = (record: any) => record.key === editingKey;

  const edit = (record: any) => {
    form.setFieldsValue({
      id: '',
      name: record.name,
      weight: record.weight,
      price: record.price,

      ...record,
    });
    setEditingKey(record.key);
  };

  const save = async (key: number) => {
    try {
      const row = await form.validateFields();
      dispatch(updateMenu(key, {
        name: row.name,
        weight: row.weight ? row.weight : null,
        price: row.price
      }));
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
                required: dataIndex !== 'weight',
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
      title: '??????????????',
      dataIndex: 'name',
      width: '100px',
      editable: true
    },
    {
      title: '??????',
      dataIndex: 'weight',
      width: '100px',
      editable: true
    },
    {
      title: '???????? (BYN)',
      dataIndex: 'price',
      width: '100px',
      editable: true
    },
    {
      title: '??????????????????',
      dataIndex: 'menuCategory',
      width: '100px',
      editable: false,
      render: (record: MenuCategoryTyped) => record.name
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
              title={'?????????????? ???????????????'}
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

  return (
    <>
      <PageTitle>????????</PageTitle>
      <Form
        style={{display: 'flex', gap: '40px', alignItems: 'flex-end'}}
        size={'large'}
        layout={'vertical'}
        onFinish={onFinish}
      >
        <Form.Item
          style={{width: '300px'}}
          label={'????????????????????????'}
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
        <Form.Item
          style={{width: '300px'}}
          label={'?????? (??)'}
          name={'weight'}
        >
          <Input
            type={'number'}
            placeholder={'?????????????? ??????...'}
            maxLength={70}
          />
        </Form.Item>
        <Form.Item
          style={{width: '300px'}}
          label={'???????? (x100)'}
          name={'price'}
          rules={[
            {
              required: true,
              message: '???????????????????????? ????????!',
            },
          ]}
        >
          <Input
            placeholder={'???????????????? 1550 = 15.5 BYN'}
            maxLength={6}
          />
        </Form.Item>
        <SelectInput options={menuCategories} name={'menuCategoryId'} label={'?????????????????? ????????'}/>
        <Form.Item>
          <Button type={'primary'} htmlType={'submit'}>
            ????????????????
          </Button>
        </Form.Item>
      </Form>
      {
        !isLoading && menu && menuCategories.length > 0 ?
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
                menu.map(item => {
                  return {
                    ...item,
                    key: item.id,
                  }
                })
              }
            />
          </Form>
          : <Loader alert={'???????????????? ????????'} description={'?????????????????? ??????????????...'}/>
      }
    </>
  )
}
