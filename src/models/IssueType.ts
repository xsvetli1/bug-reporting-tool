class IssueType {
    static Bug = new IssueType("Report a bug", "bug");
    static Idea = new IssueType("Suggest a new idea", "enhancement");

    title: string;
    label: string;

    constructor(title: string, label:string) {
        this.title = title;
        this.label = label;
    }

    getTitle() {
        return this.title;
    }

    getLabel() {
        return this.label;
    }
}

export default IssueType;
