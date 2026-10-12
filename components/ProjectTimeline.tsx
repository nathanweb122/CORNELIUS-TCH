import React, { useState } from 'react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ReferenceDot,
  Customized
} from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Target, Clock, CheckCircle2, Circle, AlertCircle, Award } from 'lucide-react';

interface Milestone {
  id: number;
  phase: string;
  title: string;
  date: string;
  progress: number; // 0 to 100
  status: 'Completed' | 'In Progress' | 'Planned';
  details: string;
  nodeName: string;
  leadArchitect: string;
}

const MILESTONES: Milestone[] = [
  {
    id: 1,
    phase: 'Phase 1',
    title: 'Architecture & Neural Sync',
    date: '2026-03-01',
    progress: 100,
    status: 'Completed',
    details: 'Established primary secure server mesh in Kigali and initialized high-fidelity Gemini neural routing gateways.',
    nodeName: 'KGL-01-CORE',
    leadArchitect: 'Cornelius'
  },
  {
    id: 2,
    phase: 'Phase 2',
    title: 'Alpha Ledger Deployment',
    date: '2026-04-15',
    progress: 100,
    status: 'Completed',
    details: 'Successfully deployed decentralized cryptographic ledger nodes for smart contract and African digital assets verification.',
    nodeName: 'MLW-04-EDGE',
    leadArchitect: 'Dr. Amina'
  },
  {
    id: 3,
    phase: 'Phase 3',
    title: 'Monrovia Edge Cluster',
    date: '2026-05-30',
    progress: 100,
    status: 'Completed',
    details: 'Activated specialized hardware acceleration clusters in Monrovia, reducing regional transaction latency by 74%.',
    nodeName: 'MLW-07-EDGE',
    leadArchitect: 'Jean-Pierre'
  },
  {
    id: 4,
    phase: 'Phase 4',
    title: 'Design Lab & Marketplace Beta',
    date: '2026-06-20',
    progress: 100,
    status: 'Completed',
    details: 'Released the core browser-native visualization engine and alpha token marketplace models to partner organizations.',
    nodeName: 'KGL-03-LAB',
    leadArchitect: 'Cornelius'
  },
  {
    id: 5,
    phase: 'Phase 5',
    title: 'Production Portal Integration',
    date: '2026-07-15',
    progress: 90,
    status: 'In Progress',
    details: 'Integrating the unified appointment portal, client workspace channels, and secure biometric profile synchronization nodes.',
    nodeName: 'SYS-GLOBAL-MIGRATION',
    leadArchitect: 'Cornelius'
  },
  {
    id: 6,
    phase: 'Phase 6',
    title: 'Pan-African Mesh Expansion',
    date: '2026-09-10',
    progress: 15,
    status: 'Planned',
    details: 'Expanding satellite laser-interconnected micro-gateways across ECOWAS region to provide absolute high-availability operations.',
    nodeName: 'ECOWAS-SAT-01',
    leadArchitect: 'Dr. Amina'
  }
];

export const ProjectTimeline: React.FC = () => {
  const [selectedMilestone, setSelectedMilestone] = useState<Milestone>(MILESTONES[4]); // Defaults to current active milestone

  const getStatusColor = (status: Milestone['status']) => {
    switch (status) {
      case 'Completed': return 'text-green-500 border-green-500/30 bg-green-500/10';
      case 'In Progress': return 'text-neon-blue border-neon-blue/30 bg-neon-blue/10';
      case 'Planned': return 'text-gray-500 border-white/10 bg-white/5';
    }
  };

  const getStatusIcon = (status: Milestone['status']) => {
    switch (status) {
      case 'Completed': return <CheckCircle2 size={16} className="text-green-500" />;
      case 'In Progress': return <Clock size={16} className="text-neon-blue animate-spin-slow" />;
      case 'Planned': return <Circle size={16} className="text-gray-600" />;
    }
  };

  // Convert milestones into a chart-friendly numerical timeline
  const chartData = MILESTONES.map(m => ({
    name: m.phase,
    progress: m.progress,
    title: m.title,
    date: m.date,
    id: m.id
  }));

  const handleChartClick = (state: any) => {
    if (state && state.activePayload && state.activePayload.length > 0) {
      const clickedId = state.activePayload[0].payload.id;
      const found = MILESTONES.find(m => m.id === clickedId);
      if (found) {
        setSelectedMilestone(found);
      }
    }
  };

  return (
    <div className="glassmorphism p-8 md:p-10 rounded-[3.5rem] border border-white/5 shadow-2xl relative overflow-hidden" id="project-timeline-container">
      <div className="absolute inset-0 african-pattern opacity-5 pointer-events-none" />
      
      <div className="relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 mb-3 px-3 py-1 bg-white/5 border border-white/10 rounded-full">
              <Award size={12} className="text-neon-gold" />
              <span className="text-neon-gold font-heading text-[8px] tracking-[0.4em] uppercase font-bold">Project Milestones</span>
            </div>
            <h3 className="font-heading text-3xl text-white uppercase tracking-tight">Deployment Timeline</h3>
            <p className="text-gray-500 text-xs font-subheading">Interactive roadmap mapping telemetry sync and regional expansions</p>
          </div>
          
          <div className="flex space-x-2 bg-black/40 p-1.5 rounded-2xl border border-white/5">
            {MILESTONES.map(m => (
              <button
                key={m.id}
                onClick={() => setSelectedMilestone(m)}
                className={`px-3 py-1.5 rounded-xl font-heading text-[9px] uppercase tracking-wider transition-all ${
                  selectedMilestone.id === m.id 
                    ? 'bg-gradient-to-r from-neon-blue to-neon-purple text-white shadow-lg' 
                    : 'text-gray-500 hover:text-white'
                }`}
              >
                {m.phase}
              </button>
            ))}
          </div>
        </div>

        {/* Timeline Visualization with Recharts */}
        <div className="h-64 w-full bg-black/20 rounded-3xl p-4 border border-white/5 mb-10 relative">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart 
              data={chartData} 
              margin={{ top: 20, right: 30, left: 10, bottom: 5 }}
              onClick={handleChartClick}
            >
              <defs>
                <linearGradient id="colorProgress" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#00CFFF" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#8A2BE2" stopOpacity={0.0}/>
                </linearGradient>
              </defs>
              <XAxis 
                dataKey="name" 
                stroke="#475569" 
                fontSize={10} 
                tickLine={false}
                axisLine={false}
                dy={10}
                style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
              />
              <YAxis 
                stroke="#475569" 
                fontSize={10} 
                tickLine={false}
                axisLine={false}
                dx={-10}
                tickFormatter={(v) => `${v}%`}
                style={{ fontFamily: 'Inter, sans-serif' }}
              />
              <Tooltip
                cursor={{ stroke: '#00CFFF', strokeWidth: 1, strokeDasharray: '4 4' }}
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="bg-dark-bg/95 backdrop-blur-xl border border-white/10 p-4 rounded-2xl shadow-2xl">
                        <p className="text-neon-blue text-[9px] font-heading uppercase tracking-widest font-bold mb-1">{data.name}</p>
                        <p className="text-white text-xs font-semibold font-subheading mb-1">{data.title}</p>
                        <p className="text-[10px] text-gray-500 font-mono mb-2">{data.date}</p>
                        <div className="flex items-center space-x-2">
                          <div className="w-20 h-1.5 bg-white/10 rounded-full overflow-hidden">
                            <div className="h-full bg-neon-blue" style={{ width: `${data.progress}%` }} />
                          </div>
                          <span className="text-[10px] font-bold text-neon-blue font-mono">{data.progress}%</span>
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Area 
                type="monotone" 
                dataKey="progress" 
                stroke="url(#colorProgress)" 
                strokeWidth={3}
                fillOpacity={1} 
                fill="url(#colorProgress)"
                activeDot={{ r: 8, strokeWidth: 0, fill: '#00CFFF', style: { filter: 'drop-shadow(0 0 10px #00CFFF)' } }}
              />
            </AreaChart>
          </ResponsiveContainer>
          <div className="absolute bottom-2 left-6 text-[8px] font-mono uppercase text-gray-600 tracking-wider">
            ⚡ Click points on chart to inspect milestone telemetry
          </div>
        </div>

        {/* Selected Milestone Detail Section */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedMilestone.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 p-8 bg-white/5 border border-white/5 rounded-3xl backdrop-blur-md relative"
          >
            <div className="md:col-span-2 space-y-4">
              <div className="flex items-center space-x-4">
                <span className="text-neon-blue font-heading font-bold uppercase tracking-widest text-xs">
                  {selectedMilestone.phase}
                </span>
                <div className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full border text-[9px] font-heading uppercase tracking-widest font-bold ${getStatusColor(selectedMilestone.status)}`}>
                  {getStatusIcon(selectedMilestone.status)}
                  <span>{selectedMilestone.status}</span>
                </div>
              </div>
              
              <h4 className="font-heading text-2xl text-white uppercase tracking-tight">
                {selectedMilestone.title}
              </h4>
              
              <p className="text-gray-400 font-body text-sm leading-relaxed">
                {selectedMilestone.details}
              </p>
            </div>

            <div className="border-t md:border-t-0 md:border-l border-white/10 pt-6 md:pt-0 md:pl-8 flex flex-col justify-between">
              <div className="space-y-4">
                <div>
                  <span className="text-[9px] uppercase tracking-widest text-gray-500 font-heading block mb-1">Target Date</span>
                  <div className="flex items-center space-x-2 text-white font-subheading text-sm">
                    <Calendar size={14} className="text-neon-blue" />
                    <span>{selectedMilestone.date}</span>
                  </div>
                </div>

                <div>
                  <span className="text-[9px] uppercase tracking-widest text-gray-500 font-heading block mb-1">Assigned Telemetry Node</span>
                  <div className="flex items-center space-x-2 text-white font-mono text-xs">
                    <Target size={14} className="text-neon-purple" />
                    <span className="text-neon-purple">{selectedMilestone.nodeName}</span>
                  </div>
                </div>

                <div>
                  <span className="text-[9px] uppercase tracking-widest text-gray-500 font-heading block mb-1">Lead Architect</span>
                  <span className="text-white font-subheading text-xs font-semibold">{selectedMilestone.leadArchitect}</span>
                </div>
              </div>

              <div className="mt-6">
                <div className="flex justify-between text-[10px] font-mono text-gray-500 mb-1">
                  <span>COMPLETION TELEMETRY</span>
                  <span className="text-white font-bold">{selectedMilestone.progress}%</span>
                </div>
                <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden border border-white/10">
                  <div 
                    className={`h-full rounded-full transition-all duration-500 ${
                      selectedMilestone.status === 'Completed' 
                        ? 'bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.4)]' 
                        : 'bg-neon-blue shadow-[0_0_10px_rgba(0,207,255,0.4)]'
                    }`}
                    style={{ width: `${selectedMilestone.progress}%` }}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};
