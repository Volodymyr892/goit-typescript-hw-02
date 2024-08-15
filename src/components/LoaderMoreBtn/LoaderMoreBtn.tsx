import { FC } from 'react';
import css from './LoaderMoreBtn.module.css'

interface LoaderMoreBtnProps{
    onClick:()=> void;
}

const LoaderMorebtn: FC<LoaderMoreBtnProps>=({onClick})=>{
    return(
        <div className={css.buttonContainer}>
            <button onClick={onClick} className={css.button}> Load more</button>
        </div>
    )
}
export default  LoaderMorebtn;