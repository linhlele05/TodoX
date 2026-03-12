import React from "react";
import TaskCard from "./TaskCard";

const TaskList = ({ tasks, handleTaskChanged }) => {
  if (!tasks || tasks.length === 0) {
    return (
      <div className="text-center p-10 border-2 border-dashed rounded-lg text-muted-foreground">
        Chưa có nhiệm vụ nào. Hãy thêm mới ngay!
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          handleTaskChanged={handleTaskChanged}
        />
      ))}
    </div>
  );
};

export default TaskList;