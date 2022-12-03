import React from "react";
import { BoolUseStateSetter } from "../BugReportingTool";
import "./FormModal.css";

export interface FormModalProps {
    setIsFormOpen: BoolUseStateSetter,
    type: IssueType
}

const FormModal = (props: FormModalProps) => {
    const onCloseClick = () => {
        props.setIsFormOpen(false);
    }

    return (
        <div className="modal-wrapper">
            <div className="modal" id="options-modal">
                {props.type.toString()}
                <button onClick={onCloseClick}>Close</button>
            </div>
        </div>
    );
};

enum IssueType {
    Bug,
    Idea
}

export default FormModal;
export { IssueType }
