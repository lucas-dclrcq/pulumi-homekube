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
    namespace: "kube-system",
    fetchOpts: {
        repo: "https://charts.bitnami.com/bitnami",
    },
    values: {
        controller: {
            image: {
                repository: "metallb/controller",
                tag: config.metalLb.version
            }
        },
        speaker: {
            image: {
                repository: "metallb/speaker",
                tag: config.metalLb.version
            }
        },
        configInline: {
            "address-pools": [
                {
                    name: "external",
                    protocol: "layer2",
                    addresses: config.metalLb.externalAdressesPool
                },
                {
                    name: "internal",
                    protocol: "layer2",
                    addresses: config.metalLb.internalAdressesPool
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

const traefikInternalChart = new k8s.helm.v3.Chart("traefik-internal", {
    chart: "traefik",
    namespace: "kube-system",
    version: "9.1.0",
    fetchOpts: {
        repo: "https://containous.github.io/traefik-helm-chart"
    },
    values: {
       service: {
           annotations: {
               "metallb.universe.tf/address-pool": "internal"
           }
       }
    }
});

// Cert Manager

// Sync TLS between namespaces secret using kubed



