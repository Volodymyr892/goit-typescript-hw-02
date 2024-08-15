import css from './ImageGallery.module.css'
import ImageCard from "../ImageCard/ImageCard"
import { ImageResult } from '../../articles-api'
import { FC } from 'react';

interface ImageGalleryProps { 
    items: ImageResult[];
    onImageClick: (item: ImageResult)=> void;
}

const ImageGallery: FC<ImageGalleryProps>=({items, onImageClick})=> {
    return(
<ul className={css.imageGallery}>
	{items.map((item: ImageResult)=>(
        <li className={css.imageGalleryItem} key={item.id} onClick={()=> onImageClick(item)}>
        <ImageCard name={item}/>
	</li>))}
</ul>
)
}

export default ImageGallery;