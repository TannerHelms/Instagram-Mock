import { createSlice } from '@reduxjs/toolkit';

const tokenSlice = createSlice({
    name: 'token',
    initialState: {
        value: null,
    },
    reducers: {
        setToken: (state, action) => {
            state.value = action.payload.token;
        },
        clearToken: (state) => {
            state.value = null;
        },
    },
});

export const { setToken, clearToken } = tokenSlice.actions;
export default tokenSlice.reducer;
export const token = (state) => state.token.value;