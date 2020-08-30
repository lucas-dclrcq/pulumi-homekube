import {Config} from "@pulumi/pulumi";

const config = new Config();

export const namespaces = {
    home: config.get("homeNamespace") || "home",
    monitoring: config.get("namespaceMonitoring") || "monitoring",
    development: config.get("namespaceDevelopment") || "development"
};

export const metalLb = {
    version: "v0.9-arm64",
    externalAdressesPool: config.requireObject<Array<string>>("externalAdressesPool"),
    internalAdressesPool: config.requireObject<Array<string>>("internalAdressesPool")
};
