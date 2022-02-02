import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import AppContext from '../../context/contex';
import { useDefaultValue } from '../../hooks/useUpdateForm';
import { getDateTime } from '../../utils/dateUtils';
import './modal.scss';

const Modal = () => {
  const { setEvents, setModal, modal } = useContext(AppContext);
  const [defaultValue, setDefaultValue] = useDefaultValue(null);
  const [errosDate, setErrosDate] = useState('');
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
  });

  // Отслеживаю ошибки и формирую сообщение об ошибки
  useEffect(() => {
    if (errors.date || errors.dateTo || errors.dateFrom) {
      const errorMessage = [errors.date, errors.dateFrom, errors.dateTo]
        .filter((error) => error !== undefined)
        .map((error) => error.message)
        .join(', ');

      setErrosDate(`Введите ${errorMessage} события`);
    } else {
      setErrosDate('');
    }
  }, [errors.date, errors.dateFrom, errors.dateTo]);

  //Отслеживаю на переданные дефолтные знач.
  useEffect(() => {
    if (modal.defaultValue) {
      setDefaultValue(modal.defaultValue);
    }
  }, [modal.defaultValue]);

  const onSubmit = (data) => {
    const dateForm = {
      ...data,
      dateFrom: getDateTime(data.date, data.dateFrom),
      dateTo: getDateTime(data.date, data.dateTo),
      id: Date.now(),
    };

    // reset();
    // closeModal();
    console.log(dateForm);
    console.log(defaultValue);
    console.log(setDefaultValue(dateForm));
    // setEvents((prev) => [...prev, dateForm]);
  };

  return (
    <div
      className="modal overlay"
      onClick={() => setModal({ visable: false, defaultValue: null })}
    >
      <div className="modal__content" onClick={(e) => e.stopPropagation()}>
        <div className="create-event">
          <button
            className="create-event__close-btn"
            onClick={() => setModal({ visable: false, defaultValue: null })}
          >
            +
          </button>
          <form
            className="event-form"
            onSubmit={handleSubmit(onSubmit)}
            autoComplete="off"
          >
            <input
              placeholder="Title"
              className="event-form__field"
              defaultValue={defaultValue.title}
              {...register('title', {
                required: 'Поле обязательно к заполнению',
              })}
            />
            <div className="event-form__error">
              {errors.title ? errors.title.message : ''}
            </div>

            <div className="event-form__time">
              <input
                type="date"
                defaultValue={defaultValue.date}
                className="event-form__field"
                {...register('date', {
                  required: 'дату',
                })}
              />
              <input
                type="time"
                defaultValue={defaultValue.dateFrom}
                className="event-form__field"
                {...register('dateFrom', {
                  required: 'время начала',
                })}
              />
              <span>-</span>
              <input
                type="time"
                defaultValue={defaultValue.dateTo}
                className="event-form__field"
                {...register('dateTo', {
                  required: 'время завершения',
                })}
              />
            </div>
            <div className="event-form__error">
              {errosDate ? errosDate : ''}
            </div>
            <textarea
              defaultValue={defaultValue.description}
              placeholder="Description"
              className="event-form__field"
              {...register('description')}
            ></textarea>
            <button type="submit" className="event-form__submit-btn">
              Create
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Modal;
