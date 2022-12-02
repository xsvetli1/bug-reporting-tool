import React from "react";
import "./OptionsModal.css";

export interface OptionsModalProps {
    isToolOpen: boolean,
    setIsToolOpen: React.Dispatch<React.SetStateAction<boolean>>,
    isBugAnnotationOpen: boolean,
    setIsBugAnnotationOpen: React.Dispatch<React.SetStateAction<boolean>>,
    isIdeaAmmptatopmOpen: boolean,
    setIsIdeaAnnotationOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const OptionsModal = (props: OptionsModalProps) => {
    const computeDisplayProperty = () => {
        // TODO: "flex" value in display should be injected, not hardcoded
        return props.isToolOpen && !props.isBugAnnotationOpen && !props.isIdeaAmmptatopmOpen
            ? "flex"
            : "none";
    }

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
