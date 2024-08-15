import axios from "axios"

axios.defaults.baseURL = "https://api.unsplash.com";

interface ImageResult {
    id: string;
    description: string | null
    likes: number;
    user:{
        name:string
    };
    urls:{
        regular:string;
        small: string;
    }
}
interface FetchImagesRespons{
    results: ImageResult[];
}



export default async function fetchImagesWithTopic(query: string, currentPage:number): Promise<ImageResult[]> {
    const response = await axios.get<FetchImagesRespons>(`/search/photos`, {
        params: {
            client_id: "PFRLR3wWc0xcLDv87Nq4715YHS60xzEHicnxBnzam7M",
            query: query,
            page: currentPage,
            per_page: 9,
        },
    });
    return response.data.results;
}