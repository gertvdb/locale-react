import React from "react";
import { resolveLocale, SystemLocale } from "../../src";

const supported = [
    "nl-NL",
    "nl-BE",
    "fr-BE"
];

const overrides = {
    "*-BE": "fr-BE",  // German is not support, so send german speaking belgians to fr-BE
    "en-*": "nl-NL",  // Send all english speaking users of and unsupported country to nl-NL
    "*":    "nl-BE",  // Fallback to nl-BE if no other match is found
};

export const Example = () => {
    const resolved = resolveLocale({
        detected: SystemLocale,
        supported: supported,
        overrides: overrides,
    });

    return (
        <div style={{ fontFamily: "sans-serif", padding: 20, maxWidth: 860 }}>

            <section style={{ marginBottom: 32 }}>
                <h3>Your configuration</h3>
                <hr />
                <strong>Supported:</strong>
                <ul>
                    {supported.map(s => <li key={s}><code>{s}</code></li>)}
                </ul>
                <strong>Overrides:</strong>
                <ul>
                    {Object.entries(overrides).map(([key, value]) => (
                        <li key={key}><code>{key}</code> → <code>{value}</code></li>
                    ))}
                </ul>
            </section>

            <section style={{ marginBottom: 32 }}>
                <h3>Your system locale</h3>
                <hr />
                <div>
                    <strong>Detected:</strong>
                    <ul><li>{SystemLocale.locale}</li></ul>
                </div>
                <br/>
                <div>
                    <strong>Resolved:</strong>
                    <ul><li>{resolved.locale}</li></ul>
                </div>
            </section>
        </div>
    );
};
