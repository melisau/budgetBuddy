"use client";

import { useContext, useState } from "react";
import { Check, Search, Upload } from "lucide-react";
import { demoTransactions } from "@/components/budgetbuddy/demo-data";
import { AddTransaction, Transaction } from "@/components/budgetbuddy/shared";
import { LanguageContext, useT } from "@/components/providers/language-provider";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty";
import { Input } from "@/components/ui/input";

export function TransactionsScreen() {
  const t = useT();
  const [query, setQuery] = useState("");
  const normalizedQuery = query.trim().toLocaleLowerCase();
  const filteredTransactions = demoTransactions.filter((item) =>
    [item[0], item[1], item[2]].some((value) => value.toLocaleLowerCase().includes(normalizedQuery)),
  );

  return <>
    <div className="toolbar">
      <div><Search /><Input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={t("Search transactions")} aria-label={t("Search transactions")} /></div>
      <CsvImport />
      <AddTransaction />
    </div>
    {filteredTransactions.length ? <article className="panel tx-table">
      <header><span>{t("Transaction")}</span><span>{t("Category")}</span><span>{t("Date")}</span><span>{t("Account")}</span><span>{t("Amount")}</span></header>
      {filteredTransactions.map((item) => <div className="tx-row" key={item[0]}>
        <b>{t(item[0])}</b><span>{t(item[1])}</span><span>{t(item[2])}</span><span>{t("Everyday account")}</span>
        <strong className={item[3] > 0 ? "pos" : "neg"}>{item[3] > 0 ? "+" : "−"}₺{Math.abs(item[3]).toLocaleString()}</strong>
        <div className="mobile-only"><Transaction transaction={item} /></div>
      </div>)}
    </article> : <Empty className="panel empty-state"><EmptyHeader><EmptyMedia variant="icon"><Search /></EmptyMedia><EmptyTitle>{t("No matching transactions")}</EmptyTitle><EmptyDescription>{t("Try a different search, or add your first income or expense.")}</EmptyDescription></EmptyHeader><EmptyContent><AddTransaction /></EmptyContent></Empty>}
  </>;
}

function CsvImport() {
  const t = useT();
  const { language } = useContext(LanguageContext);
  const [step, setStep] = useState(1);
  const mappingRows = language === "tr"
    ? ["Tarih → İşlem tarihi", "Açıklama → Satıcı / Açıklama", "Tutar → İşlem tutarı", "Tür → Gider / Gelir", "Kategori → Kategori", "Hesap → Hesap adı"]
    : ["Date → Transaction Date", "Description → Merchant / Description", "Amount → Transaction Amount", "Type → Debit / Credit", "Category → Category", "Account → Account Name"];

  return <Dialog onOpenChange={() => setStep(1)}>
    <DialogTrigger asChild><Button variant="outline"><Upload />{t("Import CSV")}</Button></DialogTrigger>
    <DialogContent>
      <DialogHeader><DialogTitle>{t("Import transactions")}</DialogTitle><DialogDescription>{t("Nothing is added until you review and approve it.")}</DialogDescription></DialogHeader>
      <div className="steps">{["Upload", "Map columns", "Review"].map((label, index) => <span className={step > index ? "on" : ""} key={label}><b>{step > index + 1 ? <Check /> : index + 1}</b>{t(label)}</span>)}</div>
      {step === 1 && <div className="drop"><Upload /><h3>{t("Drop your CSV here")}</h3><p>{t("date, description and amount required")}</p><Button variant="outline" onClick={() => setStep(2)}>{t("Choose CSV")}</Button></div>}
      {step === 2 && <div className="mapping">{mappingRows.map((row) => <p key={row}>{row}<Check /></p>)}<Button onClick={() => setStep(3)}>{t("Continue to review")}</Button></div>}
      {step === 3 && <div className="review"><Check /><h3>{t("24 rows ready")}</h3><p>{t("2 rows need attention before import.")}</p><span>{t("Row 14 · Missing category")} <button type="button">{t("Fix row")}</button></span><Button>{t("Import 24 transactions")}</Button></div>}
    </DialogContent>
  </Dialog>;
}
