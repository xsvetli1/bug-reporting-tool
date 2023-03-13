import IIssueController from '../IIssueController';
import { IssueInfo } from '../models/IssueInfo';
import { GithubProps } from './GithubProps';

class GithubController implements IIssueController {
    props: GithubProps;

    constructor(props: GithubProps) {
        this.props = props;
    }

    async newIssue(issueInfo: IssueInfo): Promise<boolean> {
        const response = await fetch(
            `https://api.github.com/repos/${this.props.owner}/${this.props.repository}/issues`,
            {
                method: 'POST',
                headers: {
                    Accept: 'application/vnd.github+json',
                    Authorization: `Bearer ${this.props.authToken}`
                },
                body: JSON.stringify({
                    owner: this.props.owner,
                    repo: this.props.repository,
                    title: issueInfo.title,
                    body: `From: ${issueInfo.email}\n${issueInfo.description}`,
                    assignees: [],
                    labels: [issueInfo.type.getLabel()]
                })
            }
        );

        return response.ok;
    }
}

export default GithubController;
