import React from "react";
import { SystemLocale } from "../../src";

export const Example = () => {
    return (
        <div style={{ fontFamily: 'sans-serif', padding: '20px' }}>
            <section>
                <h3>System Locale</h3>
                <hr />
                <p><strong>Full Locale:</strong> {SystemLocale.locale}</p>
                <p><strong>Language:</strong> {SystemLocale.language}</p>
                <p><strong>Region:</strong> {SystemLocale.region ?? 'N/A'}</p>
            </section>
        </div>
    )
}