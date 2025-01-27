import { combineReducers } from '@reduxjs/toolkit'
import storage from 'redux-persist/es/storage'

import appReducer from './Slices/app'
import authReducer from './Slices/auth'

const rootPersistConfig = {
    key: 'root',
    storage,
    keyPrefix: 'redux'
}

const rootReducer = combineReducers({
    app: appReducer,
    auth: authReducer,
})

export {rootPersistConfig, rootReducer}