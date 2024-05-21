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
import {
    MaterialButtonError,
    MaterialButtonFilled,
    MaterialButtonOutlined,
    MaterialButtonTonal
} from "./MaterialButtons";

export type DialogAction = {
    btnTitle: string,
    btnPriority: string,
    btnCallback: any
}

function MaterialDialog({cancellable, onClose, dialogTitle, children, dialogActions, primaryButtonIsEnabled = true, priority} : Readonly<{
    cancellable?: boolean,
    onClose: any,
    dialogTitle?: string,
    children?: ReactNode,
    dialogActions?: Array<DialogAction>,
    primaryButtonIsEnabled?: boolean,
    priority?: string
}>) {
    const getButton = (btnTitle: string, btnPriority: string, btnCallback: any, key: number) : ReactNode => {

        const k = key.toString()

        if (btnPriority === "primary") {
            return <MaterialButtonFilled key={k} onClick={btnCallback} disabled={!primaryButtonIsEnabled}>{btnTitle}</MaterialButtonFilled>
        } else if (btnPriority === "secondary") {
            return <MaterialButtonOutlined key={k} onClick={btnCallback}>{btnTitle}</MaterialButtonOutlined>
        } else if (btnPriority === "error") {
            return <MaterialButtonError key={k} onClick={btnCallback}>{btnTitle}</MaterialButtonError>
        } else {
            return <MaterialButtonTonal key={k} onClick={btnCallback}>{btnTitle}</MaterialButtonTonal>
        }
    }

    return (
        <div className={"priority priority-" + priority + " dialog-backdrop"} onMouseDown={() => {
            /* Close dialog on click outside */
            if (cancellable) {
                onClose()
            }
        }}>
            <div className={"dialog-paper"} onMouseDown={(e) => e.stopPropagation()}>
                {dialogTitle === undefined ? null : <h1 className={"dialog-title"}>{dialogTitle}</h1>}
                <div style={{width: "100%"}}>
                    {children}
                </div>
                <div className={"dialog-actions"}>
                    {dialogActions !== undefined ? dialogActions.map((action: { btnTitle: string, btnPriority: string, btnCallback: any }, index: number) => {
                        return getButton(action.btnTitle, action.btnPriority, action.btnCallback, index)
                    }) : null}
                </div>
            </div>
        </div>
    );
}

export default MaterialDialog;
