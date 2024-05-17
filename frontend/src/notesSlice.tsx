/****************************************************************
 * Copyright (c) 2023-2024 Dmytro Ostapenko. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *****************************************************************/

/*
* This is a Redux slice for notes. It contains actions and reducers for adding, removing, and editing notes.
* Each note have an id, title, and content.
* */
import {createSelector, createSlice} from '@reduxjs/toolkit'

export type Note = {
    id: string,
    title: string,
    content: string,
    category: string,
    timestamp: number
}

export const notesSlice = createSlice({
    name: 'notes',
    initialState: {
        value: [],
    },
    reducers: {
        addNote: (state: {value: Array<Note>}, action: {payload : Note}) => {
            state.value.push(action.payload)
        },
        removeNote: (state, action : {payload : string}) => {
            state.value = state.value.filter((note: { id: string }) => note.id !== action.payload)
        },
        editNote: (state: any, action: {payload : Note}) => {
            state.value = state.value.map((note: { id: string }) => {
                if (note.id === action.payload.id) {
                    return {
                        ...note,
                        title: action.payload.title,
                        content: action.payload.content,
                        category: action.payload.category,
                        timestamp: action.payload.timestamp
                    }
                }
                return note
            })
        }
    },
})

// Action creators are generated for each case reducer function
export const { addNote, editNote, removeNote} = notesSlice.actions

export const selectNoteById = (id: string) => createSelector(
    (state: { notes : { value : Array<Note>}}) => state.notes.value,
    (notes) => notes.find(note => note.id === id)
);

export const filterNotesByCategory = (category: string) => createSelector(
    (state: { notes : { value : Array<Note>}}) => state.notes.value,
    (notes) => notes.filter(note => note.category === category)
);

export const getAllNotes = () => (state: { notes : { value : Array<Note>}}) => state.notes.value;

export default notesSlice.reducer
