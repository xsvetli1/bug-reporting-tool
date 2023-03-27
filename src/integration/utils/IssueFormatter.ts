import { ScreenshotInfo } from '../../models/ScreenshotInfo';
import { IssueInfo } from '../models/IssueInfo';
import EnvironmentInfoHelper from './EnvironmentInfoHelper';

class IssueFormatter {
    static issueTitle(issueInfo: IssueInfo) {
        return `[Annotate-Report] ${issueInfo.title}`;
    }

    static issueDescription(
        issueInfo: IssueInfo,
        screenshotMarkdowns: string[],
        consoleHistoryMarkdown: string
    ): string {
        const screenshotComments = (screenshotInfo: ScreenshotInfo) =>
            screenshotInfo.comments.length
                ? `### Comments\n` +
                  `${screenshotInfo.comments
                      .map((comment, j) => `${j + 1}. ${comment}`)
                      .join('\n')}\n\n`
                : '';

        return (
            `_Created by ${issueInfo.email.length ? issueInfo.email : 'anonymous user'}_\n` +
            `## Description\n${issueInfo.description}\n` +
            `## Environment\n` +
            `- **Date & Time:** ${EnvironmentInfoHelper.obtainDateTime()}\n` +
            `- **Browser:** ${EnvironmentInfoHelper.obtainBrowser()}\n` +
            `- **OS:** ${EnvironmentInfoHelper.obtainOperatingSystem()}\n` +
            `- **Screen:** ${EnvironmentInfoHelper.obtainScreenSize()}\n` +
            `- **Viewport:** ${EnvironmentInfoHelper.obtainViewportSize()}\n` +
            `- **Console:** ${consoleHistoryMarkdown}\n` +
            `## Screenshots\n` +
            `${screenshotMarkdowns
                .map(
                    (markdown, i) => `${markdown}\n` + screenshotComments(issueInfo.screenshots[i])
                )
                .join('\n---\n')}\n`
        );
    }
}

export default IssueFormatter;
