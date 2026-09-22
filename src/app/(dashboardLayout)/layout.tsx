import {
  AppSidebar,
} from "@/components/layout/application-shell1";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Roles } from "@/constant/roles";
import { userService } from "@/services/user.service";

export default async function DashboardLayout({
  children,
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
      <AppSidebar data={userInfo}>
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
