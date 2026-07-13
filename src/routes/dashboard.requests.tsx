import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Inbox, CheckCircle2, XCircle, Clock3 } from "lucide-react";

import { useRoleGuard } from "@/lib/use-role-guard";
import { mockClientRequests } from "@/lib/mock/requests";
import type { ClientRequest, RequestStatus } from "@/lib/mock/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/dashboard/requests")({
  component: RequestsPage,
});

const statusStyles: Record<RequestStatus, string> = {
  "در انتظار پاسخ": "bg-amber-500/10 text-amber-500",
  پذیرفته‌شده: "bg-emerald-500/10 text-emerald-500",
  "رد شده": "bg-rose-500/10 text-rose-500",
};

const filters: Array<"همه" | RequestStatus> = ["همه", "در انتظار پاسخ", "پذیرفته‌شده", "رد شده"];

function RequestsPage() {
  useRoleGuard("expert");
  const [activeFilter, setActiveFilter] = useState<"همه" | RequestStatus>("همه");
  const [requests, setRequests] = useState<ClientRequest[]>(mockClientRequests);
  const [rejectDialogOpen, setRejectDialogOpen] = useState(false);
  const [requestToReject, setRequestToReject] = useState<ClientRequest | null>(null);
  const [rejectReason, setRejectReason] = useState("");

  const filteredRequests = useMemo(() => {
    return activeFilter === "همه"
      ? requests
      : requests.filter((request) => request.status === activeFilter);
  }, [activeFilter, requests]);

  const respondToRequest = (requestId: string, nextStatus: RequestStatus) => {
    setRequests((current) =>
      current.map((request) =>
        request.id === requestId ? { ...request, status: nextStatus } : request,
      ),
    );
  };

  const openRejectDialog = (request: ClientRequest) => {
    setRequestToReject(request);
    setRejectReason("");
    setRejectDialogOpen(true);
  };

  const confirmRejectRequest = () => {
    if (!requestToReject || !rejectReason.trim()) return;

    setRequests((current) =>
      current.map((request) =>
        request.id === requestToReject.id
          ? {
              ...request,
              status: "رد شده",
              rejectionReason: rejectReason.trim(),
            }
          : request,
      ),
    );
    setRejectDialogOpen(false);
    setRequestToReject(null);
    setRejectReason("");
  };

  const pendingCount = requests.filter((request) => request.status === "در انتظار پاسخ").length;
  const acceptedCount = requests.filter((request) => request.status === "پذیرفته‌شده").length;

  return (
    <div className="space-y-6">
      <section className="grid gap-4 md:grid-cols-3">
        <Card className="border-border bg-foreground/[0.02]">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Inbox className="h-4 w-4" />
              درخواست‌های جدید
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-black">{pendingCount}</div>
          </CardContent>
        </Card>

        <Card className="border-border bg-foreground/[0.02]">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <CheckCircle2 className="h-4 w-4" />
              پذیرفته‌شده
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-black">{acceptedCount}</div>
          </CardContent>
        </Card>

        <Card className="border-border bg-foreground/[0.02]">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock3 className="h-4 w-4" />
              میانگین پاسخ‌دهی
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-black">۲ ساعته</div>
          </CardContent>
        </Card>
      </section>

      <section className="rounded-[28px] border border-border bg-foreground/[0.02] p-4 sm:p-6">
        <div className="mb-5 flex flex-wrap items-center gap-2">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`rounded-full border px-3.5 py-1.5 text-xs transition ${
                activeFilter === filter
                  ? "border-transparent bg-foreground text-background"
                  : "border-border bg-foreground/[0.02] text-muted-foreground hover:text-foreground"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="space-y-3">
          {filteredRequests.map((request) => (
            <Card key={request.id} className="border-border bg-background/70">
              <CardHeader className="pb-4">
                <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
                  <div className="flex items-start gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 to-violet-500 text-xs font-bold text-white">
                      {request.clientInitials}
                    </div>
                    <div>
                      <CardTitle className="text-base">{request.clientName}</CardTitle>
                      <CardDescription className="mt-1">{request.service}</CardDescription>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <Badge className={statusStyles[request.status]}>{request.status}</Badge>
                    <span className="text-xs text-muted-foreground">
                      {new Date(request.createdAt).toLocaleDateString("fa-IR")}
                    </span>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <p className="text-sm leading-7 text-muted-foreground">{request.message}</p>

                {request.status === "رد شده" && request.rejectionReason && (
                  <div className="rounded-2xl border border-rose-500/20 bg-rose-500/5 px-3 py-2 text-xs leading-6 text-rose-500">
                    علت رد درخواست: {request.rejectionReason}
                  </div>
                )}

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="text-sm font-semibold">بودجه پیشنهادی: {request.budget}</div>
                  <div className="flex flex-wrap gap-2">
                    {request.status === "در انتظار پاسخ" && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => respondToRequest(request.id, "پذیرفته‌شده")}
                      >
                        <CheckCircle2 className="h-4 w-4" />
                        پذیرش
                      </Button>
                    )}
                    {request.status === "در انتظار پاسخ" && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => openRejectDialog(request)}
                      >
                        <XCircle className="h-4 w-4" />
                        رد درخواست
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <Dialog open={rejectDialogOpen} onOpenChange={setRejectDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>علت رد درخواست را مشخص کنید</DialogTitle>
            <DialogDescription>
              برای این درخواست، دلیل رد شدن را به صورت کوتاه ثبت کنید تا مشتری بداند چرا جواب شما منفی بوده است.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-2">
            <Label>دلیل رد درخواست</Label>
            <Textarea
              value={rejectReason}
              onChange={(event) => setRejectReason(event.target.value)}
              placeholder="مثلاً: ظرفیت زمانی فعلی تکمیل نمی‌شود یا پروژه با محدودیت بودجه همخوانی ندارد."
              className="min-h-28"
            />
          </div>

          <DialogFooter className="gap-2 sm:gap-2">
            <Button variant="outline" onClick={() => setRejectDialogOpen(false)}>
              انصراف
            </Button>
            <Button onClick={confirmRejectRequest} disabled={!rejectReason.trim()}>
              تایید رد درخواست
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
