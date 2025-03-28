## SpecStory

## Adding a Preset Section to Input (3/27/2025, 4:11:18 PM)

_**User**_

Above the Input section I want to show a section called preset that contains the following fields:
-Content type: Informative/Thought Leadership/Funny/
-Tone-of-voice: Text field to insert an example post you like OR an upload for a JSON file with extra context
-Competitor poiners: upload field to add a JSON
The 'Preset' section should be an interface (I think) that is given as extra context to the API alongside the input with this text 'Use this as extra context:. 

Start by building the UI, don't do any backend work yet

---

_**Assistant**_

I'll help you create a new PresetSection component and integrate it into the App. First, let's create the component with the specified fields.

Let me first create the new PresetSection component:


---

_**Assistant**_

```
import React, { useState } from 'react';

const PresetSection = ({ onPresetChange }) => {
  const [contentType, setContentType] = useState('Informative');
  const [toneOfVoice, setToneOfVoice] = useState('');
  const [competitorPoints, setCompetitorPoints] = useState(null);

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

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-xl font-semibold mb-4">Preset</h2>
      
      <div className="space-y-4">
        {/* Content Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Content Type
          </label>
          <select
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            value={contentType}
            onChange={(e) => setContentType(e.target.value)}
          >
            <option value="Informative">Informative</option>
            <option value="Thought Leadership">Thought Leadership</option>
            <option value="Funny">Funny</option>
          </select>
        </div>

        {/* Tone of Voice */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tone of Voice
          </label>
          <textarea
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            rows="3"
            placeholder="Enter an example post you like or upload a JSON file"
            value={toneOfVoice}
            onChange={(e) => setToneOfVoice(e.target.value)}
          />
          <input
            type="file"
            accept=".json"
            onChange={(e) => handleFileUpload(e, 'tone')}
            className="mt-2 text-sm text-gray-600"
          />
        </div>

        {/* Competitor Points */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Competitor Points
          </label>
          <input
            type="file"
            accept=".json"
            onChange={(e) => handleFileUpload(e, 'competitor')}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>
    </div>
  );
};

export default PresetSection;
```

---

_**Assistant**_

Now, let's modify the App.jsx to include the new PresetSection component:


---

_**Assistant**_

```
undefined
```

---

_**Assistant**_



---



---

