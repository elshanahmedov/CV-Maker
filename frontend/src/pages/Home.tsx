import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, Download, Palette, Zap, ArrowRight } from 'lucide-react';

const Home = () => {
  const features = [
    {
      icon: <Palette className="w-6 h-6" />,
      title: 'Professional Templates',
      description: 'Choose from dozens of beautifully designed resume templates crafted by professionals.',
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: 'Easy Customization',
      description: 'Customize colors, fonts, and layouts with our intuitive drag-and-drop editor.',
    },
    {
      icon: <Download className="w-6 h-6" />,
      title: 'Instant Download',
      description: 'Download your resume in high-quality PDF format instantly and for free.',
    },
  ];

  return (
    <div
      className="min-h-screen"
      style={{
        background: "linear-gradient(152deg, rgba(8,0,0,1) 0%, rgba(106,78,205,1) 67%, rgba(46,43,43,1) 100%)"
      }}
    >
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <section className="px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl text-center">
            <div className="mx-auto max-w-3xl">
              <h1 className="mb-6 text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
                Build Your Dream
                <span className="mb-6 text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
                  {' '}  Resume in Minutes
                </span>
              </h1>
              <p className="mb-8 text-lg leading-relaxed text-white text-opacity-50 sm:text-xl">
                Build a professional resume in minutes with our easy-to-use templates. 
                Stand out from the competition with designs that get you noticed.
              </p>
              <div className="flex flex-col gap-4 justify-center sm:flex-row">
                <Link
                  to="/templates"
                  className="flex justify-center items-center px-8 py-4 space-x-2 font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg transition-all transform hover:from-blue-700 hover:to-purple-700 hover:scale-105"
                >
                  <FileText className="w-5 h-5" />
                  <span>Explore</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl">
              Why Choose Cwix?
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-white text-opacity-50">
              We've made resume building simple, fast, and professional. Here's what makes us different.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {features.map((feature, index) => (
              <div
                key={index}
                className="p-8 bg-white rounded-xl border border-gray-100 shadow-lg transition-shadow hover:shadow-xl group"
              >
                <div className="flex justify-center items-center mb-6 w-12 h-12 text-blue-600 bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg transition-transform group-hover:scale-110">
                  {feature.icon}
                </div>
                <h3 className="mb-3 text-xl font-semibold text-gray-900">
                  {feature.title}
                </h3>
                <p className="leading-relaxed text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;