import React from 'react';
import ReactDOM from 'react-dom';
import { BugReportingTool } from './components';
import { Platform, PlatformProps } from './integration';

/**
 * This file defines logic to append Bug Reporting Tool to the webpage
 * based on the global properties passed to BugReportingToolProps.
 *
 * It is used in IIFE Rollup bundle build format for HTML script snippet
 * installation.
 */
declare global {
    interface Window {
        BugReportingToolProps: {
            platform: Platform;
            platformProps: PlatformProps;
            isEmailRequired: boolean;
        };
    }
}
function mountTool() {
    const mountNode = document.createElement('div');
    document.body.appendChild(mountNode);

    ReactDOM.render(
        <BugReportingTool
            platform={window.BugReportingToolProps.platform}
            platformProps={window.BugReportingToolProps.platformProps}
            isEmailRequired={window.BugReportingToolProps.isEmailRequired}
        />,
        mountNode
    );
}

if (document.body) {
    mountTool();
} else {
    document.addEventListener('DOMContentLoaded', mountTool);
}
