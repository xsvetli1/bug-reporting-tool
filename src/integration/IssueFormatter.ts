import { IssueInfo } from './models/IssueInfo';

class IssueFormatter {
    static issueTitle(issueInfo: IssueInfo) {
        return `[Annotate-Report] ${issueInfo.type.getName()}: ${issueInfo.title}`;
    }

    static issueDescription(description: string, screenshotMarkdowns: string[]): string {
        return (
            `Description:<br />${description}<br />` +
            `Screenshots:<br />` +
            `${screenshotMarkdowns.join('<br />')}`
        );
    }
}

export default IssueFormatter;
