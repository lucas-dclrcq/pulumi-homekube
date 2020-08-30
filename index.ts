import * as k8s from "@pulumi/kubernetes";

import * as config from "./config";


// export const homeNamespace = new k8s.core.v1.Namespace("home-ns", {
//     metadata: {
//         name: config.namespaces.home
//     }
// });

// MetalLB
const metalLbChart = new k8s.helm.v3.Chart("metallb", {
    chart: "metallb",
    version: "0.1.21",
    fetchOpts: {
        repo: "https://charts.bitnami.com/bitnami",
    },
    values: {
        controller: {
            image: {
                repository: "metallb/controller",
                tag: "v0.9-arm64"
            }
        },
        speaker: {
            image: {
                repository: "metallb/speaker",
                tag: "v0.9-arm64"
            }
        },
        configInline: {
            "address-pools": [
                {
                    name: "external",
                    protocol: "layer2",
                    addresses: [
                        "192.168.0.3/32"
                    ]
                },
                {
                    name: "internal",
                    protocol: "layer2",
                    addresses: [
                        "192.168.0.5/32"
                    ]
                }
            ]
        },
        prometheus: {
            serviceMonitor: {
                enabled: true
            },
            prometheusRule: {
                enabled: true
            }
        }
    }
});

// Traefik Internal

// Traefik External

// Cert Manager

// Sync TLS between namespaces secret using kubed



