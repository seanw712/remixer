import React, { useState, useEffect } from 'react';

const PresetSection = ({ onPresetChange }) => {
  const [contentType, setContentType] = useState('Informative');
  const [toneOfVoice, setToneOfVoice] = useState('');
  const [competitorPoints, setCompetitorPoints] = useState(null);
  const [presetName, setPresetName] = useState('');
  const [savedPresets, setSavedPresets] = useState([]);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [profile, setProfile] = useState('Company');

  useEffect(() => {
    // Load saved presets from localStorage
    const presets = JSON.parse(localStorage.getItem('savedPresets') || '[]');
    setSavedPresets(presets);
  }, []);

  const handleFileUpload = (event, type) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const jsonData = JSON.parse(e.target.result);
          if (type === 'competitor') {
            setCompetitorPoints(jsonData);
          }
        } catch (error) {
          console.error('Error parsing JSON file:', error);
        }
      };
      reader.readAsText(file);
    }
  };

  const handleSavePreset = () => {
    if (!presetName.trim()) return;
    
    const newPreset = {
      id: Date.now(),
      name: presetName,
      profile,
      contentType,
      toneOfVoice,
      competitorPoints
    };

    const updatedPresets = [...savedPresets, newPreset];
    setSavedPresets(updatedPresets);
    localStorage.setItem('savedPresets', JSON.stringify(updatedPresets));
    setShowSaveModal(false);
    setPresetName('');
  };

  const handleLoadPreset = (preset) => {
    setProfile(preset.profile || 'Company');
    setContentType(preset.contentType);
    setToneOfVoice(preset.toneOfVoice);
    setCompetitorPoints(preset.competitorPoints);
    onPresetChange({...preset, profile: preset.profile || 'Company'});
  };

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <div className="module-card">
      <div className="module-header">
        <h2 className="module-title">Preset Settings</h2>
        <div className="flex gap-2">
          <button 
            className="save-button"
            onClick={() => setShowSaveModal(true)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M7.707 10.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V6h-2v5.586l-1.293-1.293z" />
            </svg>
            Save
          </button>
          <button 
            className="save-button"
            onClick={toggleExpand}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              {expanded ? (
                <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
              ) : (
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              )}
            </svg>
            {expanded ? 'Collapse' : 'Expand'}
          </button>
        </div>
      </div>

      {/* Minimal View */}
      {!expanded && (
        <div className="grid grid-cols-2 gap-4 mb-2">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Profile
            </label>
            <select
              className="preset-select"
              value={profile}
              onChange={(e) => {
                setProfile(e.target.value);
                onPresetChange({ profile: e.target.value, contentType, toneOfVoice, competitorPoints });
              }}
            >
              <option value="Company">Company</option>
              <option value="Personal">Personal</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Content Type
            </label>
            <select
              className="preset-select"
              value={contentType}
              onChange={(e) => {
                setContentType(e.target.value);
                onPresetChange({ profile, contentType: e.target.value, toneOfVoice, competitorPoints });
              }}
            >
              <option value="Informative">Informative</option>
              <option value="Thought Leadership">Thought Leadership</option>
              <option value="Funny">Funny</option>
            </select>
          </div>
        </div>
      )}

      {/* Saved Presets */}
      {savedPresets.length > 0 && (
        <div className="mb-6">
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Saved Presets
          </label>
          <div className="flex flex-wrap gap-2">
            {savedPresets.map(preset => (
              <button
                key={preset.id}
                onClick={() => handleLoadPreset(preset)}
                className="px-3 py-1 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 
                         transition-colors duration-200 text-sm"
              >
                {preset.name}
              </button>
            ))}
          </div>
        </div>
      )}
      
      {/* Expanded Settings */}
      {expanded && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Profile
              </label>
              <select
                className="preset-select"
                value={profile}
                onChange={(e) => {
                  setProfile(e.target.value);
                  onPresetChange({ profile: e.target.value, contentType, toneOfVoice, competitorPoints });
                }}
              >
                <option value="Company">Company</option>
                <option value="Personal">Personal</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Content Type
              </label>
              <select
                className="preset-select"
                value={contentType}
                onChange={(e) => {
                  setContentType(e.target.value);
                  onPresetChange({ profile, contentType: e.target.value, toneOfVoice, competitorPoints });
                }}
              >
                <option value="Informative">Informative</option>
                <option value="Thought Leadership">Thought Leadership</option>
                <option value="Funny">Funny</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Tone of Voice
            </label>
            <textarea
              className="textarea-input"
              rows="3"
              placeholder="Enter an example post you like or upload a JSON file"
              value={toneOfVoice}
              onChange={(e) => {
                setToneOfVoice(e.target.value);
                onPresetChange({ profile, contentType, toneOfVoice: e.target.value, competitorPoints });
              }}
            />
            <div className="mt-2 flex items-center">
              <label className="relative inline-flex items-center px-4 py-2 bg-indigo-100 text-indigo-700 rounded-lg hover:bg-indigo-200 cursor-pointer transition-all duration-200 font-medium">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
                Upload Tone JSON
                <input
                  type="file"
                  accept=".json"
                  onChange={(e) => handleFileUpload(e, 'tone')}
                  className="sr-only"
                />
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Competitor Points
            </label>
            <div className="flex items-center">
              <label className="relative inline-flex items-center px-4 py-2 bg-indigo-100 text-indigo-700 rounded-lg hover:bg-indigo-200 cursor-pointer transition-all duration-200 font-medium">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
                Upload Competitor JSON
                <input
                  type="file"
                  accept=".json"
                  onChange={(e) => handleFileUpload(e, 'competitor')}
                  className="sr-only"
                />
              </label>
              {competitorPoints && (
                <span className="ml-3 text-sm text-green-600">File uploaded</span>
              )}
            </div>
          </div>
        </div>
      )}

      {showSaveModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-4">Save Preset</h3>
            <input
              type="text"
              placeholder="Enter preset name"
              value={presetName}
              onChange={(e) => setPresetName(e.target.value)}
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
                onClick={handleSavePreset}
                className="gradient-button"
                disabled={!presetName.trim()}
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

export default PresetSection; 