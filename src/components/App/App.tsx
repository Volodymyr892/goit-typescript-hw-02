import SearchBar from "../SearchBar/SearchBar"
import ImageGallery from "../ImageGallery/ImageGallery"
import Loader from "../Loader/Loader"
import ErrorMessage from "../ErrorMessage/ErrorMessage"
import LoaderMorebtn from "../LoaderMoreBtn/LoaderMoreBtn"
import ImageModal from "../ImageModal/ImageModal"
import fetchArticlesWithTopic from "../../articles-api"
import { ImageResult } from "../../articles-api"

import { useState, useEffect} from "react"
import css from './App.module.css'



export default function App() {
    const [articles, setArticles] = useState<ImageResult[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string| null>(null);
    const [page, setPage] = useState<number>(1);
    const [topic, setTopic] = useState<string>("");
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [modalData, setModalData] = useState<ImageResult | null>(null);
    
    const handleSearch = async(newTopic: string)=>{
            setArticles([]);
            setPage(1)
            setTopic(newTopic) 
    }
        const handleLoadMore = ()=>{
            setPage(page+1);
        }
        const handleImageClick =(data: ImageResult)=>{
           setModalData(data);
           setIsModalOpen(true);
        }
        const closeModal = ()=>{
            setIsModalOpen(false);
            setModalData(null);
        }


        useEffect(()=>{
            if (topic ==="") {
                return;
            }

            async function getArticles(){
                try {
                    setError(null);
                    setLoading(true);
                    const data = await fetchArticlesWithTopic(topic, page);
                    setArticles(prevArticles => {
                        return[...prevArticles, ...data]
                    })
                } catch (error) {
                        if (error instanceof Error) {
                            setError(error.message); // Встановлюємо текст помилки
                        } else {
                            setError("An unexpected error occurred"); // Якщо це не стандартна помилка, встановлюємо повідомлення за замовчуванням
                        }
                }finally{
                    setLoading(false);
                }

            }
            getArticles()
        },[topic, page])

    return(
        <div className={css.imageSearchApp}>
            <div className={css.container}>
                <h1 className={css.mainTitle}>Images Gallery</h1>
                <SearchBar onSearch={handleSearch} />
                {articles.length > 0 && (
                    <ImageGallery items={articles} onImageClick={handleImageClick} />
                )}
                {loading && <Loader />}
                {error && <ErrorMessage />}
                <div className={css.imageSearchApp__loaderWrap}>
                {loading && <Loader />}
                </div>
                <div className={css.imageSearchApp__buttonLoadMoreWrap}>
                {articles.length > 0  && (
                    <LoaderMorebtn onClick={handleLoadMore} />
                )}
                </div>
                {isModalOpen && (
                <ImageModal
                    isOpen={isModalOpen}
                    onRequestClose={closeModal}
                    data={modalData}
                />
        )}
        </div>
    </div>
    )
}