import { ScreenshotInfo } from '../../models/ScreenshotInfo';
import { IssueInfo } from '../models/IssueInfo';
import EnvironmentInfoHelper from './EnvironmentInfoHelper';

/**
 * Class defining methods for uniformly formatted issue titles and descriptions.
 */
class IssueFormatter {
    static issueTitle(issueInfo: IssueInfo) {
        return `[BugReportingTool] ${issueInfo.title}`;
    }

    static issueDescription(
        issueInfo: IssueInfo,
        screenshotMarkdowns: string[],
        consoleHistoryMarkdown: string | null
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
            (consoleHistoryMarkdown ? `- **Console:** ${consoleHistoryMarkdown}\n` : '') +
            `## Screenshots\n` +
            `${screenshotMarkdowns
                .map(
                    (markdown, i) => `${markdown}\n` + screenshotComments(issueInfo.screenshots[i])
                )
                .join('\n---\n')}\n`
        );
    }

    static backendIssueDescription(issueInfo: IssueInfo) {
        return {
            description: issueInfo.description,
            dateTime: EnvironmentInfoHelper.obtainDateTime(),
            browser: EnvironmentInfoHelper.obtainBrowser(),
            os: EnvironmentInfoHelper.obtainOperatingSystem(),
            screenSize: EnvironmentInfoHelper.obtainScreenSize(),
            viewPortSize: EnvironmentInfoHelper.obtainViewportSize(),
            comments: issueInfo.screenshots.map((s) => s.comments)
        };
    }
}

export default IssueFormatter;
