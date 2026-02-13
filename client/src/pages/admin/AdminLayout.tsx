import { Switch, Route, Link, useLocation } from "wouter";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  FileText,
  Calendar,
  Stethoscope,
  Wrench,
  Settings,
  HeartPulse,
  LogOut,
} from "lucide-react";
import AdminDashboard from "./AdminDashboard";
import AdminBlogList from "./AdminBlogList";
import AdminBlogEditor from "./AdminBlogEditor";
import AdminWeeksList from "./AdminWeeksList";
import AdminWeekEditor from "./AdminWeekEditor";
import AdminSymptomsList from "./AdminSymptomsList";
import AdminSymptomEditor from "./AdminSymptomEditor";
import AdminHealthPage from "./AdminHealthPage";

const sidebarItems = [
  { title: "لوحة التحكم", url: "/admin", icon: LayoutDashboard },
  { title: "المقالات", url: "/admin/blog", icon: FileText },
  { title: "الأسابيع", url: "/admin/weeks", icon: Calendar },
  { title: "الأعراض", url: "/admin/symptoms", icon: Stethoscope },
  { title: "الأدوات", url: "/admin/tools", icon: Wrench },
  { title: "الإعدادات", url: "/admin/settings", icon: Settings },
  { title: "صحة المحتوى", url: "/admin/health", icon: HeartPulse },
];

export default function AdminLayout() {
  const { user, logout } = useAuth();
  const [location] = useLocation();

  const style = {
    "--sidebar-width": "16rem",
    "--sidebar-width-icon": "3rem",
  };

  return (
    <div dir="rtl">
      <SidebarProvider style={style as React.CSSProperties}>
        <div className="flex h-screen w-full">
          <Sidebar side="right" data-testid="admin-sidebar">
            <SidebarContent>
              <SidebarGroup>
                <SidebarGroupLabel data-testid="text-sidebar-label">لوحة التحكم</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {sidebarItems.map((item) => (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton
                          asChild
                          isActive={
                            item.url === "/admin"
                              ? location === "/admin"
                              : location.startsWith(item.url)
                          }
                        >
                          <Link href={item.url} data-testid={`link-sidebar-${item.url.split("/").pop()}`}>
                            <item.icon />
                            <span>{item.title}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>
          </Sidebar>
          <div className="flex flex-col flex-1 overflow-hidden">
            <header className="flex items-center justify-between gap-2 p-3 border-b" data-testid="admin-header">
              <div className="flex items-center gap-2">
                <SidebarTrigger data-testid="button-sidebar-toggle" />
                <span className="text-sm font-medium text-muted-foreground" data-testid="text-user-info">
                  {user?.name} ({user?.role})
                </span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={logout}
                data-testid="button-logout"
              >
                <LogOut className="w-4 h-4 ml-2" />
                تسجيل الخروج
              </Button>
            </header>
            <main className="flex-1 overflow-auto p-6">
              <Switch>
                <Route path="/admin" component={AdminDashboard} />
                <Route path="/admin/blog" component={AdminBlogList} />
                <Route path="/admin/blog/new" component={AdminBlogEditor} />
                <Route path="/admin/blog/:id" component={AdminBlogEditor} />
                <Route path="/admin/weeks" component={AdminWeeksList} />
                <Route path="/admin/weeks/:id" component={AdminWeekEditor} />
                <Route path="/admin/symptoms" component={AdminSymptomsList} />
                <Route path="/admin/symptoms/new" component={AdminSymptomEditor} />
                <Route path="/admin/symptoms/:id" component={AdminSymptomEditor} />
                <Route path="/admin/health" component={AdminHealthPage} />
                <Route>
                  <div className="text-center py-12" data-testid="text-coming-soon">
                    <h2 className="text-xl font-semibold mb-2">قريباً</h2>
                    <p className="text-muted-foreground">هذه الصفحة قيد التطوير</p>
                  </div>
                </Route>
              </Switch>
            </main>
          </div>
        </div>
      </SidebarProvider>
    </div>
  );
}
