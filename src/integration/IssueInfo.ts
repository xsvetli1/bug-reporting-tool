import IssueType from "../common/IssueType";

export type IssueInfo = {
    email: string;
    title: string;
    description: string;
    type: IssueType;
}
