import React from 'react';
import { Link } from 'react-router-dom';
import { Eye, Download, Star } from 'lucide-react';

const Templates = () => {
  const templates = [
    {
      id: 'minimal',
      name: 'Minimal Clean',
      description: 'Simple and elegant design that lets your content shine',
      image: 'https://images.pexels.com/photos/590016/pexels-photo-590016.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Minimal',
      rating: 4.7,
    },
    {
      id: 'modern',
      name: 'Modern Professional',
      description: 'Clean and contemporary design perfect for tech and creative roles',
      image: 'https://images.pexels.com/photos/590016/pexels-photo-590016.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Professional',
      rating: 4.9,
    },
    {
      id: 'executive',
      name: 'Executive Elite',
      description: 'Sophisticated template for senior positions and executive roles',
      image: 'https://images.pexels.com/photos/590016/pexels-photo-590016.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Executive',
      rating: 4.8,
    },
    {
      id: 'creative',
      name: 'Creative Spark',
      description: 'Bold and artistic design for designers and creative professionals',
      image: 'https://images.pexels.com/photos/590016/pexels-photo-590016.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Creative',
      rating: 4.9,
    },
    {
      id: 'academic',
      name: 'Academic Scholar',
      description: 'Traditional format perfect for academic and research positions',
      image: 'https://images.pexels.com/photos/590016/pexels-photo-590016.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Academic',
      rating: 4.6,
    },
    {
      id: 'startup',
      name: 'Startup Spirit',
      description: 'Dynamic template for startup environments and entrepreneurial roles',
      image: 'https://images.pexels.com/photos/590016/pexels-photo-590016.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Startup',
      rating: 4.8,
    },
  ];

  const categories = ['All', 'Professional', 'Executive', 'Creative', 'Minimal', 'Academic', 'Startup'];
  const [selectedCategory, setSelectedCategory] = React.useState('All');

  const filteredTemplates = selectedCategory === 'All' 
    ? templates 
    : templates.filter(template => template.category === selectedCategory);

  return (
    <div
      className="py-12 pt-32 min-h-screen" 
      style={{
        background: "linear-gradient(152deg, rgba(8,0,0,1) 0%, rgba(106,78,205,1) 67%, rgba(46,43,43,1) 100%)"
      }}
    >
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold text-white">
            Choose Your Perfect Template
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-white text-opacity-70">
            Select from our collection of professionally designed resume templates. 
            Each template is crafted to help you stand out and get noticed by employers.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-4 justify-center mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                  : 'bg-white text-gray-600 hover:text-blue-600 border border-gray-300 hover:border-blue-300'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Templates Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredTemplates.map((template) => {
            const isMinimal = template.id === 'minimal';
            return (
              <div
                key={template.id}
                className="overflow-hidden relative bg-white rounded-xl border border-gray-100 shadow-lg transition-all transform hover:shadow-xl hover:-translate-y-1 group"
              >
                {/* Template Preview */}
                <div className="overflow-hidden relative h-64 bg-gradient-to-br from-gray-50 to-gray-100">
                  <img
                    src={template.image}
                    alt={template.name}
                    className="object-cover w-full h-full opacity-20"
                  />
                  <div className="flex absolute inset-0 justify-center items-center">
                    <div className="text-center">
                      <div className="p-4 rounded-lg shadow-lg backdrop-blur-sm bg-white/90">
                        <h3 className="mb-1 font-semibold text-gray-800">{template.name}</h3>
                        <p className="text-sm text-gray-600">Resume Template</p>
                      </div>
                    </div>
                  </div>

                  {/* Overlay Buttons */}
                  {isMinimal ? (
                    <div className="flex absolute inset-0 justify-center items-center opacity-0 transition-colors bg-black/0 group-hover:bg-black/20 group-hover:opacity-100">
                      <div className="flex space-x-3">
                        <button className="p-2 text-gray-800 rounded-lg transition-colors bg-white/90 hover:bg-white">
                          <Eye className="w-5 h-5" />
                        </button>
                        <Link
                          to={`/builder/${template.id}`}
                          className="p-2 text-white bg-blue-600 rounded-lg transition-colors hover:bg-blue-700"
                        >
                          <Download className="w-5 h-5" />
                        </Link>
                      </div>
                    </div>
                  ) : null}

                  {/* Coming Soon Overlay */}
                  {!isMinimal && (
                    <div className="hidden absolute inset-0 z-10 flex-col justify-center items-center transition-all bg-black/70 group-hover:flex">
                      <span className="text-xl font-bold text-white">Coming Soon</span>
                    </div>
                  )}
                </div>

                {/* Template Info */}
                <div className="p-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-1 rounded-full">
                      {template.category}
                    </span>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-600">{template.rating}</span>
                    </div>
                  </div>

                  <h3 className="mb-2 text-xl font-semibold text-gray-900">
                    {template.name}
                  </h3>

                  <p className="mb-4 text-sm leading-relaxed text-gray-600">
                    {template.description}
                  </p>

                  <div className="flex justify-between items-center">
                    {isMinimal ? (
                      <Link
                        to={`/builder/${template.id}`}
                        className="px-4 py-2 font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg transition-all transform hover:from-blue-700 hover:to-purple-700 hover:scale-105"
                      >
                        Use Template
                      </Link>
                    ) : (
                      <button
                        className="px-4 py-2 font-medium text-white bg-gray-400 rounded-lg opacity-70 cursor-not-allowed"
                        disabled
                      >
                        Coming Soon
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredTemplates.length === 0 && (
          <div className="py-12 text-center">
            <p className="text-lg text-gray-500">
              No templates found for the selected category.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Templates;