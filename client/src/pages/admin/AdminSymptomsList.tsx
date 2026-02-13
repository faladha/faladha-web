import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Link } from "wouter";
import { useAuth } from "@/lib/auth";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { Plus, Pencil, Trash2 } from "lucide-react";
import type { Symptom } from "@shared/schema";

export default function AdminSymptomsList() {
  const { user } = useAuth();
  const [search, setSearch] = useState("");

  const qs = search ? `?search=${encodeURIComponent(search)}` : "";
  const { data: symptoms, isLoading } = useQuery<Symptom[]>({
    queryKey: ["/api/admin/symptoms" + qs],
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await apiRequest("DELETE", `/api/admin/symptoms/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/symptoms"] });
    },
  });

  const handleDelete = (id: string, title: string) => {
    if (confirm(`هل أنت متأكد من حذف "${title}"؟`)) {
      deleteMutation.mutate(id);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <h1 className="text-2xl font-bold" data-testid="text-symptoms-list-title">الأعراض</h1>
        <Link href="/admin/symptoms/new">
          <Button data-testid="button-new-symptom">
            <Plus className="w-4 h-4 ml-2" />
            عرض جديد
          </Button>
        </Link>
      </div>

      <Input
        placeholder="بحث بالعنوان..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="max-w-xs"
        data-testid="input-search-symptoms"
      />

      {isLoading ? (
        <div className="space-y-2" data-testid="symptoms-list-loading">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-12 w-full" />
          ))}
        </div>
      ) : (
        <div className="rounded-md border">
          <Table data-testid="table-symptoms-list">
            <TableHeader>
              <TableRow>
                <TableHead>العنوان</TableHead>
                <TableHead>الثلث</TableHead>
                <TableHead>الحالة</TableHead>
                <TableHead>الإجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {symptoms && symptoms.length > 0 ? (
                symptoms.map((symptom) => (
                  <TableRow key={symptom.id} data-testid={`row-symptom-${symptom.id}`}>
                    <TableCell className="font-medium" data-testid={`text-symptom-title-${symptom.id}`}>
                      {symptom.title}
                    </TableCell>
                    <TableCell data-testid={`text-symptom-trimester-${symptom.id}`}>
                      {symptom.trimester || "-"}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={symptom.status === "published" ? "default" : "secondary"}
                        data-testid={`badge-symptom-status-${symptom.id}`}
                      >
                        {symptom.status === "published" ? "منشور" : "مسودة"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Link href={`/admin/symptoms/${symptom.id}`}>
                          <Button variant="ghost" size="icon" data-testid={`button-edit-symptom-${symptom.id}`}>
                            <Pencil className="w-4 h-4" />
                          </Button>
                        </Link>
                        {user?.role === "admin" && (
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDelete(symptom.id, symptom.title)}
                            disabled={deleteMutation.isPending}
                            data-testid={`button-delete-symptom-${symptom.id}`}
                          >
                            <Trash2 className="w-4 h-4 text-red-500" />
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-8 text-muted-foreground" data-testid="text-no-symptoms">
                    لا توجد أعراض
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
