import {FetchOrderResponse} from './types';

export const fetchOrderResponseMock: FetchOrderResponse = {
  success: true,
  name: "Био-марсианский краторный бургер",
  order: {
    ingredients: [
      {
        _id: "643d69a5c3f7b9001cfa0941",
        name: "Биокотлета из марсианской Магнолии",
        type: "main",
        proteins: 420,
        fat: 142,
        carbohydrates: 242,
        calories: 4242,
        price: 424,
        image: "https://code.s3.yandex.net/react/code/meat-01.png",
        image_mobile: "https://code.s3.yandex.net/react/code/meat-01-mobile.png",
        image_large: "https://code.s3.yandex.net/react/code/meat-01-large.png",
        __v: 0
      },
      {
        _id: "643d69a5c3f7b9001cfa093c",
        name: "Краторная булка N-200i",
        type: "bun",
        proteins: 80,
        fat: 24,
        carbohydrates: 53,
        calories: 420,
        price: 1255,
        image: "https://code.s3.yandex.net/react/code/bun-02.png",
        image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
        image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
        __v: 0
      },
      {
        _id: "643d69a5c3f7b9001cfa093c",
        name: "Краторная булка N-200i",
        type: "bun",
        proteins: 80,
        fat: 24,
        carbohydrates: 53,
        calories: 420,
        price: 1255,
        image: "https://code.s3.yandex.net/react/code/bun-02.png",
        image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
        image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
        __v: 0
      }
    ],
    _id: "655c2e04c2cc61001b3d9444",
    owner: {
      name: "Vasya Alexey Vasya",
      email: "testov@testov.com",
      createdAt: "2023-10-16T18:31:39.247Z",
      updatedAt: "2023-11-15T03:32:08.519Z"
    },
    status: "done",
    name: "Био-марсианский краторный бургер",
    createdAt: "2023-11-21T04:11:48.740Z",
    updatedAt: "2023-11-21T04:11:48.994Z",
    number: 26820,
    price: 2934
  }
}