import React from "react";
import "./OptionsModal.css";

export interface OptionsModalProps {
    isToolOpen: boolean,
    setIsToolOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const OptionsModal = (props: OptionsModalProps) => {
    const closeModal = () => {
        props.setIsToolOpen(false);
    }

    return (
        // TODO: "flex" value in display should be injected, not hardcoded
        <div className="modal-wrapper" style={{display: (props.isToolOpen ? "flex" : "none")}}>
            <div className="modal" id="options-modal">
                <button>Report a bug</button>
                <button>Suggest new idea</button>
                <button onClick={closeModal}>Close</button>
            </div>
        </div>
    );
};

export default OptionsModal;
