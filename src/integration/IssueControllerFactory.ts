import GithubController from './github/GithubController';
import { GithubProps } from './github/GithubProps';
import GitlabController from './gitlab/GitlabController';
import { GitlabProps } from './gitlab/GitlabProps';
import IIssueController from './IIssueController';
import Platform from './models/Platform';
import { PlatformProps } from './models/PlatformProps';

/**
 * Factory returning correct IIssueController implementation based on the provided
 * platform and platformProps.
 */
class IssueControllerFactory {
    static get(platform: Platform, props: PlatformProps): IIssueController {
        if (platform == 'Github') {
            return new GithubController(props as GithubProps);
        } else if (platform == 'Gitlab') {
            return new GitlabController(props as GitlabProps);
        }

        throw new Error('Platform not supported!');
    }
}

export default IssueControllerFactory;
