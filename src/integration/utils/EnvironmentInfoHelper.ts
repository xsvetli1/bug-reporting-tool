import UAParser from 'ua-parser-js';

/**
 * Class defining methods returning uniformly formatted environment information.
 */
class EnvironmentInfoHelper {
    static obtainDateTime() {
        const now = new Date();
        const date = now.toLocaleDateString();
        const time = now.toLocaleTimeString();
        return `${date} ${time}`;
    }

    static obtainBrowser() {
        const browser = new UAParser().getBrowser();
        return `${browser.name} ${browser.version}`;
    }

    static obtainOperatingSystem() {
        const os = new UAParser().getOS();
        return `${os.name} ${os.version}`;
    }

    static obtainScreenSize() {
        return `${screen.width}px x ${screen.height}px`;
    }

    static obtainViewportSize() {
        return `${window.innerWidth}px x ${window.innerHeight}px`;
    }

    static obtainConsoleLog() {
        return null;
    }
}

export default EnvironmentInfoHelper;
