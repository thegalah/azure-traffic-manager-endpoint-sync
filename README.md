# Azure traffic manager ip sync

This image will synchronize the hosts public ip with an azure traffic manager endpoint. The sync interval is every 60 seonds and will only send an update whenever the traffic manager endpoint is out of sync.

Ideal use case for this image is if you are hosting your own home server with a dynamic ip.

# ENV params

```
AZURE_CLIENT_ID=
AZURE_TENANT_ID=
AZURE_CLIENT_SECRET=
AZURE_TRAFFIC_MANAGER_SUBSCRIPTION_ID=
AZURE_TRAFFIC_MANAGER_PROFILE_NAME=
AZURE_TRAFFIC_MANAGER_ENDPOINT_NAME=
AZURE_TRAFFIC_MANAGER_RESOURCE_GROUP=
```

# Deploy on Kubernetes

To deploy this on kubernetes use the following resource definition. It will pull the env variables from the secret named: `atm-sync-secret`.

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
    name: atm-ip-sync
spec:
    selector:
        matchLabels:
            app: atm-ip-sync
    replicas: 1
    template:
        metadata:
            labels:
                app: atm-ip-sync
                release: atm-ip-sync
                version: "0.1"
        spec:
            containers:
                - name: atm-ip-sync
                  image: docker.io/thegalah/atm-sync:latest
                  imagePullPolicy: Always
                  resources:
                      limits:
                          memory: "256Mi"
                          cpu: "100m"
                      requests:
                          memory: "128Mi"
                          cpu: "50m"
                  env:
                      - name: AZURE_CLIENT_ID
                        valueFrom:
                            secretKeyRef:
                                name: atm-sync-secret
                                key: azure_client_id
                      - name: AZURE_TENANT_ID
                        valueFrom:
                            secretKeyRef:
                                name: atm-sync-secret
                                key: azure_tenant_id
                      - name: AZURE_CLIENT_SECRET
                        valueFrom:
                            secretKeyRef:
                                name: atm-sync-secret
                                key: azure_client_secret
                      - name: AZURE_TRAFFIC_MANAGER_SUBSCRIPTION_ID
                        valueFrom:
                            secretKeyRef:
                                name: atm-sync-secret
                                key: azure_traffic_manager_subscription_id
                      - name: AZURE_TRAFFIC_MANAGER_PROFILE_NAME
                        valueFrom:
                            secretKeyRef:
                                name: atm-sync-secret
                                key: azure_traffic_manager_profile_name
                      - name: AZURE_TRAFFIC_MANAGER_ENDPOINT_NAME
                        valueFrom:
                            secretKeyRef:
                                name: atm-sync-secret
                                key: azure_traffic_manager_endpoint_name
                      - name: AZURE_TRAFFIC_MANAGER_RESOURCE_GROUP
                        valueFrom:
                            secretKeyRef:
                                name: atm-sync-secret
                                key: azure_traffic_manager_resource_group
```
