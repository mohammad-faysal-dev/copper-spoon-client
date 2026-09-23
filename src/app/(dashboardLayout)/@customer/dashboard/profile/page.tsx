import { userService } from "@/services/user.service";
import ProfileForm from "./profile-form";

export default async function profilePage() {
  const { data } = await userService.getSession();
  return (
    <ProfileForm
      user={{
        id: data.user.id,
        name: data.user.name ?? "",
        email: data.user.email ?? "",
        phone: data.user.phone ?? "",
        address: data.user.address ?? "",
      }}
    />
  );
}
