import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const TOKEN = 'token';

export const me = createAsyncThunk('auth/me', async (_, thunkAPI) => {
  const token = window.localStorage.getItem(TOKEN);
  try {
    if (token) {
      const res = await axios.get('/auth/me', {
        headers: {
          authorization: token,
        },
      });
      return res.data;
    } else {
      return {};
    }
  } catch (err) {
    return thunkAPI.rejectWithValue(err.message);
  }
});

export const authenticate = createAsyncThunk(
  'auth/authenticate',
  async ({ username, email, password }, thunkAPI) => {
    try {
      const res = await axios.post(`/auth/signup`, { username, email, password });
      window.localStorage.setItem(TOKEN, res.data.token);
      thunkAPI.dispatch(me());
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const logout = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    window.localStorage.removeItem(TOKEN);
    thunkAPI.dispatch(me());
  } catch (err) {
    return thunkAPI.rejectWithValue(err.message);
  }
});

export const submitPun = createAsyncThunk('auth/submitPun', async (punData, thunkAPI) => {
  try {
    // Logic to submit the pun using punData
    // For example:
    const res = await axios.post('/puns', punData);
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.message);
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: null,
    error: null,
    isLoading: false,
  },
  reducers: {
    // Other reducers
  },
  extraReducers: (builder) => {
    builder
      .addCase(me.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(me.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(me.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(authenticate.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(authenticate.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(authenticate.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(logout.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.user = null;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(submitPun.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(submitPun.fulfilled, (state, action) => {
        // Handle pun submission success if needed
        state.isLoading = false;
        state.error = null;
      })
      .addCase(submitPun.rejected, (state, action) => {
        // Handle pun submission error if needed
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});


export default authSlice.reducer;
