import React from "react";
import "./OptionsModal.css";

export interface OptionsModalProps {
    isToolOpen: boolean,
    setIsToolOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const OptionsModal = (props: OptionsModalProps) => {
    const computeDisplayProperty = () => {
        // TODO: "flex" value in display should be injected, not hardcoded
        return props.isToolOpen ? "flex" : "none";
    }

    const onCloseClick = () => {
        props.setIsToolOpen(false);
    }

    const onReportBugClick = () => {

    }

    const onSuggestIdeaClick = () => {

    }

    return (
        <div className="modal-wrapper" style={{display: computeDisplayProperty()}}>
            <div className="modal" id="options-modal">
                <button onClick={onReportBugClick}>Report a bug</button>
                <button onClick={onSuggestIdeaClick}>Suggest new idea</button>
                <button onClick={onCloseClick}>Close</button>
            </div>
        </div>
    );
};

export default OptionsModal;
