import css from "./Image.module.css";

import { ImageResult } from "../../articles-api";
import { FC } from "react";

interface ImageCardProps {
  name: ImageResult
}

const ImageCard: FC<ImageCardProps>=({name:{urls, description}}) =>{
    return(
        <div  className={css.imageCard}>
          <img src={urls.small} alt={description || 'No Description'}  />
        </div>
    )
}
export default ImageCard;