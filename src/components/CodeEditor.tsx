import { ChangeEvent, KeyboardEvent, useCallback, useEffect, useState } from 'react';

interface Variables {
  [key: string]: number | string;
}

interface CodeEditorProps {
  language: 'bn' | 'en';
}

const defaultCode = `#অন্তর্ভুক্ত <স্তদিও.হ>

পূর্ণ প্রধান() {
    ছাপাওফ("ওহে, বিশ্ব\\ন");
    
    ফেরত ০;
}`;

const banglaToEnglishMap: { [key: string]: string } = {
  '০': '0', '১': '1', '২': '2', '৩': '3', '৪': '4', '৫': '5', '৬': '6', '৭': '7', '৮': '8', '৯': '9'
};

const englishToBanglaMap: { [key: string]: string } = {
  '0': '০', '1': '১', '2': '২', '3': '৩', '4': '৪', '5': '৫', '6': '৬', '7': '৭', '8': '৮', '9': '৯'
};

const convertBanglaToEnglishNumber = (banglaNum: string): string =>
  banglaNum
    .split('')
    .map(ch => banglaToEnglishMap[ch] || ch)
    .join('');

const convertEnglishToBanglaNumber = (englishNum: string | number): string =>
  String(englishNum)
    .split('')
    .map(ch => englishToBanglaMap[ch] || ch)
    .join('');

// Helper to handle numeric variable assignments
const assignNumericVariable = (
  line: string,
  keyword: string,
  parser: (value: string) => number,
  variables: Variables
) => {
  if (line.includes(keyword) && line.includes('=')) {
    const parts = line.split('=');
    const varName = parts[0].replace(keyword, '').trim();
    const rawValue = parts[1].replace(';', '').trim();
    const value = parser(convertBanglaToEnglishNumber(rawValue));
    variables[varName] = value;
  }
};

export default function CodeEditor({ language }: CodeEditorProps) {
  const [code, setCode] = useState(defaultCode);
  const [output, setOutput] = useState(language === 'bn' ? 'আউটপুট এখানে দেখাবে...' : 'Output will appear here...');

  const runCode = () => {
    let outputText = '';
    const variables: Variables = {};
    const lines = code.split('\n').map(line => line.trim());
    let isInMain = false;
    let returnFound = false;

    // Check for required include before main
    const includeIndex = lines.findIndex(line => line.includes('#অন্তর্ভুক্ত <স্তদিও.হ>'));
    const mainIndex = lines.findIndex(line => line.includes('পূর্ণ প্রধান()'));
    if (includeIndex === -1 || (mainIndex !== -1 && includeIndex > mainIndex)) {
      setOutput(language === 'bn' ? 'ত্রুটি: "#অন্তর্ভুক্ত <স্তদিও.হ>" অবশ্যই "পূর্ণ প্রধান()" ফাংশনের আগে থাকতে হবে।' : 'Error: "#অন্তর্ভুক্ত <স্তদিও.হ>" must come before "পূর্ণ প্রধান()" function.');
      return;
    }

    // Validate main function syntax (must start with 'পূর্ণ প্রধান()' and include an opening brace)
    const mainFunctionLine = lines.find(line => line.includes('প্রধান()'));
    if (!mainFunctionLine || !mainFunctionLine.startsWith('পূর্ণ প্রধান()') || !mainFunctionLine.includes('{')) {
      setOutput(language === 'bn' ? 'ত্রুটি: মূল ফাংশনের সিনট্যাক্স অবশ্যই "পূর্ণ প্রধান() {...}" হতে হবে এবং শুরুতে "{" থাকতে হবে।' : 'Error: Main function syntax must be "পূর্ণ প্রধান() {...}" and start with "{".');
      return;
    }

    // Check for matching curly braces in the main function
    let braceCount = 0;
    const mainLineIndex = lines.findIndex(line => line.includes('প্রধান()'));
    for (let i = mainLineIndex; i < lines.length; i++) {
      if (lines[i].includes('{')) braceCount++;
      if (lines[i].includes('}')) braceCount--;
      if (braceCount === 0 && i > mainLineIndex) break;
    }
    if (braceCount !== 0) {
      setOutput(language === 'bn' ? 'ত্রুটি: প্রধান() ফাংশনে শেষের কার্লি ব্রেস "}" অনুপস্থিত।' : 'Error: Missing closing curly brace "}" in main() function.');
      return;
    }

    // Process each line of code
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      // Enforce semicolon for statements (ignoring blocks and certain keywords)
      if (
        isInMain &&
        line &&
        !line.endsWith('{') &&
        !line.endsWith('}') &&
        !line.includes('প্রধান()') &&
        !line.endsWith(';') &&
        line !== ''
      ) {
        setOutput(language === 'bn' ? `ত্রুটি: লাইন ${i + 1} এ সেমিকোলন (;) অনুপস্থিত` : `Error: Missing semicolon (;) in line ${i + 1}`);
        return;
      }

      // Detect start of main function
      if (line.includes('প্রধান()')) {
        isInMain = true;
        continue;
      }
      if (!isInMain) continue;

      // Process string assignment with "সুতা"
      if (line.includes('সুতা') && line.includes('=')) {
        const parts = line.split('=');
        const varName = parts[0].replace('সুতা', '').trim();
        const valueMatch = parts[1].match(/"([^"]*)"/);
        if (valueMatch) {
          variables[varName] = valueMatch[1];
        }
      }

      // Process print statement with "ছাপাওফ"
      if (line.includes('ছাপাওফ')) {
        const textMatch = line.match(/"([^"]*)"/);
        if (textMatch) {
          outputText += textMatch[1].replace(/\\ন/g, '\n');
        } else {
          const varMatch = line.match(/ছাপাওফ\(([^)]+)\)/);
          if (varMatch && variables[varMatch[1].trim()] !== undefined) {
            const outputValue = variables[varMatch[1].trim()];
            outputText += typeof outputValue === 'string'
              ? outputValue.replace(/\\ন/g, '\n')
              : convertEnglishToBanglaNumber(outputValue);
          }
        }
      }

      // Process numeric assignments for integers and decimals
      assignNumericVariable(line, 'পূর্ণ', parseInt, variables);
      assignNumericVariable(line, 'দশমিক', parseFloat, variables);

      // Process arithmetic operations using a helper pattern
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
          variables[resultVar] = isNaN(result) ? "নান" : result;
        }
      }

      if (line.includes('ফেরত ০')) {
        returnFound = true;
        break;
      }
    }

    if (isInMain && !returnFound) {
      setOutput(language === 'bn' ? 'ত্রুটি: "ফেরত ০;" প্রধান() ফাংশনে অনুপস্থিত।' : 'Error: Missing "ফেরত ০;" in main() function.');
      return;
    }

    // Replace any "NaN" occurrences in the output text with the Bengali version
    if (outputText.includes('NaN')) {
      outputText = outputText.replace(/NaN/g, 'নান');
    }

    setOutput(outputText || (language === 'bn' ? 'কোনো আউটপুট নেই বা কোডে ত্রুটি আছে।' : 'No output or error in code.'));
  };

  // Handle tab key insertion in textarea
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

  // Share code by encoding the current editor contents into the URL
  const shareCode = useCallback(() => {
    const encodedCode = encodeURIComponent(code);
    const shareURL = `${window.location.origin}${window.location.pathname}?q=${encodedCode}`;
    navigator.clipboard.writeText(shareURL)
      .then(() => {
        alert(language === 'bn' ? 'লিঙ্কটি ক্লিপবোর্ডে কপি করা হয়েছে!' : 'Link copied to clipboard!');
      })
      .catch(err => {
        console.error(language === 'bn' ? 'ক্লিপবোর্ডে কপি করতে সমস্যা:' : 'Error copying to clipboard:', err);
        alert(language === 'bn' ? 'লিঙ্কটি কপি করতে সমস্যা হয়েছে।' : 'Error copying link.');
      });
  }, [code, language]);

  // Load code from URL parameter if available
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
        placeholder={language === 'bn' ? 'এখানে আপনার বাংলাকোড লিখুন...' : 'Write your BanglaCode here...'}
      />
      <div className="button-container">
        <button onClick={runCode}>{language === 'bn' ? 'কোড চালান' : 'Run Code'}</button>
        <button onClick={shareCode}>{language === 'bn' ? 'কোড শেয়ার করুন' : 'Share Code'}</button>
      </div>
      <div id="output">{output}</div>
    </div>
  );
}
