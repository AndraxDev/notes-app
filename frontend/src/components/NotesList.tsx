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
import {NoteArray} from "../notesSlice";

function NotesList({notes} : Readonly<{notes: NoteArray}>) {
    const [selectedNoteId, setSelectedNoteId] : [string, any] = React.useState("");
    const [editDialogOpen, setEditDialogOpen] : [boolean, any] = React.useState(false);

    useEffect(() => {
        if (!editDialogOpen) {
            setSelectedNoteId("");
        }
    }, [editDialogOpen]);

    const onNoteSelect = (id: string) => {
        setSelectedNoteId(id);
        setEditDialogOpen(true);
    }

    return (
        <div className={"grid-list"}>
            {editDialogOpen ? <NoteEditDialog onClose={() => setEditDialogOpen(false)} id={selectedNoteId} isAdd={false}/> : null}
            {notes.map(note => (
                <NoteView note={note} selectNote={onNoteSelect} key={note.id}/>
            ))}
            <div className={"fab-space"}>{/* Leave some space for fab and mobile browsers */}</div>
        </div>
    );
}

export default NotesList;
