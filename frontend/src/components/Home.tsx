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
import {getFiltered, NoteArray} from "../notesSlice";
import {useDispatch, useSelector} from "react-redux";
import NoteEditDialog from "./NoteEditDialog";
import {FloatingActionButton, MaterialButtonIcon} from "./widgets/MaterialButtons";
import {MaterialTextInputEditText} from "./widgets/MaterialTextInputEditText";
import LoadingScreen from "./widgets/LoadingScreen";
import MaterialDialog from "./widgets/MaterialDialog";
import {ALL_CATEGORIES, Categories, Category} from "../util/Categories";
import {MenuItem} from "@mui/material";

const getAssistantDefaultDescription = () => {
    return (`
        What can this assistant do:<br/><br/>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;Provide answer based on your notes<br/>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;Summarize your notes<br/>
        
    `);
}

function Home() {
    const dispatch = useDispatch();

    const [notes, setNotes] : [NoteArray, any] = React.useState([]);
    const [searchQuery, setSearchQuery] : [string, any] = React.useState("");
    const [categoryFilter, setCategoryFilter] : [string, any] = React.useState(ALL_CATEGORIES);
    const [addDialogOpen, setAddDialogOpen] : [boolean, any] = React.useState(false);
    const [errorMessage, setErrorMessage] : [string, any] = React.useState("");
    const [loading, setLoading] : [boolean, any] = React.useState(false); // TODO: Change to true when Firebase is ready
    const [assistantOpened, setAssistantOpened] : [boolean, any] = React.useState(false);
    const [prompt, setPrompt] : [string, any] = React.useState("");

    const noteSelector= getFiltered(searchQuery, categoryFilter);
    let ns = useSelector(noteSelector);

    // Implement when Firebase is ready
    // useEffect(() => {
    //     dispatch(clearAllNotes());
    //     fetch("https://66478a962bb946cf2f9e19e7.mockapi.io/api/v1/notes/notes")
    //         .then(response => response.json())
    //         .then((data: Array<Note>) => {
    //             data.forEach(note => {
    //                 dispatch(addNote(note))
    //             })
    //
    //             setLoading(false);
    //         }).catch(error => {
    //             setErrorMessage(error.message);
    //             setLoading(false);
    //         })
    //     // eslint-disable-next-line
    // }, []);

    useEffect(() => {
        setNotes(ns);
    }, [ns]);

    /* AI assistant will listen for any changes to provide user with relevant info */
    useEffect(() => {
        const assistantSettings = {
            "name": "M3 Notes Assistant",
            "chatLocation": "m3Notes",
            "icon": "https://notes.teslasoft.org/logo192.png",
            "description": getAssistantDefaultDescription(),
            "initialMessage": "Act as an assistant for Notes app. Provide your answers and suggestions based on the following note list: ```" + unescape(encodeURIComponent(JSON.stringify(notes))) + "```.",
            "initialResponse": "Hello! I am the M3 Notes Assistant. I can help you with any questions you have about your notes. Feel free to ask me anything!",
            "systemMessage": "Pay attention to the bar data provided to you. Provide your answers and suggestions based on it!"
        }

        setPrompt(encodeURIComponent(btoa(JSON.stringify(assistantSettings))));
    }, [notes]);

    return (
        <div className={"content"}>
            {loading ? <LoadingScreen/> : null}

            {errorMessage !== "" ? <MaterialDialog onClose={() => setErrorMessage("")} dialogTitle={"Server error"} dialogActions={[{
                btnTitle: "Close",
                btnPriority: "primary",
                btnCallback: () => setErrorMessage("")
            }]}>{errorMessage}</MaterialDialog> : null}

            {addDialogOpen ? <NoteEditDialog onClose={() => setAddDialogOpen(false)} id={""} isAdd={true}/> : null}

            <div className={"fab"}>
                <FloatingActionButton onClick={() => setAddDialogOpen(true)}><span className={"material-symbols-outlined"}>add</span>&nbsp;&nbsp;New note&nbsp;</FloatingActionButton>
            </div>

            <div className={"assistant-button-container"}>
                <MaterialButtonIcon onClick={() => setAssistantOpened(!assistantOpened)}><span className={"material-symbols-outlined"}>smart_toy</span></MaterialButtonIcon>
            </div>

            {assistantOpened ? <div className={"assistant-embedded"}>
                <iframe
                    src={"https://assistant.teslasoft.org/embedded?payload=" + prompt} className={"assistant-iframe"} title={"M3 Notes"}/>
            </div> : null}

            <h1 className={"app-title"}>M3 Notes</h1>
            <div className={"search-container"}>
                <MaterialTextInputEditText className={"w60"} variant={"filled"} label={"Search"} value={searchQuery}
                                           onChange={(e) => setSearchQuery(e.target.value)}/>
                <MaterialTextInputEditText className={"w30"} variant={"filled"}
                                           label={"Category"}
                                           value={categoryFilter}
                                           onChange={(e) => setCategoryFilter(e.target.value)}
                                           select
                >
                    {[
                        {
                            value: ALL_CATEGORIES,
                            label: ALL_CATEGORIES,
                            color: "var(--color-accent-800)",
                            colorTint: "var(--color-accent-300)",
                            colorHover: "var(--color-accent-400)"
                        },
                        ...Categories
                    ].map((option: Category) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </MaterialTextInputEditText>
            </div>
            <NotesList notes={notes}/>
        </div>
    );
}

export default Home;
