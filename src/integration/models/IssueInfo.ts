import IssueType from '../../models/IssueType';

export type IssueInfo = {
    type: IssueType;
    email: string;
    title: string;
    description: string;
    screenshots: string[];
    comments: string[];
};
