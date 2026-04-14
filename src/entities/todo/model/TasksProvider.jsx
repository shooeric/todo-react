import useTasks from "./useTasks";
import useIncompleteTaskScroll from "./useIncompleteTaskScroll";
import { TasksContext } from "./TasksContext";
import { useMemo } from "react";

export const TasksProvider = (props) => {
  const { children } = props;

  const {
    tasks,
    filteredTasks,
    deleteAllTasks,
    deleteTask,
    toggleTaskComplete,

    searchQuery,
    setSearchQuery,
    newTaskInputRef,
    addTask,
    disappearingTaskId,
    appearingTaskId,
  } = useTasks();

  const {
    firstIncompleteTaskId,
    firstIncompleteTaskRef
  } = useIncompleteTaskScroll(tasks);

  const value = useMemo(() => ({
    tasks,
      filteredTasks,
      deleteAllTasks,
      deleteTask,
      toggleTaskComplete,

      searchQuery,
      setSearchQuery,
      newTaskInputRef,
      addTask,
      disappearingTaskId,
      appearingTaskId,
      firstIncompleteTaskId,
      firstIncompleteTaskRef,
  }), [
    tasks,
      filteredTasks,
      deleteAllTasks,
      deleteTask,
      toggleTaskComplete,

      searchQuery,
      setSearchQuery,
      newTaskInputRef,
      addTask,
      disappearingTaskId,
      appearingTaskId,
      firstIncompleteTaskId,
      firstIncompleteTaskRef,
  ]);
  return (
    <TasksContext.Provider value={value}
    >
      {children}
    </TasksContext.Provider>
  );
};
