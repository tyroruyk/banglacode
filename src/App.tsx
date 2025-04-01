import { useState } from 'react';
import CodeEditor from './components/CodeEditor';
import Docs from './components/Docs';

function App() {
  const [activeTab, setActiveTab] = useState('editor');

  return (
    <div>
      <h1>বাংলাকোড</h1>
      <div className="tabs">
        <button
          className={activeTab === 'editor' ? 'active' : ''}
          onClick={() => setActiveTab('editor')}
        >
          কোড এডিটর
        </button>
        <button
          className={activeTab === 'docs' ? 'active' : ''}
          onClick={() => setActiveTab('docs')}
        >
          ডকুমেন্টেশন
        </button>
      </div>
      <div className="tab-content">
        {activeTab === 'editor' && <CodeEditor />}
        {activeTab === 'docs' && <Docs />}
      </div>
      <p className="credit">- by <a href="https://github.com/tyroruyk" target='_blank'>@tyroruyk</a></p>
    </div>
  );
}

export default App;
