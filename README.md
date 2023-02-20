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

# Deploy

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
    name: atm-ip-sync
spec:
    replicas: 1
    template:
        spec:
            containers:
                - name: vsts-agent
                  image: docker.io/thegalah/atm-sync:latest
                  imagePullPolicy: Always
                  resources:
                      requests:
                          memory: "128Mi"
                          cpu: "50m"
                  env:
                      - name: AZP_URL
                        valueFrom:
                            secretKeyRef:
                                name: coderone-ado-agent-secret
                                key: azp_url
                      - name: AZP_TOKEN
                        valueFrom:
                            secretKeyRef:
                                name: coderone-ado-agent-secret
                                key: azp_token
                      - name: AZP_POOL
                        valueFrom:
                            secretKeyRef:
                                name: coderone-ado-agent-secret
                                key: azp_pool
                      - name: VSTS_WORK
                        value: /workspace
                      - name: DOCKER_HOST
                        value: tcp://0.0.0.0:2375
                  volumeMounts:
                      - mountPath: /workspace
                        name: workspace
```
