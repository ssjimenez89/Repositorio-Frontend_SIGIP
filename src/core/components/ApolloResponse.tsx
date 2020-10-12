import VAlert from "@vuetify/components/VAlert";
import VLayout from "@vuetify/components/VGrid/VLayout";
import VProgressCircular from "@vuetify/components/VProgressCircular";

export default {
  name: "admin-apollo-response",
  components: {
    VAlert,
    VLayout,
    VProgressCircular,
  },
  props: {
    result: Object,
  },
  methods: {
    isLoading(): boolean {
      return (this as any).result.loading || (this as any).result.data === null;
    },
    renderLoading(h: any) {
      return (
        <v-layout align-center justify-center class="fill-height">
          <v-progress-circular indeterminate></v-progress-circular>
        </v-layout>
      );
    },
    renderErrors(h: any) {
      const networkError = (this as any).result.error.networkError
        ? (
          <v-alert value={true} type="error">
            <h3 class="mb-1">{(this as any).$t("administrator.data_loader.network_error_title")}</h3>
            <p>{(this as any).result.error.networkError.message}</p>
          </v-alert>
        )
        : null;

      const graphqlErrors = (this as any).result.error.graphQLErrors.length > 0
        ? (
          <v-alert value={true} type="error">
            <h3 class="mb-1">{(this as any).$t("administrator.data_loader.graphql_error_title")}</h3>
            {
              (this as any).result.error.graphQLErrors.map((error: any) => {
                return (
                  <p>{error.message}</p>
                );
              })
            }
          </v-alert>
        )
        : null;

      return (
        <v-layout justify-center column class="fill-height">
          {networkError}
          {graphqlErrors}
        </v-layout>
      );
    },
  },
  render(h: any): any {
    if ((this as any).isLoading()) {
      return (this as any).renderLoading(h);
    }
    if ((this as any).result.error) {
      return (this as any).renderErrors(h);
    }
    if (!(this as any).$scopedSlots.default) {
      return null;
    }
    return (this as any).$scopedSlots.default({
      data: (this as any).result.data,
    });
  },
};
