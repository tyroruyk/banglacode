import { useState } from 'react';
import CodeEditor from './components/CodeEditor';
import Docs from './components/Docs';

function App() {
  const [activeTab, setActiveTab] = useState('editor');
  const [language, setLanguage] = useState<'bn' | 'en'>('bn');

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'bn' ? 'en' : 'bn');
  };

  return (
    <div>
      <div className="header">
        <h1>{language === 'bn' ? 'বাংলাকোড' : 'BanglaCode'}</h1>
        <button className="language-switch" onClick={toggleLanguage}>
          {language === 'bn' ? 'English' : 'বাংলা'}
        </button>
      </div>
      <div className="tabs">
        <button
          className={activeTab === 'editor' ? 'active' : ''}
          onClick={() => setActiveTab('editor')}
        >
          {language === 'bn' ? 'কোড এডিটর' : 'Code Editor'}
        </button>
        <button
          className={activeTab === 'docs' ? 'active' : ''}
          onClick={() => setActiveTab('docs')}
        >
          {language === 'bn' ? 'ডকুমেন্টেশন' : 'Documentation'}
        </button>
      </div>
      <div className="tab-content">
        {activeTab === 'editor' && <CodeEditor language={language} />}
        {activeTab === 'docs' && <Docs language={language} />}
      </div>
      <p className="credit">- by <a href="https://github.com/tyroruyk" target='_blank'>@tyroruyk</a></p>
    </div>
  );
}

export default App;
