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
apiVersion: external-secrets.io/v1alpha1
kind: ExternalSecret
metadata:
    name: atm-sync-secret
spec:
    refreshInterval: 1h0m0s
    secretStoreRef:
        kind: SecretStore
        name: secret-store

    target:
        name: atm-sync-secret
        creationPolicy: Owner

    data:
        - secretKey: azure_client_id
          remoteRef:
              key: atm-azure-client-id

        - secretKey: azure_client_secret
          remoteRef:
              key: atm-azure-client-secret

        - secretKey: azure_traffic_manager_subscription_id
          remoteRef:
              key: atm-azure-traffic-manager-subscription-id

        - secretKey: azure_traffic_manager_profile_name
          remoteRef:
              key: atm-azure-traffic-manager-profile-name

        - secretKey: azure_traffic_manager_endpoint_name
          remoteRef:
              key: atm-azure-traffic-manager-endpoint-name

        - secretKey: azure_traffic_manager_resource_group
          remoteRef:
              key: atm-azure-traffic-manager-resource-group

        - secretKey: azure_tenant_id
          remoteRef:
              key: atm-azure-tenant-id
```
