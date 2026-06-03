import React from "react";
import { createLocale, MatchingPolicy, LocalePolicy } from "../../src";

const policy: LocalePolicy = {
    default: MatchingPolicy.STRICT,
    languages: {
        en: MatchingPolicy.LOOSE,
        nl: MatchingPolicy.LOOSE,
    },
};

// en-BE and nl-DE are not combinations in the dataset, but allowed because
// their language and country each exist — the policy is loose for "en" and "nl".
const locales = [
    { languageOrLocale: "en", country: "BE" },
    { languageOrLocale: "nl", country: "DE" },
    { languageOrLocale: "fr", country: "BE" }, // strict — fr-BE exists in the dataset
];

export const Example = () => {
    return (
        <div style={{ fontFamily: "sans-serif", padding: 20, maxWidth: 860 }}>

            <section style={{ marginBottom: 32 }}>
                <h3>Policy configuration</h3>
                <hr />
                <strong>Default:</strong> <code>{policy.default}</code>
                <br /><br />
                <strong>Per-language overrides:</strong>
                <ul>
                    {Object.entries(policy.languages).map(([lang, p]) => (
                        <li key={lang}><code>{lang}</code> → <code>{p}</code></li>
                    ))}
                </ul>
            </section>

            <section>
                <h3>Resolved locales</h3>
                <hr />
                <table style={{ borderCollapse: "collapse", width: "100%" }}>
                    <thead>
                        <tr>
                            <th style={{ textAlign: "left", padding: "6px 12px" }}>Input</th>
                            <th style={{ textAlign: "left", padding: "6px 12px" }}>Effective policy</th>
                            <th style={{ textAlign: "left", padding: "6px 12px" }}>Result</th>
                        </tr>
                    </thead>
                    <tbody>
                        {locales.map(({ languageOrLocale, country }) => {
                            const locale = createLocale({ languageOrLocale, country, policy });
                            const lang = languageOrLocale.toLowerCase();
                            const effectivePolicy = typeof policy === "string"
                                ? policy
                                : policy.languages[lang] ?? policy.default;
                            return (
                                <tr key={`${languageOrLocale}-${country}`} style={{ borderTop: "1px solid #eee" }}>
                                    <td style={{ padding: "6px 12px" }}><code>{languageOrLocale}-{country}</code></td>
                                    <td style={{ padding: "6px 12px" }}><code>{effectivePolicy}</code></td>
                                    <td style={{ padding: "6px 12px" }}><code>{locale.locale}</code></td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </section>

        </div>
    );
};
