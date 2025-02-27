import React, { useState } from 'react';
import InputSection from './components/InputSection';
import OutputSection from './components/OutputSection';
import ErrorMessage from './components/ErrorMessage';
import { remixService } from './services/api';

/**
 * Main application component
 */
function App() {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

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

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-center">Content Remixer</h1>
          <p className="text-center text-gray-600 mt-2">Transform your content with AI-powered remixing</p>
        </header>
        
        <InputSection inputText={inputText} setInputText={setInputText} />
        
        <div className="flex justify-center mb-6">
          <button
            className="px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 transition-colors"
            onClick={handleRemix}
            disabled={isLoading || !inputText.trim()}
          >
            {isLoading ? 'Remixing...' : 'Generate Remix'}
          </button>
        </div>
        
        <ErrorMessage message={error} />
        
        <OutputSection outputText={outputText} isLoading={isLoading} />
      </div>
    </div>
  );
}

export default App; 