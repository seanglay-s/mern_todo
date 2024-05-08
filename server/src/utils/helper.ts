import { Env } from "../config/env.config";

export const isLocalDevelopment: boolean = (() => {
    const nodeEnv: string = Env.NODE_ENV.toLocaleLowerCase();
    const excludedEnvironments: string[] = ["production", "develop", "staging", "beta", "development"];
    return excludedEnvironments.every(env => nodeEnv !== env);
})();