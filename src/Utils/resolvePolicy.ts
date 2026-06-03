import { LocalePolicy, MatchingPolicy } from "@/Types";
import { matchLocalePattern } from "@/Utils/matchLocalePattern";

function sideScore(part: string): number {
    if (part === "*") return 2;
    if (part.startsWith("[")) return 1;
    return 0;
}

function specificity(pattern: string): number {
    const dash = pattern.indexOf("-");
    if (dash === -1) return 0;
    return sideScore(pattern.slice(0, dash)) + sideScore(pattern.slice(dash + 1));
}

export function resolvePolicy(policy: LocalePolicy, language: string, country: string): MatchingPolicy {
    if (typeof policy === "string") return policy;

    const sorted = Object.entries(policy.locales).sort(
        ([a], [b]) => specificity(a) - specificity(b),
    );

    for (const [pattern, match] of sorted) {
        if (matchLocalePattern(pattern, language, country)) return match;
    }

    return policy.default;
}
