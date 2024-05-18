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

export const DEFAULT_CATEGORY = "-- Select a category --";
export const ALL_CATEGORIES = "-- All categories --";
export const NO_CATEGORY = "-- No category --";

export type Category = {
    value: string,
    label: string,
    color: string,
    colorTint: string,
    colorHover: string
};

export type CategoryArray = Array<Category>;

export const Categories: CategoryArray = [
    {
        value: NO_CATEGORY,
        label: NO_CATEGORY,
        color: "#d7d7d7",
        colorTint: "rgba(158,158,158,0.12)",
        colorHover: "rgba(158,158,158,0.24)"
    },
    {
        value: "General",
        label: "General",
        color: "#ffe9a6",
        colorTint: "rgba(255,224,132,0.12)",
        colorHover: "rgba(255,223,130,0.24)"
    },
    {
        value: "Work",
        label: "Work",
        color: "#a1c9ff",
        colorTint: "rgba(143,192,255,0.12)",
        colorHover: "rgba(149,198,255,0.24)"
    },
    {
        value: "Personal",
        label: "Personal",
        color: "#b4ff9f",
        colorTint: "rgba(151,190,132,0.12)",
        colorHover: "rgba(164,204,141,0.24)"
    },
    {
        value: "School",
        label: "School",
        color: "#ffa2a2",
        colorTint: "rgba(255,142,142,0.12)",
        colorHover: "rgba(255,147,147,0.24)"
    },
    {
        value: "Other",
        label: "Other",
        color: "#dbc7ff",
        colorTint: "rgba(218,195,255,0.12)",
        colorHover: "rgba(238,223,255,0.24)"
    }
]
