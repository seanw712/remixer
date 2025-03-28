import React, { useState } from 'react';
import InputSection from './components/InputSection';
import OutputSection from './components/OutputSection';
import ErrorMessage from './components/ErrorMessage';
import PresetSection from './components/PresetSection';
import { remixService } from './services/api';

/**
 * Main application component
 */
function App() {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [preset, setPreset] = useState({
    contentType: 'Informative',
    toneOfVoice: '',
    competitorPoints: null
  });

  /**
   * Handle the remix action
   */
  const handleRemix = async () => {
    if (!inputText.trim()) {
      setError('Please enter some text to remix');
      return;
    }

    setIsLoading(true);
    setError(null);
    
    try {
      const result = await remixService.remixContent(inputText);
      setOutputText(result);
    } catch (err) {
      setError(err.message || 'Failed to remix content. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePresetChange = (newPreset) => {
    setPreset(newPreset);
  };

  const handleLoadOutput = (output) => {
    setOutputText(output.content);
  };

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        <header className="mb-12">
          <h1 className="text-4xl font-bold text-center gradient-text">
            Content Remixer
          </h1>
          <p className="text-center text-slate-600 mt-3 text-lg">
            Transform your content with AI-powered remixing
          </p>
        </header>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-6">
            <PresetSection onPresetChange={handlePresetChange} />
            <InputSection inputText={inputText} setInputText={setInputText} />
          </div>
          
          <div className="space-y-6">
            <div className="flex justify-center">
              <button
                className="gradient-button"
                onClick={handleRemix}
                disabled={isLoading || !inputText.trim()}
              >
                {isLoading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Remixing...
                  </span>
                ) : 'Generate Remix'}
              </button>
            </div>
            
            <ErrorMessage message={error} />
            
            <OutputSection 
              outputText={outputText} 
              isLoading={isLoading}
              onLoadOutput={handleLoadOutput}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App; 