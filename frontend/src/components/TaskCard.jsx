import React, { useState } from "react";
import { Card } from "./ui/card";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import {
  Calendar,
  CheckCircle2,
  Circle,
  SquarePen,
  Trash2,
} from "lucide-react";
import { Input } from "./ui/input";
import { toast } from "sonner";
import api from "@/lib/axios"; 

const TaskCard = ({ task, index, handleTaskChanged }) => {
  const [isEditting, setIsEditting] = useState(false);
  const [updateTaskTitle, setUpdateTaskTitle] = useState(task.title || "");

  const deleteTask = async (taskId) => {
    try {
      await api.delete(`/tasks/${taskId}`);
      toast.success("Nhiệm vụ đã xoá.");
      handleTaskChanged();
    } catch {
      toast.error("Lỗi xảy ra khi xoá nhiệm vụ.");
    }
  };

  const updateTask = async () => {
    try {
      if (!updateTaskTitle.trim()) return;
      setIsEditting(false);
      await api.put(`/tasks/${task.id}`, {
        ...task,
        title: updateTaskTitle,
      });
      toast.success(`Đã đổi tên nhiệm vụ thành: ${updateTaskTitle}`);
      handleTaskChanged();
    } catch {
      toast.error("Lỗi xảy ra khi cập nhật nhiệm vụ.");
    }
  };

  const toggleTaskCompleteButton = async () => {
    try {
      await api.patch(`/tasks/${task.id}/toggle`);
      toast.success(task.completed ? "Đã mở lại nhiệm vụ." : "Đã hoàn thành!");
      handleTaskChanged();
    } catch {
      toast.error("Lỗi khi thay đổi trạng thái.");
    }
  };


  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      updateTask();
    }
  };

  return (
    <Card
      className={cn(
        "p-4 bg-white border border-slate-200 shadow-sm hover:shadow-md transition-all duration-200 group relative",
        task.completed && "bg-slate-50/50 opacity-75",
      )}
      style={{ animationDelay: `${index * 50}ms` }}
    >
      {/* Badge trạng thái góc phải */}
      <div className="absolute top-2 right-2 flex items-center gap-1 select-none">
        {task.completed ? (
          <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold border border-emerald-200">
            <CheckCircle2 className="size-3 text-emerald-500" /> Hoàn thành
          </span>
        ) : (
          <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold border border-blue-200">
            <Circle className="size-3 text-blue-400" /> Đang làm
          </span>
        )}
      </div>
      <div className="flex items-center gap-4">
        {/* Nút Checkbox tròn */}
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "shrink-0 size-8 rounded-full transition-all duration-200",
            task.completed
              ? "text-emerald-500 hover:text-emerald-600"
              : "text-slate-400 hover:text-blue-500",
          )}
          onClick={toggleTaskCompleteButton}
        >
          {task.completed ? (
            <CheckCircle2 className="size-5" />
          ) : (
            <Circle className="size-5" />
          )}
        </Button>

        {/* Nội dung Task */}
        <div className="flex-1 min-w-0">
          {isEditting ? (
            <Input
              className="flex-1 h-10 text-base focus-visible:ring-1"
              value={updateTaskTitle}
              onChange={(e) => setUpdateTaskTitle(e.target.value)}
              onKeyDown={handleKeyPress}
              autoFocus
              onBlur={() => {
                setIsEditting(false);
                setUpdateTaskTitle(task.title);
              }}
            />
          ) : (
            <p
              className={cn(
                "text-base font-medium transition-all duration-200",
                task.completed
                  ? "line-through text-slate-500"
                  : "text-slate-700",
              )}
            >
              {task.title}
            </p>
          )}

          {/* Ngày tháng */}
          <div className="flex items-center gap-2 mt-1">
            <Calendar className="size-3 text-slate-400" />
            <span className="text-[10px] text-slate-400">
              Tạo:{" "}
              {new Date(task.createdAt).toLocaleString("vi-VN", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
            {task.updatedAt && (
              <span className="text-[10px] text-slate-400 ml-4">
                Cập nhật:{" "}
                {new Date(task.updatedAt).toLocaleString("vi-VN", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            )}
            {task.completedAt && (
              <span className="text-[10px] text-emerald-700 ml-4">
                Hoàn thành:{" "}
                {new Date(task.completedAt).toLocaleString("vi-VN", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            )}
          </div>
        </div>

        {/* Nhóm nút chức năng */}
        <div className="hidden gap-1 group-hover:flex animate-in fade-in slide-in-from-right-2">
          <Button
            variant="ghost"
            size="icon"
            className="size-8 text-slate-400 hover:text-blue-500"
            onClick={() => setIsEditting(true)}
          >
            <SquarePen className="size-4" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="size-8 text-slate-400 hover:text-red-500"
            onClick={() => deleteTask(task.id)} // Chú ý: task.id (không phải _id)
          >
            <Trash2 className="size-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default TaskCard;
