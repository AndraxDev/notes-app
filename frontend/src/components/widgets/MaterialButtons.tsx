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
 * This file contains common Material 3 buttons. Since Mui Material UI
 * supports only Material 2 buttons I added some transformations as described here:
 * https://m3.material.io/components/buttons/overview
 *
 * Additionally, I added Error Button which is not officially supported by Material 3,
 * but it will help to indicate dangerous actions like deleting notes.
 * */

import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import '../../theme/colors.css'

// This is a template to reduce amount of code
const MaterialButtonTemplate = styled(Button)(() => ({
    textTransform: "none",
    borderRadius: "24px",
    paddingLeft: "12px",
    paddingRight: "12px",
    fontSize: "14px",
    height: "40px",
    boxSizing: "border-box",
    verticalAlign: "middle",
    '&:hover': {
        boxShadow: "none",
    },
}));

export const MaterialButtonFilled = styled(MaterialButtonTemplate)(() => ({
    color: "var(--color-accent-50)",
    backgroundColor: "var(--color-accent-800)",
    border: "1px solid var(--color-accent-800)",
    '&:disabled': {
        backgroundColor: "#444444",
        border: "1px solid #444444",
        color: "#cecece",
        cursor: "not-allowed",
    },
    '&:hover': {
        backgroundColor: "var(--color-accent-900)",
        border: "1px solid var(--color-accent-900)",
    },
}));

export const FloatingActionButton = styled(MaterialButtonTemplate)(() => ({
    color: "var(--color-accent-50)",
    backgroundColor: "var(--color-accent-800)",
    textTransform: "none",
    borderRadius: "16px",
    paddingLeft: "12px",
    paddingRight: "12px",
    fontSize: "14px",
    height: "56px",
    boxSizing: "border-box",
    verticalAlign: "middle",
    '&:hover': {
        backgroundColor: "var(--color-accent-900)",
    },
}));

export const MaterialButtonTonal = styled(MaterialButtonTemplate)(() => ({
    color: "var(--color-accent-800)",
    backgroundColor: "var(--color-accent-300)",
    border: "1px solid var(--color-accent-300)",
    '&:hover': {
        backgroundColor: "var(--color-accent-400)",
        border: "1px solid var(--color-accent-400)",
    },
}));

export const MaterialButtonIcon = styled(MaterialButtonTonal)(() => ({
    width: "56px",
    height: "56px",
}));

export const MaterialButtonOutlined = styled(MaterialButtonTemplate)(() => ({
    color: "var(--color-accent-800)",
    borderColor: "var(--color-accent-800)",
    border: "1px solid var(--color-accent-800)",
    '&:hover': {
        backgroundColor: "var(--color-primary-accent-transparent)",
        borderColor: "var(--color-accent-900)",
        border: "1px solid var(--color-accent-900)",
    },
}));

// @ts-ignore
export const MaterialButtonCard = styled(MaterialButtonTemplate)(() => ({
    color: "var(--color-accent-800)",
    backgroundColor: "var(--color-accent-100)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    borderRadius: "16px",
    textTransform: "none",
    height: "260px",
    verticalAlign: "middle",
    '&:hover': {
        backgroundColor: "rgba(255, 255, 255, 0.2)",
        border: "1px solid rgba(255, 255, 255, 0.1)"
    },
}));

export const MaterialButtonError = styled(MaterialButtonTemplate)(() => ({
    color: "var(--color-warn)",
    backgroundColor: "rgba(255,103,103,0.2)",
    textTransform: "none",
    borderRadius: "50pc",
    paddingLeft: "12px",
    paddingRight: "12px",
    paddingTop: "10px",
    paddingBottom: "10px",
    verticalAlign: "middle",
    boxSizing: "border-box",
    fontSize: "12px",
    outline: "1px solid rgba(255,103,103,0.2)",
    '&:hover': {
        backgroundColor: "var(--color-warn-transparent-hover)",
        outline: "1px solid var(--color-warn-transparent-hover)",
    },
}));
