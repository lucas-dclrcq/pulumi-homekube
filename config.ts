import {Config} from "@pulumi/pulumi";

const config = new Config();

export const namespaces = {
    home: config.get("homeNamespace") || "home",
    monitoring: config.get("namespaceMonitoring") || "monitoring",
    development: config.get("namespaceDevelopment") || "development"
};
