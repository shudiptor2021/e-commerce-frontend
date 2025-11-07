import { ThemeProvider } from "@/components/providers/theme-provider";
import { SidebarProvider } from "@/components/ui/sidebar";
import { fetchUserProfile } from "@/lib/auth";
import { cookies } from "next/headers";
import AppSidebar from "./_components/AppSidebar";
import Navbar from "./_components/Navbar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";
  const userData = await fetchUserProfile();
  // console.log(userData);

  return (
    <section className="flex bg-background">
      {/* Optional dashboard-specific UI, e.g. sidebar */}
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <SidebarProvider defaultOpen={defaultOpen}>
          <AppSidebar />
          <div className="w-full">
            <Navbar userData={userData} />
            <div className="px-4">{children}</div>
          </div>
        </SidebarProvider>
      </ThemeProvider>
    </section>
  );
}
