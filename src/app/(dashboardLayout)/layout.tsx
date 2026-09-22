
import { AppSidebar } from "@/components/layout/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Roles } from "@/constant/roles";
import { userService } from "@/services/user.service";

export default async function DashboardLayout({
  admin,
  customer,
  provider,
}: {
  children: React.ReactNode;
  admin: React.ReactNode;
  customer: React.ReactNode;
  provider: React.ReactNode;
}) {
  const { data } = await userService.getSession();
  console.log("data", data);
  const userInfo = data.user;

  return (
    <SidebarProvider>
      <AppSidebar user={userInfo}>
        <main className="flex-1 p-4">
          <SidebarTrigger />
          <div>
            {userInfo.role === Roles.admin && admin}
            {userInfo.role === Roles.customer && customer}
            {userInfo.role === Roles.provider && provider}
          </div>
        </main>
      </AppSidebar>
    </SidebarProvider>
  );
}
