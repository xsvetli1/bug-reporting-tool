import { IssueInfo } from './models/IssueInfo';

/**
 * Interface for issue controllers with one required method:
 * - newIssue(IssueInfo)
 */
interface IIssueController {
    newIssue(issueInfo: IssueInfo): Promise<boolean>;
}

export default IIssueController;
