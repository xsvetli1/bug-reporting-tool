import IIssueController from '../IIssueController';
import IssueFormatter from '../utils/IssueFormatter';
import { IssueInfo } from '../models/IssueInfo';
import { GitlabProps } from './GitlabProps';
import { ConsoleOutput } from '../../models/ConsoleOutput';

/**
 * Implementation of IIssueController for Gitlab.
 */
class GitlabController implements IIssueController {
    props: GitlabProps;

    constructor(props: GitlabProps) {
        this.props = props;
    }

    async newIssue(issueInfo: IssueInfo): Promise<boolean> {
        const query = await this.queryFromIssueInfo(issueInfo);
        const response = await fetch(
            `https://${this.props.server.hostname}` +
                `/api/v4/projects/${this.props.projectId}` +
                `/issues?${query}`,
            {
                method: 'POST',
                headers: {
                    'PRIVATE-TOKEN': `${this.props.authToken}`
                }
            }
        );

        return response.ok;
    }

    async queryFromIssueInfo(issueInfo: IssueInfo): Promise<string> {
        const screenshotsMarkdowns = await Promise.all(
            issueInfo.screenshots.map(
                async (screenshot) => await this.uploadScreenshot(screenshot.dataUrl)
            )
        );

        const consoleHistoryMarkdown = await this.uploadConsoleHistory(issueInfo.consoleOutput);

        return (
            `title=${encodeURIComponent(IssueFormatter.issueTitle(issueInfo))}` +
            `&description=${encodeURIComponent(
                IssueFormatter.issueDescription(
                    issueInfo,
                    screenshotsMarkdowns,
                    consoleHistoryMarkdown
                )
            )}` +
            `&labels=${issueInfo.type.getLabel()}`
        );
    }

    async uploadConsoleHistory(history: ConsoleOutput): Promise<string> {
        const file = new File([new Blob([JSON.stringify(history)])], 'console-output.json', {
            type: 'application/json'
        });

        const formData = new FormData();
        formData.append('file', file);

        return await this.uploadFile(file);
    }

    /**
     * Returns markdown, ready to be placed to issue body.
     *
     * @param screenshot base64 encoded string of screenshot in PNG format
     * @returns markdown of uploaded screenshot
     */
    async uploadScreenshot(screenshot: string): Promise<string> {
        const screenshotBlob = await fetch(screenshot).then((res) => res.blob());

        const file = new File([screenshotBlob], 'screenshot.png', {
            type: 'image/png'
        });

        const formData = new FormData();
        formData.append('file', file);

        return await this.uploadFile(file);
    }

    async uploadFile(file: File): Promise<string> {
        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch(
            `https://${this.props.server.hostname}` +
                `/api/v4/projects/${this.props.projectId}` +
                `/uploads`,
            {
                method: 'POST',
                headers: {
                    'PRIVATE-TOKEN': `${this.props.authToken}`
                },
                body: formData
            }
        );

        return await response.json().then((jsonResponse) => jsonResponse.markdown);
    }
}

export default GitlabController;
