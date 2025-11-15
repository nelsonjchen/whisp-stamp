import { KVNamespace, DurableObjectNamespace, R2Bucket } from '@cloudflare/workers-types';

declare global {
  namespace App {
    interface Platform {
      env: {
        ASSETS?: KVNamespace;
        // Add other bindings here
      };
    }
  }
}

export {};
