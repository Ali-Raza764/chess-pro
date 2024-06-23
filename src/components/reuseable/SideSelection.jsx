import React from 'react';

const SideSelectionDialog = ({ setSide }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
      <div className="bg-white rounded-lg p-6 shadow-lg w-80">
        <h2 className="text-lg font-semibold mb-4">Choose Your Side</h2>
        <div className="flex justify-around">
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
            onClick={() => setSide('white')}
          >
            White
          </button>
          <button
            className="bg-black text-white py-2 px-4 rounded hover:bg-gray-800"
            onClick={() => setSide('black')}
          >
            Black
          </button>
        </div>
      </div>
    </div>
  );
};

export default SideSelectionDialog;
