import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import Cookies from "universal-cookie";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import API from "../url";

const initialState = {
  data: [],
  isUserDeleted: false,
};

export const Saveuser = createAsyncThunk("user/saveuser", async (body) => {
  try {
    console.log("body saveuser", body);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    let formData = new FormData();
    for (var item in body) {
      formData.append(item, body[item]);
    }
    console.log("formData", formData);

    const response = await axios.post(API + "/addUser", formData, config);
    console.log("resp.data", response.data);

    if (response.data.msg) {
      return response.data; // Resolve with the response data
    } else {
      return { msg: "Check Your Form Correctly!", status: false };
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
});

export const deleteUserByid = createAsyncThunk(
  "user/deleteUserByid",
  async (body) => {
    try {
      console.log("body deleteUserByid", body);
      const response = await axios.post(API + "/deleteUser", body);
      console.log("resp.data", response);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

export const updateUser = createAsyncThunk("user/updateUser", async (body) => {
  try {
    console.log("body saveuser", body);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    let formData = new FormData();
    for (var item in body) {
      formData.append(item, body[item]);
    }
    console.log("formData", formData);

    const response = await axios.post(API + "/updateUser", formData, config);
    console.log("resp.data", response.data);

    if (response.data.msg === "User Updated Successfully") {
      return response.data; // Resolve with the response data
    } else {
      return { msg: "Check Your Form Correctly!", status: false };
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
});

export const getUser = createAsyncThunk("user/getUser", async () => {
  try {
    console.log("body getUser");
    const response = await axios.get(API + "/getUser");
    console.log("resp.data getUser", response.data.user);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
});

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    CLEAR_STATE: (state, action) => {
      // state.PassUpdateMsg = action.payload.data;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(Saveuser.fulfilled, (state, action) => {
        state.data = action.payload.result;
        console.log("action.payload on Fullfilled", action);
      })
      .addCase(Saveuser.rejected, (state, action) => {
        console.log("action.payload on Rejected");
      })
      .addCase(deleteUserByid.fulfilled, (state, action) => {
        console.log("action.payload on Fullfilled", action);

        state.isUserDeleted = action.payload.msg;
      })
      .addCase(deleteUserByid.rejected, (state, action) => {
        console.log("action.payload on Rejected");
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        console.log("action.payload updateUser on Fullfilled", action);

        // state.isUserDeleted = action.payload.msg;
      })
      .addCase(updateUser.rejected, (state, action) => {
        console.log("action.payload on Rejected");
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.data = action.payload.user;
        console.log("action.payload on Fullfilled getUser", action);
      })
      .addCase(getUser.rejected, (state, action) => {
        console.log("action.payload on Rejected");
      });
  },
});

export const { CLEAR_STATE } = globalSlice.actions;

export const selectCurrentUser = (state) => state.global.user;
