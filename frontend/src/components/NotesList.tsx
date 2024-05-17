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

function NotesList({notes, searchQuery, categoryFilter} : Readonly<{notes: Array<{id: string, title: string, content: string, category: string}>, searchQuery: string, categoryFilter: string}>) {
    const [selectedNoteId, setSelectedNoteId] : [string, any] = React.useState("");
    const [editDialogOpen, setEditDialogOpen] : [boolean, any] = React.useState(false);

    // Notes projection is a filtered notes list based on selected category and search query
    const [notesProjection, setNotesProjection] : [Array<{id: string, title: string, content: string, category: string}>, any] = React.useState([]);

    useEffect(() => {
        if (!editDialogOpen) {
            setSelectedNoteId("");
        }
    }, [editDialogOpen]);

    const onNoteSelect = (id: string) => {
        setSelectedNoteId(id);
        setEditDialogOpen(true);
    }

    const updateNotesProjection = () => {
        if (categoryFilter.trim() === "" && searchQuery.trim() === "") {
            setNotesProjection(notes);
            return;
        } else {
            let filteredNotes = notes.filter(note => {
                if (categoryFilter.trim() !== "" && searchQuery.trim() !== "") {
                    return note.category.toLowerCase() === categoryFilter.toLowerCase() && (note.title.toLowerCase().includes(searchQuery.toLowerCase()) || note.content.toLowerCase().includes(searchQuery.toLowerCase()));
                } else if (categoryFilter.trim() !== "") {
                    return note.category.toLowerCase() === categoryFilter.toLowerCase();
                } else if (searchQuery.trim() !== "") {
                    return note.title.includes(searchQuery) || note.content.toLowerCase().includes(searchQuery.toLowerCase());
                }
            });

            setNotesProjection(filteredNotes);
        }
    }

    /* Search filter logics */
    useEffect(() => {
        updateNotesProjection()
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
