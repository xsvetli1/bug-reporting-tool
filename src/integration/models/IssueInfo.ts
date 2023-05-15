import { ConsoleOutput } from '../../models/ConsoleOutput';
import IssueType from '../../models/IssueType';
import { ScreenshotInfo } from '../../models/ScreenshotInfo';

/**
 * Type holding all information regarding the new issue, being:
 * - type
 * - author email
 * - title
 * - description
 * - list of ScreenshotInfo objects
 * - console output history
 */
export type IssueInfo = {
    type: IssueType;
    email: string;
    title: string;
    description: string;
    screenshots: ScreenshotInfo[];
    consoleOutput: ConsoleOutput;
};
