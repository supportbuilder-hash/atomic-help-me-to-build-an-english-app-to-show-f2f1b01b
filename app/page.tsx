"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Search, Sparkles, Mail, FileText, Clock, Check, ArrowRight, AlertCircle, Info } from 'lucide-react';
import { Reveal } from "@/components/Reveal";

type EtymologyEntry = {
  word: string;
  transliteration: string;
  origin: string;
  rootMeaning: string;
  descendants: string;
};

const ETYMOLOGY_DB: EtymologyEntry[] = [
  {
    word: "хлеб",
    transliteration: "khleb",
    origin: "Proto-Slavic *xlěbъ, likely borrowed from an early Germanic word related to English \"loaf\"",
    rootMeaning: "A baked loaf of bread",
    descendants: "хлебный, хлебопечение, нахлебник",
  },
  {
    word: "семья",
    transliteration: "sem'ya",
    origin: "Old East Slavic sěmьja, from Proto-Slavic *sembьja, meaning \"household\"",
    rootMeaning: "A household bound by kinship",
    descendants: "семейный, семьянин, семейство",
  },
  {
    word: "любовь",
    transliteration: "lyubov'",
    origin: "Proto-Slavic *ljubъ, from Proto-Indo-European *leubh-, meaning \"to care, to desire\"",
    rootMeaning: "Dear, pleasing, cherished",
    descendants: "любить, любимый, любезный",
  },
  {
    word: "медведь",
    transliteration: "medved'",
    origin: "Compound of мёд (\"honey\") and an old root for \"eater\", a taboo replacement for the original bear word",
    rootMeaning: "Honey eater",
    descendants: "медвежий, медведица, медвежонок",
  },
  {
    word: "спасибо",
    transliteration: "spasibo",
    origin: "Contraction of спаси Бог, meaning \"God save [you]\"",
    rootMeaning: "A blessing turned into a thank you",
    descendants: "спаситель, спасение, спасать",
  },
  {
    word: "дорога",
    transliteration: "doroga",
    origin: "Proto-Slavic *dorga, related to *dьrgati, meaning \"to tear, to cut\"",
    rootMeaning: "A path cut through the forest",
    descendants: "дорожный, подорожник, бездорожье",
  },
];

function normalizeToken(token: string): string {
  return token.trim().toLowerCase().replace(/[.,!?;:"'()«»]/g, "");
}

export default function HomePage() {
  const t = useTranslations();
  const [inputValue, setInputValue] = useState("");
  const [results, setResults] = useState<EtymologyEntry[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  const performSearch = (raw: string) => {
    setInputValue(raw);
    const tokens = raw
      .split(/[\s,]+/)
      .map(normalizeToken)
      .filter(Boolean);
    const matched: EtymologyEntry[] = [];
    const seen = new Set<string>();
    tokens.forEach((token) => {
      const entry = ETYMOLOGY_DB.find((e) => e.word === token);
      if (entry && !seen.has(entry.word)) {
        matched.push(entry);
        seen.add(entry.word);
      }
    });
    setResults(matched);
    setHasSearched(true);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    performSearch(inputValue);
  };

  const examples = Array.isArray(t.raw("home.lookup.examples"))
    ? (t.raw("home.lookup.examples") as string[])
    : [];
  const featureItems = Array.isArray(t.raw("home.features.items"))
    ? (t.raw("home.features.items") as { title: string; description: string }[])
    : [];
  const steps = Array.isArray(t.raw("home.howItWorks.steps"))
    ? (t.raw("home.howItWorks.steps") as { title: string; description: string }[])
    : [];

  const previewEntry = ETYMOLOGY_DB[0]!;

  return (
    <main>
      {/* Hero */}
      <Reveal>
        <section className="relative overflow-hidden bg-mesh py-24 md:py-32">
          <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-sm font-medium text-muted-foreground">
                <Sparkles className="h-4 w-4 text-primary" aria-hidden="true" />
                {t("home.hero.eyebrow")}
              </span>
              <h1 className="mt-6 text-balance text-4xl font-bold tracking-tight text-gradient sm:text-5xl md:text-6xl">
                {t("home.hero.title")}
              </h1>
              <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
                {t("home.hero.subtitle")}
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link
                  href="#input-section"
                  className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-glow transition hover:-translate-y-0.5 motion-reduce:transition-none"
                >
                  <Search className="h-4 w-4" aria-hidden="true" />
                  {t("home.hero.primaryCta")}
                </Link>
                <a
                  href="https://oasistechnologysearchenginefeverbetter.zite.so"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass inline-flex items-center gap-2 rounded-lg border border-border px-6 py-3 text-sm font-semibold text-foreground transition hover:-translate-y-0.5 motion-reduce:transition-none"
                >
                  {t("home.hero.secondaryCta")}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
            </div>
            <motion.div
              className="glass-strong motion-safe:animate-float rounded-2xl border border-border p-6 shadow-glow"
              whileHover={{ y: -4 }}
            >
              <p className="text-sm font-medium text-muted-foreground">{t("home.hero.previewLabel")}</p>
              <p className="mt-2 text-3xl font-bold text-foreground">{previewEntry.word}</p>
              <p className="text-sm italic text-muted-foreground">{previewEntry.transliteration}</p>
              <dl className="mt-4 space-y-3 text-sm">
                <div>
                  <dt className="font-semibold text-foreground">{t("home.results.fieldOrigin")}</dt>
                  <dd className="text-muted-foreground">{previewEntry.origin}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-foreground">{t("home.results.fieldRoot")}</dt>
                  <dd className="text-muted-foreground">{previewEntry.rootMeaning}</dd>
                </div>
              </dl>
              <p className="mt-4 text-xs text-muted-foreground">{t("home.hero.previewHint")}</p>
            </motion.div>
          </div>
        </section>
      </Reveal>

      {/* Lookup */}
      <Reveal>
        <section id="input-section" className="bg-background py-20 md:py-28">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <span className="text-sm font-semibold uppercase tracking-wide text-primary">{t("home.lookup.eyebrow")}</span>
              <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                {t("home.lookup.title")}
              </h2>
              <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
                {t("home.lookup.subtitle")}
              </p>
            </div>
            <form onSubmit={handleSubmit} className="surface-elevated mt-10 rounded-2xl border border-border bg-card p-6 md:p-10">
              <label htmlFor="word-input" className="sr-only">
                {t("home.lookup.placeholder")}
              </label>
              <textarea
                id="word-input"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={t("home.lookup.placeholder")}
                rows={3}
                className="w-full resize-none rounded-xl border border-border bg-background"
              />
            </form>
          </div>
        </section>
      </Reveal>
    </main>
  );
}
