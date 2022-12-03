import React from "react";
import { BoolUseStateSetter } from "../BugReportingTool";
import "./OptionsModal.css";

export interface OptionsModalProps {
    setIsToolOpen: BoolUseStateSetter,
    setIsBugAnnotationOpen: BoolUseStateSetter,
    setIsIdeaAnnotationOpen: BoolUseStateSetter
}

const OptionsModal = (props: OptionsModalProps) => {
    const onCloseClick = () => {
        props.setIsToolOpen(false);
        props.setIsBugAnnotationOpen(false); // Should be unnecessary
        props.setIsIdeaAnnotationOpen(false); // Should be unnecessary
    }

    const onReportBugClick = () => {
        props.setIsBugAnnotationOpen(true);
    }

    const onSuggestIdeaClick = () => {
        props.setIsIdeaAnnotationOpen(true);
    }

    return (
        <div className="modal-wrapper">
            <div className="modal" id="options-modal">
                <button onClick={onReportBugClick}>Report a bug</button>
                <button onClick={onSuggestIdeaClick}>Suggest new idea</button>
                <button onClick={onCloseClick}>Close</button>
            </div>
        </div>
    );
};

export default OptionsModal;
