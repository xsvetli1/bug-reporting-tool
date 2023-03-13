class IssueType {
    static Bug = new IssueType('Bug', 'Report a bug', 'bug');
    static Idea = new IssueType('Enhancement', 'Suggest a new idea', 'enhancement');

    name: string;
    title: string;
    label: string;

    constructor(name: string, title: string, label: string) {
        this.name = name;
        this.title = title;
        this.label = label;
    }

    getName() {
        return this.name;
    }

    getTitle() {
        return this.title;
    }

    getLabel() {
        return this.label;
    }
}

export default IssueType;
