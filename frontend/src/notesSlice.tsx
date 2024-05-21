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

export type NoteArray = Array<Note>

type NoteValue = {
    value : NoteArray
}

type NoteState = {
    notes : NoteValue
}

type NoteAction = {
    payload : Note
}

type StringAction = {
    payload : string
}

type IdAction = {
    id : string
}

export const notesSlice = createSlice({
    name: 'notes',
    initialState: {
        value: JSON.parse(localStorage.getItem("notes") ?? "[]") as NoteArray,
    },
    reducers: {
        clearAllNotes: (state: NoteValue) => {
            state.value = []
            localStorage.setItem("notes", JSON.stringify(state.value))
        },
        addNote: (state: NoteValue, action: NoteAction) => {
            state.value.push(action.payload)
            localStorage.setItem("notes", JSON.stringify(state.value))
        },
        removeNote: (state, action : StringAction) => {
            state.value = state.value.filter((note: IdAction) => note.id !== action.payload)
            localStorage.setItem("notes", JSON.stringify(state.value))
        },
        editNote: (state: any, action: NoteAction) => {
            state.value = state.value.map((note: IdAction) => {
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
            localStorage.setItem("notes", JSON.stringify(state.value))
        }
    },
})

// Action creators are generated for each case reducer function
export const { clearAllNotes, addNote, editNote, removeNote} = notesSlice.actions

/* Selectors */
export const selectNoteById = (id: string) => createSelector(
    (state: NoteState) => state.notes.value,
    (notes) => notes.find(note => note.id === id)
);

export const getAllNotes = () => (state: NoteState) => state.notes.value;

export const getFiltered = (query: string, category: string) => createSelector(
    (state: NoteState) => state.notes.value,
    (notes) => notes.filter(note => {
        const title = note.title.toLowerCase();
        const content = note.content.toLowerCase();
        const categoryMatch = category === "All" || note.category === category;
        const queryMatch = title.includes(query.toLowerCase()) || content.includes(query.toLowerCase());
        return categoryMatch && queryMatch;
    })
);

export default notesSlice.reducer
