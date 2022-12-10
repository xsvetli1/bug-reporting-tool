import { GithubProps } from "./github/GithubProps";
import { GitlabProps } from "./gitlab/GitlabProps";

export type PlatformProps = GithubProps | GitlabProps;
