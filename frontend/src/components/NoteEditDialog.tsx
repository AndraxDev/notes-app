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
import {MenuItem} from "@mui/material";
import {Categories, Category, DEFAULT_CATEGORY, NO_CATEGORY} from "../util/Categories";

const MAX_TITLE_LENGTH = 70;
const MAX_CONTENT_LENGTH = 1000;

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
    const [noteCategory, setNoteCategory] : [string, any] = useState(NO_CATEGORY);
    const [saveIsDisabled, setSaveIsDisabled] : [boolean, any] = useState(true);
    const [loading, setLoading] : [boolean, any] = useState(false);
    const [errorMessage, setErrorMessage] : [string, any] = useState("");
    const [deletionConfirmation, setDeletionConfirmation] : [boolean, any] = useState(false);

    useEffect(() => {
        if (note) {
            setSelectedNote(note);
            setNoteTitle(note.title);
            setNoteContent(note.content);
            setNoteCategory(note.category);
        }
    }, [note]);

    const validateForm = () => {
        /* Validate title and content length */
        if (noteTitle.length > MAX_TITLE_LENGTH) {
            setNoteTitle(noteTitle.substring(0, MAX_TITLE_LENGTH));
        }

        if (noteContent.length > MAX_CONTENT_LENGTH) {
            setNoteContent(noteContent.substring(0, MAX_CONTENT_LENGTH));
        }

        /* Validate form values */
        if (note !== undefined) {
            if (noteCategory === "" || noteCategory === DEFAULT_CATEGORY || noteContent === "" || noteTitle === "" || (noteCategory === note.category && noteContent === note.content && noteTitle === note.title)) {
                setSaveIsDisabled(true);
            } else {
                setSaveIsDisabled(false);
            }
        } else if (isAdd && (noteCategory === "" || noteCategory === DEFAULT_CATEGORY || noteContent === "" || noteTitle === "")) {
            setSaveIsDisabled(true);
        } else if (!isAdd) {
            setSaveIsDisabled(true);
        } else {
            setSaveIsDisabled(false);
        }
    }

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

        validateForm()
        // eslint-disable-next-line
    }, [noteTitle, noteContent, noteCategory, selectedNote, isAdd, note]);

    const onDialogClose = () => {
        onClose();
    }

    const onNoteSave = () => {
        setLoading(true);

        const editedNote : Note = {
            id: note !== undefined && !isAdd ? note.id : uuidv4(),
            title: noteTitle,
            content: noteContent,
            category: noteCategory,
            timestamp: Date.now()
        }

        console.log(editedNote.id)

        if (isAdd) {
            fetch("https://66478a962bb946cf2f9e19e7.mockapi.io/api/v1/notes/notes", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(editedNote)
            }).then(response => response.json())
                .then((data: Note) => {
                    setLoading(false);
                    dispatch(addNote(data))
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
                .then((data: Note) => {
                    setLoading(false);
                    dispatch(editNote(data))
                    onDialogClose()
                }).catch(error => {
                    setErrorMessage(error.message);
                }
            )
        }
    }

    const onNoteDelete = () => {
        setDeletionConfirmation(false);

        if (note !== undefined) {
            setLoading(true);
            fetch("https://66478a962bb946cf2f9e19e7.mockapi.io/api/v1/notes/notes/" + note.id, {
                method: "DELETE"
            }).then(() => {
                setLoading(false);
                dispatch(removeNote(note.id))
                onDialogClose()
            }).catch(error => {
                setErrorMessage(error.message);
            })
        }
    }

    const dialogActionsEdit : Array<DialogAction> = [
        {btnTitle: "Cancel", btnPriority: "secondary", btnCallback: onDialogClose},
        {btnTitle: "Delete", btnPriority: "error", btnCallback: () => setDeletionConfirmation(true)},
        {btnTitle: "Save", btnPriority: "primary", btnCallback: onNoteSave}
    ]

    const dialogActionsAdd : Array<DialogAction> = [
        {btnTitle: "Cancel", btnPriority: "secondary", btnCallback: onDialogClose},
        {btnTitle: "Add", btnPriority: "primary", btnCallback: onNoteSave}
    ]

    return (
        <>
            {errorMessage !== "" ? <MaterialDialog onClose={() => setErrorMessage("")} dialogTitle={"Server error"} dialogActions={[{
                btnTitle: "Close",
                btnPriority: "primary",
                btnCallback: () => setErrorMessage("")
            }]}>{errorMessage}</MaterialDialog> :
                <MaterialDialog cancellable={true} onClose={onDialogClose} dialogActions={isAdd ? dialogActionsAdd : dialogActionsEdit} primaryButtonIsEnabled={!saveIsDisabled}>
                    {/* Controlled elements */}
                    {loading ? <LoadingScreen/> : null}
                    {deletionConfirmation ? <MaterialDialog onClose={() => setDeletionConfirmation(false)} dialogTitle={"Delete note"} dialogActions={[{
                        btnTitle: "Cancel",
                        btnPriority: "secondary",
                        btnCallback: () => setDeletionConfirmation(false)
                    }, {
                        btnTitle: "Delete",
                        btnPriority: "primary",
                        btnCallback: onNoteDelete
                    }]} priority={"high"}>{`Are you sure you want to delete the note "${selectedNote.title}"?`}</MaterialDialog> : null}

                    {/* Dialog contents go here */}
                    <MaterialTextInputEditText fullWidth label={"Title"} value={noteTitle} onChange={(e) => {
                        setNoteTitle(e.target.value)
                    }} helperText={noteTitle.length.toString() + "/" + MAX_TITLE_LENGTH.toString()}/>
                    <br/><br/>
                    <MaterialTextInputEditText fullWidth multiline label={"Note"} rows={8} value={noteContent}
                                               onChange={(e) => {
                                                   setNoteContent(e.target.value)
                                               }}
                                               helperText={noteContent.length.toString() + "/" + MAX_CONTENT_LENGTH.toString()}/>
                    <br/><br/>
                    <MaterialTextInputEditText fullWidth label={"Category"} value={noteCategory} onChange={(e) => {
                        setNoteCategory(e.target.value)
                    }} select>
                        {[{
                            value: DEFAULT_CATEGORY,
                            label: DEFAULT_CATEGORY,
                            color: "var(--color-accent-800)",
                            colorTint: "var(--color-accent-300)",
                            colorHover: "var(--color-accent-400)"
                        }, ...Categories].map((option: Category) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </MaterialTextInputEditText>
                </MaterialDialog>
            }
        </>
    );
}

export default NoteEditDialog;
