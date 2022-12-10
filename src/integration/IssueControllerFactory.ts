import GithubController from "./github/GithubController";
import { GithubProps } from "./github/GithubProps";
import IIssueController from "./IIssueController";
import Platform from "./Platform";
import { PlatformProps } from "./PlatformProps";

class IssueControllerFactory {
    static get(platform: Platform, props: PlatformProps): IIssueController {
        if (platform == Platform.Github) {
            return new GithubController(props as GithubProps);
        } else if (platform == Platform.Gitlab) {
            throw new Error('Not implemented yet!');
        }

        throw new Error('Platform not supported!');
    }
}

export default IssueControllerFactory;
