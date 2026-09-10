"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { transactionSchema, type TransactionInput } from "@/validations/transaction";

interface TransactionFormProps {
  onSuccess?: (transaction: TransactionInput) => void;
}

export function TransactionForm({ onSuccess }: TransactionFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [type, setType] = useState<TransactionInput["type"]>("expense");
  const [category, setCategory] = useState("");
  const [account, setAccount] = useState("");
  const form = useForm<TransactionInput>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      type: "expense",
      amount: undefined,
      title: "",
      category: "",
      account: "",
      date: "2026-09-10",
      note: "",
    },
  });

  async function submit(values: TransactionInput) {
    setIsSubmitting(true);
    await new Promise((resolve) => window.setTimeout(resolve, 450));
    onSuccess?.(values);
    toast.success("Transaction added successfully.");
    form.reset({ ...values, amount: undefined, title: "", note: "" });
    setCategory(values.category);
    setAccount(values.account);
    setIsSubmitting(false);
  }

  return (
    <form className="modal" onSubmit={form.handleSubmit(submit)} noValidate>
      <div className="type" aria-label="Transaction type">
        {(["expense", "income"] as const).map((value) => (
          <button
            aria-pressed={type === value}
            className={type === value ? "active" : ""}
            key={value}
            onClick={() => { setType(value); form.setValue("type", value, { shouldValidate: true }); }}
            type="button"
          >
            {value === "expense" ? "Expense" : "Income"}
          </button>
        ))}
      </div>

      <label>
        Amount
        <Input inputMode="decimal" placeholder="₺0.00" {...form.register("amount")} aria-invalid={!!form.formState.errors.amount} />
        {form.formState.errors.amount && <small className="field-error">{form.formState.errors.amount.message}</small>}
      </label>
      <label>
        Description
        <Input placeholder="Weekly groceries" {...form.register("title")} aria-invalid={!!form.formState.errors.title} />
        {form.formState.errors.title && <small className="field-error">{form.formState.errors.title.message}</small>}
      </label>
      <div className="form-grid">
        <label>
          Category
          <Select onValueChange={(value) => { setCategory(value); form.setValue("category", value, { shouldValidate: true }); }} value={category}>
            <SelectTrigger aria-invalid={!!form.formState.errors.category}><SelectValue placeholder="Select category" /></SelectTrigger>
            <SelectContent><SelectItem value="food">Food & Dining</SelectItem><SelectItem value="home">Housing</SelectItem><SelectItem value="transport">Transport</SelectItem></SelectContent>
          </Select>
          {form.formState.errors.category && <small className="field-error">{form.formState.errors.category.message}</small>}
        </label>
        <label>
          Account
          <Select onValueChange={(value) => { setAccount(value); form.setValue("account", value, { shouldValidate: true }); }} value={account}>
            <SelectTrigger aria-invalid={!!form.formState.errors.account}><SelectValue placeholder="Select account" /></SelectTrigger>
            <SelectContent><SelectItem value="daily">Everyday account</SelectItem><SelectItem value="cash">Cash</SelectItem><SelectItem value="family">Family account</SelectItem></SelectContent>
          </Select>
          {form.formState.errors.account && <small className="field-error">{form.formState.errors.account.message}</small>}
        </label>
      </div>
      <label>
        Date
        <Input type="date" {...form.register("date")} aria-invalid={!!form.formState.errors.date} />
        {form.formState.errors.date && <small className="field-error">{form.formState.errors.date.message}</small>}
      </label>
      <label>
        Note <small>Optional</small>
        <Input placeholder="Optional note" {...form.register("note")} />
        {form.formState.errors.note && <small className="field-error">{form.formState.errors.note.message}</small>}
      </label>
      <Button disabled={isSubmitting} type="submit">
        {isSubmitting ? "Saving…" : "Add transaction"}
      </Button>
    </form>
  );
}
