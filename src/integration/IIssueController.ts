import { IssueInfo } from './models/IssueInfo';

interface IIssueController {
    newIssue(issueInfo: IssueInfo): Promise<boolean>;
}

export default IIssueController;
