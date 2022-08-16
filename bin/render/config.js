function manager(data, messages) {
    const { machineData: mD, installValidation: iV } = data;
    const gitVer = iV.versions.find(version => (version.name = 'nodeVer'));
    const isGitVerValid = gitVer?.isValid ? true : false;
    if (data.userValidation.isUser) {
        messages = renderGitEmailMatch(data, messages);
    }
    else {
        messages = renderGitEmail(data, messages);
    }
    if (iV.isValidGHLoc) {
        messages = renderLoggedIntoGH(data, messages);
    }
    if (mD.osName === "WSL2") {
        messages = renderGitCredMan(data, messages);
    }
    if (isGitVerValid) {
        messages = renderGitBranch(data, messages);
    }
    return messages;
}
function renderGitEmailMatch(data, messages) {
    const { configData: cD, configValidation: cV, userData: uD } = data;
    if (cV.gitEmailMatchesPrompt) {
        messages.successes.push({
            msg: `The email associated with your GitHub account provided at the prompt matches the email configured with Git (${uD.gitHubEmail}).`,
        });
    }
    else {
        messages.errors.push({
            msg: `The email associated with your GitHub account provided at the prompt (${uD.gitHubEmail}) does not match the email configured with Git (${cD.gitEmail}). Either provide the correct email address at the prompt or change the Git configuration to the correct email address. Follow the URL below to help change your Git config.`,
            url: 'https://seirpublic.notion.site/Git-Email-Configuration-1bffa41650a84b79b6941977f8176c8b',
        });
    }
    return messages;
}
function renderGitEmail(data, messages) {
    const { configData: cD, configValidation: cV, } = data;
    if (cV.isValidGitEmail) {
        messages.successes.push({
            msg: `There is an email address configured with Git (${cD.gitEmail}).`,
        });
    }
    else {
        messages.errors.push({
            msg: `There is no email address configured with Git. Change the Git configuration to the correct email address. Follow the URL below for a potential fix.`,
            url: 'https://seirpublic.notion.site/Git-Email-Configuration-1bffa41650a84b79b6941977f8176c8b',
        });
    }
    return messages;
}
function renderLoggedIntoGH(data, messages) {
    const { configData: cD, configValidation: cV } = data;
    if (cV.isLoggedIntoGH) {
        messages.successes.push({
            msg: `The GitHub CLI Session is ${cD.ghLoginStatus}.`,
        });
    }
    else {
        messages.errors.push({
            msg: `The GitHub CLI Session is ${cD.ghLoginStatus}. Follow the URL below for a potential fix.`,
            url: 'https://seirpublic.notion.site/GitHub-CLI-Login-9d56c8b1004c40f99eecbb6901a86b77',
        });
    }
    return messages;
}
function renderGitCredMan(data, messages) {
    const { configValidation: cV } = data;
    if (cV.isValidGitCredMan) {
        messages.successes.push({
            msg: `The Git Credential Manager is being used to store your Git Credentials.`,
        });
    }
    else {
        messages.errors.push({
            msg: `The Git Credntial Manager is not being used. Follow the URL below for a potential fix.`,
            url: 'https://seirpublic.notion.site/Git-Credential-Manager-8c5dd63221a5446ba2b858653089fdb0',
        });
    }
    return messages;
}
function renderGitBranch(data, messages) {
    const { configData: cD, configValidation: cV } = data;
    if (cV.isValidGitCredMan) {
        messages.successes.push({
            msg: `The Git default branch is correctly set to ${cD.gitDefBranch}.`,
        });
    }
    else {
        messages.errors.push({
            msg: `The Git default branch is incorrectly set to ${cD.gitDefBranch}. Follow the URL below for a potential fix.`,
            url: 'https://seirpublic.notion.site/Git-Default-Branch-ea36f777b21a4948973f9a5a3ecc6834',
        });
    }
    return messages;
}
export { manager };
