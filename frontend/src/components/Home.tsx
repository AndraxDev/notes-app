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
import NotesList from "./NotesList";
import {addNote, getAllNotes, Note} from "../notesSlice";
import {useDispatch, useSelector} from "react-redux";
import NoteEditDialog from "./NoteEditDialog";
import {MaterialButtonFilled} from "./widgets/MaterialButtons";
import {MaterialTextInputEditText} from "./widgets/MaterialTextInputEditText";

function Home() {
    const dispatch = useDispatch();
    const noteSelector= getAllNotes();
    const ns = useSelector(noteSelector);

    const [notes, setNotes] : [Array<Note>, any] = React.useState([]);
    const [searchQuery, setSearchQuery] : [string, any] = React.useState("");
    const [categoryFilter, setCategoryFilter] : [string, any] = React.useState("");
    const [addDialogOpen, setAddDialogOpen] : [boolean, any] = React.useState(false);
    const [errorMessages, setErrorMessages] : [string, any] = React.useState("");

    useEffect(() => {
        fetch("https://66478a962bb946cf2f9e19e7.mockapi.io/api/v1/notes/notes")
            .then(response => response.json())
            .then((data: Array<Note>) => {
                data.forEach(note => {
                    dispatch(addNote(note))
                })
        }).catch(error => {
            setErrorMessages(error.message);
        })
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        setNotes(ns);
    }, [ns]);

    return (
        <div>
            {addDialogOpen ? <NoteEditDialog onClose={() => setAddDialogOpen(false)} id={""} isAdd={true}/> : null}
            <MaterialButtonFilled onClick={() => setAddDialogOpen(true)}>Add Note</MaterialButtonFilled>
            <MaterialTextInputEditText label={"Search"} value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}/>
            <MaterialTextInputEditText label={"Category"} value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}/>
            <h1>M3 Notes</h1>
            <NotesList notes={notes} searchQuery={searchQuery} categoryFilter={categoryFilter}/>
        </div>
    );
}

export default Home;
