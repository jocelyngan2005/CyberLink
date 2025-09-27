import React, { useState } from 'react';
import { Sparkles, Edit, Download, Send, Share2, CheckCircle } from 'lucide-react';

const PosterGeneration = ({ event }) => {
  const [generatedPoster, setGeneratedPoster] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [posterPrompt, setPosterPrompt] = useState('');
  const [isPosterPosted, setIsPosterPosted] = useState(false);

  if (!event) return null;

  const generatePoster = async () => {
    setIsGenerating(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setGeneratedPoster({
      id: Date.now(),
      title: event.title,
      prompt: posterPrompt || `Professional event poster for ${event.title}`,
      imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=800&fit=crop',
      generatedAt: new Date().toISOString(),
      style: 'Modern Tech',
    });
    setIsGenerating(false);
  };

  const postPoster = () => {
    setIsPosterPosted(true);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden mt-8">
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-6">
        <h2 className="text-2xl font-bold text-white flex items-center">
          <Sparkles className="w-6 h-6 mr-3" />
          AI Poster Generation
        </h2>
        <p className="text-purple-100 mt-2">Create stunning marketing materials for your event</p>
      </div>
      <div className="p-6">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Generation Controls */}
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-3">
                Customize Your Poster
              </label>
              <textarea
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 resize-none"
                rows={4}
                placeholder={`Describe the style and elements for your ${event.title} poster...`}
                value={posterPrompt}
                onChange={e => setPosterPrompt(e.target.value)}
              />
            </div>
            <button
              onClick={generatePoster}
              disabled={isGenerating}
              className="w-full flex items-center justify-center px-6 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              {isGenerating ? (
                <>
                  <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-3"></div>
                  Generating Magic...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 mr-3" />
                  Generate AI Poster
                </>
              )}
            </button>
          </div>
          {/* Generated Poster Preview */}
          <div>
            {generatedPoster ? (
              <div className="bg-gray-50 rounded-xl p-6 border-2 border-dashed border-gray-200">
                <img
                  src={generatedPoster.imageUrl}
                  alt="Generated Poster"
                  className="w-full h-80 object-cover rounded-lg mb-4 shadow-lg"
                />
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-gray-900 text-lg">{generatedPoster.title}</h4>
                    <p className="text-sm text-gray-600">Style: {generatedPoster.style}</p>
                  </div>
                  <div className="flex space-x-2">
                    <button className="p-3 text-gray-600 hover:bg-white hover:shadow-md rounded-lg transition-all">
                      <Edit className="w-4 h-4" />
                    </button>
                    <a
                      href={generatedPoster.imageUrl}
                      download={generatedPoster.title.replace(/\s+/g, '_') + '.jpg'}
                      className="p-3 text-gray-600 hover:bg-white hover:shadow-md rounded-lg transition-all"
                      title="Download Poster"
                    >
                      <Download className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-gray-50 rounded-xl p-12 text-center border-2 border-dashed border-gray-300">
                <Sparkles className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">Your AI-generated poster will appear here</p>
              </div>
            )}
          </div>
        </div>
        {/* Poster Review & Posting */}
        {generatedPoster && (
          <div className="mt-8 pt-8 border-t border-gray-200">
            {!isPosterPosted ? (
              <div className="flex items-center justify-center space-x-4">
                <button
                  onClick={postPoster}
                  className="flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <Send className="w-5 h-5 mr-3" />
                  Publish Poster
                </button>
                <button className="flex items-center px-6 py-4 border-2 border-gray-200 rounded-xl hover:bg-gray-50 transition-all">
                  <Share2 className="w-5 h-5 mr-3" />
                  Share Preview
                </button>
              </div>
            ) : (
              <div className="bg-gradient-to-r from-emerald-50 to-green-50 border-2 border-emerald-200 rounded-xl p-6">
                <div className="flex items-center justify-center">
                  <CheckCircle className="w-8 h-8 text-emerald-500 mr-4" />
                  <div className="text-center">
                    <h4 className="font-bold text-emerald-800 text-lg">Poster Successfully Published!</h4>
                    <p className="text-emerald-700">Your event poster is now published and ready to share.</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PosterGeneration;
