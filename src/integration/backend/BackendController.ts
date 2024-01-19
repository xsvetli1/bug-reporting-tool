import IIssueController from '../IIssueController';
import IssueFormatter from '../utils/IssueFormatter';
import { IssueInfo } from '../models/IssueInfo';
import { ConsoleOutput } from '../../models/ConsoleOutput';
import { BackendProps } from './BackendProps';

/**
 * Implementation of IIssueController for own backend server.
 */
class BackendController implements IIssueController {
    private props: BackendProps;

    constructor(props: BackendProps) {
        this.props = props;
    }

    async newIssue(issueInfo: IssueInfo): Promise<boolean> {
        const issueBody = await this.newIssueFormData(issueInfo);

        const res = await fetch(`${this.props.url}/user/${this.props.session.user.id}/feedback`, {
            method: 'POST',
            body: issueBody,
            headers: {
                Authorization: `Bearer ${this.props.session.backendTokens.accessToken}`
            }
        });

        return res.ok;
    }

    async newIssueFormData(issueInfo: IssueInfo) {
        const screenshotsFiles = await Promise.all(
            issueInfo.screenshots.map(
                async (screenshot) => await this.prepareScreenshotFile(screenshot.dataUrl)
            )
        );

        const formData = new FormData();
        const consoleHistoryFile = this.prepareConsoleHistoryFile(issueInfo.consoleOutput);
        formData.append('files', consoleHistoryFile);

        screenshotsFiles.forEach((file) => formData.append(`files`, file));

        formData.append(
            'issueInfo',
            JSON.stringify({
                title: IssueFormatter.issueTitle(issueInfo),
                body: IssueFormatter.backendIssueDescription(issueInfo),
                labels: [issueInfo.type.getLabel(), 'bug-reporting-tool'],
                user: this.props.session.user
            })
        );
        return formData;
    }

    prepareConsoleHistoryFile(history: ConsoleOutput) {
        return new File([new Blob([JSON.stringify(history)])], 'console-output.json', {
            type: 'application/json'
        });
    }

    /**
     * Returns markdown, ready to be placed to issue body.
     *
     * @param screenshot base64 encoded string of screenshot in PNG format
     * @returns markdown of uploaded screenshot
     */
    async prepareScreenshotFile(screenshot: string): Promise<File> {
        const screenshotBlob = await fetch(screenshot).then((res) => res.blob());

        return new File([screenshotBlob], 'screenshot.png', {
            type: 'image/png'
        });
    }
}

export default BackendController;
