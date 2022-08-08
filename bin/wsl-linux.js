import isWsl from "is-wsl";
import { readFile } from 'fs/promises';
function checkForWSL() {
    return isWsl ? true : false;
}
async function checkDistro() {
    try {
        const data = await readFile('/etc/os-release', 'utf8');
        const lines = data.split('\n');
        const releaseDetails = {};
        lines.forEach(line => {
            // Split the line into an array of words delimited by '='
            const words = line.split('=');
            releaseDetails[words[0].trim().toLowerCase()] = words[1]?.trim();
        });
        if (releaseDetails.pretty_name) {
            return releaseDetails.pretty_name.replace(/"/g, "");
        }
        else {
            return "Linux - Unkown Distro";
        }
    }
    catch (error) {
        return "Linux - Unknown Distro";
    }
}
export { checkForWSL, checkDistro };
