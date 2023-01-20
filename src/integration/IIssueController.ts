import { IssueInfo } from './IssueInfo';

interface IIssueController {
    newIssue(issueInfo: IssueInfo): Promise<boolean>;
}

export default IIssueController;
