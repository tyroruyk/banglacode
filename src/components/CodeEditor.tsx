import { ChangeEvent, KeyboardEvent, useState } from 'react';

interface Variables {
  [key: string]: number | string;
}

const defaultCode = `#অন্তর্ভুক্ত <স্তদিও.হ>

পূর্ণ প্রধান() {
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
}`;

export default function CodeEditor() {
  const [code, setCode] = useState(defaultCode);
  const [output, setOutput] = useState('আউটপুট এখানে দেখাবে...');

  const convertBanglaToEnglishNumber = (banglaNum: string): string => {
    const banglaDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
    const englishDigits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    let result = banglaNum;
    for (let i = 0; i < banglaDigits.length; i++) {
      result = result.replace(new RegExp(banglaDigits[i], 'g'), englishDigits[i]);
    }
    return result;
  };

  const convertEnglishToBanglaNumber = (englishNum: string | number): string => {
    const banglaDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
    const englishDigits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    let result = String(englishNum);
    for (let i = 0; i < englishDigits.length; i++) {
      result = result.replace(new RegExp(englishDigits[i], 'g'), banglaDigits[i]);
    }
    return result;
  };

  const runCode = () => {
    let outputText = '';
    const variables: Variables = {};
    const lines = code.split('\n').map(line => line.trim());
    let inMain = false;
    let returnFound = false;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      
      // Check for semicolon in statements that require it
      if (inMain && line && !line.endsWith('{') && !line.endsWith('}') && 
          !line.includes('প্রধান()') && !line.includes('ফেরত ০') &&
          !line.endsWith(';') && line !== '') {
        setOutput(`ত্রুটি: লাইন ${i + 1} এ সেমিকোলন (;) অনুপস্থিত`);
        return;
      }

      if (line.includes('প্রধান()')) {
        inMain = true;
        continue;
      }
      if (!inMain) continue;

      if (line.includes('ছাপাওফ')) {
        const match = line.match(/"([^"]*)"/);
        if (match) {
          outputText += match[1].replace('\\ন', '\n');
        } else {
          const varMatch = line.match(/ছাপাওফ\(([^\)]+)\)/);
          if (varMatch && variables[varMatch[1]] !== undefined) {
            let outputValue = variables[varMatch[1]];
            if (outputValue === "নান") {
              outputText += outputValue;
            } else {
              outputText += convertEnglishToBanglaNumber(outputValue);
            }
          }
        }
      }

      if (line.includes('পূর্ণ') && line.includes('=')) {
        const parts = line.split('=');
        const varName = parts[0].replace('পূর্ণ', '').trim();
        const value = parseInt(convertBanglaToEnglishNumber(parts[1].replace(';', '').trim()));
        variables[varName] = value;
      }

      if (line.includes('দশমিক') && line.includes('=')) {
        const parts = line.split('=');
        const varName = parts[0].replace('দশমিক', '').trim();
        const value = parseFloat(convertBanglaToEnglishNumber(parts[1].replace(';', '').trim()));
        variables[varName] = value;
      }

      if (line.includes('যোগ')) {
        const match = line.match(/যোগ\(([^,]+),\s*([^)]+)\)/);
        if (match) {
          const var1 = match[1].trim();
          const var2 = match[2].trim();
          const resultVar = line.split('=')[0].replace(/পূর্ণ|দশমিক/, '').trim();
          variables[resultVar] = Number(variables[var1]) + Number(variables[var2]);
        }
      }

      if (line.includes('বিয়োগ')) {
        const match = line.match(/বিয়োগ\(([^,]+),\s*([^)]+)\)/);
        if (match) {
          const var1 = match[1].trim();
          const var2 = match[2].trim();
          const resultVar = line.split('=')[0].replace(/পূর্ণ|দশমিক/, '').trim();
          variables[resultVar] = Number(variables[var1]) - Number(variables[var2]);
        }
      }

      if (line.includes('গুণ')) {
        const match = line.match(/গুণ\(([^,]+),\s*([^)]+)\)/);
        if (match) {
          const var1 = match[1].trim();
          const var2 = match[2].trim();
          const resultVar = line.split('=')[0].replace(/পূর্ণ|দশমিক/, '').trim();
          variables[resultVar] = Number(variables[var1]) * Number(variables[var2]);
        }
      }

      if (line.includes('ভাগ')) {
        const match = line.match(/ভাগ\(([^,]+),\s*([^)]+)\)/);
        if (match) {
          const var1 = match[1].trim();
          const var2 = match[2].trim();
          const resultVar = line.split('=')[0].replace(/পূর্ণ|দশমিক/, '').trim();
          variables[resultVar] = Number(variables[var1]) / Number(variables[var2]);
        }
      }

      if (line.includes('বর্গমূল')) {
        const match = line.match(/বর্গমূল\(([^)]+)\)/);
        if (match) {
          const var1 = match[1].trim();
          const resultVar = line.split('=')[0].replace(/পূর্ণ|দশমিক/, '').trim();
          const result = Math.sqrt(Number(variables[var1]));
          if (isNaN(result)) {
            variables[resultVar] = "নান";
          } else {
            variables[resultVar] = result;
          }
        }
      }

      if (line.includes('ফেরত ০')) {
        returnFound = true;
        break;
      }
    }

    if (inMain && !returnFound) {
      setOutput('ত্রুটি: "ফেরত ০;" প্রধান() ফাংশনে অনুপস্থিত।');
      return;
    }

    if (outputText.includes('NaN')) {
      outputText = outputText.replace(/NaN/g, 'নান');
    }

    setOutput(outputText || 'কোনো আউটপুট নেই বা কোডে ত্রুটি আছে।');
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const textarea = e.target as HTMLTextAreaElement;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;

      const newCode = code.substring(0, start) + '    ' + code.substring(end);
      setCode(newCode);

      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + 4;
      }, 0);
    }
  };

  return (
    <div className="container">
      <textarea
        id="codeInput"
        value={code}
        onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setCode(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="এখানে আপনার বাংলাকোড লিখুন..."
      />
      <button onClick={runCode}>কোড চালান</button>
      <div id="output">{output}</div>
    </div>
  );
}
