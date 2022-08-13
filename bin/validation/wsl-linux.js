import compare from "compare-versions";
const { satisfies } = compare;
const validators = {
    distro: "ubuntu",
    ubuntu: "~22",
};
function osVariant(distro = "Unknown") {
    return distro.toLowerCase() === validators.distro;
}
function osVersion(version) {
    return satisfies(version, validators.ubuntu);
}
function vsCodeAlias(codeAlias) {
    return codeAlias !== "Unknown" ? true : false;
}
export { osVariant, osVersion, vsCodeAlias, };
