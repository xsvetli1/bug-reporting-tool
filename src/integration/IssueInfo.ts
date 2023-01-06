import IssueType from "../models/IssueType";

export type IssueInfo = {
    email: string;
    title: string;
    description: string;
    type: IssueType;
}
