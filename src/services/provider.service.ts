
const API_URL = process.env.API_URL

export const providerService = {
    getProviders: async function () {
        try {
            const url = new URL(`${API_URL}/provider`)
            const res = await fetch(url.toString())
            if (!res.ok) {
                throw new Error("Failed to fetch providers")
            }
            const data = await res.json()
            return { data: data, error: null }
        }
        catch (err) {
            console.log(err)
            return { data: null, error: { message: "Failed to fetch providers" } }
        }
    }
}