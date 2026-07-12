import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { motion } from "motion/react";
import {
  BriefcaseBusiness,
  Clock3,
  Mail,
  MapPin,
  Pencil,
  Phone,
  Plus,
  Save,
  ShieldCheck,
  Sparkles,
  X,
} from "lucide-react";
import { toast } from "sonner";

import { useAuth } from "@/lib/auth-context";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/dashboard/profile")({
  component: ProfilePage,
});

function ProfilePage() {
  const { user, updateUser } = useAuth();
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    name: user?.name ?? "",
    title: user?.title ?? "",
    phone: user?.phone ?? "",
    location: user?.location ?? "",
    bio: user?.bio ?? "",
  });
  const [newSkill, setNewSkill] = useState("");
  const [skills, setSkills] = useState(user?.skills ?? []);

  useEffect(() => {
    if (!user) return;

    setForm({
      name: user.name,
      title: user.title,
      phone: user.phone ?? "",
      location: user.location ?? "",
      bio: user.bio ?? "",
    });
    setSkills(user.skills);
  }, [user]);

  if (!user) return null;

  const profileCompletion = useMemo(() => {
    const filledFields = [
      form.name.trim(),
      form.title.trim(),
      form.phone.trim(),
      form.location.trim(),
      form.bio.trim(),
      skills.length > 0,
    ].filter(Boolean).length;

    return Math.round((filledFields / 6) * 100);
  }, [form, skills]);

  const joinedAt = new Intl.DateTimeFormat("fa-IR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(user.joinedAt));

  const resetDraft = () => {
    setForm({
      name: user.name,
      title: user.title,
      phone: user.phone ?? "",
      location: user.location ?? "",
      bio: user.bio ?? "",
    });
    setSkills(user.skills);
    setNewSkill("");
    setEditing(false);
  };

  const handleSave = () => {
    const name = form.name.trim();
    const title = form.title.trim();

    if (!name || !title) {
      toast.error("نام و عنوان شغلی را کامل کنید");
      return;
    }

    updateUser({
      ...form,
      name,
      title,
      phone: form.phone.trim(),
      location: form.location.trim(),
      bio: form.bio.trim(),
      skills,
    });

    setEditing(false);
    toast.success("پروفایل بروزرسانی شد");
  };

  const addSkill = () => {
    const skill = newSkill.trim();

    if (!skill) {
      toast.error("مهارت را وارد کنید");
      return;
    }

    if (skills.some((item) => item.toLowerCase() === skill.toLowerCase())) {
      toast.warning("این مهارت قبلاً اضافه شده است");
      setNewSkill("");
      return;
    }

    setSkills((prev) => [...prev, skill]);
    setNewSkill("");
  };

  const removeSkill = (skillToRemove: string) => {
    setSkills((prev) => prev.filter((skill) => skill !== skillToRemove));
  };

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-[28px] border border-border bg-background/70 p-6 shadow-elevated sm:p-8"
      >
        <div className="absolute inset-0 bg-linear-to-br from-cyan-400/10 via-transparent to-violet-500/10" />

        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20 border-2 border-white/60 bg-linear-to-br from-cyan-400 to-violet-500 text-2xl font-bold text-white shadow-glow">
              <AvatarFallback className="bg-transparent text-white">
                {user.name.slice(0, 2)}
              </AvatarFallback>
            </Avatar>

            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-medium text-muted-foreground">پروفایل شخصی</span>
                <Badge variant="outline">{user.role}</Badge>
              </div>
              <div>
                <h2 className="text-2xl font-black tracking-tight">{user.name}</h2>
                <p className="text-sm text-muted-foreground">{user.title}</p>
              </div>

              <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1 rounded-full border border-border bg-background/70 px-2.5 py-1">
                  <Mail className="h-3.5 w-3.5" />
                  {user.email}
                </span>
                <span className="inline-flex items-center gap-1 rounded-full border border-border bg-background/70 px-2.5 py-1">
                  <Clock3 className="h-3.5 w-3.5" />
                  {joinedAt}
                </span>
              </div>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:w-[320px]">
            <div className="rounded-2xl border border-border bg-background/80 p-4">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs text-muted-foreground">تکمیل پروفایل</span>
                <span className="text-sm font-bold">{profileCompletion}%</span>
              </div>
              <div className="mt-3">
                <Progress value={profileCompletion} className="h-2" />
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-background/80 p-4">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs text-muted-foreground">مهارت‌ها</span>
                <span className="text-sm font-bold">{skills.length}</span>
              </div>
              <p className="mt-3 text-xs text-muted-foreground">
                نمایه‌ای روشن‌تر برای کاربران و تیم‌ها
              </p>
            </div>
          </div>
        </div>

        <div className="relative mt-6 flex flex-col gap-3 border-t border-border pt-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Sparkles className="h-4 w-4 text-cyan-500" />
            <span>
              {profileCompletion >= 80
                ? "پروفایل شما آماده نمایش است"
                : "با تکمیل جزئیات بیشتر، پروفایل شما حرفه‌ای‌تر می‌شود"}
            </span>
          </div>

          {editing ? (
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm" onClick={resetDraft}>
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

      <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <Card className="border-border bg-background/70 shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg">اطلاعات شخصی</CardTitle>
            <CardDescription>
              نام، نقش و معرفی کوتاه شما در این بخش نمایش داده می‌شود.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>نام و نام خانوادگی</Label>
              {editing ? (
                <Input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              ) : (
                <p className="rounded-xl border border-border bg-background/70 px-3 py-2 text-sm text-muted-foreground">
                  {user.name}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label>عنوان شغلی</Label>
              {editing ? (
                <Input
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                />
              ) : (
                <p className="rounded-xl border border-border bg-background/70 px-3 py-2 text-sm text-muted-foreground">
                  {user.title}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label>درباره من</Label>
              {editing ? (
                <Textarea
                  rows={5}
                  value={form.bio}
                  onChange={(e) => setForm({ ...form, bio: e.target.value })}
                />
              ) : (
                <p className="rounded-xl border border-border bg-background/70 px-3 py-3 text-sm leading-7 text-muted-foreground">
                  {user.bio || "هنوز درباره خود چیزی ننوشته‌اید."}
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="border-border bg-background/70 shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg">اطلاعات تماس</CardTitle>
              <CardDescription>راه‌های ارتباطی و موقعیت شما برای همکاری‌های بعدی.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3 rounded-xl border border-border bg-background/70 px-3 py-2 text-sm">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">{user.email}</span>
              </div>

              <div className="space-y-2">
                <Label className="flex items-center gap-2 text-xs">
                  <Phone className="h-3.5 w-3.5" />
                  شماره تماس
                </Label>
                {editing ? (
                  <Input
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    dir="ltr"
                  />
                ) : (
                  <p className="rounded-xl border border-border bg-background/70 px-3 py-2 text-sm text-muted-foreground">
                    {user.phone || "—"}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label className="flex items-center gap-2 text-xs">
                  <MapPin className="h-3.5 w-3.5" />
                  موقعیت مکانی
                </Label>
                {editing ? (
                  <Input
                    value={form.location}
                    onChange={(e) => setForm({ ...form, location: e.target.value })}
                  />
                ) : (
                  <p className="rounded-xl border border-border bg-background/70 px-3 py-2 text-sm text-muted-foreground">
                    {user.location || "—"}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="border-border bg-background/70 shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg">مهارت‌ها</CardTitle>
              <CardDescription>مهارت‌های اصلی شما برای نمایش بهتر در پروفایل.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background/80 px-3 py-1 text-xs"
                  >
                    {skill}
                    {editing && (
                      <button
                        type="button"
                        onClick={() => removeSkill(skill)}
                        aria-label={`حذف ${skill}`}
                        className="rounded-full p-0.5 transition hover:bg-destructive/10"
                      >
                        <X className="h-3 w-3 text-muted-foreground hover:text-destructive" />
                      </button>
                    )}
                  </span>
                ))}

                {!skills.length && (
                  <p className="text-sm text-muted-foreground">هنوز مهارتی ثبت نشده است.</p>
                )}
              </div>

              {editing && (
                <div className="flex gap-2">
                  <Input
                    placeholder="مهارت جدید…"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addSkill();
                      }
                    }}
                  />
                  <Button type="button" size="icon" variant="outline" onClick={addSkill}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="border-border bg-background/70 shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg">وضعیت حساب</CardTitle>
              <CardDescription>اطلاعات حساب شما در یک نگاه.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-border bg-background/70 p-3">
                <div className="mb-2 flex items-center gap-2 text-sm font-semibold">
                  <ShieldCheck className="h-4 w-4 text-emerald-500" />
                  وضعیت تایید حساب
                </div>
                <p className="text-xs text-muted-foreground">
                  {user.emailVerified ? "تأیید شده" : "در انتظار تأیید"}
                </p>
              </div>

              <div className="rounded-2xl border border-border bg-background/70 p-3">
                <div className="mb-2 flex items-center gap-2 text-sm font-semibold">
                  <BriefcaseBusiness className="h-4 w-4 text-cyan-500" />
                  نقش فعلی
                </div>
                <p className="text-xs text-muted-foreground">{user.role}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
