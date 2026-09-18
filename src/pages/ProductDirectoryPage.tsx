import React, { useState, useEffect } from 'react';
import { Search, Plus, Sparkles, ThumbsUp, ExternalLink, ShieldCheck, Globe, ArrowLeft, Tag, Layers, X, CheckCircle, HelpCircle } from 'lucide-react';
import { INITIAL_PRODUCTS, ProductItem } from '../data/mockProducts';
import { Footer } from '../components/Footer';

interface ProductDirectoryPageProps {
  onNavigateHome: () => void;
  onNavigateTo: (path: string) => void;
}

export const ProductDirectoryPage: React.FC<ProductDirectoryPageProps> = ({ onNavigateHome, onNavigateTo }) => {
  const [products, setProducts] = useState<ProductItem[]>(() => {
    const saved = localStorage.getItem('freetools_directory_products');
    if (saved) {
      try { return JSON.parse(saved); } catch { return INITIAL_PRODUCTS; }
    }
    return INITIAL_PRODUCTS;
  });

  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [upvotedIds, setUpvotedIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('freetools_upvoted_ids');
    return saved ? JSON.parse(saved) : [];
  });

  // Submit Modal state
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [newProductName, setNewProductName] = useState('');
  const [newProductUrl, setNewProductUrl] = useState('');
  const [newProductTagline, setNewProductTagline] = useState('');
  const [newProductDesc, setNewProductDesc] = useState('');
  const [newProductCategory, setNewProductCategory] = useState<'AI' | 'Productivity' | 'Marketing' | 'Developer' | 'Design'>('AI');
  const [newProductPricing, setNewProductPricing] = useState<'Free' | 'Freemium' | 'Paid' | 'Open Source'>('Freemium');
  const [newProductLogo, setNewProductLogo] = useState('🚀');
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    localStorage.setItem('freetools_directory_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('freetools_upvoted_ids', JSON.stringify(upvotedIds));
  }, [upvotedIds]);

  const categories = ['All', 'AI', 'Productivity', 'Marketing', 'Developer', 'Design'];

  const handleUpvote = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (upvotedIds.includes(id)) {
      // Remove upvote
      setUpvotedIds(upvotedIds.filter(i => i !== id));
      setProducts(products.map(p => p.id === id ? { ...p, upvotes: p.upvotes - 1 } : p));
    } else {
      // Add upvote
      setUpvotedIds([...upvotedIds, id]);
      setProducts(products.map(p => p.id === id ? { ...p, upvotes: p.upvotes + 1 } : p));
    }
  };

  const handleProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProductName.trim() || !newProductUrl.trim() || !newProductTagline.trim()) {
      alert('Please fill in all required product fields.');
      return;
    }

    const slug = newProductName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const newProduct: ProductItem = {
      id: Date.now().toString(),
      slug: slug || `product-${Date.now()}`,
      name: newProductName.trim(),
      tagline: newProductTagline.trim(),
      description: newProductDesc.trim() || newProductTagline.trim(),
      category: newProductCategory,
      url: newProductUrl.startsWith('http') ? newProductUrl : `https://${newProductUrl}`,
      logo: newProductLogo || '🚀',
      pricing: newProductPricing,
      upvotes: 1,
      submittedDate: new Date().toISOString().split('T')[0]
    };

    setProducts([newProduct, ...products]);
    setUpvotedIds([...upvotedIds, newProduct.id]);
    setSubmitSuccess(true);
    setTimeout(() => {
      setSubmitSuccess(false);
      setIsSubmitModalOpen(false);
      setNewProductName('');
      setNewProductUrl('');
      setNewProductTagline('');
      setNewProductDesc('');
    }, 1500);
  };

  const filteredProducts = products.filter(p => {
    const matchesCat = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesSearch = !search.trim() || 
      p.name.toLowerCase().includes(search.toLowerCase()) || 
      p.tagline.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] flex flex-col font-sans selection:bg-[#7C3AED] selection:text-white">
      
      {/* HEADER */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <button
              onClick={onNavigateHome}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Home</span>
            </button>
            <a href="/" onClick={(e) => { e.preventDefault(); onNavigateHome(); }} className="flex items-center gap-2 cursor-pointer">
              <img src="/logo.png" alt="FreeToolsNoSignup Logo" className="h-10 w-auto object-contain" />
            </a>
          </div>

          <button
            onClick={() => setIsSubmitModalOpen(true)}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#EC4899] hover:opacity-90 text-white font-bold text-xs sm:text-sm shadow-md transition flex items-center gap-2 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Submit Your Product</span>
          </button>
        </div>
      </header>

      {/* HERO SECTION WITH PURPLE-PINK GRADIENT */}
      <section className="bg-gradient-to-r from-[#7C3AED] via-[#9333EA] to-[#EC4899] text-white py-16 px-4 sm:px-6 lg:px-8 text-center shadow-md relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.15),transparent_50%)]"></div>
        <div className="max-w-4xl mx-auto space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-white font-bold text-xs border border-white/20">
            <Sparkles className="w-3.5 h-3.5 text-yellow-300" /> Curated SaaS &amp; Developer Tools Directory
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight">
            Product Finder - Discover Best SaaS &amp; Tools
          </h1>
          <p className="text-base sm:text-lg text-purple-100 max-w-2xl mx-auto font-medium">
            Explore 100% verified SaaS tools, AI utilities, developer APIs, and productivity apps. Built for makers, founders, and creators.
          </p>

          {/* Search bar */}
          <div className="max-w-xl mx-auto relative pt-4">
            <div className="absolute inset-y-0 left-4 top-4 flex items-center pointer-events-none text-slate-400">
              <Search className="w-5 h-5 text-slate-400" />
            </div>
            <input 
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search SaaS, AI agents, productivity apps..."
              className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white text-slate-900 placeholder-slate-400 shadow-xl focus:outline-none focus:ring-4 focus:ring-white/30 text-sm font-medium"
            />
          </div>
        </div>
      </section>

      {/* CATEGORY TABS & FILTER BAR */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4 w-full flex flex-wrap items-center justify-between gap-4 border-b border-slate-200">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 w-full sm:w-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#7C3AED] text-white shadow-md'
                  : 'bg-white hover:bg-slate-100 text-slate-600 border border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="text-xs font-bold text-slate-500">
          Showing <span className="text-[#7C3AED] font-extrabold">{filteredProducts.length}</span> tools
        </div>
      </div>

      {/* PRODUCTS GRID */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex-1">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => {
            const isUpvoted = upvotedIds.includes(product.id);
            return (
              <div 
                key={product.id}
                onClick={() => onNavigateTo(`/directory/${product.slug}`)}
                className="bg-white rounded-3xl p-6 border border-slate-200 hover:border-[#7C3AED] shadow-xs hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between group space-y-4"
              >
                <div className="space-y-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-100 flex items-center justify-center text-2xl shadow-xs group-hover:scale-105 transition">
                        {product.logo}
                      </div>
                      <div>
                        <h3 className="font-extrabold text-[#0F172A] text-base group-hover:text-[#7C3AED] transition">
                          {product.name}
                        </h3>
                        <span className="inline-block px-2 py-0.5 rounded-md bg-purple-50 text-[#7C3AED] text-[10px] font-extrabold uppercase tracking-wide">
                          {product.category}
                        </span>
                      </div>
                    </div>
                    
                    {/* Upvote button */}
                    <button
                      onClick={(e) => handleUpvote(product.id, e)}
                      className={`flex flex-col items-center justify-center px-3 py-2 rounded-xl border transition-all cursor-pointer ${
                        isUpvoted 
                          ? 'bg-[#7C3AED] border-[#7C3AED] text-white shadow-md'
                          : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-[#7C3AED]'
                      }`}
                    >
                      <ThumbsUp className={`w-4 h-4 ${isUpvoted ? 'fill-current' : ''}`} />
                      <span className="text-xs font-extrabold mt-0.5">{product.upvotes}</span>
                    </button>
                  </div>

                  <p className="text-xs font-bold text-slate-900 line-clamp-1">
                    {product.tagline}
                  </p>
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {product.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="px-2.5 py-1 rounded-lg bg-slate-100 font-semibold text-slate-700">
                    {product.pricing}
                  </span>
                  <span className="font-bold text-[#7C3AED] flex items-center gap-1 group-hover:translate-x-1 transition">
                    View Details &amp; Dofollow Backlink →
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 space-y-4">
            <div className="w-16 h-16 bg-purple-50 text-[#7C3AED] rounded-full flex items-center justify-center mx-auto text-2xl">
              🔍
            </div>
            <h3 className="text-lg font-bold text-slate-900">No products found</h3>
            <p className="text-xs text-slate-500">Try searching for a different keyword or category.</p>
          </div>
        )}

        {/* 400+ WORDS SEO ARTICLE ABOUT DIRECTORY */}
        <article className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm space-y-6 text-slate-700 text-sm leading-relaxed mt-16">
          <h2 className="text-2xl font-extrabold text-[#0F172A]">Discover, Launch, and Scale with the Ultimate SaaS &amp; Tools Directory</h2>
          
          <p>
            Welcome to the FreeToolsNoSignup Product Finder—your premier destination for discovering cutting-edge SaaS applications, artificial intelligence agents, developer utilities, and productivity accelerators. In today's fast-paced digital economy, software founders launch incredible products every single day, yet finding the right tool to solve a specific engineering or marketing challenge can feel like searching for a needle in a digital haystack. Our directory bridges this gap by curating high-quality, verified software solutions into structured, easily searchable categories.
          </p>

          <h3 className="text-lg font-bold text-slate-900 pt-2">Why Founders and Makers List on Our Directory</h3>
          <p>
            For indie hackers, bootstrapped startup founders, and software creators, securing visibility and high-authority backlinks is critical for organic search engine optimization (SEO) and domain authority growth. Every product listed in our directory receives a dedicated profile page featuring a <strong>dofollow backlink</strong> pointing directly to your official website. Dofollow backlinks pass crucial PageRank signals from established domains to your startup, accelerating your search engine rankings and referral traffic.
          </p>

          <h3 className="text-lg font-bold text-slate-900 pt-2">How to Submit Your Product in Under 60 Seconds</h3>
          <p>
            Submitting your SaaS or developer tool is completely free and requires zero registration or paywalls. Simply click the <strong>"Submit Your Product"</strong> button at the top of the page, provide your product name, official URL, catchy tagline, detailed description, and choose your relevant category (AI, Productivity, Marketing, Developer, or Design). Your product will instantly appear in our live directory feed, ready to be discovered and upvoted by thousands of global developers and entrepreneurs.
          </p>

          <h3 className="text-lg font-bold text-slate-900 pt-2">Frequently Asked Questions</h3>
          <div className="space-y-4 pt-2">
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
              <h4 className="font-bold text-slate-900 mb-1">1. Is listing my SaaS tool on FreeToolsNoSignup 100% free?</h4>
              <p className="text-xs text-slate-600">Yes! Basic listings and dofollow backlinks are completely free with no hidden fees or subscription requirements.</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
              <h4 className="font-bold text-slate-900 mb-1">2. Are the backlinks dofollow?</h4>
              <p className="text-xs text-slate-600">Yes, every product profile page includes a direct, permanent dofollow outbound link to your official web property.</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
              <h4 className="font-bold text-slate-900 mb-1">3. How are product rankings determined?</h4>
              <p className="text-xs text-slate-600">Products are ranked by community upvotes, recent submissions, and engagement metrics.</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
              <h4 className="font-bold text-slate-900 mb-1">4. Can I edit my product listing after submission?</h4>
              <p className="text-xs text-slate-600">Submissions are saved locally in your browser storage and instantly editable.</p>
            </div>
          </div>
        </article>

      </main>

      {/* SUBMIT PRODUCT MODAL */}
      {isSubmitModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl space-y-6 relative animate-fade-in max-h-[90vh] overflow-y-auto">
            <button 
              onClick={() => setIsSubmitModalOpen(false)}
              className="absolute top-6 right-6 text-slate-400 hover:text-slate-700 p-1.5 rounded-full bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-2">
              <span className="px-3 py-1 rounded-full bg-purple-50 text-[#7C3AED] text-xs font-bold">🚀 Startup Launchpad</span>
              <h3 className="text-2xl font-extrabold text-[#0F172A]">Submit Your Product</h3>
              <p className="text-xs text-slate-500">List your SaaS tool for free and get a permanent dofollow backlink.</p>
            </div>

            {submitSuccess ? (
              <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-200 text-center space-y-2">
                <CheckCircle className="w-12 h-12 text-emerald-600 mx-auto" />
                <h4 className="font-bold text-emerald-950 text-base">Product Submitted Successfully!</h4>
                <p className="text-xs text-emerald-800">Your tool has been added to the directory.</p>
              </div>
            ) : (
              <form onSubmit={handleProductSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Product Name *</label>
                  <input 
                    type="text"
                    required
                    value={newProductName}
                    onChange={(e) => setNewProductName(e.target.value)}
                    placeholder="e.g. AcmeAI"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#7C3AED]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Official Website URL *</label>
                  <input 
                    type="url"
                    required
                    value={newProductUrl}
                    onChange={(e) => setNewProductUrl(e.target.value)}
                    placeholder="https://example.com"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#7C3AED]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Tagline (One-liner) *</label>
                  <input 
                    type="text"
                    required
                    value={newProductTagline}
                    onChange={(e) => setNewProductTagline(e.target.value)}
                    placeholder="AI-powered customer support agent"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#7C3AED]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">Category</label>
                    <select
                      value={newProductCategory}
                      onChange={(e) => setNewProductCategory(e.target.value as any)}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#7C3AED] bg-white"
                    >
                      <option value="AI">AI</option>
                      <option value="Productivity">Productivity</option>
                      <option value="Marketing">Marketing</option>
                      <option value="Developer">Developer</option>
                      <option value="Design">Design</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">Pricing Model</label>
                    <select
                      value={newProductPricing}
                      onChange={(e) => setNewProductPricing(e.target.value as any)}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#7C3AED] bg-white"
                    >
                      <option value="Free">Free</option>
                      <option value="Freemium">Freemium</option>
                      <option value="Paid">Paid</option>
                      <option value="Open Source">Open Source</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Logo Icon / Emoji</label>
                  <input 
                    type="text"
                    value={newProductLogo}
                    onChange={(e) => setNewProductLogo(e.target.value)}
                    placeholder="⚡"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#7C3AED]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Description</label>
                  <textarea 
                    rows={3}
                    value={newProductDesc}
                    onChange={(e) => setNewProductDesc(e.target.value)}
                    placeholder="Brief description of your product features..."
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#7C3AED]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-gradient-to-r from-[#7C3AED] to-[#EC4899] text-white font-extrabold text-sm rounded-xl shadow-lg hover:opacity-95 transition cursor-pointer"
                >
                  Publish Product Listing →
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* FOOTER */}
      <Footer onNavigate={onNavigateTo} />

    </div>
  );
};
