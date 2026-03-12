import React from "react";
import { Card } from "./ui/card";
import { ClipboardList } from "lucide-react"; // Thay Circle bằng icon danh sách trông sẽ chuyên nghiệp hơn

const TaskEmptyState = ({ filter }) => {
  return (
    <Card className="p-12 text-center border-dashed border-2 bg-transparent shadow-none flex flex-col items-center justify-center">
      <div className="space-y-4">
        {/* Icon mờ tạo cảm giác nhẹ nhàng */}
        <div className="bg-muted/30 p-4 rounded-full w-fit mx-auto">
          <ClipboardList className="size-10 text-muted-foreground/60" />
        </div>
        
        <div className="space-y-2">
          <h3 className="font-semibold text-lg text-foreground/80">
            {filter === "active"
              ? "Bạn đã xử lý hết việc rồi!"
              : filter === "complete" || filter === "completed"
              ? "Chưa có nhiệm vụ nào hoàn thành."
              : "Danh sách đang trống."}
          </h3>

          <p className="text-sm text-muted-foreground max-w-[250px] mx-auto">
            {filter === "all"
              ? "Đừng để kế hoạch chỉ nằm trong đầu, hãy thêm nhiệm vụ ngay!"
              : `Hãy thử kiểm tra ở mục "${
                  filter === "active" ? "Hoàn thành" : "Đang làm"
                }" xem sao.`}
          </p>
        </div>
      </div>
    </Card>
  );
};

export default TaskEmptyState;