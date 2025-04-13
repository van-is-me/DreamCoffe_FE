import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    auth: JSON.parse(localStorage.getItem('user')) || null, // Lưu thông tin người dùng từ localStorage
    role: localStorage.getItem('role') || null // Lưu thông tin vai trò từ localStorage
}

const usersSlice = createSlice({
    name: 'users', // Tên của slice
    initialState,  // Trạng thái ban đầu
    reducers: {
        authen: (state, action) => { // Cập nhật trạng thái người dùng
            state.auth = action.payload
        },
        setRole: (state, action) => { // Cập nhật trạng thái vai trò người dùng
            state.role = action.payload
        }
    }
})

export const { authen, setRole } = usersSlice.actions

export default usersSlice.reducer