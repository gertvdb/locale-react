import {LocalePolicy, MatchingPolicy} from "@/Types";

export function resolvePolicy(policy: LocalePolicy, language: string): MatchingPolicy {
    if (typeof policy === "string") return policy;
    return policy.languages[language.toLowerCase()] ?? policy.default;
}