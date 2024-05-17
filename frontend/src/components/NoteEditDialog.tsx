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
import {addNote, editNote, Note, removeNote, selectNoteById} from "../notesSlice";
import MaterialDialog, {DialogAction} from "./widgets/MaterialDialog";
import {MaterialTextInputEditText} from "./widgets/MaterialTextInputEditText";
import {uuidv4} from "../util/UUID";
import LoadingScreen from "./widgets/LoadingScreen";

NoteEditDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    id: PropTypes.string,
    isAdd: PropTypes.bool
}

function NoteEditDialog({onClose, id, isAdd} : Readonly<{onClose: any, id: string, isAdd: boolean}>) {
    const noteSelector= selectNoteById(id);
    const note = useSelector(noteSelector);
    const dispatch = useDispatch();

    const [selectedNote, setSelectedNote] : [Note, any] = useState({id: "", title: "", content: "", category: "", timestamp: 0});
    const [noteTitle, setNoteTitle] : [string, any] = useState("");
    const [noteContent, setNoteContent] : [string, any] = useState("");
    const [noteCategory, setNoteCategory] : [string, any] = useState("");
    const [saveIsDisabled, setSaveIsDisabled] : [boolean, any] = useState(true);
    const [loading, setLoading] : [boolean, any] = useState(true);
    const [errorMessage, setErrorMessage] : [string, any] = useState("");

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

        if (note !== undefined) {
            if (noteCategory === "" || noteContent === "" || noteTitle === "" || (noteCategory === note.category && noteContent === note.content && noteTitle === note.title)) {
                setSaveIsDisabled(true);
            } else {
                setSaveIsDisabled(false);
            }
        } else if (isAdd && (noteCategory === "" || noteContent === "" || noteTitle === "")) {
            setSaveIsDisabled(true);
        } else if (!isAdd) {
            setSaveIsDisabled(true);
        } else {
            setSaveIsDisabled(false);
        }
    }, [noteTitle, noteContent, noteCategory, selectedNote, isAdd, note]);

    const onDialogClose = () => {
        onClose();
    }

    const onNoteSave = () => {
        setLoading(true);

        const editedNote : Note = {
            id: selectedNote.id,
            title: noteTitle,
            content: noteContent,
            category: noteCategory,
            timestamp: Date.now()
        }

        if (isAdd) {
            editedNote.id = uuidv4();

            fetch("https://66478a962bb946cf2f9e19e7.mockapi.io/api/v1/notes/notes", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(editedNote)
            }).then(response => response.json())
                .then(() => {
                    setLoading(false);
                    dispatch(addNote(editedNote))
                    onDialogClose()
                }).catch(error => {
                    setErrorMessage(error.message);
                }
            )
        } else {
            fetch("https://66478a962bb946cf2f9e19e7.mockapi.io/api/v1/notes/notes/" + editedNote.id, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(editedNote)
            }).then(response => response.json())
                .then(() => {
                    setLoading(false);
                    dispatch(editNote(editedNote))
                    onDialogClose()
                }).catch(error => {
                    setErrorMessage(error.message);
                }
            )
        }
    }

    const onNoteDelete = () => {
        setLoading(true);
        fetch("https://66478a962bb946cf2f9e19e7.mockapi.io/api/v1/notes/notes/" + selectedNote.id, {
            method: "DELETE"
        }).then(() => {
            setLoading(false);
            dispatch(removeNote(selectedNote.id))
            onDialogClose()
        }).catch(error => {
            setErrorMessage(error.message);
        })
    }

    const dialogActionsEdit : Array<DialogAction> = [
        {btnTitle: "Save", btnPriority: "primary", btnCallback: onNoteSave},
        {btnTitle: "Delete", btnPriority: "error", btnCallback: onNoteDelete},
        {btnTitle: "Cancel", btnPriority: "secondary", btnCallback: onDialogClose}
    ]

    const dialogActionsAdd : Array<DialogAction> = [
        {btnTitle: "Add", btnPriority: "primary", btnCallback: onNoteSave},
        {btnTitle: "Cancel", btnPriority: "secondary", btnCallback: onDialogClose}
    ]

    return (
        <>
            {loading ? <LoadingScreen/> : null}

            {errorMessage !== "" ? <MaterialDialog onClose={() => setErrorMessage("")} dialogTitle={"Server error"} dialogActions={[{
                btnTitle: "Close",
                btnPriority: "primary",
                btnCallback: () => setErrorMessage("")
            }]}>{errorMessage}</MaterialDialog> :
                <MaterialDialog cancellable={true} onClose={onDialogClose} dialogActions={isAdd ? dialogActionsAdd : dialogActionsEdit} primaryButtonIsEnabled={!saveIsDisabled}>
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
            }
        </>
    );
}

export default NoteEditDialog;
