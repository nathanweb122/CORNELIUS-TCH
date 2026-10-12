import React, { useState, useRef, useEffect } from 'react';
import { User, Camera, Shield, Briefcase, Target, Loader2, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { handleFirestoreError, OperationType } from '../firestoreErrorHandler';
import { DirectContactCard } from '../components/DirectContactCard';

const STORAGE_KEY = 'cornelius_profile_data';

const DEFAULT_PROFILE = {
  name: 'Cornelius Tech Enthusiast',
  profession: 'Lead Innovation Architect & Quantum Developer',
  bio: 'Born in Liberia and currently based in Rwanda, I am pioneering the next generation of African-inspired technological solutions. I believe in the intersection of tradition and futuristic engineering to solve global challenges.',
  standsFor: 'Decentralization, Accessibility, and the preservation of cultural heritage through digital twins and neural networks.',
  experience: '10+ years in Aerospace Engineering, 5 years in Blockchain Architecture, and a lifetime of curiosity.',
  imageUrl: 'https://picsum.photos/seed/tech-profile/400/400'
};

export const Profile: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState(DEFAULT_PROFILE);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [currentUser, setCurrentUser] = useState<any>(null);

  // Monitor user authentication and fetch profile from Firestore
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      setErrorMessage('');
      if (user) {
        setLoading(true);
        try {
          const docRef = doc(db, 'profiles', user.uid);
          const docSnap = await getDoc(docRef);
          
          if (docSnap.exists()) {
            setProfile({
              ...DEFAULT_PROFILE,
              ...docSnap.data()
            } as any);
          } else {
            // Profile doesn't exist yet, initialize it with user's Auth details
            const initialProfile = {
              ...DEFAULT_PROFILE,
              name: user.displayName || user.email?.split('@')[0] || DEFAULT_PROFILE.name,
              imageUrl: user.photoURL || DEFAULT_PROFILE.imageUrl
            };
            setProfile(initialProfile);
            
            // Save initial profile to Firestore
            await setDoc(docRef, {
              userId: user.uid,
              ...initialProfile,
              updatedAt: new Date().toISOString()
            });
          }
        } catch (err: any) {
          console.warn("Firestore profile fetch failed, using local storage fallback:", err.message);
          // Standard Firestore secure error logging
          try {
            handleFirestoreError(err, OperationType.GET, `profiles/${user.uid}`);
          } catch (formattedErr: any) {
            setErrorMessage("System authorization error. Loading from secure offline node instead.");
          }
          loadLocalProfile();
        } finally {
          setLoading(false);
        }
      } else {
        // Not logged in, use localStorage fallback
        loadLocalProfile();
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const loadLocalProfile = () => {
    const savedProfile = localStorage.getItem(STORAGE_KEY);
    if (savedProfile) {
      try {
        setProfile(JSON.parse(savedProfile));
      } catch (e) {
        console.error('Failed to parse saved profile:', e);
      }
    }
  };

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageClick = () => {
    if (isEditing) {
      fileInputRef.current?.click();
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newImageUrl = reader.result as string;
        setProfile({ ...profile, imageUrl: newImageUrl });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    setIsEditing(false);
    setErrorMessage('');
    
    // 1. Save locally
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));

    // 2. Sync with Firestore if authenticated
    if (currentUser) {
      setLoading(true);
      try {
        const docRef = doc(db, 'profiles', currentUser.uid);
        await setDoc(docRef, {
          userId: currentUser.uid,
          name: profile.name,
          profession: profile.profession,
          bio: profile.bio,
          standsFor: profile.standsFor,
          experience: profile.experience,
          imageUrl: profile.imageUrl,
          updatedAt: new Date().toISOString()
        });
        console.log('Profile successfully synced to Firestore!');
      } catch (err: any) {
        console.error('Firestore save error:', err);
        try {
          handleFirestoreError(err, OperationType.UPDATE, `profiles/${currentUser.uid}`);
        } catch (formattedErr: any) {
          setErrorMessage("Failed to synchronize with cloud database. Local backup created.");
        }
      } finally {
        setLoading(false);
      }
    }
  };

  if (loading) {
    return (
      <div className="pt-32 pb-20 px-4 min-h-screen flex flex-col items-center justify-center bg-dark-bg text-white">
        <Loader2 className="w-12 h-12 text-neon-blue animate-spin mb-4" />
        <p className="text-xs uppercase tracking-[0.3em] font-heading text-gray-500">Decrypting Neural Identity...</p>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-20 px-4 min-h-screen neural-grid">
      <div className="max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glassmorphism rounded-3xl overflow-hidden border border-white/10 shadow-2xl"
        >
          {/* Header/Banner */}
          <div className="h-48 bg-gradient-to-r from-neon-purple/30 via-neon-blue/20 to-neon-gold/10 relative">
            <div className="absolute inset-0 african-pattern opacity-10" />
            <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-dark-bg to-transparent" />
          </div>

          <div className="px-6 md:px-8 pb-12 relative">
            {/* Profile Picture */}
            <div className="relative -mt-20 md:-mt-24 mb-6 md:mb-8 inline-block group">
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-2xl overflow-hidden border-4 border-dark-bg shadow-2xl relative">
                <img 
                  src={profile.imageUrl} 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                {isEditing && (
                  <div 
                    onClick={handleImageClick}
                    className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Camera className="text-white mb-2" />
                    <span className="text-[10px] uppercase font-heading text-white">Change Photo</span>
                  </div>
                )}
              </div>
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleImageChange} 
                className="hidden" 
                accept="image/*"
              />
              <div className="absolute -bottom-2 -right-2 bg-neon-blue p-2 rounded-lg shadow-lg">
                <Shield size={16} className="text-dark-bg" />
              </div>
            </div>

            {errorMessage && (
              <div className="mb-8 p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-2xl flex items-center space-x-3 text-xs font-body">
                <AlertCircle className="w-5 h-5 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Content */}
            <div className="flex flex-col md:flex-row justify-between items-start mb-10 md:mb-12 gap-6 md:gap-0">
              <div className="flex-grow w-full md:w-auto">
                {isEditing ? (
                  <div className="space-y-4 max-w-2xl">
                    <input 
                      type="text" 
                      value={profile.name}
                      onChange={(e) => setProfile({...profile, name: e.target.value})}
                      className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 w-full font-heading text-xl md:text-2xl text-neon-blue focus:outline-none focus:border-neon-blue"
                      placeholder="Your Name"
                    />
                    <input 
                      type="text" 
                      value={profile.profession}
                      onChange={(e) => setProfile({...profile, profession: e.target.value})}
                      className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 w-full font-subheading text-base md:text-lg text-gray-300 focus:outline-none focus:border-neon-blue"
                      placeholder="Your Profession"
                    />
                  </div>
                ) : (
                  <>
                    <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-2 neon-text">
                      {profile.name}
                    </h2>
                    <p className="text-lg md:text-xl font-subheading text-neon-blue mb-4">
                      {profile.profession}
                    </p>
                  </>
                )}
              </div>
            </div>

            {/* Sections */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12">
              <div className="space-y-8">
                <section>
                  <div className="flex items-center space-x-3 mb-4">
                    <User className="text-neon-purple" size={20} />
                    <h3 className="font-heading text-sm uppercase tracking-widest text-gray-400">About Me</h3>
                  </div>
                  {isEditing ? (
                    <textarea 
                      value={profile.bio}
                      onChange={(e) => setProfile({...profile, bio: e.target.value})}
                      className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 w-full h-32 font-body text-gray-300 focus:outline-none focus:border-neon-purple resize-none"
                    />
                  ) : (
                    <p className="text-gray-300 leading-relaxed font-body">
                      {profile.bio}
                    </p>
                  )}
                </section>

                <section>
                  <div className="flex items-center space-x-3 mb-4">
                    <Target className="text-neon-gold" size={20} />
                    <h3 className="font-heading text-sm uppercase tracking-widest text-gray-400">What I Stand For</h3>
                  </div>
                  {isEditing ? (
                    <textarea 
                      value={profile.standsFor}
                      onChange={(e) => setProfile({...profile, standsFor: e.target.value})}
                      className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 w-full h-32 font-body text-gray-300 focus:outline-none focus:border-neon-gold resize-none"
                    />
                  ) : (
                    <p className="text-gray-300 leading-relaxed font-body">
                      {profile.standsFor}
                    </p>
                  )}
                </section>
              </div>

              <div className="space-y-8">
                <section>
                  <div className="flex items-center space-x-3 mb-4">
                    <Briefcase className="text-neon-blue" size={20} />
                    <h3 className="font-heading text-sm uppercase tracking-widest text-gray-400">Professional Experience</h3>
                  </div>
                  {isEditing ? (
                    <textarea 
                      value={profile.experience}
                      onChange={(e) => setProfile({...profile, experience: e.target.value})}
                      className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 w-full h-32 font-body text-gray-300 focus:outline-none focus:border-neon-blue resize-none"
                    />
                  ) : (
                    <p className="text-gray-300 leading-relaxed font-body">
                      {profile.experience}
                    </p>
                  )}
                </section>

                {/* Stats/Badges */}
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { label: 'Innovations', value: '12' },
                    { label: 'Deployments', value: '45' },
                    { label: 'Reputation', value: '99%' }
                  ].map((stat) => (
                    <div key={stat.label} className="bg-white/5 border border-white/5 rounded-2xl p-4 text-center">
                      <div className="text-neon-blue font-heading text-xl mb-1">{stat.value}</div>
                      <div className="text-[8px] uppercase tracking-tighter text-gray-500">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Direct Messaging to Cornelius TEC Team */}
            <div className="mt-12 pt-8 border-t border-white/10">
              <DirectContactCard 
                title="Text Cornelius TEC Team Directly"
                subtitle="Connected as a registered member. Send a direct message to our development team via WhatsApp (+250796569416) or Email (corneliustch@gmail.com)."
              />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
