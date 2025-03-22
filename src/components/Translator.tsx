import React, { useState, useEffect } from "react";

const Translator: React.FC = () => {
  const [preferredLanguage, setPreferredLanguage] = useState<string>("en");

  const languages: { [key: string]: string } = {
    en: "English",
    es: "Spanish",
    fr: "French",
    de: "German",
    it: "Italian",
    zh: "Chinese (Simplified)",
    ja: "Japanese",
  };

  useEffect(() => {
    chrome.storage.sync.get(["preferredLanguage"], (result) => {
      if (result.preferredLanguage) {
        setPreferredLanguage(result.preferredLanguage);
      }
    });
  }, []);

  const handleLanguageChange = (lang: string) => {
    setPreferredLanguage(lang);
    chrome.storage.sync.set({ preferredLanguage: lang });
  };

  return (
    <div className="flex flex-col w-80 p-4 bg-gray-900 text-gray-100 font-sans">
      <h1 className="text-xl font-semibold mb-4 text-white">Quick Translator</h1>
      <section>
        <h2 className="text-lg font-medium text-gray-200 mb-2">Preferred Language</h2>
        <select
          value={preferredLanguage}
          onChange={(e) => handleLanguageChange(e.target.value)}
          className="w-full p-2 bg-gray-800 border border-gray-700 rounded-lg text-sm text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          {Object.entries(languages).map(([code, name]) => (
            <option key={code} value={code}>
              {name}
            </option>
          ))}
        </select>
        <p className="text-sm text-gray-400 mt-2">
          Double-click text on any webpage to see the translation here.
        </p>
      </section>
    </div>
  );
};

export default Translator;