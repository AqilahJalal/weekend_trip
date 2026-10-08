import React, { useState, useMemo } from 'react';
import {
  MapPin,
  Calendar,
  Users,
  Plus,
  Trash2,
  Share2,
  Copy,
  Check,
  Car,
  Clock,
  Sparkles,
  ArrowRight,
  Route,
  Receipt,
  X,
  Edit2,
  Info,
  UserCheck,
  UserPlus,
  ArrowDownLeft,
  ArrowUpRight,
  Image as ImageIcon,
  ExternalLink,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { TripDetails, TripStop, TripExpense, RouteLeg, UserProfile, StopCategory, ExpenseCategory } from './types';
import {
  INITIAL_TRIP_DETAILS,
  INITIAL_STOPS,
  INITIAL_EXPENSES,
  INITIAL_LEGS,
  INITIAL_PROFILES,
  COLOR_PALETTES,
  TRIP_PRESETS,
} from './data/initialData';

// Image assets generated for OpenGraph and Hero
const OG_IMAGE_URL = '/src/assets/images/og_escape_planner_1791434551316.jpg';
const HERO_IMAGE_URL = '/src/assets/images/malaysia_weekend_hero_1791434566341.jpg';

// Category color styling mappings for clean, colorful yet minimalist appearance
const STOP_CATEGORY_THEMES: Record<StopCategory, { text: string; bg: string; border: string; dot: string }> = {
  'Food': {
    text: 'text-amber-800',
    bg: 'bg-amber-50',
    border: 'border-amber-200',
    dot: 'bg-amber-500',
  },
  'Culture & Heritage': {
    text: 'text-rose-800',
    bg: 'bg-rose-50',
    border: 'border-rose-200',
    dot: 'bg-rose-500',
  },
  'Nature & Sight': {
    text: 'text-emerald-800',
    bg: 'bg-emerald-50',
    border: 'border-emerald-200',
    dot: 'bg-emerald-500',
  },
  'Stay': {
    text: 'text-indigo-800',
    bg: 'bg-indigo-50',
    border: 'border-indigo-200',
    dot: 'bg-indigo-500',
  },
  'Leisure': {
    text: 'text-violet-800',
    bg: 'bg-violet-50',
    border: 'border-violet-200',
    dot: 'bg-violet-500',
  },
};

const EXPENSE_CATEGORY_THEMES: Record<ExpenseCategory, { text: string; bg: string; border: string }> = {
  'Transport': { text: 'text-sky-800', bg: 'bg-sky-50', border: 'border-sky-200' },
  'Food': { text: 'text-amber-800', bg: 'bg-amber-50', border: 'border-amber-200' },
  'Stay': { text: 'text-indigo-800', bg: 'bg-indigo-50', border: 'border-indigo-200' },
  'Activities': { text: 'text-emerald-800', bg: 'bg-emerald-50', border: 'border-emerald-200' },
  'Other': { text: 'text-stone-800', bg: 'bg-stone-50', border: 'border-stone-200' },
};

export default function App() {
  // Profiles State
  const [profiles, setProfiles] = useState<UserProfile[]>(INITIAL_PROFILES);

  // Trip Plan State
  const [tripDetails, setTripDetails] = useState<TripDetails>(INITIAL_TRIP_DETAILS);
  const [stops, setStops] = useState<TripStop[]>(INITIAL_STOPS);

  // Expenses State
  const [expenses, setExpenses] = useState<TripExpense[]>(INITIAL_EXPENSES);

  // Route & Distance State
  const [legs, setLegs] = useState<RouteLeg[]>(INITIAL_LEGS);

  // New Stop Form State
  const [newStopName, setNewStopName] = useState('');
  const [newStopLocation, setNewStopLocation] = useState('');
  const [newStopTiming, setNewStopTiming] = useState('Day 1 · Afternoon');
  const [newStopCategory, setNewStopCategory] = useState<StopCategory>('Food');
  const [newStopNotes, setNewStopNotes] = useState('');
  const [isAddingStopOpen, setIsAddingStopOpen] = useState(false);

  // New Expense Form State
  const [newExpenseTitle, setNewExpenseTitle] = useState('');
  const [newExpenseCategory, setNewExpenseCategory] = useState<ExpenseCategory>('Food');
  const [newExpenseAmount, setNewExpenseAmount] = useState('');
  const [newExpensePaidBy, setNewExpensePaidBy] = useState<string>(INITIAL_PROFILES[0]?.id || '');
  const [newExpenseSplitWith, setNewExpenseSplitWith] = useState<string[]>(
    INITIAL_PROFILES.map((p) => p.id)
  );
  const [newExpenseNotes, setNewExpenseNotes] = useState('');
  const [isAddingExpenseOpen, setIsAddingExpenseOpen] = useState(false);

  // New Profile Form State
  const [isAddingProfileOpen, setIsAddingProfileOpen] = useState(false);
  const [newProfileName, setNewProfileName] = useState('');
  const [newProfileRole, setNewProfileRole] = useState('Traveler');
  const [newProfileColorIdx, setNewProfileColorIdx] = useState(0);

  // Inline distance edit state
  const [editingLegId, setEditingLegId] = useState<string | null>(null);
  const [editDistanceValue, setEditDistanceValue] = useState<string>('');

  // Modals & Panels State
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isOGPreviewOpen, setIsOGPreviewOpen] = useState(false);
  const [copiedNotification, setCopiedNotification] = useState(false);
  const [showSettlementHelper, setShowSettlementHelper] = useState(true);

  // Edit Trip Details Modal State
  const [isEditingDetailsOpen, setIsEditingDetailsOpen] = useState(false);
  const [editTitle, setEditTitle] = useState(tripDetails.title);
  const [editDestination, setEditDestination] = useState(tripDetails.destination);
  const [editStartDate, setEditStartDate] = useState(tripDetails.startDate);
  const [editEndDate, setEditEndDate] = useState(tripDetails.endDate);

  // Quick Preset Selection
  const handleSelectPreset = (presetId: string) => {
    const preset = TRIP_PRESETS.find((p) => p.id === presetId);
    if (!preset) return;
    setTripDetails(preset.details);
    setStops(preset.stops);
    setExpenses(preset.expenses);
    setLegs(preset.legs);
  };

  const handleOpenEditDetails = () => {
    setEditTitle(tripDetails.title);
    setEditDestination(tripDetails.destination);
    setEditStartDate(tripDetails.startDate);
    setEditEndDate(tripDetails.endDate);
    setIsEditingDetailsOpen(true);
  };

  const handleSaveDetails = (e: React.FormEvent) => {
    e.preventDefault();
    setTripDetails((prev) => ({
      ...prev,
      title: editTitle.trim() || prev.title,
      destination: editDestination.trim() || prev.destination,
      startDate: editStartDate.trim() || prev.startDate,
      endDate: editEndDate.trim() || prev.endDate,
    }));
    setIsEditingDetailsOpen(false);
  };

  // -------------------------------------------------------------
  // PROFILES MANAGEMENT (Precise Individual Splits)
  // -------------------------------------------------------------
  const handleAddProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProfileName.trim()) return;

    const palette = COLOR_PALETTES[newProfileColorIdx % COLOR_PALETTES.length];
    const newProfile: UserProfile = {
      id: `user-${Date.now()}`,
      name: newProfileName.trim(),
      role: newProfileRole.trim() || 'Traveler',
      color: palette.color,
      avatarBg: palette.avatarBg,
      textColor: palette.textColor,
      badgeBg: palette.badgeBg,
    };

    const updated = [...profiles, newProfile];
    setProfiles(updated);
    setTripDetails((prev) => ({ ...prev, travelersCount: updated.length }));
    // reset
    setNewProfileName('');
    setNewProfileRole('Traveler');
    setNewProfileColorIdx((prev) => (prev + 1) % COLOR_PALETTES.length);
    setIsAddingProfileOpen(false);
  };

  const handleRemoveProfile = (profileId: string) => {
    if (profiles.length <= 1) return; // Keep at least 1 person
    const updated = profiles.filter((p) => p.id !== profileId);
    setProfiles(updated);
    setTripDetails((prev) => ({ ...prev, travelersCount: updated.length }));

    // Clean up expenses referencing this profile
    setExpenses((prev) =>
      prev.map((exp) => ({
        ...exp,
        paidById: exp.paidById === profileId ? (updated[0]?.id || '') : exp.paidById,
        splitWithIds: exp.splitWithIds.filter((id) => id !== profileId).length > 0
          ? exp.splitWithIds.filter((id) => id !== profileId)
          : [updated[0]?.id || ''],
      }))
    );
  };

  // -------------------------------------------------------------
  // FEATURE 1: ADD STOP
  // -------------------------------------------------------------
  const handleAddStop = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStopName.trim()) return;

    const stopId = `stop-${Date.now()}`;
    const newStop: TripStop = {
      id: stopId,
      name: newStopName.trim(),
      location: newStopLocation.trim() || tripDetails.destination,
      timing: newStopTiming.trim() || 'Flexible time',
      category: newStopCategory,
      notes: newStopNotes.trim(),
    };

    const updatedStops = [...stops, newStop];
    setStops(updatedStops);

    // Auto-connect to previous stop
    if (stops.length > 0) {
      const prevStop = stops[stops.length - 1];
      const newLeg: RouteLeg = {
        id: `leg-${Date.now()}`,
        fromStopId: prevStop.id,
        toStopId: stopId,
        fromName: prevStop.name,
        toName: newStop.name,
        distanceKm: 14,
      };
      setLegs((prev) => [...prev, newLeg]);
    }

    setNewStopName('');
    setNewStopLocation('');
    setNewStopTiming('Day 2 · Morning');
    setNewStopNotes('');
    setIsAddingStopOpen(false);
  };

  const handleRemoveStop = (stopId: string) => {
    const updatedStops = stops.filter((s) => s.id !== stopId);
    setStops(updatedStops);

    // Reconstruct legs cleanly
    const newLegsList: RouteLeg[] = [];
    for (let i = 0; i < updatedStops.length - 1; i++) {
      const current = updatedStops[i];
      const next = updatedStops[i + 1];
      const existing = legs.find(
        (l) => l.fromStopId === current.id && l.toStopId === next.id
      );
      newLegsList.push({
        id: existing ? existing.id : `leg-${current.id}-${next.id}`,
        fromStopId: current.id,
        toStopId: next.id,
        fromName: current.name,
        toName: next.name,
        distanceKm: existing ? existing.distanceKm : 12,
      });
    }
    setLegs(newLegsList);
  };

  // -------------------------------------------------------------
  // FEATURE 2: ADD EXPENSE (With Precise Individual Splits)
  // -------------------------------------------------------------
  const handleAddExpense = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseFloat(newExpenseAmount);
    if (!newExpenseTitle.trim() || isNaN(amount) || amount <= 0) return;

    // Default split with everyone if none selected
    const splitWith = newExpenseSplitWith.length > 0 ? newExpenseSplitWith : profiles.map((p) => p.id);

    const newExpense: TripExpense = {
      id: `exp-${Date.now()}`,
      title: newExpenseTitle.trim(),
      category: newExpenseCategory,
      amountMYR: Math.round(amount * 100) / 100,
      paidById: newExpensePaidBy || profiles[0]?.id || '',
      splitWithIds: splitWith,
      notes: newExpenseNotes.trim() || undefined,
    };

    setExpenses((prev) => [newExpense, ...prev]);

    setNewExpenseTitle('');
    setNewExpenseAmount('');
    setNewExpenseNotes('');
    setNewExpenseSplitWith(profiles.map((p) => p.id));
    setIsAddingExpenseOpen(false);
  };

  const handleRemoveExpense = (id: string) => {
    setExpenses((prev) => prev.filter((exp) => exp.id !== id));
  };

  // -------------------------------------------------------------
  // FEATURE 3: UPDATE DISTANCE
  // -------------------------------------------------------------
  const handleStartEditDistance = (leg: RouteLeg) => {
    setEditingLegId(leg.id);
    setEditDistanceValue(leg.distanceKm.toString());
  };

  const handleSaveDistance = (legId: string) => {
    const val = parseFloat(editDistanceValue);
    if (!isNaN(val) && val >= 0) {
      setLegs((prev) =>
        prev.map((leg) =>
          leg.id === legId ? { ...leg, distanceKm: Math.round(val * 10) / 10 } : leg
        )
      );
    }
    setEditingLegId(null);
  };

  const handleQuickAdjustDistance = (legId: string, deltaKm: number) => {
    setLegs((prev) =>
      prev.map((leg) => {
        if (leg.id === legId) {
          const nextKm = Math.max(1, Math.round((leg.distanceKm + deltaKm) * 10) / 10);
          return { ...leg, distanceKm: nextKm };
        }
        return leg;
      })
    );
  };

  // -------------------------------------------------------------
  // PRECISE INDIVIDUAL SPLIT CALCULATIONS
  // -------------------------------------------------------------
  const profileFinances = useMemo(() => {
    // Map of profileId -> { paid: number, share: number, net: number }
    const financeMap: Record<string, { paid: number; share: number; net: number }> = {};
    profiles.forEach((p) => {
      financeMap[p.id] = { paid: 0, share: 0, net: 0 };
    });

    expenses.forEach((item) => {
      // Add to who paid
      if (financeMap[item.paidById]) {
        financeMap[item.paidById].paid += item.amountMYR;
      }

      // Distribute to split members
      const activeSplitters = item.splitWithIds.filter((id) => financeMap[id]);
      if (activeSplitters.length > 0) {
        const perPerson = item.amountMYR / activeSplitters.length;
        activeSplitters.forEach((id) => {
          financeMap[id].share += perPerson;
        });
      }
    });

    // Calculate net (paid - share). Positive = is owed back, Negative = owes to others
    Object.keys(financeMap).forEach((id) => {
      financeMap[id].net = financeMap[id].paid - financeMap[id].share;
    });

    return financeMap;
  }, [profiles, expenses]);

  // Settlement Transfers algorithm (Debt simplification)
  const settlementTransfers = useMemo(() => {
    const debtors: { id: string; amount: number }[] = [];
    const creditors: { id: string; amount: number }[] = [];

    profiles.forEach((p) => {
      const net = profileFinances[p.id]?.net || 0;
      if (net < -0.01) {
        debtors.push({ id: p.id, amount: Math.abs(net) });
      } else if (net > 0.01) {
        creditors.push({ id: p.id, amount: net });
      }
    });

    const transfers: { from: string; to: string; amount: number }[] = [];
    let dIdx = 0;
    let cIdx = 0;

    while (dIdx < debtors.length && cIdx < creditors.length) {
      const debtor = debtors[dIdx];
      const creditor = creditors[cIdx];
      const settlement = Math.min(debtor.amount, creditor.amount);

      transfers.push({
        from: debtor.id,
        to: creditor.id,
        amount: Math.round(settlement * 100) / 100,
      });

      debtor.amount -= settlement;
      creditor.amount -= settlement;

      if (debtor.amount < 0.01) dIdx++;
      if (creditor.amount < 0.01) cIdx++;
    }

    return transfers;
  }, [profiles, profileFinances]);

  // Overall totals
  const totalExpenseMYR = useMemo(() => {
    return expenses.reduce((sum, item) => sum + item.amountMYR, 0);
  }, [expenses]);

  const totalDistanceKm = useMemo(() => {
    return legs.reduce((sum, leg) => sum + leg.distanceKm, 0);
  }, [legs]);

  const estimatedTravelTime = useMemo(() => {
    if (totalDistanceKm === 0) return '0 min';
    const totalMinutes = Math.round((totalDistanceKm / 60) * 60);
    const hours = Math.floor(totalMinutes / 60);
    const mins = totalMinutes % 60;
    if (hours === 0) return `${mins} min`;
    return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
  }, [totalDistanceKm]);

  // Formatted Invitation Text
  const shareMessageText = useMemo(() => {
    const stopsList = stops
      .map((s, idx) => `${idx + 1}. ${s.name} (${s.location}) - ${s.timing}`)
      .join('\n');

    const travelerSplits = profiles
      .map((p) => {
        const fin = profileFinances[p.id];
        const netStr = fin ? (fin.net >= 0 ? `+RM ${fin.net.toFixed(2)} to claim` : `-RM ${Math.abs(fin.net).toFixed(2)} to pay`) : '';
        return `• ${p.name} (${p.role}): Share RM ${(fin?.share || 0).toFixed(2)} (${netStr})`;
      })
      .join('\n');

    return `🇲🇾 Weekend Escape Invite: ${tripDetails.title}

📍 Destination: ${tripDetails.destination}
📅 Dates: ${tripDetails.startDate} – ${tripDetails.endDate}
👥 Travelers (${profiles.length}): ${profiles.map((p) => p.name).join(', ')}

🗺️ Stops Itinerary:
${stopsList || 'No stops added yet'}

🚗 Total Estimated Route Distance: ~${totalDistanceKm} km (${estimatedTravelTime} driving)
💰 Total Budget: RM ${totalExpenseMYR.toLocaleString()}

💳 Precise Individual Cost Splits:
${travelerSplits}

Let me know if you want to join or adjust any stops!`;
  }, [tripDetails, stops, profiles, profileFinances, totalDistanceKm, estimatedTravelTime, totalExpenseMYR]);

  const handleCopyInvite = async () => {
    try {
      await navigator.clipboard.writeText(shareMessageText);
      setCopiedNotification(true);
      setTimeout(() => setCopiedNotification(false), 2600);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = shareMessageText;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopiedNotification(true);
      setTimeout(() => setCopiedNotification(false), 2600);
    }
  };

  return (
    <div className="min-h-screen bg-[#fafaf7] text-stone-900 antialiased font-sans">
      {/* TOP NAVIGATION BAR */}
      <header className="sticky top-0 z-30 bg-[#fafaf7]/90 backdrop-blur-md border-b border-stone-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Brand Wordmark with subtle Malaysian hibiscus-inspired ruby touch */}
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-emerald-700 flex items-center justify-center text-white text-xs font-bold shadow-xs">
              WE
            </div>
            <a href="#" className="text-lg font-bold tracking-tight text-stone-900 hover:text-emerald-800 transition-colors">
              Weekend Escape Planner
            </a>
          </div>

          {/* Clean Section Anchors */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-stone-600">
            <a href="#trip-plan" className="hover:text-emerald-800 transition-colors">
              Trip Plan
            </a>
            <a href="#profiles-section" className="hover:text-emerald-800 transition-colors">
              Travelers ({profiles.length})
            </a>
            <a href="#expenses" className="hover:text-emerald-800 transition-colors">
              Expenses & Splits
            </a>
            <a href="#distance" className="hover:text-emerald-800 transition-colors">
              Distance Route
            </a>
          </nav>

          {/* Actions: OG Card Preview & Share Invite */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => setIsOGPreviewOpen(true)}
              title="View OpenGraph Social Graphic"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-stone-700 bg-white hover:bg-stone-100 border border-stone-300 rounded-lg transition-colors cursor-pointer"
            >
              <ImageIcon className="w-3.5 h-3.5 text-indigo-600" />
              <span className="hidden sm:inline">OG Graphics</span>
            </button>

            <button
              onClick={() => setIsShareModalOpen(true)}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 text-xs sm:text-sm font-medium text-white bg-emerald-800 hover:bg-emerald-700 active:bg-emerald-900 rounded-lg transition-colors shadow-xs whitespace-nowrap cursor-pointer"
            >
              <Share2 className="w-4 h-4" />
              <span>Share Invite</span>
            </button>
          </div>
        </div>
      </header>

      {/* MAIN CONTAINER */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-10">
        {/* HERO BANNER: Colourful with real Malaysian Landscape Asset */}
        <div className="relative overflow-hidden border border-stone-200 bg-white rounded-2xl shadow-xs">
          {/* Background photograph with measured subtle gradient scrim */}
          <div className="relative h-48 sm:h-56 md:h-64 w-full overflow-hidden bg-stone-100">
            <img
              src={HERO_IMAGE_URL}
              alt="Malaysian weekend escape landscape"
              className="w-full h-full object-cover object-center filter saturate-110"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-900/40 to-transparent" />
            
            {/* Top Right Quick Presets */}
            <div className="absolute top-4 right-4 flex flex-wrap gap-1.5 justify-end z-10">
              <span className="hidden sm:inline-block text-xs font-medium text-white/90 mr-1 pt-1 drop-shadow-xs">
                Malaysian Trails:
              </span>
              {TRIP_PRESETS.map((p) => (
                <button
                  key={p.id}
                  onClick={() => handleSelectPreset(p.id)}
                  className="px-2.5 py-1 text-xs font-semibold bg-white/90 hover:bg-white text-stone-900 rounded-lg shadow-xs backdrop-blur-xs transition-all cursor-pointer"
                >
                  {p.label}
                </button>
              ))}
            </div>

            {/* Bottom Scrim Content Overlay */}
            <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 text-white flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div className="space-y-1.5 max-w-2xl">
                <div className="flex items-center gap-2 text-xs font-medium text-emerald-300 drop-shadow-xs">
                  <span className="px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-500/30">
                    Malaysia Getaway
                  </span>
                  <span>·</span>
                  <span>Interactive Weekend Planner</span>
                </div>
                <div className="flex items-center gap-2">
                  <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight text-white drop-shadow-sm text-balance">
                    {tripDetails.title}
                  </h1>
                  <button
                    onClick={handleOpenEditDetails}
                    title="Edit trip destination and dates"
                    className="p-1.5 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-lg transition-colors cursor-pointer shrink-0"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs sm:text-sm text-stone-200">
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
                    {tripDetails.destination}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-amber-300 shrink-0" />
                    {tripDetails.startDate} – {tripDetails.endDate}
                  </span>
                </div>
              </div>

              {/* Quick stats badges */}
              <div className="flex items-center gap-3 shrink-0">
                <div className="bg-black/50 backdrop-blur-md border border-white/20 rounded-xl px-3.5 py-2 text-right">
                  <div className="text-[10px] text-stone-300 uppercase tracking-wider font-semibold">Travelers</div>
                  <div className="text-base font-bold font-mono text-emerald-300">{profiles.length} pax</div>
                </div>
                <div className="bg-black/50 backdrop-blur-md border border-white/20 rounded-xl px-3.5 py-2 text-right">
                  <div className="text-[10px] text-stone-300 uppercase tracking-wider font-semibold">Total Budget</div>
                  <div className="text-base font-bold font-mono text-amber-300">RM {totalExpenseMYR}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* INDIVIDUAL PROFILES SECTION (NEW FEATURE: Precise Cost Split) */}
        {/* ========================================================= */}
        <section id="profiles-section" className="scroll-mt-20">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700">
                <span>Travel Crew Profiles</span>
                <span aria-hidden="true">·</span>
                <span className="text-stone-500 font-normal">Individual Member Balances</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-stone-900">
                Individual Traveler Profiles & Split Precision
              </h2>
              <p className="text-sm text-stone-600 mt-0.5">
                Every member has their own profile so group expenses and repayments calculate down to the exact sen.
              </p>
            </div>

            <button
              onClick={() => setIsAddingProfileOpen(!isAddingProfileOpen)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs sm:text-sm font-medium text-stone-800 bg-white border border-stone-300 hover:border-stone-400 hover:bg-stone-50 rounded-lg transition-colors shadow-2xs whitespace-nowrap cursor-pointer self-start sm:self-auto"
            >
              <UserPlus className="w-4 h-4 text-emerald-700" />
              <span>{isAddingProfileOpen ? 'Cancel' : 'Add Traveler'}</span>
            </button>
          </div>

          {/* ADD TRAVELER FORM */}
          {isAddingProfileOpen && (
            <div className="mt-6 border border-emerald-200 bg-emerald-50/50 rounded-xl p-5 sm:p-6 transition-all">
              <div className="flex items-center justify-between pb-3 border-b border-emerald-100">
                <div className="flex items-center gap-2">
                  <UserPlus className="w-4 h-4 text-emerald-700" />
                  <h3 className="text-sm font-semibold text-emerald-950">Add Individual to Trip</h3>
                </div>
                <button
                  onClick={() => setIsAddingProfileOpen(false)}
                  className="text-stone-400 hover:text-stone-600 p-1 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleAddProfile} className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    Traveler Name <span className="text-emerald-700">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Farhan, Mei Ling, Danial"
                    value={newProfileName}
                    onChange={(e) => setNewProfileName(e.target.value)}
                    className="w-full text-sm px-3 py-2 bg-white border border-stone-300 rounded-lg focus:outline-none focus:border-emerald-700 focus:ring-1 focus:ring-emerald-700"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    Trip Role / Duty
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Treasurer, Snack Master, Navigator"
                    value={newProfileRole}
                    onChange={(e) => setNewProfileRole(e.target.value)}
                    className="w-full text-sm px-3 py-2 bg-white border border-stone-300 rounded-lg focus:outline-none focus:border-emerald-700 focus:ring-1 focus:ring-emerald-700"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    Avatar Accent
                  </label>
                  <div className="flex items-center gap-2 pt-1">
                    {COLOR_PALETTES.map((palette, idx) => (
                      <button
                        key={palette.color}
                        type="button"
                        onClick={() => setNewProfileColorIdx(idx)}
                        className={`w-7 h-7 rounded-full ${palette.avatarBg} transition-transform cursor-pointer ${
                          newProfileColorIdx === idx ? 'ring-2 ring-offset-2 ring-stone-900 scale-110' : 'opacity-80 hover:opacity-100'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                <div className="sm:col-span-3 flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsAddingProfileOpen(false)}
                    className="px-3.5 py-2 text-xs font-medium text-stone-600 hover:text-stone-900 bg-white border border-stone-200 rounded-lg cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-xs font-medium text-white bg-emerald-800 hover:bg-emerald-700 rounded-lg transition-colors cursor-pointer"
                  >
                    Save Traveler Profile
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* TRAVELER PROFILE CARDS GRID (With colourful accents and exact split metrics) */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {profiles.map((profile) => {
              const fin = profileFinances[profile.id] || { paid: 0, share: 0, net: 0 };
              const isOwed = fin.net > 0.01;
              const owes = fin.net < -0.01;

              return (
                <div
                  key={profile.id}
                  className="border border-stone-200 bg-white rounded-xl p-4 sm:p-5 relative hover:border-stone-300 transition-colors"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      {/* Colourful Avatar */}
                      <div className={`w-11 h-11 rounded-full ${profile.avatarBg} text-white font-bold flex items-center justify-center text-sm shadow-xs shrink-0`}>
                        {profile.name.substring(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <div className="font-semibold text-stone-900 text-sm sm:text-base flex items-center gap-1.5">
                          <span>{profile.name}</span>
                          <span className={`text-[11px] px-2 py-0.5 rounded-full font-medium ${profile.badgeBg}`}>
                            {profile.role}
                          </span>
                        </div>
                        <div className="text-xs text-stone-500 pt-0.5">
                          Fair share: <span className="font-mono tabular-nums font-semibold text-stone-800">RM {fin.share.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>

                    {profiles.length > 1 && (
                      <button
                        onClick={() => handleRemoveProfile(profile.id)}
                        title="Remove traveler"
                        className="text-stone-300 hover:text-rose-600 p-1 rounded-md transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  {/* Financial Balance Strip for this traveler */}
                  <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
                    <div>
                      <span className="text-stone-500 block">Paid upfront:</span>
                      <span className="font-mono tabular-nums font-semibold text-stone-900">
                        RM {fin.paid.toFixed(2)}
                      </span>
                    </div>

                    <div className="text-right">
                      <span className="text-stone-500 block">Balance status:</span>
                      {isOwed && (
                        <span className="inline-flex items-center gap-0.5 font-mono tabular-nums font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                          <ArrowDownLeft className="w-3 h-3" />
                          +RM {fin.net.toFixed(2)} back
                        </span>
                      )}
                      {owes && (
                        <span className="inline-flex items-center gap-0.5 font-mono tabular-nums font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                          <ArrowUpRight className="w-3 h-3" />
                          -RM {Math.abs(fin.net).toFixed(2)} owes
                        </span>
                      )}
                      {!isOwed && !owes && (
                        <span className="font-mono tabular-nums text-stone-500 bg-stone-100 px-2 py-0.5 rounded">
                          Settled up
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* SMART SETTLEMENT TRANSFERS ACCORDION ("Who Pays Whom via DuitNow/Touch'n Go") */}
          {settlementTransfers.length > 0 && (
            <div className="mt-4 border border-indigo-200/80 bg-indigo-50/40 rounded-xl p-4 sm:p-5">
              <div className="flex items-center justify-between cursor-pointer" onClick={() => setShowSettlementHelper(!showSettlementHelper)}>
                <div className="flex items-center gap-2">
                  <UserCheck className="w-4 h-4 text-indigo-700" />
                  <span className="text-xs sm:text-sm font-semibold text-indigo-950">
                    Smart Debt Settlement Summary ({settlementTransfers.length} transfer{settlementTransfers.length > 1 ? 's' : ''} needed)
                  </span>
                </div>
                <button className="text-indigo-700 hover:text-indigo-900 text-xs font-medium flex items-center gap-1 cursor-pointer">
                  <span>{showSettlementHelper ? 'Hide' : 'Show Details'}</span>
                  {showSettlementHelper ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
              </div>

              {showSettlementHelper && (
                <div className="mt-3 pt-3 border-t border-indigo-100 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                  {settlementTransfers.map((transfer, idx) => {
                    const fromPerson = profiles.find((p) => p.id === transfer.from);
                    const toPerson = profiles.find((p) => p.id === transfer.to);
                    return (
                      <div
                        key={idx}
                        className="bg-white border border-indigo-100 rounded-lg p-2.5 flex items-center justify-between text-xs"
                      >
                        <div className="flex items-center gap-1.5 font-medium text-stone-800">
                          <span className="font-semibold text-rose-700">{fromPerson?.name}</span>
                          <span className="text-stone-400">pays</span>
                          <span className="font-semibold text-emerald-700">{toPerson?.name}</span>
                        </div>
                        <div className="font-mono tabular-nums font-bold text-indigo-900 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
                          RM {transfer.amount.toFixed(2)}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </section>

        {/* ========================================================= */}
        {/* SECTION 1: TRIP PLAN (Stacked Region 1) */}
        {/* ========================================================= */}
        <section id="trip-plan" className="scroll-mt-20">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-amber-700">
                <span>Section 01</span>
                <span aria-hidden="true">·</span>
                <span className="text-stone-500 font-normal">Malaysian Itinerary</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-stone-900">
                Trip Plan
              </h2>
              <p className="text-sm text-stone-600 mt-0.5">
                Stops and attractions mapped for the weekend trip. Add food spots, culture sites, or scenic overlooks.
              </p>
            </div>

            <button
              onClick={() => setIsAddingStopOpen(!isAddingStopOpen)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs sm:text-sm font-medium text-stone-800 bg-white border border-stone-300 hover:border-stone-400 hover:bg-stone-50 rounded-lg transition-colors shadow-2xs whitespace-nowrap cursor-pointer self-start sm:self-auto"
            >
              <Plus className="w-4 h-4 text-emerald-700" />
              <span>{isAddingStopOpen ? 'Close Form' : 'Add Stop'}</span>
            </button>
          </div>

          {/* ADD STOP FORM (FEATURE 1) */}
          {isAddingStopOpen && (
            <div className="mt-6 border border-emerald-200 bg-emerald-50/40 rounded-xl p-5 sm:p-6 transition-all">
              <div className="flex items-center justify-between pb-3 border-b border-emerald-100">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-emerald-700" />
                  <h3 className="text-sm font-semibold text-emerald-950">Add a New Stop to Itinerary</h3>
                </div>
                <button
                  onClick={() => setIsAddingStopOpen(false)}
                  className="text-stone-400 hover:text-stone-600 p-1 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleAddStop} className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    Stop Name <span className="text-emerald-700">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Concubine Lane, Ipoh White Coffee"
                    value={newStopName}
                    onChange={(e) => setNewStopName(e.target.value)}
                    className="w-full text-sm px-3 py-2 bg-white border border-stone-300 rounded-lg focus:outline-none focus:border-emerald-700 focus:ring-1 focus:ring-emerald-700"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    Location / Area
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Ipoh Old Town"
                    value={newStopLocation}
                    onChange={(e) => setNewStopLocation(e.target.value)}
                    className="w-full text-sm px-3 py-2 bg-white border border-stone-300 rounded-lg focus:outline-none focus:border-emerald-700 focus:ring-1 focus:ring-emerald-700"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    Timing / Schedule
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Day 1 · 11:30 AM"
                    value={newStopTiming}
                    onChange={(e) => setNewStopTiming(e.target.value)}
                    className="w-full text-sm px-3 py-2 bg-white border border-stone-300 rounded-lg focus:outline-none focus:border-emerald-700 focus:ring-1 focus:ring-emerald-700"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    Category
                  </label>
                  <select
                    value={newStopCategory}
                    onChange={(e) => setNewStopCategory(e.target.value as StopCategory)}
                    className="w-full text-sm px-3 py-2 bg-white border border-stone-300 rounded-lg focus:outline-none focus:border-emerald-700 focus:ring-1 focus:ring-emerald-700"
                  >
                    <option value="Food">Food & Hawker</option>
                    <option value="Culture & Heritage">Culture & Heritage</option>
                    <option value="Nature & Sight">Nature & Sight</option>
                    <option value="Stay">Stay / Hotel</option>
                    <option value="Leisure">Leisure & Shopping</option>
                  </select>
                </div>

                <div className="sm:col-span-2 lg:col-span-3">
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    Notes & Tips (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Order egg tarts early, park near the heritage square"
                    value={newStopNotes}
                    onChange={(e) => setNewStopNotes(e.target.value)}
                    className="w-full text-sm px-3 py-2 bg-white border border-stone-300 rounded-lg focus:outline-none focus:border-emerald-700 focus:ring-1 focus:ring-emerald-700"
                  />
                </div>

                <div className="sm:col-span-2 lg:col-span-4 flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsAddingStopOpen(false)}
                    className="px-3.5 py-2 text-xs font-medium text-stone-600 hover:text-stone-900 bg-white border border-stone-200 rounded-lg cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-xs font-medium text-white bg-emerald-800 hover:bg-emerald-700 rounded-lg transition-colors cursor-pointer shadow-xs"
                  >
                    Add to Trip Plan
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* STOPS LIST (With Colourful Category Tags & Clean Scannable Layout) */}
          <div className="mt-6 space-y-3">
            {stops.length === 0 ? (
              <div className="p-8 text-center border border-dashed border-stone-300 rounded-xl bg-white">
                <p className="text-sm text-stone-500">No stops in this trip yet.</p>
                <button
                  onClick={() => setIsAddingStopOpen(true)}
                  className="mt-3 px-3 py-1.5 text-xs font-medium text-emerald-800 bg-emerald-50 rounded-lg cursor-pointer hover:bg-emerald-100"
                >
                  Add your first Malaysian stop
                </button>
              </div>
            ) : (
              stops.map((stop, index) => {
                const categoryTheme = STOP_CATEGORY_THEMES[stop.category] || STOP_CATEGORY_THEMES['Food'];

                return (
                  <div
                    key={stop.id}
                    className="border border-stone-200 bg-white rounded-xl p-4 sm:p-5 hover:border-stone-300 transition-colors flex flex-col sm:flex-row sm:items-start justify-between gap-4"
                  >
                    <div className="flex items-start gap-3 sm:gap-4">
                      {/* Numerical Stop Marker with colorful border accent */}
                      <div className={`w-8 h-8 rounded-lg ${categoryTheme.bg} border ${categoryTheme.border} flex items-center justify-center text-xs font-bold font-mono ${categoryTheme.text} shrink-0`}>
                        0{index + 1}
                      </div>

                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-x-2.5 gap-y-0.5 text-xs text-stone-500">
                          <span className={`font-semibold inline-flex items-center gap-1.5 ${categoryTheme.text}`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${categoryTheme.dot}`} />
                            {stop.category}
                          </span>
                          <span aria-hidden="true">·</span>
                          <span className="font-medium text-stone-700">{stop.timing}</span>
                          <span aria-hidden="true">·</span>
                          <span className="inline-flex items-center gap-1 text-stone-500">
                            <MapPin className="w-3 h-3 text-stone-400" />
                            {stop.location}
                          </span>
                        </div>

                        <h3 className="text-base font-semibold text-stone-900">
                          {stop.name}
                        </h3>

                        {stop.notes && (
                          <p className="text-sm text-stone-600 pt-0.5">
                            {stop.notes}
                          </p>
                        )}
                      </div>
                    </div>

                    <button
                      onClick={() => handleRemoveStop(stop.id)}
                      title="Remove stop"
                      className="p-1.5 text-stone-300 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer self-end sm:self-start shrink-0"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                );
              })
            )}
          </div>
        </section>

        {/* ========================================================= */}
        {/* SECTION 2: EXPENSES (Stacked Region 2) */}
        {/* ========================================================= */}
        <section id="expenses" className="scroll-mt-20">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-sky-700">
                <span>Section 02</span>
                <span aria-hidden="true">·</span>
                <span className="text-stone-500 font-normal">Costs & Member Attribution</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-stone-900">
                Expenses & Precise Cost Splits
              </h2>
              <p className="text-sm text-stone-600 mt-0.5">
                Track sample costs in Malaysia (MYR / RM) with individual payer assignment and exact split groups.
              </p>
            </div>

            <button
              onClick={() => setIsAddingExpenseOpen(!isAddingExpenseOpen)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs sm:text-sm font-medium text-stone-800 bg-white border border-stone-300 hover:border-stone-400 hover:bg-stone-50 rounded-lg transition-colors shadow-2xs whitespace-nowrap cursor-pointer self-start sm:self-auto"
            >
              <Plus className="w-4 h-4 text-emerald-700" />
              <span>{isAddingExpenseOpen ? 'Close Form' : 'Add Expense'}</span>
            </button>
          </div>

          {/* EXPENSE SUMMARY BAR (With colourful category tiles) */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="border border-stone-200 bg-white rounded-xl p-4">
              <div className="text-xs text-stone-500 font-medium">Total Trip Expense</div>
              <div className="mt-1 text-2xl font-bold font-mono tabular-nums text-stone-900">
                RM {totalExpenseMYR.toLocaleString()}
              </div>
              <div className="mt-1 text-xs text-stone-500">Across {expenses.length} logged items</div>
            </div>

            <div className="border border-stone-200 bg-white rounded-xl p-4">
              <div className="text-xs text-stone-500 font-medium">Equal Average Per Person</div>
              <div className="mt-1 text-2xl font-bold font-mono tabular-nums text-emerald-800">
                RM {Math.round(totalExpenseMYR / Math.max(1, profiles.length)).toLocaleString()}
              </div>
              <div className="mt-1 text-xs text-stone-500">
                For {profiles.length} individual traveler{profiles.length > 1 ? 's' : ''}
              </div>
            </div>

            <div className="border border-stone-200 bg-white rounded-xl p-4 sm:col-span-2">
              <div className="text-xs text-stone-500 font-medium mb-1">Expenses by Category</div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 text-xs">
                <div className="bg-indigo-50/60 p-2 rounded-lg border border-indigo-100">
                  <span className="text-indigo-800 font-semibold block">Stay:</span>
                  <span className="font-mono tabular-nums font-bold text-stone-900">
                    RM {expenses.filter((e) => e.category === 'Stay').reduce((s, e) => s + e.amountMYR, 0)}
                  </span>
                </div>
                <div className="bg-amber-50/60 p-2 rounded-lg border border-amber-100">
                  <span className="text-amber-800 font-semibold block">Food:</span>
                  <span className="font-mono tabular-nums font-bold text-stone-900">
                    RM {expenses.filter((e) => e.category === 'Food').reduce((s, e) => s + e.amountMYR, 0)}
                  </span>
                </div>
                <div className="bg-sky-50/60 p-2 rounded-lg border border-sky-100">
                  <span className="text-sky-800 font-semibold block">Transport:</span>
                  <span className="font-mono tabular-nums font-bold text-stone-900">
                    RM {expenses.filter((e) => e.category === 'Transport').reduce((s, e) => s + e.amountMYR, 0)}
                  </span>
                </div>
                <div className="bg-emerald-50/60 p-2 rounded-lg border border-emerald-100">
                  <span className="text-emerald-800 font-semibold block">Activities:</span>
                  <span className="font-mono tabular-nums font-bold text-stone-900">
                    RM {expenses.filter((e) => e.category === 'Activities').reduce((s, e) => s + e.amountMYR, 0)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* ADD EXPENSE FORM (FEATURE 2: With Payer & Split Selector) */}
          {isAddingExpenseOpen && (
            <div className="mt-6 border border-emerald-200 bg-emerald-50/40 rounded-xl p-5 sm:p-6 transition-all">
              <div className="flex items-center justify-between pb-3 border-b border-emerald-100">
                <div className="flex items-center gap-2">
                  <Receipt className="w-4 h-4 text-emerald-700" />
                  <h3 className="text-sm font-semibold text-emerald-950">Add a Trip Expense with Split Details</h3>
                </div>
                <button
                  onClick={() => setIsAddingExpenseOpen(false)}
                  className="text-stone-400 hover:text-stone-600 p-1 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleAddExpense} className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    Expense Title <span className="text-emerald-700">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. PLUS Highway Toll & Petrol, Dim Sum Breakfast"
                    value={newExpenseTitle}
                    onChange={(e) => setNewExpenseTitle(e.target.value)}
                    className="w-full text-sm px-3 py-2 bg-white border border-stone-300 rounded-lg focus:outline-none focus:border-emerald-700 focus:ring-1 focus:ring-emerald-700"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    Category
                  </label>
                  <select
                    value={newExpenseCategory}
                    onChange={(e) => setNewExpenseCategory(e.target.value as ExpenseCategory)}
                    className="w-full text-sm px-3 py-2 bg-white border border-stone-300 rounded-lg focus:outline-none focus:border-emerald-700 focus:ring-1 focus:ring-emerald-700"
                  >
                    <option value="Transport">Transport (ETS, Petrol, Grab)</option>
                    <option value="Food">Food & Hawker Stalls</option>
                    <option value="Stay">Stay / Accommodation</option>
                    <option value="Activities">Activities & Tickets</option>
                    <option value="Other">Other / Sundries</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    Estimated Amount (RM) <span className="text-emerald-700">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-xs font-mono text-stone-500 font-semibold">RM</span>
                    <input
                      type="number"
                      step="any"
                      min="0.5"
                      required
                      placeholder="0.00"
                      value={newExpenseAmount}
                      onChange={(e) => setNewExpenseAmount(e.target.value)}
                      className="w-full text-sm pl-10 pr-3 py-2 font-mono tabular-nums bg-white border border-stone-300 rounded-lg focus:outline-none focus:border-emerald-700 focus:ring-1 focus:ring-emerald-700"
                    />
                  </div>
                </div>

                {/* Individual Payer Dropdown */}
                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    Paid By <span className="text-emerald-700">*</span>
                  </label>
                  <select
                    value={newExpensePaidBy}
                    onChange={(e) => setNewExpensePaidBy(e.target.value)}
                    className="w-full text-sm px-3 py-2 bg-white border border-stone-300 rounded-lg focus:outline-none focus:border-emerald-700 focus:ring-1 focus:ring-emerald-700"
                  >
                    {profiles.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name} ({p.role})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Split With Members Checkboxes */}
                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    Split Among
                  </label>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {profiles.map((p) => {
                      const isIncluded = newExpenseSplitWith.includes(p.id);
                      return (
                        <button
                          key={p.id}
                          type="button"
                          onClick={() => {
                            if (isIncluded) {
                              if (newExpenseSplitWith.length > 1) {
                                setNewExpenseSplitWith(newExpenseSplitWith.filter((id) => id !== p.id));
                              }
                            } else {
                              setNewExpenseSplitWith([...newExpenseSplitWith, p.id]);
                            }
                          }}
                          className={`px-2.5 py-1 text-xs rounded-md border font-medium transition-colors cursor-pointer ${
                            isIncluded
                              ? 'bg-emerald-800 text-white border-emerald-800'
                              : 'bg-white text-stone-600 border-stone-300 hover:bg-stone-100'
                          }`}
                        >
                          {p.name}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    Notes / Split Info (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Paid via Touch 'n Go eWallet, includes dessert"
                    value={newExpenseNotes}
                    onChange={(e) => setNewExpenseNotes(e.target.value)}
                    className="w-full text-sm px-3 py-2 bg-white border border-stone-300 rounded-lg focus:outline-none focus:border-emerald-700 focus:ring-1 focus:ring-emerald-700"
                  />
                </div>

                <div className="sm:col-span-3 flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsAddingExpenseOpen(false)}
                    className="px-3.5 py-2 text-xs font-medium text-stone-600 hover:text-stone-900 bg-white border border-stone-200 rounded-lg cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-xs font-medium text-white bg-emerald-800 hover:bg-emerald-700 rounded-lg transition-colors cursor-pointer shadow-xs"
                  >
                    Add Expense
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* EXPENSES LIST */}
          <div className="mt-6 border border-stone-200 bg-white rounded-xl divide-y divide-stone-100 overflow-hidden">
            {expenses.length === 0 ? (
              <div className="p-8 text-center">
                <p className="text-sm text-stone-500">No expenses recorded yet.</p>
                <button
                  onClick={() => setIsAddingExpenseOpen(true)}
                  className="mt-3 px-3 py-1.5 text-xs font-medium text-emerald-800 bg-emerald-50 rounded-lg cursor-pointer hover:bg-emerald-100"
                >
                  Add your first expense
                </button>
              </div>
            ) : (
              expenses.map((item) => {
                const payer = profiles.find((p) => p.id === item.paidById);
                const categoryTheme = EXPENSE_CATEGORY_THEMES[item.category] || EXPENSE_CATEGORY_THEMES['Other'];

                return (
                  <div
                    key={item.id}
                    className="p-4 sm:px-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-stone-50/60 transition-colors"
                  >
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2 text-xs text-stone-500">
                        <span className={`font-semibold px-2 py-0.5 rounded ${categoryTheme.bg} ${categoryTheme.text} border ${categoryTheme.border}`}>
                          {item.category}
                        </span>
                        <span aria-hidden="true">·</span>
                        <span className="text-stone-700">
                          Paid by <strong className="font-medium text-stone-900">{payer?.name || 'Someone'}</strong>
                        </span>
                        <span aria-hidden="true">·</span>
                        <span className="text-stone-500">
                          Split among {item.splitWithIds.length} person{item.splitWithIds.length > 1 ? 's' : ''}
                        </span>
                      </div>
                      <div className="text-sm font-semibold text-stone-900">
                        {item.title}
                      </div>
                      {item.notes && (
                        <div className="text-xs text-stone-500">
                          {item.notes}
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-4 shrink-0 self-end sm:self-center">
                      <div className="text-right">
                        <div className="text-sm sm:text-base font-bold font-mono tabular-nums text-stone-900">
                          RM {item.amountMYR.toFixed(2)}
                        </div>
                        <div className="text-xs text-stone-500 font-mono tabular-nums">
                          ~RM {(item.amountMYR / Math.max(1, item.splitWithIds.length)).toFixed(2)} / each
                        </div>
                      </div>

                      <button
                        onClick={() => handleRemoveExpense(item.id)}
                        title="Remove expense"
                        className="p-1.5 text-stone-300 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </section>

        {/* ========================================================= */}
        {/* SECTION 3: DISTANCE (Stacked Region 3) */}
        {/* ========================================================= */}
        <section id="distance" className="scroll-mt-20">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700">
                <span>Section 03</span>
                <span aria-hidden="true">·</span>
                <span className="text-stone-500 font-normal">Travel Distances & Time</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-stone-900">
                Distance
              </h2>
              <p className="text-sm text-stone-600 mt-0.5">
                Stop-by-stop driving route. Update any leg distance and watch the route summary recalculate immediately.
              </p>
            </div>

            <div className="flex items-center gap-4 text-xs sm:text-sm text-stone-700 bg-stone-100 border border-stone-200 rounded-lg px-3.5 py-2 self-start sm:self-auto">
              <span className="inline-flex items-center gap-1.5 font-medium text-stone-900">
                <Route className="w-4 h-4 text-emerald-800" />
                <span className="font-mono tabular-nums font-bold text-emerald-800">{totalDistanceKm} km</span> total
              </span>
              <span aria-hidden="true" className="text-stone-300">|</span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-stone-500" />
                <span>~{estimatedTravelTime} driving</span>
              </span>
            </div>
          </div>

          {/* ROUTE VISUALIZATION & INTERACTIVE DISTANCE LEGS */}
          <div className="mt-6 border border-stone-200 bg-white rounded-xl p-5 sm:p-6 space-y-6">
            {legs.length === 0 ? (
              <div className="text-center py-6 text-stone-500 text-sm">
                Add at least two stops in the Trip Plan section above to calculate route legs.
              </div>
            ) : (
              <div className="space-y-4">
                <div className="text-xs text-stone-500 font-medium flex items-center justify-between">
                  <span>Stop-by-stop route segments</span>
                  <span className="text-stone-400">Click distance to edit or use + / -</span>
                </div>

                <div className="space-y-3">
                  {legs.map((leg, index) => {
                    const legTravelMinutes = Math.round((leg.distanceKm / 55) * 60);
                    const legHours = Math.floor(legTravelMinutes / 60);
                    const legMins = legTravelMinutes % 60;
                    const legTimeLabel =
                      legHours > 0
                        ? `${legHours}h ${legMins > 0 ? `${legMins}m` : ''}`
                        : `${legMins}m`;

                    const isEditing = editingLegId === leg.id;

                    return (
                      <div
                        key={leg.id}
                        className="border border-stone-200 rounded-xl p-4 bg-[#fdfdfb] hover:border-emerald-300 transition-colors"
                      >
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2 text-xs text-stone-500 font-medium">
                              <span className="text-emerald-800 font-bold">Leg 0{index + 1}</span>
                              <span aria-hidden="true">·</span>
                              <span className="text-stone-600 inline-flex items-center gap-1">
                                <Car className="w-3 h-3 text-stone-400" />
                                ~{legTimeLabel} drive
                              </span>
                            </div>
                            <div className="flex items-center gap-2 text-sm font-semibold text-stone-900">
                              <span className="truncate max-w-[200px] sm:max-w-[280px]" title={leg.fromName}>
                                {leg.fromName}
                              </span>
                              <ArrowRight className="w-4 h-4 text-emerald-700 shrink-0" />
                              <span className="truncate max-w-[200px] sm:max-w-[280px]" title={leg.toName}>
                                {leg.toName}
                              </span>
                            </div>
                          </div>

                          {/* Distance Control (FEATURE 3) */}
                          <div className="flex items-center gap-3 shrink-0 self-end md:self-auto">
                            {isEditing ? (
                              <div className="flex items-center gap-1.5">
                                <div className="relative">
                                  <input
                                    type="number"
                                    min="0"
                                    step="0.5"
                                    value={editDistanceValue}
                                    onChange={(e) => setEditDistanceValue(e.target.value)}
                                    autoFocus
                                    className="w-20 px-2 py-1 text-sm font-mono tabular-nums bg-white border border-emerald-700 rounded-md focus:outline-none"
                                  />
                                  <span className="absolute right-2 top-1.5 text-xs text-stone-400 font-mono">km</span>
                                </div>
                                <button
                                  onClick={() => handleSaveDistance(leg.id)}
                                  className="px-2.5 py-1 text-xs font-medium text-white bg-emerald-800 hover:bg-emerald-700 rounded-md cursor-pointer"
                                >
                                  Save
                                </button>
                                <button
                                  onClick={() => setEditingLegId(null)}
                                  className="px-2 py-1 text-xs font-medium text-stone-600 hover:bg-stone-100 rounded-md cursor-pointer"
                                >
                                  Cancel
                                </button>
                              </div>
                            ) : (
                              <div className="flex items-center gap-2">
                                <div className="flex items-center gap-1">
                                  <button
                                    onClick={() => handleQuickAdjustDistance(leg.id, -2)}
                                    title="Decrease by 2 km"
                                    className="w-6 h-6 flex items-center justify-center text-xs font-mono font-bold bg-stone-100 hover:bg-stone-200 rounded text-stone-700 cursor-pointer"
                                  >
                                    -
                                  </button>
                                  <button
                                    onClick={() => handleStartEditDistance(leg)}
                                    title="Click to type exact distance"
                                    className="px-2.5 py-1 text-sm font-semibold font-mono tabular-nums text-emerald-950 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-md transition-colors cursor-pointer flex items-center gap-1"
                                  >
                                    <span>{leg.distanceKm} km</span>
                                    <Edit2 className="w-3 h-3 text-emerald-700" />
                                  </button>
                                  <button
                                    onClick={() => handleQuickAdjustDistance(leg.id, 2)}
                                    title="Increase by 2 km"
                                    className="w-6 h-6 flex items-center justify-center text-xs font-mono font-bold bg-stone-100 hover:bg-stone-200 rounded text-stone-700 cursor-pointer"
                                  >
                                    +
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="pt-4 border-t border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-sm">
                  <div className="flex items-center gap-2 text-stone-600">
                    <Info className="w-4 h-4 text-stone-400" />
                    <span>
                      Total route covers <strong className="font-mono tabular-nums text-stone-900">{totalDistanceKm} km</strong> over <strong className="font-mono tabular-nums text-stone-900">{legs.length}</strong> driving segments.
                    </span>
                  </div>
                  <div className="text-xs text-stone-500 font-medium">
                    Estimates automatically update the shareable invite message
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* BOTTOM QUICK ACTIONS BANNER */}
        <div className="border border-stone-200 bg-white rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h3 className="text-base font-semibold text-stone-900">
              Ready to send this Malaysian getaway plan to friends?
            </h3>
            <p className="text-xs sm:text-sm text-stone-600">
              Includes precise cost breakdowns for {profiles.length} travelers, stop timings, and OpenGraph social graphic preview.
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setIsOGPreviewOpen(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2.5 text-xs sm:text-sm font-medium text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors cursor-pointer"
            >
              <ImageIcon className="w-4 h-4 text-indigo-700" />
              <span>Preview OG Card</span>
            </button>
            <button
              onClick={() => setIsShareModalOpen(true)}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-medium text-white bg-emerald-800 hover:bg-emerald-700 active:bg-emerald-900 rounded-lg transition-colors shadow-xs whitespace-nowrap cursor-pointer"
            >
              <Share2 className="w-4 h-4" />
              <span>Generate Friends Invite</span>
            </button>
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-stone-200 bg-[#fafaf7] py-8 mt-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <div>Weekend Escape Planner · Malaysia Travel Dashboard</div>
          <div className="flex items-center gap-4">
            <span>OpenGraph Social Graphics active</span>
            <span aria-hidden="true">·</span>
            <span>Live split algorithm active</span>
          </div>
        </div>
      </footer>

      {/* ========================================================= */}
      {/* MODAL 1: OPEN GRAPH (OG) GRAPHICS PREVIEW */}
      {/* ========================================================= */}
      {isOGPreviewOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl border border-stone-200 shadow-2xl max-w-2xl w-full p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <div className="flex items-center gap-2">
                <ImageIcon className="w-5 h-5 text-indigo-700" />
                <h3 className="text-base font-semibold text-stone-900">OpenGraph Social Share Card</h3>
              </div>
              <button
                onClick={() => setIsOGPreviewOpen(false)}
                className="text-stone-400 hover:text-stone-600 p-1 rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs sm:text-sm text-stone-600">
              When shared on WhatsApp, Telegram, iMessage, Twitter, or Discord, this OpenGraph visual asset generates as the rich preview card:
            </p>

            {/* Visual Social Card Mockup */}
            <div className="border border-stone-200 rounded-xl overflow-hidden bg-stone-900 shadow-md">
              <div className="relative aspect-video w-full bg-stone-800 overflow-hidden">
                <img
                  src={OG_IMAGE_URL}
                  alt="Weekend Escape Planner OpenGraph Social Card"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-5 text-white">
                  <div className="text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-1">
                    Weekend Escape Planner · Malaysia
                  </div>
                  <h4 className="text-lg sm:text-xl font-bold tracking-tight">
                    {tripDetails.title}
                  </h4>
                  <div className="flex items-center gap-3 text-xs text-stone-300 mt-1 font-mono">
                    <span>{tripDetails.destination}</span>
                    <span>·</span>
                    <span>{stops.length} stops</span>
                    <span>·</span>
                    <span>~{totalDistanceKm} km</span>
                  </div>
                </div>
              </div>
              <div className="p-3.5 bg-stone-950 text-xs text-stone-400 flex items-center justify-between border-t border-stone-800">
                <span className="truncate">ais-dev-axzwuniigagbhkq73vj6x3.run.app</span>
                <span className="text-emerald-400 font-mono shrink-0">og:image verified</span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-stone-100">
              <button
                type="button"
                onClick={() => setIsOGPreviewOpen(false)}
                className="px-4 py-2 text-xs font-medium text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-lg cursor-pointer"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL 2: EDIT TRIP DETAILS */}
      {/* ========================================================= */}
      {isEditingDetailsOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/40 backdrop-blur-xs">
          <div className="bg-white rounded-xl border border-stone-200 shadow-xl max-w-md w-full p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <div className="flex items-center gap-2">
                <Edit2 className="w-4 h-4 text-emerald-800" />
                <h3 className="text-base font-semibold text-stone-900">Edit Trip Information</h3>
              </div>
              <button
                onClick={() => setIsEditingDetailsOpen(false)}
                className="text-stone-400 hover:text-stone-600 p-1 rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveDetails} className="space-y-3.5">
              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">
                  Trip Title
                </label>
                <input
                  type="text"
                  required
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="w-full text-sm px-3 py-2 bg-white border border-stone-300 rounded-lg focus:outline-none focus:border-emerald-700 focus:ring-1 focus:ring-emerald-700"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">
                  Destination (State / Town in Malaysia)
                </label>
                <input
                  type="text"
                  required
                  value={editDestination}
                  onChange={(e) => setEditDestination(e.target.value)}
                  className="w-full text-sm px-3 py-2 bg-white border border-stone-300 rounded-lg focus:outline-none focus:border-emerald-700 focus:ring-1 focus:ring-emerald-700"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    Start Date
                  </label>
                  <input
                    type="text"
                    required
                    value={editStartDate}
                    onChange={(e) => setEditStartDate(e.target.value)}
                    className="w-full text-sm px-3 py-2 bg-white border border-stone-300 rounded-lg focus:outline-none focus:border-emerald-700 focus:ring-1 focus:ring-emerald-700"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    End Date
                  </label>
                  <input
                    type="text"
                    required
                    value={editEndDate}
                    onChange={(e) => setEditEndDate(e.target.value)}
                    className="w-full text-sm px-3 py-2 bg-white border border-stone-300 rounded-lg focus:outline-none focus:border-emerald-700 focus:ring-1 focus:ring-emerald-700"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-stone-100">
                <button
                  type="button"
                  onClick={() => setIsEditingDetailsOpen(false)}
                  className="px-3.5 py-2 text-xs font-medium text-stone-600 hover:text-stone-800 bg-stone-100 rounded-lg cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-medium text-white bg-emerald-800 hover:bg-emerald-700 rounded-lg transition-colors cursor-pointer"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL 3: SHARE INVITE MESSAGE */}
      {/* ========================================================= */}
      {isShareModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/40 backdrop-blur-xs">
          <div className="bg-white rounded-xl border border-stone-200 shadow-xl max-w-lg w-full p-6 space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <div className="flex items-center gap-2">
                <Share2 className="w-5 h-5 text-emerald-800" />
                <h3 className="text-base font-semibold text-stone-900">Invite Friends & Cost Splits</h3>
              </div>
              <button
                onClick={() => setIsShareModalOpen(false)}
                className="text-stone-400 hover:text-stone-600 p-1 rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs sm:text-sm text-stone-600">
              Here is your summarized trip plan with precise member cost breakdowns, stops, and distances. Copy to send on WhatsApp or group chat:
            </p>

            {/* Formatted Invite Text Box */}
            <div className="bg-stone-50 border border-stone-200 rounded-lg p-3.5 text-xs sm:text-sm font-sans text-stone-800 whitespace-pre-wrap leading-relaxed max-h-64 overflow-y-auto select-all">
              {shareMessageText}
            </div>

            {/* Individual Travelers Badges */}
            <div className="flex flex-wrap gap-1.5 pt-1 text-xs text-stone-600">
              <span className="font-semibold text-stone-700">Travelers:</span>
              {profiles.map((p) => {
                const fin = profileFinances[p.id];
                return (
                  <span key={p.id} className="bg-stone-100 px-2 py-0.5 rounded text-stone-700 font-mono">
                    {p.name}: RM {fin?.share.toFixed(0)}
                  </span>
                );
              })}
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-2 pt-2 border-t border-stone-100">
              <button
                type="button"
                onClick={() => setIsShareModalOpen(false)}
                className="px-4 py-2 text-xs font-medium text-stone-600 hover:text-stone-800 bg-stone-100 hover:bg-stone-200 rounded-lg cursor-pointer"
              >
                Close
              </button>
              <button
                type="button"
                onClick={handleCopyInvite}
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium text-white bg-emerald-800 hover:bg-emerald-700 active:bg-emerald-900 rounded-lg transition-colors shadow-xs cursor-pointer"
              >
                {copiedNotification ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-200" />
                    <span>Copied to Clipboard!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Copy Invite Message</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
