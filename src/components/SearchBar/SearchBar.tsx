import toast, { Toaster } from 'react-hot-toast';
import css from './SearchBar.module.css'
import { FormEvent, FC } from 'react';

interface SearchBarProps {
  onSearch: (topic: string) => void;
}

const SearchBar: FC<SearchBarProps> = ({ onSearch }) =>  {
    const handleSubmit = (evt: FormEvent<HTMLFormElement>): void => {
        evt.preventDefault();
        const form = evt.target as HTMLFormElement;
        const topicInput = form.elements.namedItem('topic') as HTMLInputElement
        const topic = topicInput.value;
        if (topic.trim() ===""){
            toast.error('Введіть текст для пошуку зображень');
            return
        }
        onSearch(topic);
        form.reset();

    };
    return (
<header className={css.searchBar}>
  <form onSubmit={handleSubmit} className={css.searchForm }>
    <input
      type="text"
      name="topic"
      // autocomplete="off"
      // autofocus
      placeholder="Search images and photos"
      className={css.searchInput}
    />
    <button type="submit" className={css.searchButton}>Search</button>
  </form>
  <Toaster/>
</header>

    )
}
export default SearchBar;