import { GithubProps } from '../github/GithubProps';
import { GitlabProps } from '../gitlab/GitlabProps';
import { BackendProps } from '../backend/BackendProps';

export type PlatformProps = GithubProps | GitlabProps | BackendProps;
