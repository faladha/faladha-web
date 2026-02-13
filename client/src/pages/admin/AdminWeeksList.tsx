import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { Pencil } from "lucide-react";
import type { PregnancyWeek } from "@shared/schema";

const trimesterColors: Record<number, string> = {
  1: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  2: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  3: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
};

const trimesterLabels: Record<number, string> = {
  1: "الثلث الأول",
  2: "الثلث الثاني",
  3: "الثلث الثالث",
};

export default function AdminWeeksList() {
  const { data: weeks, isLoading } = useQuery<PregnancyWeek[]>({
    queryKey: ["/api/admin/weeks"],
  });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold" data-testid="text-weeks-list-title">أسابيع الحمل</h1>

      {isLoading ? (
        <div className="space-y-2" data-testid="weeks-list-loading">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-12 w-full" />
          ))}
        </div>
      ) : (
        <div className="rounded-md border">
          <Table data-testid="table-weeks-list">
            <TableHeader>
              <TableRow>
                <TableHead>الأسبوع</TableHead>
                <TableHead>العنوان</TableHead>
                <TableHead>الثلث</TableHead>
                <TableHead>الحالة</TableHead>
                <TableHead>الإجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {weeks && weeks.length > 0 ? (
                weeks.map((week) => (
                  <TableRow key={week.id} data-testid={`row-week-${week.id}`}>
                    <TableCell className="font-medium" data-testid={`text-week-number-${week.id}`}>
                      {week.weekNumber}
                    </TableCell>
                    <TableCell data-testid={`text-week-title-${week.id}`}>{week.title}</TableCell>
                    <TableCell>
                      <Badge
                        className={`no-default-hover-elevate no-default-active-elevate ${trimesterColors[week.trimester] || ""}`}
                        data-testid={`badge-week-trimester-${week.id}`}
                      >
                        {trimesterLabels[week.trimester] || `ثلث ${week.trimester}`}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={week.status === "published" ? "default" : "secondary"}
                        data-testid={`badge-week-status-${week.id}`}
                      >
                        {week.status === "published" ? "منشور" : "مسودة"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Link href={`/admin/weeks/${week.id}`}>
                        <Button variant="ghost" size="icon" data-testid={`button-edit-week-${week.id}`}>
                          <Pencil className="w-4 h-4" />
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-muted-foreground" data-testid="text-no-weeks">
                    لا توجد أسابيع
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
