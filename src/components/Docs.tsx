import { translations } from '../translations';

interface DocsProps {
  language: 'bn' | 'en';
}

const Docs = ({ language }: DocsProps) => {
  const content = translations[language];

  return (
    <div className="docs">
      <h2>{content.title}</h2>
      <p>{content.intro}</p>
      <h3>{content.features}</h3>
      <ul>
        {content.featuresList.map((feature, index) => (
          <li key={index}>{feature}</li>
        ))}
      </ul>
      <h3>{content.gettingStarted}</h3>
      <p>{content.gettingStartedSteps[0]}</p>
      <ol>
        {content.gettingStartedSteps.map((step, index) => (
          <li key={index}>{step}</li>
        ))}
      </ol>
      <h3>{content.syntax}</h3>
      <h4>{content.basicStructure}</h4>
      <p>{content.basicStructureDesc}</p>
      <h4>{content.variables}</h4>
      <p>{content.variablesDesc}</p>
      <p>Example:</p>
      <span className='code'>
        <code>
          {`পূর্ণ ক = ১০; // int a = 10;`}
          <br />
          {`দশমিক খ = ৩.৫; // float b = 3.5;`}
          <br />
          {`সুতা নাম = "বাংলা কোড"; // char* name = "Bangla Code";`}
        </code>
      </span>
      <h4>{content.functions}</h4>
      <p>{content.functionsDesc}</p>
      <ul>
        {content.functionsList.map((func, index) => (
          <li key={index}>
            <code>{func.name}</code>: {func.desc}
          </li>
        ))}
      </ul>
      <h4>{content.output}</h4>
      <p>{content.outputDesc}</p>
      <p>Example:</p>
      <span className='code'>
        <code>
          {`ছাপাওফ("গণনা শুরু!\\n"); // printf("Calculation started!\\n");`}
          <br />
          {`ছাপাওফ(ক); // printf(a);`}
        </code>
      </span>
      <h3>{content.example}</h3>
      <pre>
        <code>
          {`#অন্তর্ভুক্ত <স্তদিও.হ>

পূর্ণ প্রধান() {
    সুতা নাম = "বাংলা কোড";
    ছাপাওফ("স্বাগতম ");
    ছাপাওফ(নাম);
    ছাপাওফ("!\\ন");
    ছাপাওফ("গণনা শুরু!\\ন");
    পূর্ণ ক = ১০;
    পূর্ণ খ = ৫;
    দশমিক গ = ৩.৫;
    পূর্ণ ঘ = যোগ(ক, খ);
    ছাপাওফ("যোগ: ");
    ছাপাওফ(ঘ);
    ছাপাওফ("\\ন");
    পূর্ণ ঙ = বিয়োগ(ক, খ);
    ছাপাওফ("বিয়োগ: ");
    ছাপাওফ(ঙ);
    ছাপাওফ("\\ন");
    দশমিক চ = গুণ(গ, খ);
    ছাপাওফ("গুণ: ");
    ছাপাওফ(চ);
    ছাপাওফ("\\ন");
    দশমিক ছ = ভাগ(ক, গ);
    ছাপাওফ("ভাগ: ");
    ছাপাওফ(ছ);
    ছাপাওফ("\\ন");
    দশমিক জ = বর্গমূল(ক);
    ছাপাওফ("বর্গমূল: ");
    ছাপাওফ(জ);
    ছাপাওফ("\\ন");
    ফেরত ০;
}`}
        </code>
      </pre>
    </div>
  );
};

export default Docs;
