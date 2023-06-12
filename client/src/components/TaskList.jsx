import { useEffect, useState } from "react";
import { getAllTasks } from "../api/task.api";
import TaskCard from "./TaskCard";

function TaskList() {
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    async function loadTasks(params) {
      const res = await getAllTasks();
      setTasks(res.data);
    }
    loadTasks();
  }, []);
  return (
    <div className=" grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-3">
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          id={task.id}
          title={task.title}
          description={task.description}
        />
      ))}
    </div>
  );
}

export default TaskList;
