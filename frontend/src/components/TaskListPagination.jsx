import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
  } from "@/components/ui/pagination";
  import { cn } from "@/lib/utils";
  
  const TaskListPagination = ({
    handleNext,
    handlePrev,
    handlePageChange,
    page, // Đây là số trang hiển thị cho người dùng (bắt đầu từ 1)
    totalPages,
  }) => {
    const generatePages = () => {
      const pages = [];
      const siblingCount = 1; // Số trang hiển thị bên cạnh trang hiện tại
  
      if (totalPages <= 5) {
        for (let i = 1; i <= totalPages; i++) pages.push(i);
      } else {
        const leftSiblingIndex = Math.max(page - siblingCount, 1);
        const rightSiblingIndex = Math.min(page + siblingCount, totalPages);
  
        const showLeftDots = leftSiblingIndex > 2;
        const showRightDots = rightSiblingIndex < totalPages - 1;
  
        if (!showLeftDots && showRightDots) {
          let leftItemCount = 3;
          for (let i = 1; i <= leftItemCount; i++) pages.push(i);
          pages.push("...");
          pages.push(totalPages);
        } else if (showLeftDots && !showRightDots) {
          pages.push(1);
          pages.push("...");
          for (let i = totalPages - 2; i <= totalPages; i++) pages.push(i);
        } else {
          pages.push(1);
          pages.push("...");
          pages.push(page);
          pages.push("...");
          pages.push(totalPages);
        }
      }
      return pages;
    };
  
    const pagesToShow = generatePages();
  
    // Nếu không có trang nào hoặc chỉ có 1 trang thì không cần hiện pagination
    if (totalPages <= 1) return null;
  
    return (
      <div className="flex justify-center mt-4">
        <Pagination>
          <PaginationContent>
            {/* Nút Trước */}
            <PaginationItem>
              <PaginationPrevious
                onClick={handlePrev}
                className={cn(
                  "cursor-pointer transition-all hover:bg-slate-100",
                  page === 1 && "pointer-events-none opacity-40"
                )}
              />
            </PaginationItem>
  
            {/* Danh sách các số trang */}
            {pagesToShow.map((p, index) => (
              <PaginationItem key={index}>
                {p === "..." ? (
                  <PaginationEllipsis />
                ) : (
                  <PaginationLink
                    isActive={p === page}
                    onClick={() => p !== page && handlePageChange(p)}
                    className={cn(
                      "cursor-pointer transition-all",
                      p === page ? "bg-primary text-white hover:bg-primary/90" : "hover:bg-slate-100"
                    )}
                  >
                    {p}
                  </PaginationLink>
                )}
              </PaginationItem>
            ))}
  
            {/* Nút Sau */}
            <PaginationItem>
              <PaginationNext
                onClick={handleNext}
                className={cn(
                  "cursor-pointer transition-all hover:bg-slate-100",
                  page === totalPages && "pointer-events-none opacity-40"
                )}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    );
  };
  
  export default TaskListPagination;