import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    modal : {
        gif: false,
        audio: false,
        media: false,
        doc: false,
    },
    selectedGifURL : "",
};

const slice = createSlice({
    name: "app",
    initialState: initialState,
    reducers: {
        updateGifModal : (state, action) => {
            state.modal.gif = action.payload.value;
            state.selectedGifURL = action.payload.url;
        },
        updateAudioModal : (state, action) => {
            state.modal.audio = action.payload
        },
        updateMediaModal : (state, action) => {
            state.modal.media = action.payload
        }, 
        updateDocumentModal : (state, action) => {
            state.modal.doc = action.payload
        },
    }
});

export default slice.reducer

export const {updateGifModal, updateAudioModal, updateMediaModal, updateDocumentModal} = slice.actions