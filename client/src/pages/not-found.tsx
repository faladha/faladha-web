import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4" data-testid="page-not-found">
      <div className="text-center">
        <p className="text-6xl font-bold text-primary mb-4">404</p>
        <h1 className="text-2xl font-bold text-foreground mb-3">الصفحة غير موجودة</h1>
        <p className="text-muted-foreground mb-8 max-w-md mx-auto leading-relaxed">
          عذراً، الصفحة التي تبحثين عنها غير موجودة. قد تكون قد نُقلت أو حُذفت.
        </p>
        <Link href="/">
          <Button className="gap-2" data-testid="button-go-home">
            <Home className="w-4 h-4" />
            العودة للصفحة الرئيسية
          </Button>
        </Link>
      </div>
    </div>
  );
}
