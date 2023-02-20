import { getPublicIP } from "./getPublicIP";
import { TrafficManagerManagementClient } from "@azure/arm-trafficmanager";
import { DefaultAzureCredential } from "@azure/identity";

const subscriptionId = process.env["AZURE_TRAFFIC_MANAGER_SUBSCRIPTION_ID"] ?? "";
const resourceGroup = process.env["AZURE_TRAFFIC_MANAGER_RESOURCE_GROUP"] ?? "";
const profileName = process.env["AZURE_TRAFFIC_MANAGER_PROFILE_NAME"] ?? "";
const endpointName = process.env["AZURE_TRAFFIC_MANAGER_ENDPOINT_NAME"] ?? "";

const syncIntervalMs = 60000;
const cacheSyncIntervalMs = 3600 * 1000;

export class TrafficManagerSyncer {
    private client = new TrafficManagerManagementClient(new DefaultAzureCredential(), subscriptionId);
    private cachedAtmIP: string | null = null;

    public constructor() {
        this.updateCache();
        setInterval(this.syncIP, syncIntervalMs);
    }

    private updateCache = async () => {
        const endpoint = await this.client.endpoints.get(resourceGroup, profileName, "ExternalEndpoints", endpointName);
        const updatedIp = endpoint.target ?? null;
        console.log(`Updating cached ip value. Old: ${this.cachedAtmIP} new: ${updatedIp}`);
        this.cachedAtmIP = updatedIp;
        setTimeout(this.updateCache, cacheSyncIntervalMs);
    };
    private syncIP = async () => {
        const ip = await getPublicIP();
        if (this.cachedAtmIP === null) {
            return;
        }
        if (this.cachedAtmIP !== ip) {
            console.log(`IPs do not match, old: ${this.cachedAtmIP} new: ${ip}`);
            const result = await this.client.endpoints.update(resourceGroup, profileName, "ExternalEndpoints", endpointName, {
                target: ip,
            });
            console.log(result);
        }
    };
}
