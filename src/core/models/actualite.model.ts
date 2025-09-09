export interface Actualite {
    id: number;
    title: string;
    content: string;
    date: Date;
    imageUrl?: string;
    category?: string;
}