import { IssueInfo } from '../models/IssueInfo';
import EnvironmentInfoHelper from './EnvironmentInfoHelper';

class IssueFormatter {
    static issueTitle(issueInfo: IssueInfo) {
        return `[Annotate-Report] ${issueInfo.title}`;
    }

    static issueDescription(issueInfo: IssueInfo, screenshotMarkdowns: string[]): string {
        return (
            `## Description\n${issueInfo.description}\n` +
            `## Screenshots\n` +
            `${screenshotMarkdowns
                .map((markdown, i) => {
                    return (
                        `${markdown}\n` +
                        (issueInfo.screenshots[i].comments.length
                            ? `### Comments\n` +
                              `${issueInfo.screenshots[i].comments
                                  .map((comment, j) => `${j + 1}. ${comment}`)
                                  .join('\n')}\n\n`
                            : '')
                    );
                })
                .join('\n')}\n` +
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
