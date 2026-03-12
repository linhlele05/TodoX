import React from "react";
import { Badge } from "./ui/badge";
import { FilterType } from "@/lib/data";
import { Filter, CheckCircle2, Circle } from "lucide-react";
import { Button } from "./ui/button";

const StatsAndFilters = ({
  completedTasksCount = 0,
  activeTasksCount = 0,
  filter = "all",
  setFilter, // Lưu ý: Ở HomePage bạn đang truyền handleFilterChange vào đây
}) => {
  // Hàm chọn icon tương ứng với từng trạng thái
  const getIcon = (type) => {
    switch (type) {
      case "active":
        return <Circle className="size-4" />;
      case "completed":
      case "complete":
        return <CheckCircle2 className="size-4" />;
      default:
        return <Filter className="size-4" />;
    }
  };

  return (
    <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
      {/* Phần thống kê: Hiển thị tổng số lượng thực tế từ DB */}
      <div className="flex gap-3">
        <Badge
          variant="secondary"
          className="px-3 py-1 bg-blue-50 text-blue-700 border-blue-200 shadow-sm flex items-center gap-1"
        >
          <Circle className="size-4 text-blue-400 mr-1" />
          <span className="font-bold mr-1">{activeTasksCount}</span>
          Đang làm
        </Badge>
        <Badge
          variant="secondary"
          className="px-3 py-1 bg-emerald-50 text-emerald-700 border-emerald-200 shadow-sm flex items-center gap-1"
        >
          <CheckCircle2 className="size-4 text-emerald-500 mr-1" />
          <span className="font-bold mr-1">{completedTasksCount}</span>
          Hoàn thành
        </Badge>
      </div>

      {/* Phần bộ lọc (Filter) */}
      <div className="flex items-center gap-1 p-1 bg-white/30 rounded-lg backdrop-blur-sm border border-white/50">
        {Object.keys(FilterType).map((type) => (
          <Button
            key={type}
            // Nếu filter hiện tại khớp với key, chuyển sang variant gradient
            variant={filter === type ? "gradient" : "ghost"}
            size="sm"
            className={`capitalize transition-all duration-200 ${
              filter === type
                ? "shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
            onClick={() => setFilter(type)} // Gọi handleFilterChange từ HomePage
          >
            {getIcon(type)}
            <span className="ml-2">{FilterType[type]}</span>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default StatsAndFilters;
