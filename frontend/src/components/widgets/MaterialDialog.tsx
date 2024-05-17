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

/**
 * This file contains implementation of Material Design 3 dialog.
 * */

import React, {ReactNode} from 'react';
import PropTypes from "prop-types";
import {
    MaterialButtonError,
    MaterialButtonFilled,
    MaterialButtonOutlined,
    MaterialButtonTonal
} from "./MaterialButtons";
import {uuid} from "uuidv4";

MaterialDialog.propTypes = {
    cancellable: PropTypes.bool, // Dialog can be cancelled by clicking outside
    onClose: PropTypes.func, // Dialog close callback
    dialogTitle: PropTypes.string, // Dialog title, if title is not set it will not be displayed
    children: PropTypes.any, // Dialog content can contain any JSX elements
    dialogActions: PropTypes.any // Dialog actions can contain buttons or other actions
}

function MaterialDialog({cancellable, onClose, dialogTitle, children, dialogActions} : Readonly<{
    cancellable: boolean,
    onClose: any,
    dialogTitle: string,
    children: ReactNode,
    dialogActions: Array<{ btnTitle: string, btnPriority: string, btnCallback: any }>
}>) {

    const getButton = (btnTitle: string, btnPriority: string, btnCallback: any) : ReactNode => {
        const key = uuid()

        if (btnPriority === "primary") {
            return <MaterialButtonFilled key={key} onClick={btnCallback}>{btnTitle}</MaterialButtonFilled>
        } else if (btnPriority === "secondary") {
            return <MaterialButtonOutlined key={key} onClick={btnCallback}>{btnTitle}</MaterialButtonOutlined>
        } else if (btnPriority === "error") {
            return <MaterialButtonError key={key} onClick={btnCallback}>{btnTitle}</MaterialButtonError>
        } else {
            return <MaterialButtonTonal key={key} onClick={btnCallback}>{btnTitle}</MaterialButtonTonal>
        }
    }

    return (
        <div className={"priority dialog-backdrop"} onMouseDown={() => {
            /* Close dialog on click outside */
            if (cancellable) {
                onClose()
            }
        }}>
            <div className={"dialog-paper"} onMouseDown={(e) => e.stopPropagation()}>
                {dialogTitle === null ? null : <h1 className={"dialog-title"}>{dialogTitle}</h1>}
                <div>
                    {children}
                </div>
                <div className={"dialog-actions"}>
                    {dialogActions !== null ? dialogActions.map((action: { btnTitle: string, btnPriority: string, btnCallback: any }) => {
                        return getButton(action.btnTitle, action.btnPriority, action.btnCallback)
                    }) : null}
                </div>
            </div>
        </div>
    );
}

export default MaterialDialog;
