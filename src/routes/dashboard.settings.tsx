import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { ShieldCheck, Globe, Palette, Save, Smartphone } from "lucide-react";

import { useAuth } from "@/lib/auth-context";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { PasswordInput } from "@/components/auth/PasswordInput";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ThemeToggle } from "@/components/site/ThemeToggle";

export const Route = createFileRoute("/dashboard/settings")({
  component: SettingsPage,
});

function SettingsPage() {
  const { user, updateUser } = useAuth();
  const [name, setName] = useState(user?.name ?? "");
  const [email, setEmail] = useState(user?.email ?? "");
  const [twoFactor, setTwoFactor] = useState(false);
  const [sessionAlerts, setSessionAlerts] = useState(true);
  const [language, setLanguage] = useState("fa");

  const savePersonal = () => {
    updateUser({ name, email });
    toast.success("تنظیمات ذخیره شد");
  };

  const changePassword = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("رمز عبور بروزرسانی شد (نسخه دمو)");
  };

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <section className="rounded-3xl border border-border bg-foreground/[0.02] p-6">
        <h3 className="font-semibold">تنظیمات شخصی</h3>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label>نام و نام خانوادگی</Label>
            <Input value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>ایمیل</Label>
            <Input value={email} onChange={(e) => setEmail(e.target.value)} dir="ltr" />
          </div>
        </div>
        <Button className="mt-5" onClick={savePersonal}>
          <Save className="h-4 w-4" /> ذخیره تغییرات
        </Button>
      </section>

      <section className="rounded-3xl border border-border bg-foreground/[0.02] p-6">
        <div className="flex items-center gap-2">
          <ShieldCheck className="h-4 w-4 text-muted-foreground" />
          <h3 className="font-semibold">امنیت حساب</h3>
        </div>

        <form onSubmit={changePassword} className="mt-5 grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label>رمز عبور فعلی</Label>
            <PasswordInput placeholder="••••••••" />
          </div>
          <div className="space-y-2">
            <Label>رمز عبور جدید</Label>
            <PasswordInput placeholder="••••••••" />
          </div>
          <Button type="submit" variant="outline" className="sm:col-span-2 sm:w-fit">
            بروزرسانی رمز عبور
          </Button>
        </form>

        <div className="mt-6 space-y-4 border-t border-border pt-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 text-sm font-medium">
                <Smartphone className="h-3.5 w-3.5" /> تایید دو مرحله‌ای
              </div>
              <p className="mt-1 text-xs text-muted-foreground">لایه امنیتی اضافه برای ورود به حساب.</p>
            </div>
            <Switch checked={twoFactor} onCheckedChange={setTwoFactor} />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium">هشدار ورود از دستگاه جدید</div>
              <p className="mt-1 text-xs text-muted-foreground">دریافت ایمیل هنگام ورود از دستگاه ناشناس.</p>
            </div>
            <Switch checked={sessionAlerts} onCheckedChange={setSessionAlerts} />
          </div>
        </div>
      </section>

      <section className="rounded-3xl border border-border bg-foreground/[0.02] p-6">
        <div className="flex items-center gap-2">
          <Palette className="h-4 w-4 text-muted-foreground" />
          <h3 className="font-semibold">ظاهر و زبان</h3>
        </div>
        <div className="mt-5 space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium">حالت نمایش</div>
              <p className="mt-1 text-xs text-muted-foreground">بین حالت روشن و تیره جابه‌جا شوید.</p>
            </div>
            <ThemeToggle />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4 text-muted-foreground" />
              <div>
                <div className="text-sm font-medium">زبان</div>
                <p className="mt-1 text-xs text-muted-foreground">زبان پیش‌فرض رابط کاربری.</p>
              </div>
            </div>
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger className="w-36">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="fa">فارسی</SelectItem>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="ar">العربية</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>
    </div>
  );
}
