import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const rocketURL = 'https://api.spacexdata.com/v4/rockets';

export const getRocket = createAsyncThunk('rockets/getRockets', async () => {
  try {
    const response = await axios.get(rocketURL);
    return response.data;
  } catch (error) {
    return (error.message);
  }
});

const initialState = {
  rockets: [],
  loading: false,
};

const rocketsSlice = createSlice({
  name: 'rockets',
  initialState,
  reducers: {
    toggleReservedState: (state, action) => {
      const newRockets = state.rockets.map((rocket) => {
        if (rocket.id !== action.payload) return rocket;
        return { ...rocket, reserved: !rocket.reserved };
      });
      state.rockets = newRockets;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getRocket.pending, (state) => {
        state.loading = true;
      })
      .addCase(getRocket.fulfilled, (state, action) => {
        state.loading = false;
        state.rockets = action.payload;
      })
      .addCase(getRocket.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { toggleReservedState } = rocketsSlice.actions;
export default rocketsSlice.reducer;
