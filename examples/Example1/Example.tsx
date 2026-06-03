import React from "react";
import { SystemLocale } from "../../src";

export const Example = () => {
    return (
        <div style={{ fontFamily: 'sans-serif', padding: '20px' }}>
            <section>
                <h3>System Locale</h3>
                <hr />
                <div><strong>Full Locale:</strong> {SystemLocale.locale}</div>
                <div><strong>Language:</strong> {SystemLocale.language_code}</div>
                <div><strong>Region:</strong> {SystemLocale.country_code}</div>
                <div>
                    <strong>Spoken languages:</strong>
                    <ul>
                        {SystemLocale.country().languages().toArray().map(lang => (
                            <li key={lang.alpha2}>{lang.name} ({lang.alpha2})</li>
                        ))}
                    </ul>
                </div>
            </section>
        </div>
    );
}
