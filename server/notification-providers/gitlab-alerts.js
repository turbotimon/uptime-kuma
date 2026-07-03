const NotificationProvider = require("./notification-provider");
const axios = require("axios");
const { UP, DOWN } = require("../../src/util");

class GitLabAlerts extends NotificationProvider {
    name = "GitLabAlerts";

    /**
     * @inheritdoc
     */
    async send(notification, msg, monitorJSON = null, heartbeatJSON = null) {
        try {
            const headers = {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + notification.gitlabAlertsToken,
            };

            const fingerprint = monitorJSON ? "uptime-kuma/" + monitorJSON.id : "uptime-kuma/test";

            if (heartbeatJSON == null) {
                await axios.post(notification.gitlabAlertsWebhookURL, {
                    title: "Uptime Kuma Test Alert",
                    start_time: new Date().toISOString(),
                    severity: notification.gitlabAlertsSeverity || "critical",
                    service: "Uptime Kuma",
                    fingerprint,
                }, { headers });
                return "Sent Successfully.";
            }

            if (heartbeatJSON.status === DOWN) {
                await axios.post(notification.gitlabAlertsWebhookURL, {
                    title: monitorJSON ? monitorJSON.name + " is DOWN" : "Monitor is DOWN",
                    start_time: new Date(heartbeatJSON.time).toISOString(),
                    severity: notification.gitlabAlertsSeverity || "critical",
                    description: msg,
                    service: monitorJSON ? monitorJSON.name : "Uptime Kuma",
                    fingerprint,
                }, { headers });
                return "Sent Successfully.";
            }

            if (heartbeatJSON.status === UP) {
                if (notification.gitlabAlertsAutoResolve !== "0") {
                    await axios.post(notification.gitlabAlertsWebhookURL, {
                        title: monitorJSON ? monitorJSON.name + " is DOWN" : "Monitor is DOWN",
                        end_time: new Date(heartbeatJSON.time).toISOString(),
                        service: monitorJSON ? monitorJSON.name : "Uptime Kuma",
                        fingerprint,
                    }, { headers });
                }
                return "Sent Successfully.";
            }
        } catch (error) {
            this.throwGeneralAxiosError(error);
        }
    }
}

module.exports = GitLabAlerts;
