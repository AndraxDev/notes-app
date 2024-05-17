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
import {addNote, clearAllNotes, getAllNotes, Note, NoteArray} from "../notesSlice";
import {useDispatch, useSelector} from "react-redux";
import NoteEditDialog from "./NoteEditDialog";
import {FloatingActionButton} from "./widgets/MaterialButtons";
import {MaterialTextInputEditText} from "./widgets/MaterialTextInputEditText";
import LoadingScreen from "./widgets/LoadingScreen";
import MaterialDialog from "./widgets/MaterialDialog";
import {ALL_CATEGORIES, Categories, Category} from "../util/Categories";
import {MenuItem} from "@mui/material";

function Home() {
    const dispatch = useDispatch();
    const noteSelector= getAllNotes();
    const ns = useSelector(noteSelector);

    const [notes, setNotes] : [NoteArray, any] = React.useState([]);
    const [searchQuery, setSearchQuery] : [string, any] = React.useState("");
    const [categoryFilter, setCategoryFilter] : [string, any] = React.useState(ALL_CATEGORIES);
    const [addDialogOpen, setAddDialogOpen] : [boolean, any] = React.useState(false);
    const [errorMessage, setErrorMessage] : [string, any] = React.useState("");
    const [loading, setLoading] : [boolean, any] = React.useState(true);

    useEffect(() => {
        dispatch(clearAllNotes());
        fetch("https://66478a962bb946cf2f9e19e7.mockapi.io/api/v1/notes/notes")
            .then(response => response.json())
            .then((data: Array<Note>) => {
                data.forEach(note => {
                    dispatch(addNote(note))
                })

                setLoading(false);
            }).catch(error => {
                setErrorMessage(error.message);
                setLoading(false);
            })
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        setNotes(ns);
    }, [ns]);

    return (
        <div>
            {loading ? <LoadingScreen/> : null}

            {errorMessage !== "" ? <MaterialDialog onClose={() => setErrorMessage("")} dialogTitle={"Server error"} dialogActions={[{
                btnTitle: "Close",
                btnPriority: "primary",
                btnCallback: () => setErrorMessage("")
            }]}>{errorMessage}</MaterialDialog> : null}

            {addDialogOpen ? <NoteEditDialog onClose={() => setAddDialogOpen(false)} id={""} isAdd={true}/> : null}

            <div className={"fab"}>
                <FloatingActionButton onClick={() => setAddDialogOpen(true)}><span className={"material-symbols-outlined"}>add</span>&nbsp;&nbsp;&nbsp;Add Note</FloatingActionButton>
            </div>

            <h1 className={"app-title"}>M3 Notes</h1>
            <div className={"search-container"}>
                <MaterialTextInputEditText className={"w75"} variant={"filled"} label={"Search"} value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}/>
                <MaterialTextInputEditText className={"w25"} variant={"filled"}
                                           label={"Category"}
                                           value={categoryFilter}
                                           onChange={(e) => setCategoryFilter(e.target.value)}
                                           select
                >
                    {[{value: ALL_CATEGORIES, label: ALL_CATEGORIES, color: "var(--color-accent-800)",
                        colorTint: "var(--color-accent-300)"}, ...Categories].map((option: Category) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </MaterialTextInputEditText>
            </div>
            <NotesList notes={notes} searchQuery={searchQuery} categoryFilter={categoryFilter}/>
        </div>
    );
}

export default Home;
