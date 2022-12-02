import React from "react";
import "./FormModal.css";

export interface FormModalProps {
    isToolOpen: boolean,
    isFormOpen: boolean,
    setIsFormOpen: React.Dispatch<React.SetStateAction<boolean>>,
    type: IssueType
}

const FormModal = (props: FormModalProps) => {
    const computeDisplayProperty = () => {
        // TODO: "flex" value in display should be injected, not hardcoded
        return props.isToolOpen && props.isFormOpen ? "flex" : "none";
    }

    const onCloseClick = () => {
        props.setIsFormOpen(false);
    }

    return (
        <div className="modal-wrapper" style={{display: computeDisplayProperty()}}>
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
