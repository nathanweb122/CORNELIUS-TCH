import React, { useState } from 'react';
import { ShoppingBag, ShoppingCart, Star, Search, Filter, Check, ShieldCheck, ArrowRight, Truck, CreditCard, Sparkles, X } from 'lucide-react';

export const OnlineShopDemo: React.FC<{ onBuyNow?: () => void }> = ({ onBuyNow }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [cart, setCart] = useState<{ id: string; name: string; price: number; qty: number; image: string }[]>([
    { id: '1', name: 'AeroPulse Wireless Earbuds', price: 129, qty: 1, image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&q=80&w=600' }
  ]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  const products = [
    {
      id: '1',
      name: 'AeroPulse Wireless Earbuds',
      category: 'Electronics',
      price: 129,
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&q=80&w=600',
      description: 'Active noise cancellation with 36-hour battery life and spatial audio.'
    },
    {
      id: '2',
      name: 'Kigali Minimalist Chronograph',
      category: 'Accessories',
      price: 249,
      rating: 5.0,
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=600',
      description: 'Sapphire glass timepiece with handcrafted genuine leather strap.'
    },
    {
      id: '3',
      name: 'Ultra-Lightweight Ergonomic Backpack',
      category: 'Gear',
      price: 89,
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=600',
      description: 'Water-resistant cordura fabric with built-in solar charging USB port.'
    },
    {
      id: '4',
      name: 'Smart Ambient Desk Lamp',
      category: 'Electronics',
      price: 79,
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&q=80&w=600',
      description: 'Adaptive color temperature with touch-sensitive dimming and app controls.'
    }
  ];

  const filteredProducts = selectedCategory === 'All' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  const addToCart = (product: typeof products[0]) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, qty: item.qty + 1 } : item);
      }
      return [...prev, { id: product.id, name: product.name, price: product.price, qty: 1, image: product.image }];
    });
    setIsCartOpen(true);
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans pb-20">
      {/* Demo Top Banner */}
      <div className="bg-gradient-to-r from-neon-blue/20 via-neon-purple/20 to-neon-blue/20 border-b border-neon-blue/30 py-2 px-4 text-center text-xs font-mono flex items-center justify-center space-x-2">
        <Sparkles size={14} className="text-neon-blue animate-pulse" />
        <span className="text-gray-300">LIVE DEMO LANDING PAGE: </span>
        <span className="text-neon-blue font-bold">Online Shop E-Commerce Platform</span>
      </div>

      {/* Header / Navbar */}
      <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-slate-950 font-bold shadow-lg shadow-cyan-500/20">
              <ShoppingBag size={20} />
            </div>
            <div>
              <span className="font-bold text-lg tracking-tight text-white block">AURA <span className="text-cyan-400">STORE</span></span>
              <span className="text-[10px] text-slate-400 uppercase tracking-widest block font-mono">Modern E-Commerce Solution</span>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative p-3 bg-slate-800 hover:bg-slate-700 text-white rounded-xl border border-slate-700 transition-all flex items-center space-x-2"
            >
              <ShoppingCart size={18} />
              <span className="text-xs font-semibold">Cart</span>
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 w-5 h-5 bg-cyan-400 text-slate-950 rounded-full text-[10px] font-bold flex items-center justify-center shadow-lg">
                  {cart.reduce((sum, i) => sum + i.qty, 0)}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Hero Showcase Section */}
      <section className="relative overflow-hidden py-16 px-6 border-b border-slate-800 bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded-full mb-6">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-xs uppercase tracking-widest font-mono text-cyan-400 font-semibold">E-Commerce Ready Template</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight mb-6 leading-tight">
              Sell Products Globally with <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Zero Friction</span>
            </h1>
            <p className="text-slate-400 text-base md:text-lg mb-8 leading-relaxed">
              Complete, production-ready online shop architecture equipped with real-time shopping cart, responsive product catalog, instant checkout simulator, and mobile payment gateways.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <button 
                onClick={onBuyNow}
                className="px-8 py-4 bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold rounded-xl text-sm uppercase tracking-wider transition-all shadow-lg shadow-cyan-500/25 flex items-center space-x-2"
              >
                <span>Acquire Full Website ($100)</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-3xl blur-2xl opacity-20" />
            <div className="relative rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&q=80&w=1000" 
                alt="Store Showcase" 
                className="rounded-xl w-full h-72 object-cover mb-6"
              />
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="p-3 bg-slate-800/60 rounded-xl border border-slate-700/50">
                  <Truck size={20} className="mx-auto text-cyan-400 mb-1" />
                  <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold block">Fast Shipping</span>
                </div>
                <div className="p-3 bg-slate-800/60 rounded-xl border border-slate-700/50">
                  <CreditCard size={20} className="mx-auto text-cyan-400 mb-1" />
                  <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold block">Safe Checkout</span>
                </div>
                <div className="p-3 bg-slate-800/60 rounded-xl border border-slate-700/50">
                  <ShieldCheck size={20} className="mx-auto text-cyan-400 mb-1" />
                  <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold block">256-bit Encrypted</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Catalog Demo Interactive Section */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">Interactive Product Catalog</h2>
            <p className="text-slate-400 text-sm mt-1">Try clicking 'Add to Cart' to test the store interactive state.</p>
          </div>

          <div className="flex items-center space-x-2 overflow-x-auto pb-2">
            {['All', 'Electronics', 'Accessories', 'Gear'].map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                  selectedCategory === cat 
                    ? 'bg-cyan-400 text-slate-950 font-bold shadow-md shadow-cyan-400/20' 
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map(p => (
            <div key={p.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col justify-between hover:border-slate-700 transition-all group">
              <div>
                <div className="relative h-48 rounded-xl overflow-hidden mb-4 bg-slate-800">
                  <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-2 right-2 bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded-lg border border-slate-700 flex items-center space-x-1">
                    <Star size={12} className="text-amber-400 fill-amber-400" />
                    <span className="text-xs font-bold text-white">{p.rating}</span>
                  </div>
                </div>
                <span className="text-[10px] text-cyan-400 font-mono uppercase tracking-widest block mb-1">{p.category}</span>
                <h3 className="font-bold text-white text-base mb-2 group-hover:text-cyan-300 transition-colors">{p.name}</h3>
                <p className="text-slate-400 text-xs leading-relaxed mb-4 line-clamp-2">{p.description}</p>
              </div>

              <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                <span className="text-lg font-extrabold text-white">${p.price}</span>
                <button 
                  onClick={() => addToCart(p)}
                  className="px-4 py-2 bg-slate-800 hover:bg-cyan-400 hover:text-slate-950 text-cyan-400 font-semibold text-xs rounded-xl transition-all flex items-center space-x-1"
                >
                  <ShoppingCart size={14} />
                  <span>Add to Cart</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Cart Drawer Modal */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md bg-slate-900 h-full border-l border-slate-800 p-6 flex flex-col justify-between overflow-y-auto">
            <div>
              <div className="flex justify-between items-center pb-4 border-b border-slate-800 mb-6">
                <div className="flex items-center space-x-2">
                  <ShoppingCart size={20} className="text-cyan-400" />
                  <h3 className="font-bold text-white text-lg">Your Shopping Cart</h3>
                </div>
                <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-slate-800 text-slate-400 hover:text-white rounded-lg">
                  <X size={18} />
                </button>
              </div>

              {orderComplete ? (
                <div className="p-8 text-center bg-cyan-500/10 border border-cyan-500/20 rounded-2xl my-8">
                  <Check size={40} className="mx-auto text-cyan-400 mb-4" />
                  <h4 className="font-bold text-white text-lg mb-2">Simulated Order Confirmed!</h4>
                  <p className="text-xs text-slate-300 leading-relaxed mb-4">This demonstrates the instant checkout feedback of your future e-commerce website.</p>
                  <button onClick={() => { setOrderComplete(false); setCart([]); setIsCartOpen(false); }} className="px-6 py-2 bg-cyan-400 text-slate-950 font-bold rounded-xl text-xs">Reset Demo</button>
                </div>
              ) : cart.length > 0 ? (
                <div className="space-y-4">
                  {cart.map(item => (
                    <div key={item.id} className="flex items-center justify-between p-3 bg-slate-800/60 rounded-xl border border-slate-700/50">
                      <div className="flex items-center space-x-3">
                        <img src={item.image} alt={item.name} className="w-12 h-12 rounded-lg object-cover" />
                        <div>
                          <h4 className="text-xs font-bold text-white">{item.name}</h4>
                          <span className="text-[11px] text-cyan-400 font-mono">${item.price} x {item.qty}</span>
                        </div>
                      </div>
                      <span className="font-bold text-white text-sm">${item.price * item.qty}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-slate-500 text-sm text-center py-12">Your cart is currently empty.</p>
              )}
            </div>

            {!orderComplete && cart.length > 0 && (
              <div className="pt-6 border-t border-slate-800 space-y-4">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-400">Total:</span>
                  <span className="text-xl font-bold text-white">${cartTotal}</span>
                </div>
                <button 
                  onClick={() => setOrderComplete(true)}
                  className="w-full py-4 bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg shadow-cyan-400/20"
                >
                  Test Simulated Checkout
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
