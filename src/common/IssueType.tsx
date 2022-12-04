class IssueType {
    static Bug = new IssueType("Report a bug");
    static Idea = new IssueType("Suggest a new idea");

    title: string;

    constructor(title: string) {
        this.title = title;
    }

    getTitle() {
        return this.title;
    }
}

export default IssueType;
