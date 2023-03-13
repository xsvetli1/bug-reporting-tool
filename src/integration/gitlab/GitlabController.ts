import IIssueController from '../IIssueController';
import { IssueInfo } from '../IssueInfo';
import { GitlabProps } from './GitlabProps';

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
        const screenshots = await Promise.all(
            issueInfo.screenshots.map(async (screenshot) => await this.uploadScreenshot(screenshot))
        );

        return (
            `title=${this.issueTitle(issueInfo)}` +
            `&description=${this.issueDescription(issueInfo.description, screenshots)}` +
            `&labels=${issueInfo.type.getLabel()}`
        );
    }

    issueTitle(issueInfo: IssueInfo) {
        return `[Annotate-Report] ${issueInfo.type.getName()}: ${issueInfo.title}`;
    }

    issueDescription(description: string, screenshotMarkdowns: string[]): string {
        return (
            `Description:<br />${description}<br />` +
            `Screenshots:<br />` +
            `${screenshotMarkdowns.join('<br />')}`
        );
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
