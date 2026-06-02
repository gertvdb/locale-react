import React from "react";
import { SystemLocale } from "../../src";
import { fromUrlPathSegment } from "@/Utils/fromUrlPathSegment";
import { fromUrlQueryParam } from "@/Utils/fromUrlQueryParam";
import { fromUrlHostname } from "@/Utils/fromUrlHostname";

export const Example = () => {
    const pathUrl = new URL("https://example.com/en-US/dashboard");
    const queryUrl = new URL("https://example.com/dashboard?locale=fr-BE");
    const hostnameUrl = new URL("https://de.example.com/dashboard");

    const pathLocale = fromUrlPathSegment({ url: pathUrl, default: SystemLocale });
    const queryLocale = fromUrlQueryParam({ url: queryUrl, default: SystemLocale });
    const hostnameLocale = fromUrlHostname({ url: hostnameUrl, default: SystemLocale });

    return (
        <div style={{ fontFamily: 'sans-serif', padding: '20px' }}>
            <section>
                <h3>From Path Segment</h3>
                <hr />
                <p><strong>URL:</strong> {pathUrl.href}</p>
                <p><strong>Full Locale:</strong> {pathLocale.locale}</p>
                <p><strong>Language:</strong> {pathLocale.language}</p>
                <p><strong>Region:</strong> {pathLocale.region ?? 'N/A'}</p>
            </section>

            <br />
            <br />
            <br />

            <section>
                <h3>From Query Param</h3>
                <hr />
                <p><strong>URL:</strong> {queryUrl.href}</p>
                <p><strong>Full Locale:</strong> {queryLocale.locale}</p>
                <p><strong>Language:</strong> {queryLocale.language}</p>
                <p><strong>Region:</strong> {queryLocale.region ?? 'N/A'}</p>
            </section>

            <br />
            <br />
            <br />

            <section>
                <h3>From Hostname</h3>
                <hr />
                <p><strong>URL:</strong> {hostnameUrl.href}</p>
                <p><strong>Full Locale:</strong> {hostnameLocale.locale}</p>
                <p><strong>Language:</strong> {hostnameLocale.language}</p>
                <p><strong>Region:</strong> {hostnameLocale.region ?? 'N/A'}</p>
            </section>
        </div>
    );
};
