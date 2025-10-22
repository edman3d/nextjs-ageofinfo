'use server';

export async function fetchData(input: RequestInfo, init?: RequestInit) {
    // Preview & Production deployments on Vercel require authentication for internal requests.
    if (process.env.NODE_ENV === 'production') {
        input = `https://${process.env.VERCEL_URL}${input}?x-vercel-protection-bypass=${process.env.VERCEL_AUTOMATION_BYPASS_SECRET}`
    } else {
        input = `http://${process.env.NEXT_PUBLIC_BASE_URL}${input}`
    }
    console.log('input :>> ', input);
    const response = await fetch(input, init);
    if (response.ok) {
        return response;
    } else {
        const errorBody = await response.json();
        const errorMessage = errorBody.error;
        throw Error("Request failed with status: " + response.status + " message: " + errorMessage);
    }
}
