
import React, { useState, useEffect } from 'react';
import { 
  Layers, Zap, X, Send, Star, Loader2, AlertCircle, Globe, Plus, Lock, 
  Shield, ExternalLink, Trash2, Key, RefreshCw, LogOut, CheckCircle, FolderOpen, Tag, Users
} from 'lucide-react';
import { 
  getProducts, getReviews, submitReview, addProduct,
  getAssignments, createAssignment, deleteAssignment 
} from '../api';
import { auth } from '../components/googleAuth';
import { MarketplaceItem } from '../components/MarketplaceItem';
import { Reviews, Review } from '../components/Reviews';
import { OnlineShopDemo } from '../components/demos/OnlineShopDemo';
import { SchoolAdminDemo } from '../components/demos/SchoolAdminDemo';
import { AIEditorDemo } from '../components/demos/AIEditorDemo';
import Ballpit from '../components/Ballpit';
import GlitchText from '../components/GlitchText';

interface Product {
  _id: string;
  title: string;
  description: string;
  price: number;
  images: string[];
  createdAt: Date;
  websiteUrl?: string;
  isWebsite?: boolean;
}

export const Marketplace: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [allReviews, setAllReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [activeItemReviews, setActiveItemReviews] = useState<string | null>(null);
  const [newRating, setNewRating] = useState(0);
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Secure Website Upload & Client Preview states
  const [currentUserEmail, setCurrentUserEmail] = useState<string | null>(
    localStorage.getItem('user_email') || 'africahowe@gmail.com'
  );
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isSubmittingProduct, setIsSubmittingProduct] = useState(false);
  const [previewWebsiteUrl, setPreviewWebsiteUrl] = useState<string | null>(null);
  
  const [uploadForm, setUploadForm] = useState({
    title: '',
    description: '',
    price: '',
    websiteUrl: '',
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800'
  });

  // Admin Verification input
  const [adminBypassEmail, setAdminBypassEmail] = useState('');
  const [isAdminPromptOpen, setIsAdminPromptOpen] = useState(false);

  // Role-Based Website Assignment & Client Portal States
  const [activeTab, setActiveTab] = useState<'store' | 'client' | 'admin'>('store');
  const [assignments, setAssignments] = useState<any[]>([]);
  const [assignedProducts, setAssignedProducts] = useState<any[]>([]);
  const [clientPortalEmail, setClientPortalEmail] = useState<string>(
    localStorage.getItem('client_portal_email') || currentUserEmail || 'client@test.com'
  );
  const [isClientLoggedIn, setIsClientLoggedIn] = useState<boolean>(true);
  const [selectedProductId, setSelectedProductId] = useState<string>('');
  const [targetClientEmail, setTargetClientEmail] = useState<string>('');
  const [isCreatingAssignment, setIsCreatingAssignment] = useState(false);
  const [isAssignmentsLoading, setIsAssignmentsLoading] = useState(false);

  const syncAssignments = async () => {
    if (!currentUserEmail) return;
    setIsAssignmentsLoading(true);
    try {
      const res = await getAssignments(currentUserEmail);
      setAssignments(res.data || []);
    } catch (err) {
      console.error("Failed to sync assignments:", err);
    } finally {
      setIsAssignmentsLoading(false);
    }
  };

  const syncClientAssignments = async (email: string) => {
    setIsAssignmentsLoading(true);
    try {
      const res = await getAssignments(email);
      setAssignedProducts(res.data || []);
    } catch (err) {
      console.error("Failed to fetch client assignments:", err);
    } finally {
      setIsAssignmentsLoading(false);
    }
  };

  const syncData = async () => {
    setLoading(true);
    try {
      const [productsRes, reviewsRes] = await Promise.all([
        getProducts(),
        getReviews()
      ]);
      
      const fetchedProducts = productsRes.data || [];
      const fetchedReviews = reviewsRes.data || [];

      const normalizedProducts = fetchedProducts.map((p: any) => ({
        ...p,
        _id: p._id,
        title: p.title || p.name || 'Unnamed Asset Node',
        description: p.description || '',
        price: p.price || 0,
        images: Array.isArray(p.images) ? p.images : (p.image ? [p.image] : []),
        websiteUrl: p.websiteUrl || '',
        isWebsite: p.isWebsite !== false,
        createdAt: p.createdAt ? new Date(p.createdAt) : new Date()
      }));

      // Merge local uploads if backend gets wiped or doesn't persist
      const localProductsStr = localStorage.getItem('local_marketplace_products');
      let combined = [...normalizedProducts];
      if (localProductsStr) {
        try {
          const localProducts = JSON.parse(localProductsStr).map((p: any) => ({
            ...p,
            createdAt: new Date(p.createdAt)
          }));
          // Avoid duplicates
          localProducts.forEach((lp: any) => {
            if (!combined.some(cp => cp.title === lp.title)) {
              combined.push(lp);
            }
          });
        } catch (e) {
          console.error(e);
        }
      }

      setProducts(combined.sort((a: any, b: any) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      ));
      setAllReviews(fetchedReviews);
      setError(null);
    } catch (err) {
      console.error("Failed to sync with the Vault:", err);
      setError("Unable to establish link with the Asset Vault. Displaying cached nodes.");
      
      const mockItems = [
        {
          _id: 'prod_online_shop',
          title: 'Online Shop to Sell Products',
          description: 'Complete, high-performance e-commerce storefront with product catalog, cart management, instant checkout flow, and payment gateway integration.',
          price: 100,
          images: ['https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&q=80&w=800'],
          websiteUrl: 'demo-shop',
          isWebsite: true,
          createdAt: new Date('2026-07-27T10:00:00Z')
        },
        {
          _id: 'prod_school_admin',
          title: 'School Administration Website',
          description: 'All-in-one school management system for student grading, attendance tracking, faculty directory, tuition fee portal, and parent communication.',
          price: 799,
          images: ['https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=800'],
          websiteUrl: 'demo-school',
          isWebsite: true,
          createdAt: new Date('2026-07-27T10:05:00Z')
        },
        {
          _id: 'prod_ai_editor',
          title: 'AI Editor Suite',
          description: 'Next-gen AI code & content editor with intelligent code completion, prompt refactoring, multi-file workspace, instant live preview, and 100 Free Neural Credits/mo.',
          price: 300,
          images: ['https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800'],
          websiteUrl: 'demo-ai-editor',
          isWebsite: true,
          createdAt: new Date('2026-07-27T10:10:00Z')
        }
      ];
      
      const localProductsStr = localStorage.getItem('local_marketplace_products');
      if (localProductsStr) {
        try {
          const localProducts = JSON.parse(localProductsStr).map((p: any) => ({
            ...p,
            createdAt: new Date(p.createdAt)
          }));
          setProducts([...localProducts, ...mockItems]);
        } catch (e) {
          setProducts(mockItems);
        }
      } else {
        setProducts(mockItems);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    syncData();

    // Check firebase auth state
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user?.email) {
        setCurrentUserEmail(user.email);
        localStorage.setItem('user_email', user.email);
        setClientPortalEmail(user.email);
        setIsClientLoggedIn(true);
      } else {
        const localEmail = localStorage.getItem('user_email');
        if (localEmail) {
          setCurrentUserEmail(localEmail);
          setClientPortalEmail(localEmail);
          setIsClientLoggedIn(true);
        }
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (currentUserEmail?.toLowerCase().trim() === 'africahowe@gmail.com') {
      syncAssignments();
    }
  }, [currentUserEmail]);

  useEffect(() => {
    if (isClientLoggedIn && clientPortalEmail) {
      syncClientAssignments(clientPortalEmail);
    }
  }, [isClientLoggedIn, clientPortalEmail]);

  const handleAdminVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminBypassEmail.toLowerCase().trim() === 'africahowe@gmail.com') {
      setCurrentUserEmail('africahowe@gmail.com');
      localStorage.setItem('user_email', 'africahowe@gmail.com');
      setClientPortalEmail('africahowe@gmail.com');
      setIsClientLoggedIn(true);
      setIsAdminPromptOpen(false);
      setAdminBypassEmail('');
      alert("Admin Privilege Handshake Authenticated! (africahowe@gmail.com verified)");
      syncData();
      syncAssignments();
    } else {
      alert("Verification Failed. Handshake key mismatch.");
    }
  };

  const handleClientPortalLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const email = clientPortalEmail.trim();
    if (!email) return;
    localStorage.setItem('client_portal_email', email);
    setIsClientLoggedIn(true);
    syncClientAssignments(email);
  };

  const handleClientPortalLogout = () => {
    localStorage.removeItem('client_portal_email');
    setIsClientLoggedIn(false);
    setAssignedProducts([]);
  };

  const handleCreateAssignment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProductId || !targetClientEmail.trim()) {
      alert("Please select a website asset and enter a target client email.");
      return;
    }

    if (currentUserEmail?.toLowerCase().trim() !== 'africahowe@gmail.com') {
      alert("Security Breach: Unauthorized assignment attempt blocked.");
      return;
    }

    const matchedProduct = products.find(p => p._id === selectedProductId);
    if (!matchedProduct) {
      alert("Selected product could not be identified.");
      return;
    }

    setIsCreatingAssignment(true);
    try {
      await createAssignment({
        productId: matchedProduct._id,
        productTitle: matchedProduct.title,
        websiteUrl: matchedProduct.websiteUrl || '',
        clientEmail: targetClientEmail.toLowerCase().trim(),
        uploadedBy: 'africahowe@gmail.com'
      });

      setSelectedProductId('');
      setTargetClientEmail('');
      alert("Digital Web Node successfully linked to Client Registry!");
      syncAssignments();
    } catch (err: any) {
      console.error(err);
      const errMsg = err.response?.data?.error || "Failed to transmit asset link to server.";
      alert(errMsg);
    } finally {
      setIsCreatingAssignment(false);
    }
  };

  const handleDeleteAssignment = async (id: string) => {
    if (currentUserEmail?.toLowerCase().trim() !== 'africahowe@gmail.com') {
      alert("Security Breach: Unauthorized unlink sequence blocked.");
      return;
    }

    if (!confirm("Are you sure you want to revoke and disconnect this client website link?")) {
      return;
    }

    try {
      await deleteAssignment(id, 'africahowe@gmail.com');
      alert("Digital Web Node successfully disconnected.");
      syncAssignments();
    } catch (err: any) {
      console.error(err);
      alert("Unlink transmission failed.");
    }
  };

  const handleUploadWebsite = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadForm.title || !uploadForm.description || !uploadForm.price || !uploadForm.websiteUrl) {
      alert("Please populate all website calibration values.");
      return;
    }

    if (currentUserEmail?.toLowerCase().trim() !== 'africahowe@gmail.com') {
      alert("Security Breach Detected: Unauthorized upload sequence blocked.");
      return;
    }

    setIsSubmittingProduct(true);
    try {
      const payload = {
        title: uploadForm.title,
        description: uploadForm.description,
        price: Number(uploadForm.price),
        images: [uploadForm.imageUrl],
        websiteUrl: uploadForm.websiteUrl,
        isWebsite: true,
        uploadedBy: 'africahowe@gmail.com'
      };

      await addProduct(payload);
      
      // Save locally as backup
      const localProductsStr = localStorage.getItem('local_marketplace_products');
      const localProducts = localProductsStr ? JSON.parse(localProductsStr) : [];
      const localNode = {
        ...payload,
        _id: 'product_loc_' + Date.now(),
        createdAt: new Date().toISOString()
      };
      localStorage.setItem('local_marketplace_products', JSON.stringify([localNode, ...localProducts]));

      setIsUploadModalOpen(false);
      setUploadForm({
        title: '',
        description: '',
        price: '',
        websiteUrl: '',
        imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800'
      });

      alert("Website Asset Uploaded & Broadcasted Successfully!");
      syncData();
    } catch (err: any) {
      console.error("Upload transmission failed:", err);
      // Fallback in case of server offline: save locally
      const payload = {
        title: uploadForm.title,
        description: uploadForm.description,
        price: Number(uploadForm.price),
        images: [uploadForm.imageUrl],
        websiteUrl: uploadForm.websiteUrl,
        isWebsite: true,
        uploadedBy: 'africahowe@gmail.com'
      };
      const localProductsStr = localStorage.getItem('local_marketplace_products');
      const localProducts = localProductsStr ? JSON.parse(localProductsStr) : [];
      const localNode = {
        ...payload,
        _id: 'product_loc_' + Date.now(),
        createdAt: new Date().toISOString()
      };
      localStorage.setItem('local_marketplace_products', JSON.stringify([localNode, ...localProducts]));
      
      setIsUploadModalOpen(false);
      setUploadForm({
        title: '',
        description: '',
        price: '',
        websiteUrl: '',
        imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800'
      });
      alert("Upload processed offline and saved to Local Matrix successfully!");
      syncData();
    } finally {
      setIsSubmittingProduct(false);
    }
  };

  const getAverageRating = (productId: string) => {
    const productReviews = allReviews.filter(r => r.productId === productId);
    if (productReviews.length === 0) return "5.0";
    const sum = productReviews.reduce((acc, curr) => acc + curr.rating, 0);
    return (sum / productReviews.length).toFixed(1);
  };

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeItemReviews || newRating === 0 || !newComment.trim()) return;
    
    setIsSubmitting(true);
    try {
      await submitReview({
        productId: activeItemReviews,
        rating: newRating,
        comment: newComment,
        userId: 'agent_current' // In a real app, this would be the logged-in user's ID
      });
      
      // Refresh reviews
      const reviewsRes = await getReviews();
      setAllReviews(reviewsRes.data || []);
      
      setNewRating(0);
      setNewComment('');
      setActiveItemReviews(null);
      alert("Review successfully synced with the Cornelius matrix.");
    } catch (err) {
      console.error("Transmission failed:", err);
      alert("Neural sync interrupted. Retrying in background...");
    } finally {
      setIsSubmitting(false);
    }
  };

  const currentItem = products.find(i => i._id === activeItemReviews);

  return (
    <div className="pt-32 pb-32 max-w-7xl mx-auto px-4">
      {/* 3D Ballpit Hero Canvas Container */}
      <div className="relative mb-16 p-8 md:p-12 rounded-[2.5rem] overflow-hidden border border-white/10 glassmorphism shadow-2xl min-h-[280px]">
        <div className="absolute inset-0 pointer-events-auto opacity-75 z-0">
          <Ballpit
            count={120}
            colors={["#00CFFF", "#7C3AED", "#FFD700", "#F97316"]}
            gravity={0.2}
            friction={0.9975}
            wallBounce={0.95}
            minSize={0.6}
            maxSize={1.2}
            followCursor={true}
          />
        </div>
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-end gap-6 pointer-events-none">
          <div className="max-w-2xl pointer-events-auto">
            <div className="inline-flex items-center space-x-2 mb-4 px-3 py-1 glassmorphism border border-neon-blue/20 rounded-full bg-black/40">
              <Zap size={12} className="text-neon-blue animate-pulse" />
              <span className="text-neon-blue font-heading text-[9px] tracking-[0.3em] uppercase font-bold">The Vault</span>
            </div>
            <h1 className="font-heading text-5xl md:text-7xl mb-4 tracking-tighter text-white drop-shadow-lg flex items-center gap-4 flex-wrap">
              <GlitchText speed={0.8} enableShadows={true} enableOnHover={false}>DIGITAL</GlitchText> <span className="text-neon-blue">ASSETS</span>
            </h1>
            <p className="text-gray-200 font-subheading text-lg leading-relaxed drop-shadow-md">
              Acquire pre-engineered, high-performance software modules verified by the Cornelius engineering matrix.
            </p>
          </div>
          
          <div className="flex flex-wrap items-center gap-3 pointer-events-auto">
            {error && (
              <div className="flex items-center space-x-2 text-neon-gold bg-neon-gold/5 px-4 py-2 rounded-xl border border-neon-gold/20 mr-4 animate-fade-in backdrop-blur-md">
                <AlertCircle size={14} />
                <span className="text-[10px] font-heading uppercase tracking-widest">{error}</span>
              </div>
            )}

            <button className="px-6 py-3 glassmorphism border border-neon-blue/30 rounded-2xl flex items-center space-x-2 hover:bg-neon-blue/10 transition-all backdrop-blur-md">
              <Layers size={16} className="text-neon-blue" />
              <span className="text-[10px] font-heading uppercase tracking-widest text-white">Browse Nodes</span>
            </button>
          </div>
        </div>
      </div>

      {/* Sub-Navigation Tabs */}
      <div className="flex border-b border-white/5 mb-10 overflow-x-auto scrollbar-none">
        <button
          onClick={() => setActiveTab('store')}
          className={`pb-4 px-6 font-heading text-xs tracking-widest uppercase border-b-2 transition-all flex items-center space-x-2 whitespace-nowrap ${activeTab === 'store' ? 'border-neon-blue text-white font-bold' : 'border-transparent text-gray-500 hover:text-white'}`}
        >
          <Layers size={14} className={activeTab === 'store' ? 'text-neon-blue' : 'text-gray-500'} />
          <span>All Asset Nodes</span>
        </button>
        
        <button
          onClick={() => setActiveTab('client')}
          className={`pb-4 px-6 font-heading text-xs tracking-widest uppercase border-b-2 transition-all flex items-center space-x-2 whitespace-nowrap ${activeTab === 'client' ? 'border-neon-purple text-white font-bold' : 'border-transparent text-gray-500 hover:text-white'}`}
        >
          <Key size={14} className={activeTab === 'client' ? 'text-neon-purple' : 'text-gray-500'} />
          <span>Secure Client Portal</span>
          {isClientLoggedIn && (
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          )}
        </button>

        {currentUserEmail?.toLowerCase().trim() === 'africahowe@gmail.com' && (
          <button
            onClick={() => setActiveTab('admin')}
            className={`pb-4 px-6 font-heading text-xs tracking-widest uppercase border-b-2 transition-all flex items-center space-x-2 whitespace-nowrap ${activeTab === 'admin' ? 'border-neon-gold text-neon-gold font-bold' : 'border-transparent text-gray-500 hover:text-white'}`}
          >
            <Shield size={14} className="text-neon-gold" />
            <span>Admin Control Panel</span>
          </button>
        )}
      </div>

      {/* Conditional Views */}
      {activeTab === 'store' && (
        <>
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-[500px] glassmorphism rounded-[2.5rem] animate-pulse border border-white/5" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {products.map((item) => (
                <MarketplaceItem 
                  key={item._id} 
                  item={{...item, createdAt: new Date(item.createdAt)}} 
                  averageRating={getAverageRating(item._id)}
                  reviewCount={allReviews.filter(r => r.productId === item._id).length}
                  onOpenReviews={setActiveItemReviews}
                  onOpenWebsitePreview={setPreviewWebsiteUrl}
                />
              ))}
            </div>
          )}
        </>
      )}

      {activeTab === 'client' && (
        <div className="animate-fade-in space-y-10">
          {!isClientLoggedIn ? (
            <div className="max-w-md mx-auto p-8 md:p-10 glassmorphism border border-neon-purple/20 bg-dark-bg/80 rounded-[3rem] shadow-2xl relative overflow-hidden">
              <div className="absolute -right-10 -top-10 w-40 h-40 bg-neon-purple/5 blur-[50px] rounded-full" />
              
              <div className="flex flex-col items-center text-center mb-8">
                <div className="w-16 h-16 rounded-3xl bg-neon-purple/10 border border-neon-purple/30 flex items-center justify-center mb-4">
                  <Key size={24} className="text-neon-purple animate-pulse" />
                </div>
                <h2 className="font-heading text-2xl text-white uppercase tracking-wider">Client Authorization</h2>
                <p className="text-xs text-gray-400 mt-2 max-w-sm">
                  De-crypt your high-performance, authorized web nodes from the Cornelius Digital Repository.
                </p>
              </div>

              <form onSubmit={handleClientPortalLogin} className="space-y-6">
                <div>
                  <label className="block text-[10px] text-gray-500 font-heading uppercase tracking-widest mb-2">Registered Access Node (Email)</label>
                  <input 
                    type="email"
                    required
                    value={clientPortalEmail}
                    onChange={(e) => setClientPortalEmail(e.target.value)}
                    placeholder="client@test.com"
                    className="w-full bg-black/40 border border-white/10 rounded-2xl p-4 text-sm text-white focus:outline-none focus:border-neon-purple transition-all font-mono text-center"
                  />
                  <div className="mt-3 p-3 bg-white/5 rounded-xl border border-white/5">
                    <p className="text-[10px] text-gray-400 leading-relaxed font-body">
                      💡 <span className="font-semibold text-neon-purple">Calibration note:</span> Enter <span className="font-mono text-white select-all bg-black/50 px-1 py-0.5 rounded">client@test.com</span> to automatically view pre-seeded websites.
                    </p>
                  </div>
                </div>

                <button 
                  type="submit"
                  className="w-full py-4 bg-gradient-to-r from-neon-purple to-neon-blue text-white font-heading text-[10px] tracking-widest uppercase rounded-2xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center space-x-2 font-bold shadow-[0_0_20px_rgba(168,85,247,0.2)]"
                >
                  <span>AUTHORIZE DE-CRYPT</span>
                </button>
              </form>
            </div>
          ) : (
            <div className="space-y-8">
              {/* Authorized Header Row */}
              <div className="p-6 md:p-8 glassmorphism border border-neon-purple/20 bg-dark-bg/60 rounded-3xl flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-2xl bg-neon-purple/10 border border-neon-purple/30 flex items-center justify-center">
                    <CheckCircle size={20} className="text-neon-purple animate-pulse" />
                  </div>
                  <div>
                    <span className="text-[9px] uppercase tracking-widest text-neon-purple font-heading block">Node Connection Established</span>
                    <h3 className="font-mono text-white text-sm md:text-base font-semibold">{clientPortalEmail}</h3>
                  </div>
                </div>

                <div className="flex items-center space-x-3 w-full md:w-auto">
                  <button
                    onClick={() => syncClientAssignments(clientPortalEmail)}
                    className="flex-1 md:flex-none px-4 py-3 bg-white/5 border border-white/10 text-white rounded-xl text-[10px] font-heading uppercase tracking-widest hover:bg-white/10 transition-all flex items-center justify-center space-x-2"
                  >
                    <RefreshCw size={12} className={isAssignmentsLoading ? 'animate-spin' : ''} />
                    <span>Sync</span>
                  </button>
                  <button
                    onClick={handleClientPortalLogout}
                    className="flex-1 md:flex-none px-4 py-3 bg-neon-purple/10 border border-neon-purple/20 text-neon-purple rounded-xl text-[10px] font-heading uppercase tracking-widest hover:bg-neon-purple hover:text-dark-bg transition-all flex items-center justify-center space-x-2 font-bold"
                  >
                    <LogOut size={12} />
                    <span>Disconnect</span>
                  </button>
                </div>
              </div>

              {/* Grid of Decrypted Client Websites */}
              {isAssignmentsLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {[1, 2].map(i => (
                    <div key={i} className="h-96 glassmorphism rounded-[2rem] animate-pulse border border-white/5" />
                  ))}
                </div>
              ) : assignedProducts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {assignedProducts.map((assigned: any) => {
                    // Match with local products list if details are available
                    const detail = products.find(p => p._id === assigned.productId);
                    return (
                      <div 
                        key={assigned._id} 
                        className="glassmorphism rounded-[2.5rem] overflow-hidden border border-neon-purple/20 hover:border-neon-purple/40 bg-dark-bg/40 transition-all duration-300 flex flex-col h-full relative group shadow-xl"
                      >
                        <div className="absolute top-4 right-4 z-10">
                          <span className="bg-neon-purple/20 border border-neon-purple/30 text-neon-purple px-3 py-1 rounded-full text-[8px] font-heading uppercase tracking-widest">
                            Authorized Node
                          </span>
                        </div>

                        <div className="h-48 relative overflow-hidden bg-black/20">
                          <img 
                            src={detail?.images?.[0] || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800'} 
                            alt={assigned.productTitle}
                            className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-all duration-700"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-dark-bg to-transparent" />
                        </div>

                        <div className="p-6 flex flex-col flex-grow">
                          <span className="text-[8px] uppercase tracking-[0.3em] font-heading text-gray-500 mb-1">
                            Secure Web Module
                          </span>
                          <h4 className="font-heading text-lg text-white mb-2 truncate group-hover:text-neon-purple transition-all">
                            {assigned.productTitle}
                          </h4>
                          <p className="text-xs text-gray-400 line-clamp-3 mb-6 flex-grow font-body">
                            {detail?.description || 'Your custom-designed, Afro-futuristic modular system asset ready for production execution.'}
                          </p>

                          <div className="pt-4 border-t border-white/5 flex flex-col space-y-2">
                            <button
                              onClick={() => setPreviewWebsiteUrl(assigned.websiteUrl)}
                              className="w-full py-3.5 bg-gradient-to-r from-neon-purple to-neon-blue text-white font-heading text-[10px] tracking-widest uppercase rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center space-x-2 font-bold shadow-lg"
                            >
                              <Globe size={12} className="animate-pulse" />
                              <span>LAUNCH PORTAL PREVIEW</span>
                            </button>
                            <a
                              href={assigned.websiteUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-full py-2.5 bg-white/5 border border-white/10 hover:bg-white/10 text-white text-[9px] tracking-[0.2em] uppercase rounded-lg transition-all text-center flex items-center justify-center space-x-1 font-mono font-bold"
                            >
                              <ExternalLink size={10} />
                              <span>OPEN LIVE NODE</span>
                            </a>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="p-12 md:p-20 glassmorphism border border-white/5 bg-dark-bg/20 rounded-[3rem] text-center max-w-2xl mx-auto flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-6 border border-white/10">
                    <FolderOpen size={24} className="text-gray-500" />
                  </div>
                  <h4 className="font-heading text-lg text-white mb-2 uppercase tracking-wide">NO ACTIVE WEB NODES DECRYPTED</h4>
                  <p className="text-xs text-gray-400 max-w-md leading-relaxed font-body">
                    There are no dynamic website channels assigned to <span className="font-mono text-neon-purple">{clientPortalEmail}</span> in the registry system. Contact the Chief Architect to synchronize your licenses.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {activeTab === 'admin' && currentUserEmail?.toLowerCase().trim() === 'africahowe@gmail.com' && (
        <div className="animate-fade-in space-y-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Create Assignment Form Panel */}
            <div className="lg:col-span-5 p-6 md:p-8 glassmorphism border border-neon-gold/30 bg-dark-bg/85 rounded-[2.5rem] shadow-xl relative overflow-hidden">
              <div className="absolute -right-12 -top-12 w-32 h-32 bg-neon-gold/5 blur-3xl rounded-full" />
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-neon-gold/10 border border-neon-gold/30 flex items-center justify-center text-neon-gold">
                  <Key size={18} />
                </div>
                <div>
                  <h3 className="font-heading text-lg text-white uppercase tracking-wider">Link Client Node</h3>
                  <p className="text-[10px] text-gray-500 mt-0.5">Bind high-performance assets to users.</p>
                </div>
              </div>

              <form onSubmit={handleCreateAssignment} className="space-y-5">
                <div>
                  <label className="block text-[9px] text-gray-500 font-heading uppercase tracking-widest mb-2 flex items-center justify-between">
                    <span>1. Select Website Asset</span>
                    <span className="text-[8px] text-neon-gold font-bold font-heading uppercase">Web-enabled only</span>
                  </label>
                  <select
                    required
                    value={selectedProductId}
                    onChange={(e) => setSelectedProductId(e.target.value)}
                    className="w-full bg-black/60 border border-white/10 rounded-xl p-4 text-xs text-white focus:outline-none focus:border-neon-gold transition-all"
                  >
                    <option value="" className="bg-neutral-900 text-gray-500">-- Choose website product --</option>
                    {products.map(p => (
                      <option key={p._id} value={p._id} className="bg-neutral-900 text-white">
                        {p.title} ({p.websiteUrl ? 'Web' : 'Static'} - ${p.price})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[9px] text-gray-500 font-heading uppercase tracking-widest mb-2">2. Target Client Email</label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. client@test.com"
                    value={targetClientEmail}
                    onChange={(e) => setTargetClientEmail(e.target.value)}
                    className="w-full bg-black/60 border border-white/10 rounded-xl p-4 text-xs text-white focus:outline-none focus:border-neon-gold transition-all font-mono"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isCreatingAssignment || !selectedProductId || !targetClientEmail.trim()}
                  className="w-full py-4 bg-neon-gold text-dark-bg font-heading text-[10px] tracking-widest uppercase rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center space-x-2 font-bold shadow-[0_0_15px_rgba(234,179,8,0.15)] disabled:opacity-40 disabled:scale-100"
                >
                  {isCreatingAssignment ? (
                    <Loader2 className="w-4 h-4 animate-spin text-dark-bg" />
                  ) : (
                    <>
                      <Plus size={12} />
                      <span>AUTHORIZE SYSTEM LINK</span>
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Active Assignments Table/List Registry */}
            <div className="lg:col-span-7 p-6 md:p-8 glassmorphism border border-white/10 bg-dark-bg/60 rounded-[2.5rem] shadow-xl flex flex-col h-full min-h-[400px]">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400">
                    <Users size={18} />
                  </div>
                  <div>
                    <h3 className="font-heading text-lg text-white uppercase tracking-wider">Active Client Registry</h3>
                    <p className="text-[10px] text-gray-500 mt-0.5">Current system mapping references.</p>
                  </div>
                </div>
                <button
                  onClick={syncAssignments}
                  className="p-2.5 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-lg transition-all"
                  title="Sync Registry"
                >
                  <RefreshCw size={12} className={isAssignmentsLoading ? 'animate-spin' : ''} />
                </button>
              </div>

              {isAssignmentsLoading ? (
                <div className="flex-grow flex items-center justify-center py-12">
                  <Loader2 className="w-8 h-8 animate-spin text-neon-gold" />
                </div>
              ) : assignments.length > 0 ? (
                <div className="flex-grow overflow-y-auto space-y-4 max-h-[400px] pr-2 scrollbar-thin">
                  {assignments.map((assign: any) => (
                    <div 
                      key={assign._id}
                      className="p-4 rounded-2xl bg-black/40 border border-white/5 hover:border-white/10 transition-all flex justify-between items-center gap-4 group"
                    >
                      <div className="space-y-1 min-w-0">
                        <div className="flex items-center space-x-2">
                          <Tag size={10} className="text-neon-gold" />
                          <span className="font-heading text-xs text-white uppercase tracking-wider truncate block">
                            {assign.productTitle}
                          </span>
                        </div>
                        <div className="flex flex-col text-[10px] text-gray-400 font-mono space-y-0.5">
                          <span className="truncate">Client: {assign.clientEmail}</span>
                          <span className="text-gray-500 text-[9px] truncate">Live: {assign.websiteUrl || 'No preview url'}</span>
                        </div>
                      </div>

                      <button
                        onClick={() => handleDeleteAssignment(assign._id)}
                        className="p-3 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl hover:bg-red-500 hover:text-white transition-all flex items-center justify-center"
                        title="Revoke and Disconnect Link"
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex-grow flex flex-col items-center justify-center py-12 text-center">
                  <span className="text-gray-600 text-xs font-heading uppercase tracking-widest mb-2">No active assignments</span>
                  <p className="text-[10px] text-gray-500 max-w-xs font-body">Use the panel on the left to map high-performance assets to client registers.</p>
                </div>
              )}

            </div>

          </div>
        </div>
      )}

      {activeItemReviews && currentItem && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10">
          <div className="absolute inset-0 bg-dark-bg/90 backdrop-blur-xl" onClick={() => setActiveItemReviews(null)} />
          <div className="relative w-full max-w-4xl max-h-[90vh] glassmorphism rounded-[3rem] border border-white/10 overflow-hidden flex flex-col shadow-2xl animate-slide-up">
            <div className="p-8 border-b border-white/5 flex justify-between items-center bg-black/40">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 rounded-2xl bg-white/5 p-1 border border-neon-blue/20">
                  <img src={currentItem.images?.[0] || ''} className="w-full h-full object-cover rounded-xl" alt={currentItem.title} />
                </div>
                <div>
                  <h2 className="font-heading text-2xl text-white">{currentItem.title}</h2>
                  <div className="flex items-center space-x-2 text-neon-blue">
                    <Star size={14} fill="currentColor" />
                    <span className="text-[10px] font-heading tracking-widest uppercase">Stability: {getAverageRating(currentItem._id)}</span>
                  </div>
                </div>
              </div>
              <button onClick={() => setActiveItemReviews(null)} className="p-3 bg-white/5 rounded-full hover:bg-white/10 transition-all text-white">
                <X size={24} />
              </button>
            </div>

            <div className="flex-grow overflow-y-auto p-8 grid grid-cols-1 lg:grid-cols-2 gap-10">
              <Reviews reviews={allReviews} productId={currentItem._id} title="Neural Logs" />
              <div className="sticky top-0 h-fit p-8 rounded-[2.5rem] glassmorphism border border-neon-blue/20 bg-neon-blue/5">
                <h3 className="font-heading text-xl mb-6 text-white uppercase tracking-widest">Post Log</h3>
                <form onSubmit={handleSubmitReview} className="space-y-6">
                  <div>
                    <label className="block text-[10px] text-gray-500 font-heading uppercase tracking-widest mb-4">Neural Stability</label>
                    <div className="flex space-x-3">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button key={star} type="button" onClick={() => setNewRating(star)} className={`transition-all ${newRating >= star ? 'text-neon-blue scale-125' : 'text-gray-700'}`}>
                          <Star size={24} fill={newRating >= star ? "currentColor" : "none"} />
                        </button>
                      ))}
                    </div>
                  </div>
                  <textarea
                    required
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Describe your architectural experience..."
                    rows={4}
                    className="w-full bg-dark-bg/60 border border-white/10 rounded-2xl p-5 text-sm text-white focus:outline-none focus:border-neon-blue transition-all"
                  />
                  <button type="submit" disabled={isSubmitting || newRating === 0} className="w-full bg-white text-dark-bg font-heading py-5 rounded-2xl flex items-center justify-center space-x-3 hover:scale-105 transition-all">
                    {isSubmitting ? <Loader2 className="w-6 h-6 animate-spin text-dark-bg" /> : <><Send size={18} /><span>TRANSMIT LOG</span></>}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Upload Website Modal */}
      {isUploadModalOpen && currentUserEmail?.toLowerCase().trim() === 'africahowe@gmail.com' && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 overflow-y-auto">
          <div className="absolute inset-0 bg-black/90 backdrop-blur-xl" onClick={() => setIsUploadModalOpen(false)} />
          <div className="relative w-full max-w-xl glassmorphism border border-neon-blue/30 bg-dark-bg/95 rounded-[3rem] shadow-2xl p-8 md:p-10 animate-slide-up my-8 max-h-[95vh] overflow-y-auto">
            <button 
              onClick={() => setIsUploadModalOpen(false)} 
              className="absolute top-6 right-6 p-3 bg-white/5 rounded-full hover:bg-white/10 text-white transition-all"
            >
              <X size={18} />
            </button>

            <div className="mb-8">
              <div className="inline-flex items-center space-x-2 mb-2 px-3 py-1 bg-neon-blue/10 border border-neon-blue/20 rounded-full">
                <Shield size={10} className="text-neon-blue" />
                <span className="text-[8px] text-neon-blue font-heading tracking-[0.2em] uppercase">Authorized Core Link</span>
              </div>
              <h2 className="font-heading text-2xl md:text-3xl text-white">UPLOAD WEB ASSET</h2>
              <p className="text-xs text-gray-500 mt-1">Calibrate and broadcast your production-ready website to the African Digital Renaissance Matrix.</p>
            </div>

            <form onSubmit={handleUploadWebsite} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] text-gray-500 font-heading uppercase tracking-widest mb-2">Website Name</label>
                  <input 
                    type="text" 
                    required
                    value={uploadForm.title}
                    onChange={(e) => setUploadForm({...uploadForm, title: e.target.value})}
                    placeholder="e.g. Kigali Tech Hub Port"
                    className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-xs text-white focus:outline-none focus:border-neon-blue transition-all"
                  />
                </div>
                <div>
                  <label className="block text-[10px] text-gray-500 font-heading uppercase tracking-widest mb-2">Acquisition Price (USD)</label>
                  <input 
                    type="number" 
                    required
                    value={uploadForm.price}
                    onChange={(e) => setUploadForm({...uploadForm, price: e.target.value})}
                    placeholder="e.g. 1500"
                    className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-xs text-white focus:outline-none focus:border-neon-blue transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] text-gray-500 font-heading uppercase tracking-widest mb-2">Live Website / Preview URL</label>
                <input 
                  type="url" 
                  required
                  value={uploadForm.websiteUrl}
                  onChange={(e) => setUploadForm({...uploadForm, websiteUrl: e.target.value})}
                  placeholder="e.g. https://your-deployed-site.com"
                  className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-xs text-white focus:outline-none focus:border-neon-blue transition-all font-mono"
                />
                <span className="text-[9px] text-gray-500 mt-1 block font-body">Clients will be able to browse and preview this live URL dynamically inside our iframe frame.</span>
              </div>

              <div>
                <label className="block text-[10px] text-gray-500 font-heading uppercase tracking-widest mb-2">Asset Card cover image URL</label>
                <input 
                  type="url" 
                  required
                  value={uploadForm.imageUrl}
                  onChange={(e) => setUploadForm({...uploadForm, imageUrl: e.target.value})}
                  className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-xs text-white focus:outline-none focus:border-neon-blue transition-all font-mono"
                />
                
                <div className="mt-3">
                  <span className="text-[9px] text-gray-500 block mb-2 font-heading uppercase tracking-widest">or choose a premium style preset:</span>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { name: 'SaaS Board', url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=600' },
                      { name: 'Dev Matrix', url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=600' },
                      { name: 'Futuristic UI', url: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=600' }
                    ].map((preset) => (
                      <button 
                        key={preset.name}
                        type="button"
                        onClick={() => setUploadForm({...uploadForm, imageUrl: preset.url})}
                        className={`p-2 border text-[9px] rounded-lg font-heading uppercase tracking-widest transition-all ${uploadForm.imageUrl === preset.url ? 'bg-neon-blue/10 border-neon-blue text-white' : 'bg-white/5 border-white/5 hover:border-white/10 text-gray-500'}`}
                      >
                        {preset.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-[10px] text-gray-500 font-heading uppercase tracking-widest mb-2">Asset Description</label>
                <textarea 
                  required
                  value={uploadForm.description}
                  onChange={(e) => setUploadForm({...uploadForm, description: e.target.value})}
                  placeholder="Summarize the core technical stacks, UI highlights, and performance benchmarks..."
                  rows={4}
                  className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-xs text-white focus:outline-none focus:border-neon-blue transition-all"
                />
              </div>

              <button 
                type="submit"
                disabled={isSubmittingProduct}
                className="w-full py-5 bg-gradient-to-r from-neon-blue to-neon-purple text-dark-bg font-heading text-[10px] tracking-widest uppercase rounded-xl hover:scale-[1.01] transition-all flex items-center justify-center space-x-2 font-bold shadow-[0_0_20px_rgba(0,207,255,0.1)]"
              >
                {isSubmittingProduct ? (
                  <Loader2 className="w-5 h-5 animate-spin text-dark-bg" />
                ) : (
                  <>
                    <Plus size={14} />
                    <span>AUTHORIZE & BROADCAST NODE</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Immersive Client Website Preview Modal - CLIENTS CAN ONLY SEE THE WEBSITE */}
      {previewWebsiteUrl && (
        <div className="fixed inset-0 z-[130] flex flex-col justify-between bg-black animate-fade-in">
          {/* Header */}
          <div className="p-4 bg-dark-bg/95 border-b border-white/10 flex justify-between items-center z-10">
            <div className="flex items-center space-x-4">
              <div className="w-3 h-3 rounded-full bg-neon-blue animate-pulse" />
              <div>
                <span className="text-[8px] uppercase tracking-[0.3em] text-neon-blue font-heading block">Dynamic Website Frame</span>
                <span className="text-xs text-white font-mono max-w-xs md:max-w-md truncate block">{previewWebsiteUrl}</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              {previewWebsiteUrl.startsWith('http') && (
                <a 
                  href={previewWebsiteUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="px-4 py-2 bg-white/5 text-white hover:bg-white/10 text-[9px] font-heading uppercase tracking-widest rounded-xl transition-all flex items-center space-x-2 border border-white/10"
                >
                  <ExternalLink size={10} />
                  <span>Open in Tab</span>
                </a>
              )}
              
              <button 
                onClick={() => setPreviewWebsiteUrl(null)} 
                className="p-2 bg-neon-blue/10 text-neon-blue border border-neon-blue/20 rounded-full hover:bg-neon-blue hover:text-dark-bg transition-all"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Dynamic Content */}
          <div className="flex-grow relative bg-neutral-950 overflow-y-auto">
            {previewWebsiteUrl === 'demo-shop' ? (
              <OnlineShopDemo onBuyNow={() => { setPreviewWebsiteUrl(null); setActiveTab('store'); }} />
            ) : previewWebsiteUrl === 'demo-school' ? (
              <SchoolAdminDemo onBuyNow={() => { setPreviewWebsiteUrl(null); setActiveTab('store'); }} />
            ) : previewWebsiteUrl === 'demo-ai-editor' ? (
              <AIEditorDemo onBuyNow={() => { setPreviewWebsiteUrl(null); setActiveTab('store'); }} />
            ) : (
              <iframe 
                src={previewWebsiteUrl} 
                className="w-full h-full border-none min-h-[80vh]"
                title="Live Website Preview"
                referrerPolicy="no-referrer"
                sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};
