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

import React from 'react';
import PropTypes from "prop-types";
import {MaterialButtonCard} from "./widgets/MaterialButtons";
import {Note} from "../notesSlice";

NoteView.propTypes = {
    note: PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
        category: PropTypes.string.isRequired,
        timestamp: PropTypes.number.isRequired
    }).isRequired,
    selectNote: PropTypes.func.isRequired
}

function NoteView({note, selectNote} : Readonly<{note: Note, selectNote: any}>) {
    return (
        <MaterialButtonCard onClick={() => selectNote(note.id)}>
            <p>{note.title}</p>
            <p>{note.content}</p>
            <p>{note.category}</p>
            <p>{(new Date(note.timestamp)).toLocaleString()}</p>
        </MaterialButtonCard>
    );
}

export default NoteView;
