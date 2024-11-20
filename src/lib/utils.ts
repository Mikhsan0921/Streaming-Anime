export const getCookieValue = (name: string): string | null => {
    const match = document.cookie.match(
        new RegExp("(^|;)\\s*" + name + "\\s*=\\s*([^;]+)")
    );
    return match ? decodeURIComponent(match[2]) : null;
};