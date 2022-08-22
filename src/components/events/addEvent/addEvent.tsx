import {useAppDispatch} from "../../../hooks/useAppDispatch";
import {ContentWrapper} from "../../common/contentWrapper/contentWrapper";
import {PageTitle} from "../../common/pageTitle/pageTitle";
import {useLayoutEffect} from "react";
import {getEventTypes} from "../../../store/actions/eventTypes.action";
import {createEvent, getEvents} from "../../../store/actions/events.action";
import {Button, Form, Input, DatePicker, TimePicker} from "antd";
import {DragAndDrop} from "../../common/dragAndDrop/dragAndDrop";
import {SelectInput} from "../../common/select/select";
import {useAppSelector} from "../../../hooks/useAppSelector";
import {Loader} from "../../common/loader/loader";
import {getBase64} from "../../../utils/getBase64";
import {CreateEventsTyped} from "../../../store/types/events.types";
import moment from "moment";

export const AddEvent = () => {
  const dispatch = useAppDispatch();

  useLayoutEffect(() => {
    dispatch(getEventTypes());
    dispatch(getEvents(100, 0));
  }, [dispatch]);

  const {eventTypes} = useAppSelector(state => state.eventTypes);

  const onFinish = async (values: any) => {
    const img = await getBase64(values.img.file).then(x => x);
    const data: CreateEventsTyped = {
      name: values.title,
      type: values.type,
      description: values.description,
      img,
      date: moment(`${values.date.format('YYYY-MM-DD')} ${values.time.format('HH:mm:ss')}`).format()
    }

    dispatch(createEvent(data));
  };

  return(
    <ContentWrapper>
      <PageTitle>Добавить событие</PageTitle>
      {
        eventTypes.length > 0 ?
          <Form
            size={'large'}
            layout={'vertical'}
            labelCol={{
              span: 4,
            }}
            wrapperCol={{
              span: 10,
            }}
            onFinish={onFinish}
          >
            <Form.Item
              label={'Заголовок'}
              name={'title'}
              rules={[
                {
                  required: true,
                  message: 'Обязательное поле!',
                },
              ]}
            >
              <Input
                placeholder={'Введите название...'}
                maxLength={70}
              />
            </Form.Item>
            <Form.Item
              label={'Категория'}
            >
              <SelectInput options={eventTypes} name={'type'}/>
            </Form.Item>
            <Form.Item
              label={'Описание'}
              name={'description'}
              rules={[
                {
                  required: true,
                  message: 'Обязательное поле!',
                },
              ]}
            >
              <Input.TextArea
                placeholder={"Введите короткое описание для события..."}
                maxLength={280}
                rows={5}
              />
            </Form.Item>
            <Form.Item
              label={'Планируемая дата события'}
              name={'date'}
              rules={[
                {
                  required: true,
                  message: 'Обязательное поле!',
                },
              ]}
            >
              <DatePicker style={{width: 200}}/>
            </Form.Item>
            <Form.Item
              label={'Планируемый старт события'}
              name={'time'}
              rules={[
                {
                  required: true,
                  message: 'Обязательное поле!',
                },
              ]}
            >
              <TimePicker style={{width: 200}}/>
            </Form.Item>
            <Form.Item
              label={'Изображение'}
            >
              <DragAndDrop name={'img'} required/>
            </Form.Item>
            <Form.Item>
              <Button type={'primary'} htmlType={'submit'}>
                Опубликовать
              </Button>
            </Form.Item>
          </Form>
          : <Loader alert={'Загружаем данные'} description={'Подождите немного...'}/>
      }
    </ContentWrapper>
  );
}
