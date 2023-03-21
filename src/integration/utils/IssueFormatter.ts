import { IssueInfo } from '../models/IssueInfo';
import EnvironmentInfoHelper from './EnvironmentInfoHelper';

class IssueFormatter {
    static issueTitle(issueInfo: IssueInfo) {
        return `[Annotate-Report] ${issueInfo.title}`;
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
            `- Date & Time: ${EnvironmentInfoHelper.obtainDateTime()}\n` +
            `- Browser: ${EnvironmentInfoHelper.obtainBrowser()}\n` +
            `- OS: ${EnvironmentInfoHelper.obtainOperatingSystem()}\n` +
            `- Screen: ${EnvironmentInfoHelper.obtainScreenSize()}\n` +
            `- Viewport: ${EnvironmentInfoHelper.obtainViewportSize()}\n` +
            `## Contact info\n ${issueInfo.email}`
        );
    }
}

export default IssueFormatter;
