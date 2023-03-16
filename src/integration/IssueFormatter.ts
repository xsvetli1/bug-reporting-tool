import { IssueInfo } from './models/IssueInfo';

class IssueFormatter {
    static issueTitle(issueInfo: IssueInfo) {
        return `[Annotate-Report] ${issueInfo.type.getName()}: ${issueInfo.title}`;
    }

    static issueDescription(issueInfo: IssueInfo, screenshotMarkdowns: string[]): string {
        const comments = issueInfo.comments.length
            ? `### Comments\n` +
              issueInfo.comments.map((comment, i) => `${i + 1}. ${comment}`).join('\n') +
              '\n'
            : '';

        return (
            `## Description\n${issueInfo.description}\n` +
            comments +
            `## Screenshots\n` +
            `${screenshotMarkdowns.join('\n')}\n` +
            `## Environment\n` +
            `## Contact info\n ${issueInfo.email}`
        );
    }
}

export default IssueFormatter;
