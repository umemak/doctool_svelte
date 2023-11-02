import { SSTConfig } from "sst";
import { Bucket, Service, SvelteKitSite } from "sst/constructs";

export default {
  config(_input) {
    return {
      name: "doctool-svelte",
      region: "us-east-1",
    };
  },
  stacks(app) {
    app.stack(function Site({ stack }) {
      const bucket = new Bucket(stack, "public");
      const site = new SvelteKitSite(stack, "site", {
        bind: [bucket],
      });
      // const service = new Service(stack, "service", {
      //   port: 5173,
      // });

      stack.addOutputs({
        // ServiceUrl: service.url,
        url: site.url,
      });
    });
  },
} satisfies SSTConfig;
