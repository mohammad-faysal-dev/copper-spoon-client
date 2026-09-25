import { userService } from "@/services/user.service";
import { providerService } from "@/services/provider.service";
import ProviderProfileForm from "./profile-form";

export default async function ProviderProfilePage() {
    const sessionResponse = await userService.getSession();
    const session = sessionResponse.data;

    // Assuming session.user contains the basic user details
    const user = {
        id: session?.user?.id ?? "",
        name: session?.user?.name ?? "",
        email: session?.user?.email ?? "",
    };

    // Fetch the actual provider record associated with the user.id
    // This depends on how the backend links user and provider (often providerId = userId)
    const providerResponse = await providerService.getMyProfile(user.id);
    const providerData = providerResponse.data;

    return (
        <ProviderProfileForm
            user={user}
            provider={providerData}
        />
    );
}
