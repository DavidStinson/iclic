import compare from "compare-versions";
const { satisfies } = compare;
const validators = {
    macOSVer: "~12",
    cpuTypes: ["Apple Silicon", "Intel"],
    appleSiliconBrewLoc: "/opt/homebrew/bin/brew",
    intelBrewLoc: "/usr/local/bin/brew"
};
function osVersion(version) {
    return satisfies(version, validators.macOSVer);
}
function cpuType(type = "Unknown") {
    return validators.cpuTypes.includes(type);
}
function brewLoc(type = "Unknown", location = "Unknown") {
    if (type === "Apple Silicon") {
        return location === validators.appleSiliconBrewLoc ? true : false;
    }
    else if (type === "Intel") {
        return location === validators.intelBrewLoc ? true : false;
    }
    else {
        return false;
    }
}
export { osVersion, cpuType, brewLoc, };
