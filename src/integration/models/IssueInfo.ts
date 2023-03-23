import { ConsoleOutput } from '../../models/ConsoleOutput';
import IssueType from '../../models/IssueType';
import { ScreenshotInfo } from '../../models/ScreenshotInfo';

export type IssueInfo = {
    type: IssueType;
    email: string;
    title: string;
    description: string;
    screenshots: ScreenshotInfo[];
    consoleOutput: ConsoleOutput;
};
