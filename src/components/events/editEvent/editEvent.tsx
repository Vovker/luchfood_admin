import {useAppDispatch} from "../../../hooks/useAppDispatch";
import {useParams} from "react-router-dom";
import {useLayoutEffect} from "react";
import {getEventsById, updateEvent} from "../../../store/actions/events.action";
import {getEventTypes} from "../../../store/actions/eventTypes.action";
import {ContentWrapper} from "../../common/contentWrapper/contentWrapper";
import {PageTitle} from "../../common/pageTitle/pageTitle";
import {Button, DatePicker, Form, Image, Input, TimePicker} from "antd";
import {DragAndDrop} from "../../common/dragAndDrop/dragAndDrop";
import {Loader} from "../../common/loader/loader";
import {useAppSelector} from "../../../hooks/useAppSelector";
import {SelectInput} from "../../common/select/select";
import moment from "moment";
import {getBase64} from "../../../utils/getBase64";

export const EditEvent = () => {

  const dispatch = useAppDispatch();

  const {id} = useParams();

  useLayoutEffect(() => {
    dispatch(getEventsById(Number(id)));
    dispatch(getEventTypes());
  }, [dispatch, id]);

  const {event, isLoading} = useAppSelector(state => state.eventsById);
  const {eventTypes} = useAppSelector(state => state.eventTypes);

  const onFinish = async (values: any) => {
    const img = values.img ? await getBase64(values.img.file) : ''
    dispatch(updateEvent(Number(id), {
      name: values.name,
      type: values.type,
      description: values.description,
      img,
      date: moment(`${values.date.format('YYYY-MM-DD')} ${values.time.format('HH:mm:ss')}`).format()
    }))
  }

  return (
    <ContentWrapper>
      <PageTitle>Редактировать событие</PageTitle>
      {event && eventTypes.length > 0 && !isLoading ? (
        <Form
          size={'large'}
          layout={'vertical'}
          labelCol={{
            span: 4,
          }}
          wrapperCol={{
            span: 14,
          }}
          onFinish={onFinish}
        >
          <Form.Item
            label={'Заголовок'}
            name={'name'}
            initialValue={event.name}
            rules={[
              {
                required: true,
                message: 'Обязательное поле!',
              },
            ]}
          >
            <Input
              placeholder={'Ввведите название...'}
              maxLength={70}
            />
          </Form.Item>
          <Form.Item
            label={'Категория'}
          >
            <SelectInput options={eventTypes} initialValue={event.type.id} name={'type'}/>
          </Form.Item>
          <Form.Item
            label={'Описание'}
            name={'description'}
            initialValue={event.description}
            rules={[
              {
                required: true,
                message: 'Обязательное поле!',
              },
            ]}
          >
            <Input.TextArea
              placeholder={"Введите короткое описание для новости..."}
              maxLength={280}
              rows={5}
            />
          </Form.Item>
          <Form.Item
            label={'Планируемая дата события'}
            name={'date'}
            initialValue={moment(event.date)}
            rules={[
              {
                required: true,
                message: 'Обязательное поле!',
              },
            ]}
          >
            <DatePicker/>
          </Form.Item>
          <Form.Item
            label={'Планируемый старт события'}
            name={'time'}
            initialValue={moment(event.date)}
            rules={[
              {
                required: true,
                message: 'Обязательное поле!',
              },
            ]}
          >
            <TimePicker/>
          </Form.Item>
          <Form.Item
            label={'Изображение'}
          >
            <Image
              width={400}
              src={`${process.env.REACT_APP_API_URL}/${event.img}`}
              style={{marginBottom: '40px'}}
            />
            <DragAndDrop name={'img'} required={false}/>
          </Form.Item>
          <Form.Item>
            <Button type={'primary'} htmlType={'submit'}>
              Обновить
            </Button>
          </Form.Item>
        </Form>
      ) : <Loader alert={'Событие загружается...'} description={'Подождите немного...'}/>
      }
    </ContentWrapper>
  )
}
