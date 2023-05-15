# bug-reporting-tool
_Not only to report bugs..._

[![ESLint](https://github.com/xsvetli1/bug-reporting-tool/actions/workflows/eslint.yml/badge.svg)](https://github.com/xsvetli1/bug-reporting-tool/actions/workflows/eslint.yml)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
![GitHub](https://img.shields.io/github/license/xsvetli1/bug-reporting-tool)
## Description

Web application component for bugs and enhancements reporting to your desired issue-tracking system with refined **annotation tool**.
Users can annotate website multiple times, creating multiple screenshots with their annotations, or do not have to at all.

You can currently integrate this tool with following issue-tracking systems:

&nbsp;&nbsp;&nbsp;<a href="https://gitlab.com/"><img src="https://cdn-icons-png.flaticon.com/512/5968/5968853.png" width="20px" height="20px"></a>
 Gitlab
 
&nbsp;&nbsp;&nbsp;<a href="https://github.com/"><img src="https://github.com/favicon.ico" width="20px" height="20px"></a>
Github _(functionality is limited - annotation tool is unavailable)_

### Usage
1. Click on floating **Feedback** button
1. Enter issue **Title** and **Description**
2. Annotate website using 5 available tools
3. Submit

### Available annotation tools
- [x] Select area
- [x] Draw arrow
- [x] Draw using free hand
- [x] Obfuscate
- [x] Comment

### Annotation tool in action
<img width="797" alt="GoogleFeedback" src="https://github.com/xsvetli1/bug-reporting-tool/assets/67949682/5e846c15-9e99-48a0-bceb-61e0f77a45ff">

## How to install

Based on the issue-tracking system you chose, for all approaches below, don't forget to put your own values in place of:
- `GITLAB_SERVER_URL` (should be domain name with a protocol e.g. `https://gitlab.gnome.org/`),
- `PROJECT_ID` (can be found in the General tab of repository settings),
- `AUTHENTICATION_TOKEN`,
- `GITHUB_USERNAME` (e.g. for facebook/react it is `facebook`) and
- `GITHUB_REPOSITORY_NAME` (e.g. for facebook/react it is `react`)

`AUTHENTICATION_TOKEN` must be generated with proper scope:
- Gitlab repositories
  - Can be generated in Access Tokens tab of repository settings.
  - Required scope: `api`
- Github repositories
  - To generate one, the developer must click on their own profile photo and navigate to Settings
        > Developer Settings > Personal access tokens > Tokens (classic) > Generate new token
        > Generate new token (classic).
  - Required scope:
    - `public_repo` - for public repositories
    - `repo` - for private repositories

### React app
_Compatible with React 18+._
```shell
# Prerequisites
# You need to be authenticated to GitHub Packages and add Github registry to your npm configuration. If you already
# meet these conditions, you can continue with Actual Installation.

# To authenticate, generate GitHub Access Token GITHUB_PACKAGES_TOKEN with scope 'read:packages'
# (not the same as AUTHENTICATION_TOKEN for bug-reporting-tool integration) and add it to your ~/.npmrc config file
# by running the following command:
npm config set //npm.pkg.github.com/:_authToken=GITHUB_PACKAGES_TOKEN

# To add GitHub registry to your NPM configuration run the following command (YOUR_GITHUB_USERNAME is your own GitHub
# username, it may differ from GITHUB_USERNAME of integrated repository):
npm config set @YOUR_GITHUB_USERNAME:registry=https://npm.pkg.github.com

# Actual Installation:
npm install @xsvetli1/bug-reporting-tool
```
Wrap your application with **BugReportingTool** component:
<table>
<tr>
<th> Gitlab </th>
<th> Github </th>
</tr>
<tr>
<td>

```javascript
import { BugReportingTool } from "@xsvetli1/bug-reporting-tool";
 
<BugReportingTool
  platform={"Gitlab"}
  platformProps={{
    server: new URL(GITLAB_SERVER_URL),
    projectId: PROJECT_ID,
    authToken: AUTHENTICATION_TOKEN
  }}
  // uncomment following line to make email required
  // isRequiredEmail
>
  // ... your app code goes here
</BugReportingTool>
```

</td>
<td>

```javascript
import { BugReportingTool } from "@xsvetli1/bug-reporting-tool";
 
<BugReportingTool
  platform={"Github"}
  platformProps={{
    owner: GITHUB_USERNAME,
    repository: GITHUB_REPOSITORY_NAME,
    authToken: AUTHENTICATION_TOKEN,
  }}
  // uncomment following line to make email required
  // isRequiredEmail
>
  // ... your app code goes here
</BugReportingTool>
```

</td>
</tr>
</table>

### General - using HTML script tag
Based on issue-tracking system using, choose and add one of the following scripts to your HTML file, where you want to add the tool:

#### Gitlab
```html
<script>
    window.BugReportingToolProps = { platformProps: {} };
    BugReportingToolProps.platform = "Gitlab";
    BugReportingToolProps.platformProps.server = new URL(GITLAB_SERVER_URL);
    BugReportingToolProps.platformProps.projectId = PROJECT_ID;
    BugReportingToolProps.platformProps.authToken = AUTHENTICATION_TOKEN;
    // uncomment following line to make email required
    // BugReportingToolProps.isEmailRequired = true;
    (function () {
      var script = document.createElement("script");
      script.async = true;
      script.src =
        "https://cdn.jsdelivr.net/gh/xsvetli1/bug-reporting-tool/dist/iife/index.js";
      (document.head || document.body).appendChild(script);
    })();
</script>
```

#### Github
```html
<script>
    window.BugReportingToolProps = { platformProps: {} };
    BugReportingToolProps.platform = "Github";
    BugReportingToolProps.platformProps.owner = GITHUB_USERNAME;
    BugReportingToolProps.platformProps.repository = GITHUB_REPOSITORY_NAME;
    BugReportingToolProps.platformProps.authToken = AUTHENTICATION_TOKEN;
    // uncomment following line to make email required
    // BugReportingToolProps.isEmailRequired = true;
    (function () {
      var script = document.createElement("script");
      script.async = true;
      script.src =
        "https://cdn.jsdelivr.net/gh/xsvetli1/bug-reporting-tool/dist/iife/index.js";
      (document.head || document.body).appendChild(script);
    })();
</script>
```
