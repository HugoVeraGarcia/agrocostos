// 1. crear la propiedad en el objeto actions
// 2. creamos el case en el reducer con la propiedad que creamos en el paso 1
// 3. crear la función en el archivo actions
// 4. despachar en el componente la función creada en el paso 3

import axios from "axios";

export const actions = {
  setEmail: "SET_EMAIL",
  setYear: "SET_YEAR",
  setMonth: "SET_MONTH",
  setIsLoading: "SET_IS_LOADING",
  setBidones: "SET_BIDONES",
};

// const getConfig = () => ({
//   headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
// });

export const setEmail = (email) => ({
  type: actions.setEmail,
  payload: email,
});

export const setYear = (year) => ({
  type: actions.setYear,
  payload: year,
});

export const setMonth = (month) => ({
  type: actions.setMonth,
  payload: month,
});

export const setIsLoading = (isLoading) => ({
  type: actions.setIsLoading,
  payload: isLoading,
});

export const setBidones = (bidones) => ({
  type: actions.setBidones,
  payload: bidones,
});

export const setBidonesThunk = (period) => {
  console.log("mes y año::", period);
  return (dispatch) => {
    return axios
      .get("http://localhost:4000/api/v1/bidons", period)
      .then((res) => {
        dispatch(setBidones(res.data));
        console.log(res.data);
      })
      .catch((error) => {
        if (error.response.status === 404) {
          dispatch(setBidones([]));
        }
      });
  };
};
