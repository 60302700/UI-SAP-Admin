"use client";

import {
  AlertTriangle,
  ArrowDownRight,
  ArrowUpRight,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  CircleDollarSign,
  Clock3,
  ExternalLink,
  FileCheck2,
  Filter,
  History,
  RefreshCw,
  Search,
  ServerCog,
  ShieldCheck,
  Sparkles,
  UsersRound,
  X,
} from "lucide-react";
import { useMemo, useState } from "react";

type QuoteStatus = "Needs review" | "Margin risk" | "Ready";

type Quote = {
  id: string;
  buyer: string;
  producer: string;
  amount: string;
  margin: number;
  revisions: number;
  age: string;
  status: QuoteStatus;
  initials: string;
  color: string;
};

const quotes: Quote[] = [
  { id: "RFQ-2048", buyer: "Northstar Labs", producer: "Apex Systems", amount: "$428,500", margin: 18.4, revisions: 5, age: "42m", status: "Needs review", initials: "NL", color: "bg-brand-100 text-brand-700" },
  { id: "RFQ-2041", buyer: "Meridian Health", producer: "Orbit Compute", amount: "$1,284,000", margin: 11.2, revisions: 8, age: "2h", status: "Margin risk", initials: "MH", color: "bg-orange-100 text-orange-700" },
  { id: "RFQ-2039", buyer: "Crown Retail Group", producer: "Apex Systems", amount: "$192,800", margin: 22.7, revisions: 3, age: "4h", status: "Ready", initials: "CR", color: "bg-success-100 text-success-700" },
  { id: "RFQ-2032", buyer: "Vela Engineering", producer: "ForgeWorks", amount: "$746,250", margin: 16.9, revisions: 6, age: "Yesterday", status: "Needs review", initials: "VE", color: "bg-gray-100 text-gray-700" },
  { id: "RFQ-2027", buyer: "Altura Energy", producer: "Orbit Compute", amount: "$338,400", margin: 9.8, revisions: 9, age: "Yesterday", status: "Margin risk", initials: "AE", color: "bg-error-100 text-error-700" },
];

const statusStyle: Record<QuoteStatus, string> = {
  "Needs review": "bg-brand-50 text-brand-700 ring-brand-200",
  "Margin risk": "bg-error-50 text-error-700 ring-error-200",
  Ready: "bg-success-50 text-success-700 ring-success-200",
};

function MetricCard({ title, value, change, detail, icon: Icon, tone = "brand" }: { title: string; value: string; change: string; detail: string; icon: typeof FileCheck2; tone?: "brand" | "orange" | "green" | "gray" }) {
  const tones = {
    brand: "bg-brand-50 text-brand-600 dark:bg-brand-500/10 dark:text-brand-400",
    orange: "bg-orange-50 text-orange-600 dark:bg-orange-500/10 dark:text-orange-400",
    green: "bg-success-50 text-success-600 dark:bg-success-500/10 dark:text-success-400",
    gray: "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300",
  };
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900">
      <div className="flex items-start justify-between">
        <div><p className="text-sm text-gray-500 dark:text-gray-400">{title}</p><p className="mt-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">{value}</p></div>
        <div className={`rounded-xl p-2.5 ${tones[tone]}`}><Icon size={20} /></div>
      </div>
      <p className="mt-4 flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400"><span className="font-medium text-success-600">{change}</span>{detail}</p>
    </div>
  );
}

export default function RfqAdminDashboard() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<"All" | QuoteStatus>("All");
  const [selected, setSelected] = useState<Quote | null>(null);
  const [notice, setNotice] = useState("");
  const [overlay, setOverlay] = useState<"sync" | "audit" | null>(null);
  const [decisionNote, setDecisionNote] = useState("");
  const [quoteEdited, setQuoteEdited] = useState(false);
  const [decisionError, setDecisionError] = useState("");

  const filtered = useMemo(() => quotes.filter((q) => {
    const matchesQuery = `${q.id} ${q.buyer} ${q.producer}`.toLowerCase().includes(query.toLowerCase());
    return matchesQuery && (filter === "All" || q.status === filter);
  }), [query, filter]);

  const act = (message: string) => {
    setNotice(message);
    setSelected(null);
    window.setTimeout(() => setNotice(""), 3200);
  };

  const decide = (type: "approve" | "send back" | "reject") => {
    if (type !== "approve" && !decisionNote.trim()) {
      setDecisionError("A reason is required for this decision.");
      return;
    }
    if (!selected) return;
    const messages = {
      approve: `${selected.id} approved and queued for SAP`,
      "send back": `${selected.id} returned to negotiation`,
      reject: `${selected.id} rejected`,
    };
    act(messages[type]);
    setDecisionNote("");
    setDecisionError("");
    setQuoteEdited(false);
  };

  return (
    <div className="mx-auto max-w-[1600px] space-y-6 pb-8">
      {notice && <div className="fixed right-6 top-24 z-50 flex items-center gap-2 rounded-xl bg-gray-900 px-4 py-3 text-sm text-white shadow-theme-lg dark:bg-white dark:text-gray-900"><CheckCircle2 size={17} className="text-success-400" />{notice}</div>}

      <section className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <div className="mb-1.5 flex items-center gap-2 text-xs font-medium text-gray-500 dark:text-gray-400"><span>Operations</span><ChevronRight size={13} /><span className="text-gray-700 dark:text-gray-300">Approval center</span></div>
          <h1 className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-white sm:text-3xl">Good morning, Daniel</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Here’s what needs your attention across the RFQ network.</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="inline-flex h-10 items-center gap-2 rounded-lg border border-gray-200 bg-white px-3.5 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300"><RefreshCw size={15} />Refresh</button>
          <button onClick={() => document.getElementById("approval-queue")?.scrollIntoView({ behavior: "smooth" })} className="inline-flex h-10 items-center gap-2 rounded-lg bg-brand-500 px-4 text-sm font-medium text-white shadow-theme-xs hover:bg-brand-600"><FileCheck2 size={16} />Review queue <span className="rounded-full bg-white/20 px-1.5 text-xs">5</span></button>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard title="Pending approvals" value="12" change="+3" detail="since yesterday" icon={FileCheck2} />
        <MetricCard title="Value awaiting approval" value="$3.24M" change="18.6%" detail="avg. gross margin" icon={CircleDollarSign} tone="orange" />
        <MetricCard title="SAP push success" value="98.7%" change="+0.8%" detail="over last 30 days" icon={ServerCog} tone="green" />
        <MetricCard title="Median approval time" value="3h 24m" change="↓ 18m" detail="vs. last month" icon={Clock3} tone="gray" />
      </section>

      <section className="grid gap-6 xl:grid-cols-[minmax(0,1.65fr)_minmax(320px,.75fr)]">
        <div id="approval-queue" className="scroll-mt-24 overflow-hidden rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
          <div className="flex flex-col gap-4 border-b border-gray-200 p-5 dark:border-gray-800 sm:flex-row sm:items-center sm:justify-between">
            <div><h2 className="font-semibold text-gray-900 dark:text-white">Approval queue</h2><p className="mt-0.5 text-xs text-gray-500">Mutually locked quotes awaiting an admin decision</p></div>
            <div className="flex gap-2">
              <label className="relative flex-1 sm:w-56"><Search className="absolute left-3 top-2.5 text-gray-400" size={16} /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search RFQ or company" className="h-9 w-full rounded-lg border border-gray-200 bg-transparent pl-9 pr-3 text-xs outline-none focus:border-brand-400 focus:ring-3 focus:ring-brand-100 dark:border-gray-700" /></label>
              <div className="relative"><Filter className="pointer-events-none absolute left-2.5 top-2.5 text-gray-400" size={14} /><select value={filter} onChange={(e) => setFilter(e.target.value as typeof filter)} className="h-9 appearance-none rounded-lg border border-gray-200 bg-white pl-8 pr-7 text-xs text-gray-600 outline-none dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300"><option>All</option><option>Needs review</option><option>Margin risk</option><option>Ready</option></select><ChevronDown className="pointer-events-none absolute right-2 top-2.5 text-gray-400" size={14} /></div>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[780px] text-left">
              <thead><tr className="border-b border-gray-100 bg-gray-50/70 text-[11px] uppercase tracking-wider text-gray-500 dark:border-gray-800 dark:bg-gray-800/30"><th className="px-5 py-3 font-medium">RFQ / Buyer</th><th className="px-4 py-3 font-medium">Producer</th><th className="px-4 py-3 font-medium">Quote value</th><th className="px-4 py-3 font-medium">Margin</th><th className="px-4 py-3 font-medium">Status</th><th className="px-5 py-3 text-right font-medium">Action</th></tr></thead>
              <tbody>{filtered.map((quote) => <tr key={quote.id} className="border-b border-gray-100 last:border-0 hover:bg-gray-50/70 dark:border-gray-800 dark:hover:bg-gray-800/30">
                <td className="px-5 py-4"><div className="flex items-center gap-3"><div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-xs font-semibold ${quote.color}`}>{quote.initials}</div><div><p className="text-sm font-medium text-gray-900 dark:text-white">{quote.id}</p><p className="text-xs text-gray-500">{quote.buyer} · {quote.age}</p></div></div></td>
                <td className="px-4 py-4 text-sm text-gray-600 dark:text-gray-300">{quote.producer}<p className="text-xs text-gray-400">Rev. {quote.revisions}</p></td>
                <td className="px-4 py-4 text-sm font-medium text-gray-900 dark:text-white">{quote.amount}</td>
                <td className="px-4 py-4"><span className={`text-sm font-medium ${quote.margin < 12 ? "text-error-600" : "text-gray-800 dark:text-gray-200"}`}>{quote.margin}%</span>{quote.margin < 12 && <AlertTriangle className="ml-1 inline text-error-500" size={14} />}</td>
                <td className="px-4 py-4"><span className={`rounded-full px-2.5 py-1 text-[11px] font-medium ring-1 ring-inset ${statusStyle[quote.status]}`}>{quote.status}</span></td>
                <td className="px-5 py-4 text-right"><button onClick={() => { setSelected(quote); setDecisionNote(""); setDecisionError(""); setQuoteEdited(false); }} className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-700 hover:border-brand-300 hover:text-brand-600 dark:border-gray-700 dark:text-gray-300">Review</button></td>
              </tr>)}</tbody>
            </table>
            {!filtered.length && <div className="py-12 text-center text-sm text-gray-500">No approvals match this view.</div>}
          </div>
          <div className="flex items-center justify-between border-t border-gray-100 px-5 py-3 text-xs text-gray-500 dark:border-gray-800"><span>Showing {filtered.length} of 12 approvals</span><button onClick={() => { setQuery(""); setFilter("All"); }} className="flex items-center gap-1 font-medium text-brand-600">Show all approvals <ChevronRight size={14} /></button></div>
        </div>

        <div className="space-y-6">
          <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900">
            <div className="flex items-center justify-between"><div><h2 className="font-semibold text-gray-900 dark:text-white">SAP sync health</h2><p className="mt-0.5 text-xs text-gray-500">Qatar production · S/4HANA</p></div><span className="flex items-center gap-1.5 rounded-full bg-success-50 px-2.5 py-1 text-xs font-medium text-success-700"><span className="h-1.5 w-1.5 rounded-full bg-success-500" />Healthy</span></div>
            <div className="mt-5 grid grid-cols-3 divide-x divide-gray-200 rounded-xl bg-gray-50 p-3 text-center dark:divide-gray-700 dark:bg-gray-800/50"><div><p className="text-lg font-semibold text-gray-900 dark:text-white">76</p><p className="text-[10px] text-gray-500">Synced today</p></div><div><p className="text-lg font-semibold text-orange-600">3</p><p className="text-[10px] text-gray-500">Queued</p></div><div><p className="text-lg font-semibold text-error-600">1</p><p className="text-[10px] text-gray-500">Failed</p></div></div>
            <div className="mt-4 space-y-3"><div className="flex items-center justify-between text-xs"><span className="flex items-center gap-2 text-gray-600 dark:text-gray-300"><CheckCircle2 size={15} className="text-success-500" />SO-880147 created</span><span className="text-gray-400">4m</span></div><div className="flex items-center justify-between text-xs"><span className="flex items-center gap-2 text-gray-600 dark:text-gray-300"><RefreshCw size={15} className="text-orange-500" />RFQ-2024 retrying</span><span className="text-gray-400">12m</span></div></div>
            <button onClick={() => setOverlay("sync")} className="mt-5 flex w-full items-center justify-center gap-2 rounded-lg border border-gray-200 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300">Open sync monitor <ExternalLink size={13} /></button>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900">
            <div className="flex items-center justify-between"><h2 className="font-semibold text-gray-900 dark:text-white">Platform signals</h2><Sparkles size={17} className="text-brand-500" /></div>
            <div className="mt-4 space-y-4">
              <div className="flex gap-3"><div className="rounded-lg bg-error-50 p-2 text-error-600"><AlertTriangle size={16} /></div><div><p className="text-xs font-medium text-gray-800 dark:text-gray-200">2 quotes below margin floor</p><p className="mt-0.5 text-[11px] text-gray-500">$1.62M in value requires review</p></div></div>
              <div className="flex gap-3"><div className="rounded-lg bg-brand-50 p-2 text-brand-600"><UsersRound size={16} /></div><div><p className="text-xs font-medium text-gray-800 dark:text-gray-200">Vendor close rate improved</p><p className="mt-0.5 flex items-center gap-1 text-[11px] text-success-600"><ArrowUpRight size={12} />8.2% this month</p></div></div>
              <div className="flex gap-3"><div className="rounded-lg bg-orange-50 p-2 text-orange-600"><Clock3 size={16} /></div><div><p className="text-xs font-medium text-gray-800 dark:text-gray-200">4 quotes expire within 24h</p><p className="mt-0.5 flex items-center gap-1 text-[11px] text-gray-500"><ArrowDownRight size={12} />Prioritize pending decisions</p></div></div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900 lg:col-span-2"><div className="flex items-center justify-between"><div><h2 className="font-semibold text-gray-900 dark:text-white">Negotiation performance</h2><p className="text-xs text-gray-500">Last 6 months</p></div><button className="text-xs font-medium text-brand-600">View analytics</button></div><div className="mt-6 flex h-32 items-end gap-3">{[44,62,52,71,66,84,72,88,76,92,81,95].map((h,i)=><div key={i} className="group relative flex-1"><div style={{height:`${h}%`}} className="rounded-t bg-brand-100 transition-colors group-hover:bg-brand-400 dark:bg-brand-500/20" /></div>)}</div><div className="mt-3 flex justify-between text-[10px] text-gray-400"><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span><span>Jul</span><span>Aug</span></div></div>
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900"><div className="flex items-center justify-between"><h2 className="font-semibold text-gray-900 dark:text-white">Governance</h2><ShieldCheck size={18} className="text-brand-500" /></div><div className="mt-5 space-y-4"><div className="flex justify-between text-sm"><span className="text-gray-500">Audit events today</span><span className="font-medium text-gray-900 dark:text-white">284</span></div><div className="flex justify-between text-sm"><span className="text-gray-500">Admin overrides</span><span className="font-medium text-gray-900 dark:text-white">2</span></div><div className="flex justify-between text-sm"><span className="text-gray-500">Lock invalidations</span><span className="font-medium text-gray-900 dark:text-white">1</span></div><button onClick={() => setOverlay("audit")} className="flex w-full items-center justify-center gap-2 rounded-lg bg-gray-100 py-2 text-xs font-medium text-gray-700 dark:bg-gray-800 dark:text-gray-300"><History size={14} />View audit trail</button></div></div>
      </section>

      {selected && <div className="fixed inset-0 z-[99999] flex items-end justify-end bg-gray-950/40 backdrop-blur-[2px] sm:p-3" onMouseDown={() => setSelected(null)}><aside onMouseDown={(e) => e.stopPropagation()} className="h-[94vh] w-full overflow-y-auto rounded-t-2xl bg-white p-6 shadow-theme-xl dark:bg-gray-900 sm:max-w-xl sm:rounded-2xl">
        <div className="flex items-start justify-between"><div><span className={`rounded-full px-2.5 py-1 text-[11px] font-medium ring-1 ring-inset ${statusStyle[selected.status]}`}>{selected.status}</span><h2 className="mt-3 text-xl font-semibold text-gray-900 dark:text-white">{selected.id}</h2><p className="text-sm text-gray-500">{selected.buyer} → {selected.producer}</p></div><button onClick={() => setSelected(null)} className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"><X size={18}/></button></div>
        <div className="mt-6 grid grid-cols-2 gap-3"><div className="rounded-xl bg-gray-50 p-4 dark:bg-gray-800"><p className="text-xs text-gray-500">Quote value</p><p className="mt-1 font-semibold text-gray-900 dark:text-white">{selected.amount}</p></div><div className="rounded-xl bg-gray-50 p-4 dark:bg-gray-800"><p className="text-xs text-gray-500">Gross margin</p><p className={`mt-1 font-semibold ${selected.margin < 12 ? "text-error-600" : "text-gray-900 dark:text-white"}`}>{selected.margin}%</p></div></div>
        <div className="mt-6"><div className="flex items-center justify-between"><h3 className="text-sm font-semibold text-gray-900 dark:text-white">Final BOM · Rev. {selected.revisions}</h3><span className="text-xs text-gray-500">250 units</span></div><div className="mt-3 overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700"><div className="grid grid-cols-[1fr_auto_auto] gap-3 bg-gray-50 px-3 py-2 text-[10px] uppercase text-gray-500 dark:bg-gray-800"><span>Item</span><span>Unit</span><span>Total</span></div>{[["AMD EPYC 9354P", "$2,280", "$570,000"],["128GB ECC DDR5", "$412", "$103,000"],["3.84TB NVMe SSD", "$368", "$92,000"],["Assembly & QA", "$145", "$36,250"]].map((row)=><div key={row[0]} className="grid grid-cols-[1fr_auto_auto] gap-3 border-t border-gray-100 px-3 py-2.5 text-xs dark:border-gray-800"><span className="text-gray-700 dark:text-gray-300">{row[0]}</span><span className="text-gray-500">{row[1]}</span><span className="font-medium text-gray-800 dark:text-gray-200">{row[2]}</span></div>)}</div></div>
        <div className="mt-6"><h3 className="text-sm font-semibold text-gray-900 dark:text-white">Negotiation history</h3><div className="mt-3 border-l border-gray-200 pl-4 text-xs dark:border-gray-700"><div className="relative pb-4"><span className="absolute -left-[19px] top-1 h-2 w-2 rounded-full bg-success-500"/><p className="font-medium text-gray-700 dark:text-gray-300">Both parties agreed & locked</p><p className="text-gray-500">Today, 09:42 · Revision {selected.revisions}</p></div><div className="relative pb-4"><span className="absolute -left-[19px] top-1 h-2 w-2 rounded-full bg-brand-400"/><p className="font-medium text-gray-700 dark:text-gray-300">Buyer accepted volume tier</p><p className="text-gray-500">Yesterday, 16:18 · Unit price −4.2%</p></div><div className="relative"><span className="absolute -left-[19px] top-1 h-2 w-2 rounded-full bg-gray-300"/><p className="font-medium text-gray-700 dark:text-gray-300">Producer submitted counter-offer</p><p className="text-gray-500">Yesterday, 11:06 · 2 line-item changes</p></div></div></div>
        <div className="mt-6"><h3 className="text-sm font-semibold text-gray-900 dark:text-white">Approval checks</h3><div className="mt-3 grid gap-3 text-sm sm:grid-cols-2"><p className={`flex items-center gap-2 ${quoteEdited ? "text-error-600" : "text-gray-600 dark:text-gray-300"}`}>{quoteEdited ? <AlertTriangle size={16}/> : <CheckCircle2 size={16} className="text-success-500"/>}Buyer lock {quoteEdited ? "invalidated" : "confirmed"}</p><p className={`flex items-center gap-2 ${quoteEdited ? "text-error-600" : "text-gray-600 dark:text-gray-300"}`}>{quoteEdited ? <AlertTriangle size={16}/> : <CheckCircle2 size={16} className="text-success-500"/>}Producer lock {quoteEdited ? "invalidated" : "confirmed"}</p><p className="flex items-center gap-2 text-gray-600 dark:text-gray-300"><CheckCircle2 size={16} className="text-success-500"/>SAP materials validated</p>{selected.margin < 12 && <p className="flex items-center gap-2 text-error-600"><AlertTriangle size={16}/>Below margin floor</p>}</div></div>
        <div className={`mt-6 rounded-xl border p-4 ${quoteEdited ? "border-error-200 bg-error-50 dark:bg-error-500/10" : "border-gray-200 dark:border-gray-700"}`}><div className="flex items-start justify-between gap-4"><div><p className="text-xs font-medium text-gray-700 dark:text-gray-300">Admin edit guardrail</p><p className="mt-1 text-xs leading-5 text-gray-500">Editing invalidates both locks and returns this RFQ to negotiation.</p></div><button onClick={() => setQuoteEdited(true)} disabled={quoteEdited} className="shrink-0 rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-700 disabled:opacity-50 dark:border-gray-700 dark:text-gray-300">{quoteEdited ? "Locks reset" : "Edit quote"}</button></div></div>
        <label className="mt-6 block text-xs font-medium text-gray-700 dark:text-gray-300">Decision note <span className="font-normal text-gray-400">(required for send back or reject)</span><textarea value={decisionNote} onChange={(e) => { setDecisionNote(e.target.value); setDecisionError(""); }} placeholder="Add context for the audit trail…" className={`mt-2 h-24 w-full resize-none rounded-xl border bg-transparent p-3 text-sm outline-none focus:border-brand-400 ${decisionError ? "border-error-400" : "border-gray-200 dark:border-gray-700"}`} /></label>{decisionError && <p className="mt-1 text-xs text-error-600">{decisionError}</p>}
        <div className="mt-6 grid grid-cols-2 gap-2"><button onClick={() => decide("send back")} className="rounded-lg border border-gray-200 py-2.5 text-sm font-medium text-gray-700 dark:border-gray-700 dark:text-gray-300">Send back</button><button onClick={() => decide("reject")} className="rounded-lg border border-error-200 py-2.5 text-sm font-medium text-error-600">Reject</button><button disabled={quoteEdited} onClick={() => decide("approve")} className="col-span-2 flex items-center justify-center gap-2 rounded-lg bg-brand-500 py-2.5 text-sm font-medium text-white hover:bg-brand-600 disabled:cursor-not-allowed disabled:bg-gray-300"><Check size={16}/>{quoteEdited ? "Re-confirmation required" : "Approve & push to SAP"}</button></div>
      </aside></div>}

      {overlay && <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-gray-950/40 p-4 backdrop-blur-[2px]" onMouseDown={() => setOverlay(null)}><div onMouseDown={(e) => e.stopPropagation()} className="max-h-[88vh] w-full max-w-4xl overflow-y-auto rounded-2xl bg-white shadow-theme-xl dark:bg-gray-900"><div className="sticky top-0 z-10 flex items-start justify-between border-b border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900"><div><h2 className="text-lg font-semibold text-gray-900 dark:text-white">{overlay === "sync" ? "SAP integration monitor" : "Immutable audit trail"}</h2><p className="text-xs text-gray-500">{overlay === "sync" ? "Qatar production · Queue activity and execution logs" : "Every administrative and commercial event is retained"}</p></div><button onClick={() => setOverlay(null)} className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"><X size={18}/></button></div>
        {overlay === "sync" ? <div className="p-5"><div className="mb-5 grid gap-3 sm:grid-cols-4">{[["Endpoint","S/4HANA PRD"],["Queue depth","4 payloads"],["Success rate","98.7%"],["Last heartbeat","12 sec ago"]].map(([a,b])=><div key={a} className="rounded-xl bg-gray-50 p-3 dark:bg-gray-800"><p className="text-[10px] uppercase text-gray-500">{a}</p><p className="mt-1 text-sm font-medium text-gray-800 dark:text-gray-200">{b}</p></div>)}</div><div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700"><table className="w-full min-w-[720px] text-left text-xs"><thead className="bg-gray-50 text-gray-500 dark:bg-gray-800"><tr><th className="p-3">Payload</th><th className="p-3">Idempotency key</th><th className="p-3">Attempt</th><th className="p-3">Status</th><th className="p-3">Last activity</th><th className="p-3 text-right">Control</th></tr></thead><tbody>{[["RFQ-2046","8fb2…91ac","1/3","Synced","4m"],["RFQ-2044","4aa1…c072","2/3","Retrying","12m"],["RFQ-2038","b120…47de","3/3","Failed","38m"],["RFQ-2036","c8d4…009b","—","Queued","1h"]].map((r)=><tr key={r[0]} className="border-t border-gray-100 dark:border-gray-800"><td className="p-3 font-medium text-gray-800 dark:text-gray-200">{r[0]}</td><td className="p-3 font-mono text-gray-500">{r[1]}</td><td className="p-3 text-gray-500">{r[2]}</td><td className="p-3"><span className={`rounded-full px-2 py-1 ${r[3] === "Failed" ? "bg-error-50 text-error-600" : r[3] === "Synced" ? "bg-success-50 text-success-600" : "bg-orange-50 text-orange-600"}`}>{r[3]}</span></td><td className="p-3 text-gray-500">{r[4]}</td><td className="p-3 text-right"><button onClick={() => setNotice(`${r[0]} manual retry queued`)} disabled={r[3] === "Synced"} className="rounded-lg border border-gray-200 px-3 py-1.5 font-medium text-gray-700 disabled:opacity-40 dark:border-gray-700 dark:text-gray-300"><RefreshCw size={12} className="mr-1 inline"/>Retry</button></td></tr>)}</tbody></table></div><div className="mt-5 rounded-xl bg-gray-950 p-4 font-mono text-[11px] leading-6 text-gray-300"><p className="text-success-400">09:51:22 INFO SAP endpoint heartbeat OK</p><p>09:48:03 POST /sales-orders · RFQ-2044 · HTTP 503</p><p className="text-orange-300">09:48:03 RETRY scheduled in 120 seconds</p><p>09:42:18 POST /sales-orders · RFQ-2046 · HTTP 201</p></div></div> : <div className="p-5"><div className="mb-4 flex gap-2"><label className="relative flex-1"><Search size={15} className="absolute left-3 top-2.5 text-gray-400"/><input placeholder="Search actor, RFQ, or event" className="h-9 w-full rounded-lg border border-gray-200 bg-transparent pl-9 text-xs dark:border-gray-700"/></label><button className="rounded-lg border border-gray-200 px-3 text-xs text-gray-600 dark:border-gray-700 dark:text-gray-300"><Filter size={13} className="mr-1 inline"/>Filters</button></div><div className="space-y-2">{[["09:46:12","Daniel Moore","Approved RFQ-2046","Approval → SAP queue"],["09:31:04","Sarah Khan","Edited quote RFQ-2034","Buyer and producer locks invalidated"],["09:18:55","System","SAP push succeeded","RFQ-2029 → SO-880147"],["08:52:31","Omar Ali","Returned RFQ-2028","Reason: Margin exception needs CFO review"],["08:40:09","System","Producer lock recorded","RFQ-2041 · Revision 8"]].map((r)=><div key={r[0]} className="grid gap-1 rounded-xl border border-gray-100 p-3 text-xs dark:border-gray-800 sm:grid-cols-[70px_120px_1fr_1.3fr]"><span className="font-mono text-gray-400">{r[0]}</span><span className="font-medium text-gray-700 dark:text-gray-300">{r[1]}</span><span className="text-gray-700 dark:text-gray-300">{r[2]}</span><span className="text-gray-500">{r[3]}</span></div>)}</div></div>}
      </div></div>}
    </div>
  );
}
