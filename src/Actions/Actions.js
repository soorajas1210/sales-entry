import axios from "axios";
import { HeaderFail, HeaderSuccess } from "../Redux/HeaderSlice";
import { DetailFail, DetailSuccess } from "../Redux/DetailSlice";
import { ItemFail, ItemSuccess } from "../Redux/ItemSlice";

export const getHeader = () => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.get("http://5.189.180.8:8010/header", config);

    dispatch(HeaderSuccess(data));
      
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch(HeaderFail(message));
  }
};

export const getDetail = () => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.get("http://5.189.180.8:8010/detail", config);

    dispatch(DetailSuccess(data));
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch(DetailFail(message));
  }
};

export const getItem = () => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.get("http://5.189.180.8:8010/item", config);

    dispatch(ItemSuccess(data));
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch(ItemFail(message));
  }
};

export const addDetails = (header, details) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    if ((header, details)) {
      const { data } = await axios.post(
        "http://5.189.180.8:8010/header/multiple",
        { header_table: header, detail_table: details },
        config
      );
      console.log(data,"data");
    }
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    console.log(message);
  }
};
