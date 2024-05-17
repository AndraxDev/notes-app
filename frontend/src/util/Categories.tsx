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
    colorTint: string
};

export type CategoryArray = Array<Category>;

export const Categories: CategoryArray = [
    {
        value: NO_CATEGORY,
        label: NO_CATEGORY,
        color: "var(--color-accent-800)",
        colorTint: "var(--color-accent-300)"
    },
    {
        value: "General",
        label: "General",
        color: "#FFC107",
        colorTint: "rgba(255,193,7,0.16)"
    },
    {
        value: "Work",
        label: "Work",
        color: "#2196F3",
        colorTint: "rgba(33,150,243,0.16)"
    },
    {
        value: "Personal",
        label: "Personal",
        color: "#4CAF50",
        colorTint: "rgba(76,175,80,0.16)"
    },
    {
        value: "School",
        label: "School",
        color: "#FF5722",
        colorTint: "rgba(255,87,34,0.16)"
    },
    {
        value: "Other",
        label: "Other",
        color: "#9E9E9E",
        colorTint: "rgba(158,158,158,0.16)"
    }
]
