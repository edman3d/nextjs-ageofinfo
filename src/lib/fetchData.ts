export async function fetchData(input: RequestInfo, init?: RequestInit) {
    // Preview & Production deployments on Vercel require authentication for internal requests.
    if (process.env.NODE_ENV === 'production') {
        input = `https://${input}?x-vercel-protection-bypass=${process.env.VERCEL_AUTOMATION_BYPASS_SECRET}`
    } else {
        input = `http://${input}`
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

// export async function fetchData(input: RequestInfo, init?: RequestInit) {
//     // console.log('restore REACT_APP_MONOREPO_BACKEND_URL to the env in vercel settings');
//     // console.log('NODE_ENV: ', env.NODE_ENV);
//     // console.log('REACT_APP_MONOREPO_BACKEND_URL: ', env.REACT_APP_MONOREPO_BACKEND_URL);
//     const response = await fetch(input, init);
//     if (response.ok) {
//         return response;
//     } else {
//         const errorBody = await response.json();
//         const errorMessage = errorBody.error;
//         if (response.status === 401) {
//             throw new UnauthorizedError(errorMessage);
//         } else if (response.status === 409) {
//             throw new ConflictError(errorMessage);
//         } else {
//             throw Error("Request failed with status: " + response.status + " message: " + errorMessage);
//         }
//     }
// }