import PropTypes from 'prop-types';
import React, { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import AppContext from '../../context/contex';
import { useDefaultValue } from '../../hooks/useUpdateForm';
import { useValidate } from '../../hooks/useValidate';
import { getDateTime } from '../../utils/dateUtils';
import './modal.scss';

const Modal = ({ createEvent, events, filterId }) => {
  const { setModal, modal } = useContext(AppContext);
  const [defaultValue, setDefaultValue] = useDefaultValue(null);
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    setError,
    clearErrors,
    getValues,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
  });

  const errosDate = useValidate(errors, () => {
    const date = getValues('date');
    const dateFrom = getValues('dateFrom');
    const dateTo = getValues('dateTo');

    if (dateFrom && dateTo) {
      const timeFormat =
        dateTo.split(':').join('.') - dateFrom.split(':').join('.');
      return { timeFormat, events, date, dateFrom, dateTo, filterId };
    }
  });

  const isValid = () => {
    if (errosDate.duration || errosDate.intersection) {
      setError('test', { type: 'focus' }, { shouldFocus: true });
    } else {
      clearErrors('test');
    }
  };

  useEffect(() => {
    if (modal.defaultValue) {
      setDefaultValue(modal.defaultValue);
    }
  }, [modal.defaultValue]);

  useEffect(() => {
    if (defaultValue) {
      setValue('title', defaultValue.title);
      setValue('date', defaultValue.date);
      setValue('dateFrom', defaultValue.dateFrom);
      setValue('dateTo', defaultValue.dateTo);
      setValue('description', defaultValue.description);
    }
  }, [defaultValue]);

  const onSubmit = (data) => {
    const dateForm = {
      ...data,
      dateFrom: getDateTime(data.date, data.dateFrom),
      dateTo: getDateTime(data.date, data.dateTo),
      id: Date.now(),
    };

    reset();
    setModal({ visable: false, defaultValue: null });
    createEvent(dateForm);
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
                className="event-form__field"
                {...register('date', {
                  required: 'дату',
                  validate: isValid,
                })}
              />
              <input
                type="time"
                className="event-form__field"
                {...register('dateFrom', {
                  required: 'время начала',
                  validate: isValid,
                })}
              />
              <span>-</span>
              <input
                type="time"
                className="event-form__field"
                {...register('dateTo', {
                  required: 'время завершения',
                  validate: isValid,
                })}
              />
            </div>
            <div className="event-form__error">
              {errosDate.date ? errosDate.date : ''}
            </div>
            <div className="event-form__error">
              {errosDate.duration ? errosDate.duration : errosDate.intersection}
            </div>
            <textarea
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

Modal.propTypes = {
  createEvent: PropTypes.func.isRequired,
  events: PropTypes.array.isRequired,
};

Modal.defaultProps = {
  filterId: '',
};

export default Modal;
