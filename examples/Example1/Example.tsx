import React from "react";
import { SystemLocale, createLocale } from "../../src";

export const Example = () => {
    const customLocale = createLocale({ languageOrLocale: 'fr-CA' });

    return (
        <div style={{ fontFamily: 'sans-serif', padding: '20px' }}>
            <h2>Locale Examples</h2>
            
            <section>
                <h3>System Locale</h3>
                <p><strong>Full Locale:</strong> {SystemLocale.locale}</p>
                <p><strong>Language:</strong> {SystemLocale.language}</p>
                <p><strong>Region:</strong> {SystemLocale.region ?? 'N/A'}</p>
            </section>

            <hr />

            <section>
                <h3>Custom Locale (fr-CA)</h3>
                <p><strong>Full Locale:</strong> {customLocale.locale}</p>
                <p><strong>Language:</strong> {customLocale.language}</p>
                <p><strong>Region:</strong> {customLocale.region ?? 'N/A'}</p>
            </section>
        </div>
    )
}