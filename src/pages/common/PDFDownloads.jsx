
import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";
// import RoundButton from "../components/RoundButton";

const PDFDownloads = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  // Sample PDF data - replace with actual PDF links
  const pdfDocuments = [
    {
      id: 1,
      title: "Company Overview",
      description: "A detailed overview of our company's mission and values",
      category: "company",
      languages: [
        { code: "en", name: "English", url: "/pdfs/company-overview-en.pdf" },
        { code: "es", name: "Spanish", url: "/pdfs/company-overview-es.pdf" },
        { code: "hi", name: "Hindi", url: "/pdfs/company-overview-hi.pdf" },
        { code: "ar", name: "Arabic", url: "/pdfs/company-overview-ar.pdf" }
      ]
    },
    {
      id: 2,
      title: "Service Brochure",
      description: "Explore our comprehensive services and solutions",
      category: "services",
      languages: [
        { code: "en", name: "English", url: "/pdfs/services-en.pdf" },
        { code: "es", name: "Spanish", url: "/pdfs/services-es.pdf" },
        { code: "hi", name: "Hindi", url: "/pdfs/services-hi.pdf" },
        { code: "zh", name: "Chinese", url: "/pdfs/services-zh.pdf" }
      ]
    },
    {
      id: 3,
      title: "Investment Guide",
      description: "Detailed guide on investment strategies and opportunities",
      category: "investment",
      languages: [
        { code: "en", name: "English", url: "/pdfs/investment-guide-en.pdf" },
        { code: "fr", name: "French", url: "/pdfs/investment-guide-fr.pdf" },
        { code: "de", name: "German", url: "/pdfs/investment-guide-de.pdf" },
        { code: "ja", name: "Japanese", url: "/pdfs/investment-guide-ja.pdf" }
      ]
    },
    // {
    //   id: 4,
    //   title: "Legal Documents",
    //   description: "Important legal documents and terms of service",
    //   category: "legal",
    //   languages: [
    //     { code: "en", name: "English", url: "/pdfs/legal-en.pdf" },
    //     { code: "es", name: "Spanish", url: "/pdfs/legal-es.pdf" },
    //     { code: "ar", name: "Arabic", url: "/pdfs/legal-ar.pdf" },
    //     { code: "ru", name: "Russian", url: "/pdfs/legal-ru.pdf" }
    //   ]
    // },
    {
      id: 5,
      title: "Annual Report 2024",
      description: "Financial performance and strategic initiatives from 2024",
      category: "reports",
      languages: [
        { code: "en", name: "English", url: "/pdfs/annual-report-2024-en.pdf" },
        { code: "es", name: "Spanish", url: "/pdfs/annual-report-2024-es.pdf" },
        { code: "zh", name: "Chinese", url: "/pdfs/annual-report-2024-zh.pdf" },
        { code: "pt", name: "Portuguese", url: "/pdfs/annual-report-2024-pt.pdf" }
      ]
    }
  ];

  const categories = [
    { id: "all", name: "All Documents" },
    { id: "company", name: "Company Information" },
    { id: "services", name: "Services" },
    { id: "investment", name: "Investment" },
    // { id: "legal", name: "Legal" },
    { id: "reports", name: "Reports" }
  ];

  // Filter documents based on active category and search term
  const filteredDocuments = pdfDocuments.filter(doc => {
    const matchesCategory = activeCategory === "all" || doc.category === activeCategory;
    const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Document Downloads</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Access and download our documents in multiple languages. Select your preferred document and language below.
        </p>
      </div>

      <div className="mb-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
          {/* Search input */}
          <div className="w-full md:w-1/3">
            <input
              type="text"
              placeholder="Search documents..."
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Category filter */}
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map(category => (
              <button
                key={category.id}
                className={`px-4 py-2 rounded-md ${
                  activeCategory === category.id
                    ? "bg-green-500 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
                onClick={() => setActiveCategory(category.id)}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Documents list */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDocuments.length > 0 ? (
          filteredDocuments.map(doc => (
            <div key={doc.id} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{doc.title}</h3>
                <p className="text-gray-600 mb-4">{doc.description}</p>
                
                <div className="mt-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Available Languages:</h4>
                  <div className="flex flex-wrap gap-2">
                    {doc.languages.map(lang => (
                      <a
                        key={lang.code}
                        href={lang.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm hover:bg-green-200 transition-colors"
                        download
                      >
                        {lang.name}
                        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
                        </svg>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-gray-500 text-lg">No documents found matching your criteria.</p>
            <button 
              className="mt-4 text-green-500 hover:text-green-700"
              onClick={() => {
                setActiveCategory("all");
                setSearchTerm("");
              }}
            >
              Clear filters
            </button>
          </div>
        )}
      </div>

      {/* Request custom document section */}
      <div className="mt-16 bg-gray-50 rounded-lg p-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Need a Document in Another Language?</h2>
          <p className="text-gray-600 mt-2">
            If you need any of our documents in a language not listed above, please let us know.
          </p>
        </div>
        
        <form className="max-w-2xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Your name"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="your.email@example.com"
              />
            </div>
          </div>
          
          <div className="mb-4">
            <label htmlFor="document" className="block text-sm font-medium text-gray-700 mb-1">
              Document Needed
            </label>
            <select
              id="document"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="">Select a document</option>
              {pdfDocuments.map(doc => (
                <option key={doc.id} value={doc.id}>{doc.title}</option>
              ))}
            </select>
          </div>
          
          <div className="mb-4">
            <label htmlFor="language" className="block text-sm font-medium text-gray-700 mb-1">
              Requested Language
            </label>
            <input
              type="text"
              id="language"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Specify the language"
            />
          </div>
          
          <div className="mb-6">
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
              Additional Information
            </label>
            <textarea
              id="message"
              rows="4"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Any additional details or requirements"
            ></textarea>
          </div>
          
          <div className="text-center">
            <button text="Submit Request" className="w-full md:w-auto" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default PDFDownloads;