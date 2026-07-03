<template>
    <div class="mb-3">
        <label for="gitlab-alerts-webhook-url" class="form-label">{{ $t("Webhook URL") }}</label>
        <input
            id="gitlab-alerts-webhook-url"
            v-model="$parent.notification.gitlabAlertsWebhookURL"
            type="url"
            class="form-control"
            required
        />
        <i18n-t tag="div" keypath="wayToGetGitLabAlertsURL" class="form-text">
            <a href="https://docs.gitlab.com/operations/incident_management/integrations/" target="_blank">{{ $t("here") }}</a>
        </i18n-t>
    </div>

    <div class="mb-3">
        <label for="gitlab-alerts-token" class="form-label">{{ $t("Token") }}</label>
        <HiddenInput
            id="gitlab-alerts-token"
            v-model="$parent.notification.gitlabAlertsToken"
            :required="true"
            autocomplete="new-password"
        ></HiddenInput>
    </div>

    <div class="mb-3">
        <label for="gitlab-alerts-severity" class="form-label">{{ $t("Severity") }}</label>
        <select id="gitlab-alerts-severity" v-model="$parent.notification.gitlabAlertsSeverity" class="form-select">
            <option value="critical">{{ $t("critical") }}</option>
            <option value="high">{{ $t("high") }}</option>
            <option value="medium">{{ $t("medium") }}</option>
            <option value="low">{{ $t("low") }}</option>
            <option value="info">{{ $t("info") }}</option>
            <option value="unknown">{{ $t("unknown") }}</option>
        </select>
    </div>

    <div class="mb-3">
        <label for="gitlab-alerts-auto-resolve" class="form-label">{{ $t("Auto resolve") }}</label>
        <select id="gitlab-alerts-auto-resolve" v-model="$parent.notification.gitlabAlertsAutoResolve" class="form-select">
            <option value="1">{{ $t("Yes") }}</option>
            <option value="0">{{ $t("No") }}</option>
        </select>
    </div>
</template>

<script>
import HiddenInput from "../HiddenInput.vue";

export default {
    components: {
        HiddenInput,
    },
    mounted() {
        if (this.$parent.notification.gitlabAlertsSeverity === undefined) {
            this.$parent.notification.gitlabAlertsSeverity = "critical";
        }
        if (this.$parent.notification.gitlabAlertsAutoResolve === undefined) {
            this.$parent.notification.gitlabAlertsAutoResolve = "1";
        }
    },
};
</script>
