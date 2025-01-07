interface JikanPagination {
    pagination: {
        last_visible_page: number;
        has_next_page: boolean;
        current_page: number;
        items: {
            count: number;
            total: number;
            per_page: number;
        };
    };
}

interface JikanAnimeData {
    mal_id: number;
    title: string;
    images: { jpg: { large_image_url: string } };
    trailer: { images?: { small_image_url: string } };
    aired: { prop: { from: { year: number } } };
    genres: { name: string }[];
    type: string;
    synopsis: string;
    status: string;
    studios: { mal_id: number; name: string }[];
    rating?: string;
    score?: number;
    title_synonyms: string[];
}