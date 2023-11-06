import {ChangeEvent, useState} from 'react';

/**
 * Тип для значений формы, где ключ - это строка, а значение может быть любым.
 */
type FormValues = {
  [key: string]: any;
};

/**
 * Хук `useForm` используется для создания управляемых форм в React.
 * Он обрабатывает состояние вводимых значений и изменения в элементах формы.
 *
 * @param inputValues - Начальные значения формы в виде объекта, где ключи - это имена полей.
 * @returns Объект с текущими значениями формы, функцией для обработки изменений и функцией для установки значений формы.
 */
export function useForm(inputValues: FormValues = {}) {
  // Состояние для хранения значений формы
  const [values, setValues] = useState<FormValues>(inputValues);

  /**
   * Обработчик изменений для элементов формы.
   *
   * @param event - Событие изменения, возникающее при вводе данных в элементы формы.
   */
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const {value, name} = event.target;
    setValues({...values, [name]: value});
  };

  // Возвращаем значения и функции, которые могут быть использованы компонентами.
  return {values, handleChange, setValues};
}
