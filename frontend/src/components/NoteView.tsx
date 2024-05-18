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
import {Categories} from "../util/Categories";

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

    const getCategoryColor = (category: string) => {
        return Categories.find(c => c.value === category)?.color;
    }

    const getCategoryColorTint = (category: string) => {
        return Categories.find(c => c.value === category)?.colorTint;
    }

    const getCategoryColorHover = (category: string) => {
        return Categories.find(c => c.value === category)?.colorHover;
    }

    return (
        <MaterialButtonCard sx={{
            backgroundColor: getCategoryColorTint(note.category),
            '& .MuiTouchRipple-root': {
                color: getCategoryColor(note.category),
            },
            '&:hover': {
                backgroundColor: getCategoryColorHover(note.category),
            }
        }} onClick={() => selectNote(note.id)}>
            <div className={"card"}>
                <div>
                    <p className={"card-title"} style={{
                        color: getCategoryColor(note.category)
                    }}>{note.title}</p>
                    <p className={"card-content"}>{note.content}</p>
                </div>
                <div className={"card-footer"}>
                    <p className={"card-tag"} style={{
                        color: getCategoryColor(note.category),
                        backgroundColor: getCategoryColorTint(note.category)
                    }}>{note.category}</p>
                    <p className={"card-time"}>{(new Date(note.timestamp)).toLocaleString()}</p>
                </div>
            </div>
        </MaterialButtonCard>
    );
}

export default NoteView;
