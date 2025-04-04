export type Posts = {
    id: number;
    user_id:number;
    title: string;
    description: string;
    is_published:boolean;
    created_at:string;
}

export type Post = {
    id?: number;
    title: string;
    description: string;
    is_published?: boolean;
    created_at?: string;
}

export type PostFormProps= {
    formTitle:string;
    data:Post
    
    onSave:() => void
}