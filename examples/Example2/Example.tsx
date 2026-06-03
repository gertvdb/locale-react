import React from "react";
import { Language, Country, Continent } from "../../src";

const Section = ({ title, rows }: { title: string; rows: [string, React.ReactNode][] }) => (
    <section>
        <h3>{title}</h3>
        <hr />
        <table style={{ borderCollapse: 'collapse', width: '100%' }}>
            <tbody>
                {rows.map(([label, value]) => (
                    <tr key={label}>
                        <td style={{ padding: '4px 12px 4px 0', fontWeight: 'bold', whiteSpace: 'nowrap' }}>{label}</td>
                        <td style={{ padding: '4px 0' }}>{value}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </section>
);

export const Example = () => {
    const language = Language.from({ code: 'fr' });
    const country = Country.from({ code: 'BE' });
    const continent = Continent.europe();

    return (
        <div style={{ fontFamily: 'sans-serif', padding: '20px', display: 'flex', flexDirection: 'column', gap: '32px' }}>
            <Section title="Language — French (fr)" rows={[
                ['name',       language.name],
                ['alpha2',  language.alpha2],
                ['alpha3',  language.alpha3],
                ['machine_name',language.machine_name],
            ]} />

            <Section title="Country — Belgium (BE)" rows={[
                ['name',               country.name],
                ['alpha2',             country.alpha2],
                ['alpha3',             country.alpha3],
                ['numeric',            country.numeric],
                ['machine_name',       country.machine_name],
                ['direct_dialing_code',country.direct_dialing_code],
                ['languages',          country.languages().toArray().map(l => l.name).join(' | ')],
                ['borders',            country.borders()
                    .toArray()
                    .sort((a, b) => a.name.localeCompare(b.name))
                    .map(c => c.name + '(' + c.alpha2 + ')').join(' | ')],
            ]} />

            <Section title="Continent — Europe (EU)" rows={[
                ['name',        continent.name],
                ['alpha2',      continent.alpha2],
                ['machine_name',continent.machine_name],
                ['countries',   continent.countries()
                    .toArray()
                    .sort((a, b) => a.name.localeCompare(b.name))
                    .map(c => c.name + '(' + c.alpha2 + ')').join(' | ')],
            ]} />
        </div>
    );
};
