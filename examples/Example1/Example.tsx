import React from "react";
import { SystemLocale } from "../../src";

export const Example = () => {
    return (
        <div style={{ fontFamily: 'sans-serif', padding: '20px' }}>
            <section>
                <h3>System Locale</h3>
                <hr />
                <p><strong>Full Locale:</strong> {SystemLocale.locale}</p>
                <p><strong>Language:</strong> {SystemLocale.language_code}</p>
                <p><strong>Region:</strong> {SystemLocale.country_code}</p>
                <p><strong>Spoken languages:</strong> <ul>{
                    SystemLocale.country().languages().toArray().map(lang => <li key={lang.iso_639_1}>{lang.name}</li>)
                }</ul>
                </p>
            </section>
        </div>
    )
}