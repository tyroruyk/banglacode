import { ChangeEvent, KeyboardEvent, useCallback, useEffect, useState } from 'react';

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

    // Check if '#অন্তর্ভুক্ত <স্তদিও.হ>' exists before 'পূর্ণ প্রধান()'
    const includeIndex = lines.findIndex(line => line.includes('#অন্তর্ভুক্ত <স্তদিও.হ>'));
    const mainIndex = lines.findIndex(line => line.includes('পূর্ণ প্রধান()'));

    if (includeIndex === -1 || (mainIndex !== -1 && includeIndex > mainIndex)) {
      setOutput('ত্রুটি: "#অন্তর্ভুক্ত <স্তদিও.হ>" অবশ্যই "পূর্ণ প্রধান()" ফাংশনের আগে থাকতে হবে।');
      return;
    }

    // Add check for proper main function syntax with curly braces
    const mainFunctionLine = lines.find(line => line.includes('প্রধান()'));
    if (!mainFunctionLine || !mainFunctionLine.startsWith('পূর্ণ প্রধান()')) {
      setOutput('ত্রুটি: মূল ফাংশনের সিনট্যাক্স অবশ্যই "পূর্ণ প্রধান() {...}" হতে হবে।');
      return;
    }

    // Check for opening curly brace
    const mainLineIndex = lines.findIndex(line => line.includes('প্রধান()'));
    if (mainLineIndex === -1 || !lines[mainLineIndex].includes('{')) {
      setOutput('ত্রুটি: প্রধান() ফাংশনে শুরুর কার্লি ব্রেস "{" অনুপস্থিত।');
      return;
    }

    // Check for matching closing brace
    let braceCount = 0;
    for (let i = mainLineIndex; i < lines.length; i++) {
      if (lines[i].includes('{')) braceCount++;
      if (lines[i].includes('}')) braceCount--;
      if (braceCount === 0 && i > mainLineIndex) {
        // Found matching closing brace
        break;
      }
    }
    if (braceCount !== 0) {
      setOutput('ত্রুটি: প্রধান() ফাংশনে শেষের কার্লি ব্রেস "}" অনুপস্থিত।');
      return;
    }

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
          outputText += match[1].replace(/\\ন/g, '\n');
        } else {
          const varMatch = line.match(/ছাপাওফ\(([^)]+)\)/);
          if (varMatch && variables[varMatch[1]] !== undefined) {
            const outputValue = variables[varMatch[1]];
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

  const shareCode = useCallback(() => {
    const encodedCode = encodeURIComponent(code);
    const shareURL = `${window.location.origin}${window.location.pathname}?q=${encodedCode}`;
    navigator.clipboard.writeText(shareURL)
      .then(() => {
        alert('লিঙ্কটি ক্লিপবোর্ডে কপি করা হয়েছে!');
      })
      .catch(err => {
        console.error('ক্লিপবোর্ডে কপি করতে সমস্যা:', err);
        alert('লিঙ্কটি কপি করতে সমস্যা হয়েছে।');
      });
  }, [code]);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const codeFromURL = urlParams.get('q');
    if (codeFromURL) {
      setCode(decodeURIComponent(codeFromURL));
    }
  }, []);

  return (
    <div className="container">
      <textarea
        id="codeInput"
        value={code}
        onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setCode(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="এখানে আপনার বাংলাকোড লিখুন..."
      />
      <div className="button-container">
        <button onClick={runCode}>কোড চালান</button>
        <button onClick={shareCode}>কোড শেয়ার করুন</button>
      </div>
      <div id="output">{output}</div>
    </div>
  );
}
