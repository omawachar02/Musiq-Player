// const API_URL = "https://api.audius.co/v1";

// export const searchAudiusTracks = async (query) => {
//     if (!query.trim()) {
//         return [];
//     }

//     try {
//         const response = await fetch(
//             `${API_URL}/tracks/search?query=${encodeURIComponent(
//                 query
//             )}&limit=20`
//         );

//         if (!response.ok) {
//             throw new Error(
//                 `Audius API Error: ${response.status}`
//             );
//         }

//         const result = await response.json();

//         console.log("Audius response:", result);

//         return result.data || [];
//     } catch (error) {
//         console.error(
//             "Audius Search Error:",
//             error
//         );

//         return [];
//     }
// };

const API_URL = "https://api.audius.co/v1";

export const searchAudiusTracks = async (query) => {
    if (!query.trim()) {
        return [];
    }

    try {
        const response = await fetch(
            `${API_URL}/tracks/search?query=${encodeURIComponent(
                query
            )}&limit=20`
        );

        if (!response.ok) {
            throw new Error(
                `Audius API Error: ${response.status}`
            );
        }

        const result = await response.json();

        console.log("Audius response:", result);

        return result.data || [];
    } catch (error) {
        console.error(
            "Audius Search Error:",
            error
        );

        return [];
    }
};