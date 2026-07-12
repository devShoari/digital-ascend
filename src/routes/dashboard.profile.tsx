import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "motion/react";
import { Pencil, Save, X, Plus, Mail, Phone, MapPin } from "lucide-react";
import { toast } from "sonner";

import { useAuth } from "@/lib/auth-context";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/dashboard/profile")({
  component: ProfilePage,
});

function ProfilePage() {
  const { user, updateUser } = useAuth();
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState(() => ({
    name: user?.name ?? "",
    title: user?.title ?? "",
    phone: user?.phone ?? "",
    location: user?.location ?? "",
    bio: user?.bio ?? "",
  }));
  const [newSkill, setNewSkill] = useState("");
  const [skills, setSkills] = useState(user?.skills ?? []);

  if (!user) return null;

  const handleSave = () => {
    updateUser({ ...form, skills });
    setEditing(false);
    toast.success("پروفایل بروزرسانی شد");
  };

  const handleCancel = () => {
    setForm({
      name: user.name,
      title: user.title,
      phone: user.phone ?? "",
      location: user.location ?? "",
      bio: user.bio ?? "",
    });
    setSkills(user.skills);
    setEditing(false);
  };

  const addSkill = () => {
    const s = newSkill.trim();
    if (s && !skills.includes(s)) setSkills((prev) => [...prev, s]);
    setNewSkill("");
  };

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-3xl border border-border bg-foreground/[0.02] p-6 sm:p-8"
      >
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 to-violet-500 text-2xl font-bold text-white shadow-glow">
              {user.name.slice(0, 2)}
            </div>
            <div>
              <h2 className="text-xl font-bold">{user.name}</h2>
              <p className="text-sm text-muted-foreground">{user.title}</p>
              <Badge variant="outline" className="mt-2">{user.role}</Badge>
            </div>
          </div>

          {editing ? (
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handleCancel}>
                <X className="h-4 w-4" /> انصراف
              </Button>
              <Button size="sm" onClick={handleSave}>
                <Save className="h-4 w-4" /> ذخیره تغییرات
              </Button>
            </div>
          ) : (
            <Button variant="outline" size="sm" onClick={() => setEditing(true)}>
              <Pencil className="h-4 w-4" /> ویرایش پروفایل
            </Button>
          )}
        </div>
      </motion.section>

      <div className="grid gap-6 md:grid-cols-2">
        <section className="rounded-3xl border border-border bg-foreground/[0.02] p-6">
          <h3 className="font-semibold">اطلاعات شخصی</h3>
          <div className="mt-5 space-y-4">
            <div className="space-y-2">
              <Label>نام و نام خانوادگی</Label>
              {editing ? (
                <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              ) : (
                <p className="text-sm text-muted-foreground">{user.name}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label>عنوان شغلی</Label>
              {editing ? (
                <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
              ) : (
                <p className="text-sm text-muted-foreground">{user.title}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label>درباره من</Label>
              {editing ? (
                <Textarea rows={4} value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} />
              ) : (
                <p className="text-sm leading-7 text-muted-foreground">{user.bio ?? "—"}</p>
              )}
            </div>
          </div>
        </section>

        <div className="space-y-6">
          <section className="rounded-3xl border border-border bg-foreground/[0.02] p-6">
            <h3 className="font-semibold">اطلاعات تماس</h3>
            <div className="mt-5 space-y-4">
              <div className="flex items-center gap-3 text-sm">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">{user.email}</span>
              </div>
              <div className="space-y-2">
                <Label className="flex items-center gap-2 text-xs"><Phone className="h-3.5 w-3.5" /> شماره تماس</Label>
                {editing ? (
                  <Input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} dir="ltr" />
                ) : (
                  <p className="text-sm text-muted-foreground">{user.phone ?? "—"}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label className="flex items-center gap-2 text-xs"><MapPin className="h-3.5 w-3.5" /> موقعیت مکانی</Label>
                {editing ? (
                  <Input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} />
                ) : (
                  <p className="text-sm text-muted-foreground">{user.location ?? "—"}</p>
                )}
              </div>
            </div>
          </section>

          <section className="rounded-3xl border border-border bg-foreground/[0.02] p-6">
            <h3 className="font-semibold">مهارت‌ها</h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {skills.map((s) => (
                <span key={s} className="inline-flex items-center gap-1.5 rounded-full border border-border bg-foreground/[0.03] px-3 py-1 text-xs">
                  {s}
                  {editing && (
                    <button onClick={() => setSkills((prev) => prev.filter((x) => x !== s))} aria-label={`حذف ${s}`}>
                      <X className="h-3 w-3 text-muted-foreground hover:text-destructive" />
                    </button>
                  )}
                </span>
              ))}
              {skills.length === 0 && <p className="text-sm text-muted-foreground">هنوز مهارتی ثبت نشده.</p>}
            </div>
            {editing && (
              <div className="mt-4 flex gap-2">
                <Input
                  placeholder="مهارت جدید…"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addSkill())}
                />
                <Button type="button" size="icon" variant="outline" onClick={addSkill}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
