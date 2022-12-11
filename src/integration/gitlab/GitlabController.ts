import IIssueController from "../IIssueController";
import { IssueInfo } from "../IssueInfo";
import { GitlabProps } from "./GitlabProps";

class GitlabController implements IIssueController {
    props: GitlabProps;

    constructor(props: GitlabProps) {
        this.props = props;
    }

    async newIssue(issueInfo: IssueInfo): Promise<boolean> {
        const response = await fetch(
            `https://${this.props.server.hostname}`
            + `/api/v4/projects/${this.props.projectId}`
            + `/issues?${this.queryFromIssueInfo(issueInfo)}`,
            {
                method: 'POST',
                headers: {
                    'PRIVATE-TOKEN': `${this.props.authToken}`
                }
            }
        );

        return response.ok;
    }

    queryFromIssueInfo(issueInfo: IssueInfo): string {
        return `title=${issueInfo.title}`
            + `&description=${issueInfo.description}`
            + `&labels=${issueInfo.type.getLabel()}`;
    }
}

export default GitlabController;
