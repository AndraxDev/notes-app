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

import React, {useEffect, useState} from 'react';
import PropTypes from "prop-types";
import {useDispatch, useSelector} from "react-redux";
import {addNote, editNote, removeNote, selectNoteById} from "../notesSlice";
import MaterialDialog from "./widgets/MaterialDialog";
import {MaterialTextInputEditText} from "./widgets/MaterialTextInputEditText";

NoteEditDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    id: PropTypes.string,
    isAdd: PropTypes.bool
}

function NoteEditDialog({onClose, id, isAdd} : Readonly<{onClose: any, id: string, isAdd: boolean}>) {
    const noteSelector= selectNoteById(id);
    const note = useSelector(noteSelector);
    const dispatch = useDispatch();

    const [selectedNote, setSelectedNote] = useState({id: "", title: "", content: "", category: ""});
    const [noteTitle, setNoteTitle] = useState("");
    const [noteContent, setNoteContent] = useState("");
    const [noteCategory, setNoteCategory] = useState("");

    useEffect(() => {
        if (note) {
            setSelectedNote(note);
            setNoteTitle(note.title);
            setNoteContent(note.content);
            setNoteCategory(note.category);
        }
    }, [note]);

    useEffect(() => {
        if (noteTitle !== selectedNote.title) {
            let n = {...selectedNote};
            n.title = noteTitle;
            setSelectedNote(n);
        }

        if (noteContent !== selectedNote.content) {
            let n = {...selectedNote};
            n.content = noteContent;
            setSelectedNote(n);
        }

        if (noteCategory !== selectedNote.category) {
            let n = {...selectedNote};
            n.category = noteCategory;
            setSelectedNote(n);
        }
    }, [noteTitle, noteContent, noteCategory]);

    const onDialogClose = () => {
        onClose();
    }

    const onNoteSave = () => {
        if (isAdd) {
            const newNote = {
                title: noteTitle,
                content: noteContent,
                category: noteCategory
            }

            dispatch(addNote(newNote))
        } else {
            dispatch(editNote(selectedNote))
        }

        onDialogClose()
    }

    const onNoteDelete = () => {
        dispatch(removeNote(selectedNote.id))
        onDialogClose()
    }

    const dialogActions = [
        {btnTitle: "Save", btnPriority: "primary", btnCallback: onNoteSave},
        {btnTitle: "Delete", btnPriority: "error", btnCallback: onNoteDelete},
        {btnTitle: "Cancel", btnPriority: "secondary", btnCallback: onDialogClose}
    ]

    return (
        <MaterialDialog cancellable={true} onClose={onDialogClose} dialogActions={dialogActions}>
            <MaterialTextInputEditText value={noteTitle} onChange={(e) => {
                setNoteTitle(e.target.value)
            }}/>
            <MaterialTextInputEditText value={noteContent} onChange={(e) => {
                setNoteContent(e.target.value)
            }}/>
            <MaterialTextInputEditText value={noteCategory} onChange={(e) => {
                setNoteCategory(e.target.value)
            }}/>
        </MaterialDialog>
    );
}

export default NoteEditDialog;
