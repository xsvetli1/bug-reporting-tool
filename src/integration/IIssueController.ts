import { IssueInfo } from "./IssueInfo";

interface IIssueController {
    newIssue(issueInfo: IssueInfo): Promise<void>;
}

export default IIssueController;
