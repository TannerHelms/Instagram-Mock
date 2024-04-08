import { createSlice } from '@reduxjs/toolkit';

const navbarSlice = createSlice({
    name: 'navbar',
    initialState: false,
    reducers: {
        toggleNavbar: (state) => !state,
        turnOnNavbar: () => true,
        turnOffNavbar: () => false,
    },
});

export const { toggleNavbar, turnOnNavbar, turnOffNavbar } = navbarSlice.actions;

export default navbarSlice.reducer;

export const nav = (state) => state.navbar;