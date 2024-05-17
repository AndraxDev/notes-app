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

import React, {useEffect} from 'react';
import NoteView from "./NoteView";
import NoteEditDialog from "./NoteEditDialog";
import {Note, NoteArray} from "../notesSlice";
import PropTypes from "prop-types";

NotesList.propTypes = {
    notes: PropTypes.array.isRequired,
    searchQuery: PropTypes.string.isRequired,
    categoryFilter: PropTypes.string.isRequired
}

function NotesList({notes, searchQuery, categoryFilter} : Readonly<{notes: NoteArray, searchQuery: string, categoryFilter: string}>) {
    const [selectedNoteId, setSelectedNoteId] : [string, any] = React.useState("");
    const [editDialogOpen, setEditDialogOpen] : [boolean, any] = React.useState(false);

    // Notes projection is a filtered notes list based on selected category and search query
    const [notesProjection, setNotesProjection] : [NoteArray, any] = React.useState([]);

    useEffect(() => {
        if (!editDialogOpen) {
            setSelectedNoteId("");
        }
    }, [editDialogOpen]);

    const onNoteSelect = (id: string) => {
        setSelectedNoteId(id);
        setEditDialogOpen(true);
    }

    const sortNotesByTimestamp = (a: Note, b: Note) => {
        return b.timestamp - a.timestamp;
    }

    const updateNotesProjection = () => {
        if (categoryFilter.trim() === "" && searchQuery.trim() === "") {
            const notesCopy = [...notes];
            notesCopy.sort(sortNotesByTimestamp)
            setNotesProjection(notesCopy);
        } else {
            let filteredNotes = notes.filter(note => {
                if (categoryFilter.trim() !== "" && searchQuery.trim() !== "") {
                    return note.category.toLowerCase() === categoryFilter.toLowerCase() && (note.title.toLowerCase().includes(searchQuery.toLowerCase()) || note.content.toLowerCase().includes(searchQuery.toLowerCase()));
                } else if (categoryFilter.trim() !== "") {
                    return note.category.toLowerCase() === categoryFilter.toLowerCase();
                } else if (searchQuery.trim() !== "") {
                    return note.title.includes(searchQuery) || note.content.toLowerCase().includes(searchQuery.toLowerCase());
                } else {
                    return false;
                }
            });

            const notesCopy = [...filteredNotes];
            notesCopy.sort(sortNotesByTimestamp)
            setNotesProjection(notesCopy);
        }
    }

    /* Search filter logics */
    useEffect(() => {
        updateNotesProjection()
        // eslint-disable-next-line
    }, [notes, categoryFilter, searchQuery]);

    return (
        <>
            {editDialogOpen ? <NoteEditDialog onClose={() => setEditDialogOpen(false)} id={selectedNoteId} isAdd={false}/> : null}
            {notesProjection.map(note => (
                <NoteView note={note} selectNote={onNoteSelect} key={note.id}/>
            ))}
        </>
    );
}

export default NotesList;
