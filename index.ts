import * as k8s from "@pulumi/kubernetes";

export const homeNamespace = new k8s.core.v1.Namespace("home-ns", {
    metadata: {
        name: "michel"
    }
});
