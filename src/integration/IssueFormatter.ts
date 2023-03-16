import { IssueInfo } from './models/IssueInfo';

class IssueFormatter {
    static issueTitle(issueInfo: IssueInfo) {
        return `[Annotate-Report] ${issueInfo.type.getName()}: ${issueInfo.title}`;
    }

    static issueDescription(issueInfo: IssueInfo, screenshotMarkdowns: string[]): string {
        return (
            `## Description\n${issueInfo.description}\n` +
            `## Screenshots\n` +
            `${screenshotMarkdowns.join('\n')}\n` +
            `## Environment\n` +
            `## Contact info\n ${issueInfo.email}`
        );
    }
}

export default IssueFormatter;
