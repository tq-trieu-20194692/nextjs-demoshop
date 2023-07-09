import {CSpinner} from "@coreui/react";
import React from "react";

export const SuspenseLoadingWidget= () => {
    return (
        <div className={'w-screen h-screen flex justify-center items-center'}>
            <CSpinner color="primary"/>
        </div>
    )
}