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
export { osVariant, osVersion, };
