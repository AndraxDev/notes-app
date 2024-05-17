import React from 'react';
import {CircularProgress} from "@mui/material";

function LoadingScreen() {
    return (
        <div className={"priority-max dialog-backdrop"}>
            <div className="loading-screen">
                <CircularProgress style={{
                    color: "var(--color-accent-800)"
                }}/>
            </div>
        </div>
    );
}

export default LoadingScreen;