import React from 'react';
import ReactDOM from 'react-dom';
import { BugReportingTool } from './components';
import { Platform, PlatformProps } from './integration';

declare global {
    interface Window {
        BugReportingToolProps: {
            platform: Platform;
            platformProps: PlatformProps;
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
        />,
        mountNode
    );
}

if (document.body) {
    mountTool();
} else {
    document.addEventListener('DOMContentLoaded', mountTool);
}
