import React, {useEffect, useState} from 'react';
import PropTypes from "prop-types";
import {useDispatch, useSelector} from "react-redux";
import {editNote, getNoteById, removeNote, selectNote, selectNoteById} from "../notesSlice";
import MaterialDialog from "./widgets/MaterialDialog";
import {MaterialTextInputEditText} from "./widgets/MaterialTextInputEditText";

NoteEditDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    id: PropTypes.string
}

function NoteEditDialog({onClose, id} : Readonly<{onClose: any, id: string}>) {
    const noteSelector = selectNoteById(id);
    const note = useSelector(noteSelector);
    const dispatch = useDispatch();

    const [selectedNote, setSelectedNote] = useState({id: "", title: "", content: ""});
    const [noteTitle, setNoteTitle] = useState("");
    const [noteContent, setNoteContent] = useState("");

    useEffect(() => {
        if (note) {
            setSelectedNote(note);
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
    }, [noteTitle, noteContent]);

    const onDialogClose = () => {
        onClose();
    }

    const onNoteSave = () => {
        dispatch(editNote(selectedNote))
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
        <MaterialDialog cancellable={true} onClose={onDialogClose} dialogTitle={selectedNote.title} dialogActions={dialogActions}>
            <MaterialTextInputEditText value={noteTitle} onChange={(e) => {
                setNoteTitle(e.target.value)
            }}/>
            <MaterialTextInputEditText value={noteContent} onChange={(e) => {
                setNoteContent(e.target.value)
            }}/>
        </MaterialDialog>
    );
}

export default NoteEditDialog;