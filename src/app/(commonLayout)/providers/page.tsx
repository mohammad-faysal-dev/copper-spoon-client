import { providerService } from "@/services/provider.service"

const providerPage = async () => {
    const { data, error } = await providerService.getProviders()
    console.log(data)
    return (
        <div>

        </div>
    )
}

export default providerPage