import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

/**
 * Output section component for displaying remixed content
 */
const OutputSection = ({ outputText, isLoading }) => {
  const [savedOutputs, setSavedOutputs] = useState([]);
  const [outputName, setOutputName] = useState('');
  const [showSaveModal, setShowSaveModal] = useState(false);

  useEffect(() => {
    // Load saved outputs from localStorage
    const outputs = JSON.parse(localStorage.getItem('savedOutputs') || '[]');
    setSavedOutputs(outputs);
  }, []);

  const handleSaveOutput = () => {
    if (!outputName.trim() || !outputText.trim()) return;
    
    const newOutput = {
      id: Date.now(),
      name: outputName,
      content: outputText,
      timestamp: new Date().toISOString()
    };

    const updatedOutputs = [...savedOutputs, newOutput];
    setSavedOutputs(updatedOutputs);
    localStorage.setItem('savedOutputs', JSON.stringify(updatedOutputs));
    setShowSaveModal(false);
    setOutputName('');
  };

  const handleLoadOutput = (output) => {
    // This will be handled by the parent component
    // We'll need to add a prop for this
  };

  return (
    <div className="module-card">
      <div className="module-header">
        <h2 className="module-title">Output</h2>
        {outputText && (
          <button 
            className="save-button"
            onClick={() => setShowSaveModal(true)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M7.707 10.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V6h-2v5.586l-1.293-1.293z" />
            </svg>
            Save Output
          </button>
        )}
      </div>

      {savedOutputs.length > 0 && (
        <div className="mb-6">
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Saved Outputs
          </label>
          <div className="flex flex-wrap gap-2">
            {savedOutputs.map(output => (
              <button
                key={output.id}
                onClick={() => handleLoadOutput(output)}
                className="px-3 py-1 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 
                         transition-colors duration-200 text-sm"
              >
                {output.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {isLoading ? (
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
      ) : (
        <div className="w-full min-h-40 p-4 border border-slate-200 rounded-xl bg-slate-50">
          {outputText ? (
            <div className="whitespace-pre-wrap text-slate-800">{outputText}</div>
          ) : (
            <div className="text-slate-500">Remixed content will appear here</div>
          )}
        </div>
      )}

      {showSaveModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-4">Save Output</h3>
            <input
              type="text"
              placeholder="Enter output name"
              value={outputName}
              onChange={(e) => setOutputName(e.target.value)}
              className="w-full p-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 
                       focus:ring-indigo-500 focus:border-transparent mb-4"
            />
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowSaveModal(false)}
                className="px-4 py-2 text-slate-600 hover:text-slate-800"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveOutput}
                className="gradient-button"
                disabled={!outputName.trim()}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

OutputSection.propTypes = {
  outputText: PropTypes.string.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default OutputSection; 