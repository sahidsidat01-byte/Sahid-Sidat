import React, { useState, useEffect } from 'react';
import {
  Database,
  Check,
  Copy,
  Sparkles,
  X,
  ExternalLink,
  ShieldCheck,
  RefreshCw,
  AlertCircle,
  Code,
  Layers,
} from 'lucide-react';
import {
  getSupabaseCredentials,
  saveSupabaseCredentials,
  clearSupabaseCredentials,
  testSupabaseConnection,
  resetSupabaseClient,
} from '../lib/supabase';
import { SUPABASE_SQL_SCHEMA } from '../lib/backendService';

interface SupabaseConnectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConnectionChange?: (connected: boolean) => void;
  onSaved?: () => void;
}

export const SupabaseConnectModal: React.FC<SupabaseConnectModalProps> = ({
  isOpen,
  onClose,
  onConnectionChange,
  onSaved,
}) => {
  const [url, setUrl] = useState('');
  const [anonKey, setAnonKey] = useState('');
  const [status, setStatus] = useState<{ isChecking: boolean; connected: boolean; message: string }>({
    isChecking: false,
    connected: false,
    message: '',
  });
  const [copiedSchema, setCopiedSchema] = useState(false);
  const [activeTab, setActiveTab] = useState<'config' | 'schema'>('config');

  useEffect(() => {
    if (isOpen) {
      const creds = getSupabaseCredentials();
      setUrl(creds.url || '');
      setAnonKey(creds.key || '');
      checkCurrentStatus();
    }
  }, [isOpen]);

  const checkCurrentStatus = async () => {
    setStatus((prev) => ({ ...prev, isChecking: true }));
    const result = await testSupabaseConnection();
    setStatus({
      isChecking: false,
      connected: result.success,
      message: result.message,
    });
    if (onConnectionChange) onConnectionChange(result.success);
  };

  const handleSaveAndConnect = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim() || !anonKey.trim()) return;

    setStatus({ isChecking: true, connected: false, message: 'Validating connection...' });
    const result = await testSupabaseConnection(url.trim(), anonKey.trim());

    if (result.success) {
      saveSupabaseCredentials(url.trim(), anonKey.trim());
      resetSupabaseClient();
      setStatus({ isChecking: false, connected: true, message: result.message });
      if (onConnectionChange) onConnectionChange(true);
      if (onSaved) onSaved();
    } else {
      setStatus({ isChecking: false, connected: false, message: result.message });
    }
  };

  const handleDisconnect = () => {
    clearSupabaseCredentials();
    resetSupabaseClient();
    setUrl('');
    setAnonKey('');
    setStatus({
      isChecking: false,
      connected: false,
      message: 'Disconnected. Falling back to persistent local storage repository.',
    });
    if (onConnectionChange) onConnectionChange(false);
  };

  const handleCopySchema = () => {
    navigator.clipboard?.writeText(SUPABASE_SQL_SCHEMA);
    setCopiedSchema(true);
    setTimeout(() => setCopiedSchema(false), 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#19061f]/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl rounded-3xl bg-[#28142d] border border-[#f2ca7a]/30 p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-[#d1c5b3] hover:text-[#f2ca7a] p-1.5 rounded-full hover:bg-[#37223d] transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-[#37223d] border border-[#f2ca7a]/30 flex items-center justify-center text-[#f2ca7a] shrink-0 shadow-md">
            <Database className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-serif text-2xl font-bold text-[#f8d8fc]">
                Supabase Backend Setup & Connection
              </h2>
              <span
                className={`text-[10px] px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider border ${
                  status.connected
                    ? 'bg-emerald-950/80 text-emerald-300 border-emerald-500/40'
                    : 'bg-amber-950/80 text-amber-300 border-amber-500/40'
                }`}
              >
                {status.connected ? 'Live Connected' : 'Simulated / Offline Mode'}
              </span>
            </div>
            <p className="text-xs text-[#d1c5b3] mt-0.5">
              Connect Jessa’s Beauty Parlor to your Supabase PostgreSQL database & Auth.
            </p>
          </div>
        </div>

        {/* Sub-Tabs */}
        <div className="flex items-center gap-2 border-b border-[#f2ca7a]/15 pb-2">
          <button
            onClick={() => setActiveTab('config')}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'config'
                ? 'bg-[#f2ca7a] text-[#402d00] font-bold shadow-md'
                : 'text-[#d1c5b3] hover:text-[#f2ca7a]'
            }`}
          >
            Connection Settings
          </button>
          <button
            onClick={() => setActiveTab('schema')}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'schema'
                ? 'bg-[#f2ca7a] text-[#402d00] font-bold shadow-md'
                : 'text-[#d1c5b3] hover:text-[#f2ca7a]'
            }`}
          >
            <Code className="w-3.5 h-3.5" />
            <span>SQL Database Schema</span>
          </button>
        </div>

        {/* TAB 1: Configuration Form */}
        {activeTab === 'config' && (
          <div className="space-y-5">
            {/* Status Card */}
            <div
              className={`p-4 rounded-2xl border text-xs flex items-start gap-3 ${
                status.connected
                  ? 'bg-emerald-950/30 border-emerald-500/30 text-emerald-200'
                  : 'bg-[#19061f] border-[#f2ca7a]/20 text-[#d1c5b3]'
              }`}
            >
              {status.connected ? (
                <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-5 h-5 text-[#f2ca7a] shrink-0 mt-0.5" />
              )}
              <div className="flex-1 space-y-1">
                <span className="font-bold text-sm block">
                  {status.connected ? 'Active Live Connection' : 'Persistent Fallback Mode'}
                </span>
                <p className="text-[11px] leading-relaxed">
                  {status.message ||
                    'Currently operating with local storage persistence. To store appointments, user profiles, reviews, and inquiries in a live database, paste your Supabase credentials below.'}
                </p>
              </div>
              <button
                onClick={checkCurrentStatus}
                disabled={status.isChecking}
                className="p-1.5 rounded-lg bg-[#37223d] text-[#f2ca7a] hover:bg-[#432d48] transition-colors cursor-pointer shrink-0"
                title="Refresh Status"
              >
                <RefreshCw className={`w-4 h-4 ${status.isChecking ? 'animate-spin' : ''}`} />
              </button>
            </div>

            {/* Credential Form */}
            <form onSubmit={handleSaveAndConnect} className="space-y-4 text-xs">
              <div>
                <label className="block text-[#d1c5b3] mb-1 font-semibold uppercase tracking-wider text-[10px]">
                  Project URL (VITE_SUPABASE_URL)
                </label>
                <input
                  type="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://xyzcompany.supabase.co"
                  required
                  className="w-full px-4 py-2.5 bg-[#19061f] border border-[#f2ca7a]/30 text-[#f8d8fc] rounded-xl focus:outline-none focus:border-[#f2ca7a] font-mono text-xs"
                />
              </div>

              <div>
                <label className="block text-[#d1c5b3] mb-1 font-semibold uppercase tracking-wider text-[10px]">
                  Anon / Public API Key (VITE_SUPABASE_ANON_KEY)
                </label>
                <input
                  type="text"
                  value={anonKey}
                  onChange={(e) => setAnonKey(e.target.value)}
                  placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                  required
                  className="w-full px-4 py-2.5 bg-[#19061f] border border-[#f2ca7a]/30 text-[#f8d8fc] rounded-xl focus:outline-none focus:border-[#f2ca7a] font-mono text-xs"
                />
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                <a
                  href="https://supabase.com/dashboard"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] text-[#f2ca7a] hover:underline flex items-center gap-1.5"
                >
                  <span>Open Supabase Project Settings → API</span>
                  <ExternalLink className="w-3 h-3" />
                </a>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  {status.connected && (
                    <button
                      type="button"
                      onClick={handleDisconnect}
                      className="px-4 py-2 rounded-full bg-[#37223d] text-[#ffb4ab] text-xs font-semibold hover:bg-[#432d48] cursor-pointer"
                    >
                      Disconnect
                    </button>
                  )}
                  <button
                    type="submit"
                    disabled={status.isChecking}
                    className="flex-1 sm:flex-none px-6 py-2 rounded-full bg-gradient-to-r from-[#f2ca7a] to-[#d4af62] text-[#402d00] font-bold text-xs shadow-md hover:brightness-105 transition-all cursor-pointer disabled:opacity-50"
                  >
                    {status.isChecking ? 'Connecting...' : 'Save & Test Connection'}
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}

        {/* TAB 2: SQL Schema Script */}
        {activeTab === 'schema' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-serif text-base font-bold text-[#f8d8fc]">
                  One-Click PostgreSQL Migration Script
                </h4>
                <p className="text-[11px] text-[#d1c5b3]">
                  Creates the `profiles`, `appointments`, `reviews`, and `inquiries` tables with automated RLS policies.
                </p>
              </div>

              <button
                onClick={handleCopySchema}
                className="px-4 py-1.5 rounded-full bg-[#f2ca7a] text-[#402d00] text-xs font-bold flex items-center gap-1.5 hover:brightness-105 cursor-pointer shadow-md shrink-0"
              >
                {copiedSchema ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedSchema ? 'Copied to Clipboard!' : 'Copy SQL Schema'}</span>
              </button>
            </div>

            <div className="relative rounded-2xl bg-[#19061f] border border-[#f2ca7a]/20 p-4 max-h-72 overflow-y-auto font-mono text-[11px] text-[#f8d8fc]/80 leading-relaxed">
              <pre className="whitespace-pre-wrap">{SUPABASE_SQL_SCHEMA}</pre>
            </div>

            <div className="p-3.5 rounded-xl bg-[#37223d]/40 border border-[#f2ca7a]/15 text-[11px] text-[#d1c5b3] space-y-1">
              <strong className="text-[#f2ca7a] block">How to run in Supabase:</strong>
              <ol className="list-decimal pl-4 space-y-0.5">
                <li>Log in to your Supabase project dashboard.</li>
                <li>Click <strong>SQL Editor</strong> on the left navigation bar.</li>
                <li>Click <strong>+ New Query</strong>, paste this copied SQL script, and click <strong>Run</strong>.</li>
              </ol>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
