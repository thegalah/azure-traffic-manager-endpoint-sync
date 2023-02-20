import { TrafficManagerManagementClient } from "@azure/arm-trafficmanager";
import { DefaultAzureCredential } from "@azure/identity";

const subscriptionId = process.env["AZURE_TRAFFIC_MANAGER_SUBSCRIPTION_ID"] ?? "";
const resourceGroup = process.env["AZURE_TRAFFIC_MANAGER_RESOURCE_GROUP"] ?? "";
const profileName = process.env["AZURE_TRAFFIC_MANAGER_PROFILE_NAME"] ?? "";
const endpointName = process.env["AZURE_TRAFFIC_MANAGER_ENDPOINT_NAME"] ?? "";

export class TrafficManagerSyncer {
    private client = new TrafficManagerManagementClient(new DefaultAzureCredential(), subscriptionId);
    public Start = async () => {
        const endpoint = await this.client.endpoints.get(resourceGroup, profileName, "ExternalEndpoints", endpointName);
        console.log(endpoint);
    };
}
