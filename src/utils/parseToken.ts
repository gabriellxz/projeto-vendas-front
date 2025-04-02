export function parseToken(token: string | null) {
    if (!token) return null;

    try {
        const cleanedToken = token.replace(/^"+|"+$/g, '')

        return token.startsWith('"') ? JSON.parse(token) : cleanedToken
    } catch (error) {
        console.error('Error parsing token:', error);
        return null;
    }
}