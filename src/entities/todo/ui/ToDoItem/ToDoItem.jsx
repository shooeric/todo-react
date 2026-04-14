import { memo, useContext } from "react";
import { TasksContext } from "@/entities/todo";
import RouterLink from "@/shared/ui/RouterLink";
import styles from "./ToDoItem.module.scss";
import {highlightCaseInsensitive} from '@/shared/utils/highlight'

const ToDoItem = (props) => {
  const { className = "", title, isDone, id } = props;

  const {
    firstIncompleteTaskId,
    firstIncompleteTaskRef,
    deleteTask,
    toggleTaskComplete,
    disappearingTaskId,
    appearingTaskId,
    searchQuery,
  } = useContext(TasksContext);

  const highlightedTitle = highlightCaseInsensitive(title, searchQuery)

  return (
    <li
      className={`
        ${styles.todoItem} 
        ${className} 
        ${disappearingTaskId === id ? styles.isDisappearing : ""}
        ${appearingTaskId === id ? styles.isAppearing : ""}
        `}
      ref={id === firstIncompleteTaskId ? firstIncompleteTaskRef : null}
    >
      <input
        className={styles.checkbox}
        id={id}
        type="checkbox"
        checked={isDone}
        onChange={({ target }) => toggleTaskComplete(id, target.checked)}
      />
      <label className={`${styles.label} visually-hidden`} htmlFor="task-1">
        {title}
      </label>
      <RouterLink to={`tasks/${id}`} aria-label="Task detail page">
        <span dangerouslySetInnerHTML={{__html: highlightedTitle}}/>
      </RouterLink>
      <button
        className={styles.deleteButton}
        aria-label="Delete"
        title="Delete"
        onClick={() => deleteTask(id)}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15 5L5 15M5 5L15 15"
            stroke="#757575"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </li>
  );
};

export default memo(ToDoItem);
