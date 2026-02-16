'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Lead, LeadStatus, LEAD_STATUSES, STATUS_LABELS, STATUS_COLORS } from '@/lib/types';
import {
  formatDate,
  getTelLink,
  getWhatsAppLink,
  getInstagramLink,
  cn,
} from '@/lib/utils';
import { StatusBadge } from '@/components/StatusBadge';
import { createClient } from '@/lib/supabase/client';

interface LeadDetailsProps {
  lead: Lead;
  businessId: string;
  businessName: string;
}

export function LeadDetails({ lead, businessId, businessName }: LeadDetailsProps) {
  const [currentLead, setCurrentLead] = useState(lead);
  const [notes, setNotes] = useState(lead.notes || '');
  const [followupDate, setFollowupDate] = useState(
    lead.next_followup_at ? lead.next_followup_at.split('T')[0] : ''
  );
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const router = useRouter();

  const handleStatusChange = async (newStatus: LeadStatus) => {
    setSaving(true);
    const supabase = createClient();

    const { error } = await supabase
      .from('leads')
      .update({ status: newStatus })
      .eq('id', lead.id);

    if (!error) {
      setCurrentLead({ ...currentLead, status: newStatus });
    }
    setSaving(false);
  };

  const handleSaveNotes = async () => {
    setSaving(true);
    const supabase = createClient();

    const { error } = await supabase
      .from('leads')
      .update({ notes: notes.trim() || null })
      .eq('id', lead.id);

    if (!error) {
      setCurrentLead({ ...currentLead, notes: notes.trim() || null });
    }
    setSaving(false);
  };

  const handleSaveFollowup = async () => {
    setSaving(true);
    const supabase = createClient();

    const nextFollowupAt = followupDate
      ? new Date(followupDate).toISOString()
      : null;

    const { error } = await supabase
      .from('leads')
      .update({ next_followup_at: nextFollowupAt })
      .eq('id', lead.id);

    if (!error) {
      setCurrentLead({ ...currentLead, next_followup_at: nextFollowupAt });
    }
    setSaving(false);
  };

  const handleDelete = async () => {
    setDeleting(true);
    const supabase = createClient();

    const { error } = await supabase.from('leads').delete().eq('id', lead.id);

    if (!error) {
      router.push(`/business/${businessId}`);
      router.refresh();
    } else {
      setDeleting(false);
      setShowDeleteConfirm(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-lg mx-auto px-4 py-4 flex items-center gap-3">
          <Link
            href={`/business/${businessId}`}
            className="p-2 -mr-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
          <div className="flex-1 min-w-0">
            <h1 className="text-xl font-bold text-gray-900 truncate">
              {currentLead.name}
            </h1>
            <p className="text-sm text-gray-500 truncate">{businessName}</p>
          </div>
          <StatusBadge status={currentLead.status} size="md" />
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 py-6 space-y-6">
        {/* Contact Actions */}
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <h2 className="text-sm font-medium text-gray-500 mb-3">יצירת קשר</h2>
          <div className="flex gap-3">
            <a
              href={getTelLink(currentLead.phone)}
              className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              התקשר
            </a>
            <a
              href={getWhatsAppLink(currentLead.phone)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              וואטסאפ
            </a>
            {currentLead.instagram && (
              <a
                href={getInstagramLink(currentLead.instagram)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center py-3 px-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium rounded-lg hover:from-purple-700 hover:to-pink-700 transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
            )}
          </div>
        </div>

        {/* Lead Info */}
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <h2 className="text-sm font-medium text-gray-500 mb-3">פרטים</h2>
          <dl className="space-y-3">
            <div className="flex justify-between">
              <dt className="text-gray-600">טלפון</dt>
              <dd className="font-medium text-gray-900" dir="ltr">{currentLead.phone}</dd>
            </div>
            {currentLead.instagram && (
              <div className="flex justify-between">
                <dt className="text-gray-600">אינסטגרם</dt>
                <dd className="font-medium text-gray-900" dir="ltr">@{currentLead.instagram.replace('@', '')}</dd>
              </div>
            )}
            {currentLead.treatment_type && (
              <div className="flex justify-between">
                <dt className="text-gray-600">סוג טיפול</dt>
                <dd className="font-medium text-gray-900">{currentLead.treatment_type}</dd>
              </div>
            )}
            <div className="flex justify-between">
              <dt className="text-gray-600">נוצר</dt>
              <dd className="font-medium text-gray-900">{formatDate(currentLead.created_at)}</dd>
            </div>
          </dl>
        </div>

        {/* Status Change */}
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <h2 className="text-sm font-medium text-gray-500 mb-3">שינוי סטטוס</h2>
          <div className="grid grid-cols-2 gap-2">
            {LEAD_STATUSES.map((status) => (
              <button
                key={status}
                onClick={() => handleStatusChange(status)}
                disabled={saving || currentLead.status === status}
                className={cn(
                  'py-2.5 px-3 rounded-lg text-sm font-medium transition-all text-white',
                  STATUS_COLORS[status],
                  currentLead.status === status
                    ? 'ring-2 ring-offset-2 ring-gray-900'
                    : 'opacity-70 hover:opacity-100',
                  saving && 'opacity-50 cursor-not-allowed'
                )}
              >
                {STATUS_LABELS[status]}
              </button>
            ))}
          </div>
        </div>

        {/* Follow-up Date */}
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <h2 className="text-sm font-medium text-gray-500 mb-3">תאריך מעקב</h2>
          <div className="flex gap-3">
            <input
              type="date"
              value={followupDate}
              onChange={(e) => setFollowupDate(e.target.value)}
              className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            />
            <button
              onClick={handleSaveFollowup}
              disabled={saving}
              className="px-4 py-3 rounded-lg bg-gray-900 text-white font-medium hover:bg-gray-800 disabled:opacity-50 transition-colors"
            >
              {saving ? 'שומר...' : 'שמור'}
            </button>
          </div>
          {currentLead.next_followup_at && (
            <p className="mt-2 text-sm text-gray-500">
              נוכחי: {formatDate(currentLead.next_followup_at)}
            </p>
          )}
        </div>

        {/* Notes */}
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <h2 className="text-sm font-medium text-gray-500 mb-3">הערות</h2>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="הוסף הערות על הליד..."
            rows={4}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none mb-3"
          />
          <button
            onClick={handleSaveNotes}
            disabled={saving}
            className="w-full py-3 rounded-lg bg-gray-900 text-white font-medium hover:bg-gray-800 disabled:opacity-50 transition-colors"
          >
            {saving ? 'שומר...' : 'שמור הערות'}
          </button>
        </div>

        {/* Delete Lead */}
        <div className="bg-white rounded-xl border border-red-200 p-4">
          <h2 className="text-sm font-medium text-red-600 mb-3">אזור מסוכן</h2>
          {!showDeleteConfirm ? (
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="w-full py-3 rounded-lg border border-red-300 text-red-600 font-medium hover:bg-red-50 transition-colors"
            >
              מחק ליד
            </button>
          ) : (
            <div className="space-y-3">
              <p className="text-sm text-gray-600">
                האם אתה בטוח שברצונך למחוק את הליד? לא ניתן לבטל פעולה זו.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="flex-1 py-3 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                >
                  ביטול
                </button>
                <button
                  onClick={handleDelete}
                  disabled={deleting}
                  className="flex-1 py-3 rounded-lg bg-red-600 text-white font-medium hover:bg-red-700 disabled:opacity-50 transition-colors"
                >
                  {deleting ? 'מוחק...' : 'אשר מחיקה'}
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
