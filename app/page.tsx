"use client";

import { useState } from "react";

const transactions = [
{ id: 1, title: "خرید مواد غذایی", category: "خوراک", date: "امروز", amount: 850000, type: "expense" },
{ id: 2, title: "حقوق ماهانه", category: "درآمد", date: "دیروز", amount: 25000000, type: "income" },
{ id: 3, title: "خرید کتاب", category: "آموزش", date: "۲ روز پیش", amount: 420000, type: "expense" },
];

const money = (value: number) =>
new Intl.NumberFormat("fa-IR").format(value) + " تومان";

export default function Home() {
const [items, setItems] = useState(transactions);
const [title, setTitle] = useState("");
const [amount, setAmount] = useState("");
const [type, setType] = useState("expense");

const income = items
.filter((item) => item.type === "income")
.reduce((sum, item) => sum + item.amount, 0);

const expense = items
.filter((item) => item.type === "expense")
.reduce((sum, item) => sum + item.amount, 0);

function addTransaction(e: React.FormEvent<HTMLFormElement>) {
e.preventDefault();
if (!title.trim() || !amount || Number(amount) <= 0) return;

setItems([
  {
    id: Date.now(),
    title,
    category: type === "income" ? "درآمد" : "متفرقه",
    date: "همین الان",
    amount: Number(amount),
    type,
  },
  ...items,
]);

setTitle("");
setAmount("");

}

return (
<main dir="rtl" className="min-h-screen bg-slate-50 p-5 text-slate-800 md:p-10">
<div className="mx-auto max-w-6xl">
<header className="mb-10 flex flex-wrap items-center justify-between gap-4">
<div>
<h1 className="text-3xl font-black text-slate-900">مدیریت مالی</h1>
<p className="mt-2 text-sm text-slate-500"> مدیریت درآمد و هزینه‌های شخصی</p>
</div>
<div className="rounded-xl bg-white px-4 py-3 text-sm shadow-sm">
حساب شخصی من
</div>
</header>

    <section className="grid gap-5 md:grid-cols-3">
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <p className="text-sm text-slate-500">موجودی کل</p>
        <h2 className="mt-3 text-2xl font-bold">{money(income - expense)}</h2>
        <p className="mt-2 text-xs text-slate-400">موجودی بر اساس تراکنش‌ها</p>
      </div>

      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <p className="text-sm text-slate-500">مجموع درآمد</p>
        <h2 className="mt-3 text-2xl font-bold text-emerald-600">{money(income)}</h2>
        <p className="mt-2 text-xs text-slate-400">کل درآمدهای ثبت‌شده</p>
      </div>

      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <p className="text-sm text-slate-500">مجموع هزینه</p>
        <h2 className="mt-3 text-2xl font-bold text-rose-500">{money(expense)}</h2>
        <p className="mt-2 text-xs text-slate-400">کل هزینه‌های ثبت‌شده</p>
      </div>
    </section>

    <section className="mt-8 grid gap-6 lg:grid-cols-[1fr_1.5fr]">
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <h2 className="mb-5 text-lg font-bold">ثبت تراکنش جدید</h2>

        <form onSubmit={addTransaction} className="space-y-4">
          <div>
            <label className="mb-2 block text-sm">عنوان تراکنش</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="مثلاً خرید لباس"
              className="w-full rounded-xl border border-slate-200 p-3 outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm">مبلغ (تومان)</label>
            <input
              type="number"
              min="1"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="مبلغ را وارد کنید"
              className="w-full rounded-xl border border-slate-200 p-3 outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm">نوع تراکنش</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full rounded-xl border border-slate-200 p-3 outline-none"
            >
              <option value="expense">هزینه</option>
              <option value="income">درآمد</option>
            </select>
          </div>

          <button className="w-full rounded-xl bg-indigo-600 p-3 font-bold text-white transition hover:bg-indigo-700">
            ثبت تراکنش
          </button>
        </form>
      </div>

      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <h2 className="mb-5 text-lg font-bold">آخرین تراکنش‌ها</h2>

        <div className="space-y-3">
  {items.map((item) => (
    <div
      key={item.id}
      className="flex items-center justify-between gap-3 border-b border-slate-100 pb-4"
    >
      <div>
        <p className="font-semibold">{item.title}</p>
        <p className="mt-1 text-xs text-slate-400">
          {item.category} · {item.date}
        </p>
      </div>

      <div className="flex items-center gap-3">
        <p
          className={`whitespace-nowrap text-sm font-bold ${
            item.type === "income" ? "text-emerald-600" : "text-rose-500"
          }`}
        >
          {item.type === "income" ? "+" : "-"}
          {money(item.amount)}
        </p>git status

        <button
          onClick={() =>
            setItems((current) =>
              current.filter((transaction) => transaction.id !== item.id)
            )
          }
          className="rounded-lg bg-rose-50 px-3 py-2 text-xs text-rose-600 hover:bg-rose-100"
        >
          حذف
        </button>
      </div>
    </div>
  ))}
</div>
      </div>
    </section>
  </div>
</main>

);
}