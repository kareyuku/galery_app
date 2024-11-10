"use client"

import { useState, useEffect } from "react"
import Post from "./Post";
import axios from "axios";

interface IPhoto {
    id: string;
    download_url: string;
}

export default function DisplayImages() {
    
    const [images, setImages] = useState<IPhoto[]>([]);

    const fetchImages = async () => {
        const request = await axios.get('https://picsum.photos/v2/list?page=2&limit=35')
        const data = await request.data;
        setImages(data);
    }

    useEffect(() => {
        fetchImages();
    }, []);
    
    return <div className="columns-2 lg:columns-4 md:columns-3 gap-4 space-y-4 mx-auto">
        {images.map((image) =>
            <div key={image.id} className="break-inside-avoid">
                <Post img={image.download_url} />
            </div>
        )}
    </div>
}