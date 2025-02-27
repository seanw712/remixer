import React from 'react';
import PropTypes from 'prop-types';

/**
 * Output section component for displaying remixed content
 */
const OutputSection = ({ outputText, isLoading }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Output</h2>
      {isLoading ? (
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <div className="w-full min-h-40 p-3 border border-gray-300 rounded-md bg-gray-50">
          {outputText ? (
            <div className="whitespace-pre-wrap">{outputText}</div>
          ) : (
            <div className="text-gray-500">Remixed content will appear here</div>
          )}
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