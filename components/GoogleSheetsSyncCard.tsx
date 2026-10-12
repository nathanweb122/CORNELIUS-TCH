import React, { useState, useEffect } from 'react';
import { Table, FileSpreadsheet, Plus, RefreshCw, CheckCircle, AlertCircle, ExternalLink, Download, Send, Lock, UserCheck } from 'lucide-react';
import { googleSignIn, googleSignOut, getAccessToken, initAuth } from './googleAuth';
import { createSpreadsheet, appendRowsToSpreadsheet, readSpreadsheetValues, getSpreadsheetDetails } from '../services/googleSheetsService';

export const GoogleSheetsSyncCard: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [spreadsheetId, setSpreadsheetId] = useState<string>(() => localStorage.getItem('cornelius_sheets_id') || '');
  const [spreadsheetUrl, setSpreadsheetUrl] = useState<string>(() => localStorage.getItem('cornelius_sheets_url') || '');
  const [spreadsheetTitle, setSpreadsheetTitle] = useState<string>('');
  
  const [sheetData, setSheetData] = useState<any[][]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error' | 'info'; text: string } | null>(null);

  // Modal confirmation state for destructive/write actions
  const [pendingAction, setPendingAction] = useState<{
    type: 'create' | 'sync_appointments' | 'sync_custom';
    title: string;
    description: string;
    data?: any;
  } | null>(null);

  useEffect(() => {
    // Check auth status
    const unsubscribe = initAuth(
      (_user, token) => {
        setIsAuthenticated(true);
        setAccessToken(token);
      },
      () => {
        setIsAuthenticated(false);
        setAccessToken(null);
      }
    );

    return () => {
      if (typeof unsubscribe === 'function') unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (accessToken && spreadsheetId) {
      loadSheetData(spreadsheetId, accessToken);
    }
  }, [accessToken, spreadsheetId]);

  const handleGoogleSignIn = async () => {
    setIsLoggingIn(true);
    setStatusMessage(null);
    try {
      const res = await googleSignIn();
      if (res?.accessToken) {
        setIsAuthenticated(true);
        setAccessToken(res.accessToken);
        setStatusMessage({ type: 'success', text: 'Google Workspace Account connected successfully!' });
      }
    } catch (err: any) {
      console.error('Google Sign-in failed:', err);
      setStatusMessage({ type: 'error', text: `Google Sign-in failed: ${err.message || 'Pop-up blocked or cancelled.'}` });
    } finally {
      setIsLoggingIn(false);
    }
  };

  const loadSheetData = async (targetId: string, token: string) => {
    setIsLoading(true);
    setStatusMessage(null);
    try {
      const details = await getSpreadsheetDetails(token, targetId);
      setSpreadsheetTitle(details.properties.title);
      setSpreadsheetUrl(details.spreadsheetUrl || `https://docs.google.com/spreadsheets/d/${targetId}`);

      const rows = await readSpreadsheetValues(token, targetId, 'A1:Z50');
      setSheetData(rows);
      setStatusMessage({ type: 'success', text: `Loaded ${rows.length} row(s) from "${details.properties.title}".` });
    } catch (err: any) {
      console.error('Failed to load sheet data:', err);
      setStatusMessage({ type: 'error', text: `Error reading Google Sheet: ${err.message}` });
    } finally {
      setIsLoading(false);
    }
  };

  // Trigger confirmation modal for creating a sheet
  const promptCreateSheet = () => {
    if (!accessToken) return;
    setPendingAction({
      type: 'create',
      title: 'Create New Google Spreadsheet',
      description: 'This will create a new Google Sheet titled "Cornelius TEC - Business Management & Strategy Sync" in your Google Drive.'
    });
  };

  // Trigger confirmation modal for syncing appointments
  const promptSyncAppointments = () => {
    if (!spreadsheetId) {
      setStatusMessage({ type: 'error', text: 'Please create or connect a Google Sheet first!' });
      return;
    }
    const savedAppts = JSON.parse(localStorage.getItem('cornelius_appointments') || '[]');
    setPendingAction({
      type: 'sync_appointments',
      title: `Sync ${savedAppts.length || 1} Record(s) to Google Sheets`,
      description: `This will append new rows to your connected Google Sheet (${spreadsheetTitle || spreadsheetId}).`,
      data: savedAppts
    });
  };

  // Execute confirmed action
  const executeAction = async () => {
    if (!pendingAction || !accessToken) return;

    const action = pendingAction;
    setPendingAction(null);
    setStatusMessage(null);

    if (action.type === 'create') {
      setIsCreating(true);
      try {
        const sheet = await createSpreadsheet(
          accessToken,
          'Cornelius TEC - Business Management & Strategy Sync',
          ['Timestamp', 'Client Name', 'Email', 'Service / Asset', 'Status', 'Transmission Node']
        );
        const newId = sheet.spreadsheetId;
        const newUrl = sheet.spreadsheetUrl;

        setSpreadsheetId(newId);
        setSpreadsheetUrl(newUrl);
        setSpreadsheetTitle(sheet.properties.title);

        localStorage.setItem('cornelius_sheets_id', newId);
        localStorage.setItem('cornelius_sheets_url', newUrl);

        setStatusMessage({
          type: 'success',
          text: `Google Sheet created successfully! Title: "${sheet.properties.title}"`
        });

        loadSheetData(newId, accessToken);
      } catch (err: any) {
        console.error('Sheet creation error:', err);
        setStatusMessage({ type: 'error', text: `Failed to create sheet: ${err.message}` });
      } finally {
        setIsCreating(false);
      }
    } else if (action.type === 'sync_appointments') {
      setIsSyncing(true);
      try {
        const appts = action.data && action.data.length > 0 ? action.data : [
          {
            createdAt: new Date().toISOString(),
            name: 'Cornelius Member',
            email: 'member@cornelius.tec',
            service: 'AI Architecture Consultation',
            status: 'confirmed'
          }
        ];

        const rowsToAppend = appts.map((a: any) => [
          a.createdAt || new Date().toISOString(),
          a.name || 'Anonymous Client',
          a.email || 'client@cornelius.tec',
          a.service || 'Custom Engineering Session',
          a.status || 'Confirmed',
          'Vercel Live Node'
        ]);

        await appendRowsToSpreadsheet(accessToken, spreadsheetId, 'Data Sync!A:F', rowsToAppend);
        setStatusMessage({
          type: 'success',
          text: `Successfully synced ${rowsToAppend.length} record(s) to Google Sheets!`
        });

        loadSheetData(spreadsheetId, accessToken);
      } catch (err: any) {
        console.error('Sheet sync error:', err);
        setStatusMessage({ type: 'error', text: `Sync failed: ${err.message}` });
      } finally {
        setIsSyncing(false);
      }
    }
  };

  return (
    <div className="glassmorphism p-8 md:p-10 rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden space-y-6">
      {/* Top Banner Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <FileSpreadsheet size={26} />
          </div>
          <div>
            <h3 className="font-heading text-2xl text-white uppercase tracking-tight flex items-center gap-2">
              Google Sheets <span className="text-neon-blue">Live Matrix</span>
            </h3>
            <p className="text-xs text-gray-400 font-body">
              Sync appointments, digital licenses, and client leads directly to Google Workspace.
            </p>
          </div>
        </div>

        {/* Authentication State Button */}
        {!isAuthenticated ? (
          <button
            onClick={handleGoogleSignIn}
            disabled={isLoggingIn}
            className="gsi-material-button w-full md:w-auto"
            style={{
              backgroundColor: '#131314',
              borderRadius: '12px',
              border: '1px solid #3c4043',
              color: '#e3e3e3',
              cursor: 'pointer',
              fontFamily: 'inherit',
              fontSize: '13px',
              padding: '10px 16px',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px'
            }}
          >
            <div className="gsi-material-button-icon" style={{ width: '20px', height: '20px' }}>
              <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" style={{ display: 'block' }}>
                <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
                <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
                <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
                <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
              </svg>
            </div>
            <span>{isLoggingIn ? 'Connecting Google Workspace...' : 'Sign in with Google'}</span>
          </button>
        ) : (
          <div className="flex items-center space-x-3">
            <span className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono">
              <UserCheck size={14} />
              <span>Google Connected</span>
            </span>
            <button
              onClick={() => { googleSignOut(); setIsAuthenticated(false); setAccessToken(null); }}
              className="text-xs text-gray-400 hover:text-white underline font-mono"
            >
              Disconnect
            </button>
          </div>
        )}
      </div>

      {/* Notification status message */}
      {statusMessage && (
        <div className={`p-4 rounded-2xl border text-xs font-body flex items-start justify-between ${
          statusMessage.type === 'error'
            ? 'bg-red-950/80 border-red-500/50 text-red-200'
            : statusMessage.type === 'success'
            ? 'bg-emerald-950/80 border-emerald-500/50 text-emerald-200'
            : 'bg-blue-950/80 border-blue-500/50 text-blue-200'
        }`}>
          <div className="flex items-center space-x-2">
            {statusMessage.type === 'error' ? <AlertCircle size={16} /> : <CheckCircle size={16} />}
            <span>{statusMessage.text}</span>
          </div>
          <button onClick={() => setStatusMessage(null)} className="font-bold hover:opacity-80">✕</button>
        </div>
      )}

      {/* Main Actions Panel */}
      {!isAuthenticated ? (
        <div className="p-8 rounded-2xl bg-black/40 border border-white/5 text-center space-y-3">
          <Lock className="mx-auto text-gray-500" size={28} />
          <p className="text-sm text-gray-300 font-subheading">
            Connect your Google Workspace account above to activate real-time Google Sheets synchronization.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Controls Bar */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              onClick={promptCreateSheet}
              disabled={isCreating}
              className="p-4 rounded-2xl bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/30 text-emerald-300 font-heading text-xs uppercase tracking-wider font-bold transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
            >
              {isCreating ? <RefreshCw className="animate-spin" size={16} /> : <Plus size={16} />}
              <span>Create Google Sheet</span>
            </button>

            <button
              onClick={promptSyncAppointments}
              disabled={isSyncing || !spreadsheetId}
              className="p-4 rounded-2xl bg-neon-blue/20 hover:bg-neon-blue/30 border border-neon-blue/30 text-neon-blue font-heading text-xs uppercase tracking-wider font-bold transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
            >
              {isSyncing ? <RefreshCw className="animate-spin" size={16} /> : <Send size={16} />}
              <span>Sync Records to Sheet</span>
            </button>

            {spreadsheetUrl && (
              <a
                href={spreadsheetUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-heading text-xs uppercase tracking-wider font-bold transition-all flex items-center justify-center space-x-2"
              >
                <span>Open in Google Sheets</span>
                <ExternalLink size={14} />
              </a>
            )}
          </div>

          {/* Connect Existing Sheet Input */}
          <div className="p-4 rounded-2xl bg-black/40 border border-white/10 flex flex-col md:flex-row items-center gap-3">
            <span className="text-xs font-mono text-gray-400 shrink-0">Spreadsheet ID:</span>
            <input
              type="text"
              value={spreadsheetId}
              onChange={(e) => {
                setSpreadsheetId(e.target.value);
                localStorage.setItem('cornelius_sheets_id', e.target.value);
              }}
              placeholder="e.g. 1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms"
              className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-2 text-xs text-white font-mono focus:border-neon-blue outline-none"
            />
            {spreadsheetId && accessToken && (
              <button
                onClick={() => loadSheetData(spreadsheetId, accessToken)}
                disabled={isLoading}
                className="py-2 px-4 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-mono shrink-0 flex items-center space-x-1"
              >
                <RefreshCw size={12} className={isLoading ? 'animate-spin' : ''} />
                <span>Reload Data</span>
              </button>
            )}
          </div>

          {/* Live Table Render */}
          {isLoading ? (
            <div className="p-12 text-center text-gray-400 text-xs font-mono animate-pulse">
              Fetching rows from Google Sheets API...
            </div>
          ) : sheetData && sheetData.length > 0 ? (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-mono text-gray-400">
                <span>Spreadsheet View: {spreadsheetTitle || 'Connected Sheet'}</span>
                <span>{sheetData.length} Row(s) Loaded</span>
              </div>
              <div className="overflow-x-auto rounded-2xl border border-white/10 bg-black/60 max-h-72">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-white/10 text-neon-blue font-mono border-b border-white/10">
                      {sheetData[0]?.map((colHeader: string, idx: number) => (
                        <th key={idx} className="p-3 font-semibold uppercase tracking-wider">
                          {colHeader}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {sheetData.slice(1).map((row, rIdx) => (
                      <tr key={rIdx} className="border-b border-white/5 hover:bg-white/5 font-subheading text-gray-300">
                        {row.map((cell: any, cIdx: number) => (
                          <td key={cIdx} className="p-3 truncate max-w-xs">
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="p-8 text-center rounded-2xl border border-dashed border-white/10 text-gray-500 text-xs font-subheading">
              No data loaded yet. Click "Create Google Sheet" above or provide an existing Spreadsheet ID.
            </div>
          )}
        </div>
      )}

      {/* Mandatory User Confirmation Modal for Mutating/Writing Operations */}
      {pendingAction && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-dark-bg border border-neon-blue/40 rounded-3xl p-8 max-w-md w-full shadow-2xl space-y-6 animate-fade-in">
            <div className="flex items-center space-x-3 text-neon-blue">
              <FileSpreadsheet size={28} />
              <h4 className="font-heading text-xl uppercase tracking-tight text-white">
                {pendingAction.title}
              </h4>
            </div>

            <p className="text-sm text-gray-300 font-body leading-relaxed">
              {pendingAction.description}
            </p>

            <div className="p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/20 text-yellow-200 text-xs font-subheading">
              <strong>Workspace Confirmation Notice:</strong> This operation will modify your Google Drive / Google Sheets files with your permission.
            </div>

            <div className="flex items-center space-x-3 pt-2">
              <button
                onClick={() => setPendingAction(null)}
                className="w-1/2 py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-heading text-xs uppercase font-bold transition-all"
              >
                Cancel
              </button>
              <button
                onClick={executeAction}
                className="w-1/2 py-3 rounded-2xl bg-neon-blue hover:bg-neon-blue/80 text-dark-bg font-heading text-xs uppercase font-bold transition-all"
              >
                Confirm Action
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
