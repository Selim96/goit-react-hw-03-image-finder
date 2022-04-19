import s from './Button.module.css';

export default function Button() {
    return (
        <button type='button' className={s.Button} onClick={this}>
            Load more
        </button>
    )
}