import React from "react";
import { createLocale, MatchingPolicy } from "../../src";

const policy = MatchingPolicy.STRICT;

// All three must be exact combinations present in the dataset.
const locales = [
    { languageOrLocale: "fr", country: "BE" },
    { languageOrLocale: "nl", country: "NL" },
    { languageOrLocale: "de", country: "DE" },
];

export const Example = () => {
    return (
        <div style={{ fontFamily: "sans-serif", padding: 20, maxWidth: 860 }}>

            <section style={{ marginBottom: 32 }}>
                <h3>Policy configuration</h3>
                <hr />
                <strong>Policy:</strong> <code>{policy}</code>
                <p style={{ color: "#555", marginTop: 8 }}>
                    Every locale must exist as a combination in the dataset.
                    Passing a language-country pair that is not in the dataset will throw.
                </p>
            </section>

            <section>
                <h3>Resolved locales</h3>
                <hr />
                <table style={{ borderCollapse: "collapse", width: "100%" }}>
                    <thead>
                        <tr>
                            <th style={{ textAlign: "left", padding: "6px 12px" }}>Input</th>
                            <th style={{ textAlign: "left", padding: "6px 12px" }}>Policy</th>
                            <th style={{ textAlign: "left", padding: "6px 12px" }}>Result</th>
                            <th style={{ textAlign: "left", padding: "6px 12px" }}>Languages</th>
                        </tr>
                    </thead>
                    <tbody>
                        {locales.map(({ languageOrLocale, country }) => {
                            const locale = createLocale({ languageOrLocale, country, policy });
                            return (
                                <tr key={`${languageOrLocale}-${country}`} style={{ borderTop: "1px solid #eee" }}>
                                    <td style={{ padding: "6px 12px" }}><code>{languageOrLocale}-{country}</code></td>
                                    <td style={{ padding: "6px 12px" }}><code>{policy}</code></td>
                                    <td style={{ padding: "6px 12px" }}><code>{locale.locale}</code></td>
                                    <td style={{ padding: "6px 12px" }}><code>{locale.languages().toArray().map((l) => l.name + ' (' + l.alpha2 + ')').join(', ')}</code></td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </section>

        </div>
    );
};
