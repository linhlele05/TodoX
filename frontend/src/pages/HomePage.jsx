import AddTask from "@/components/AddTask";
import DateTimeFilter from "@/components/DateTimeFilter";
import Footer from "@/components/Footer";
import { Header } from "@/components/Header";
import StatsAndFilters from "@/components/StatsAndFilters";
import TaskList from "@/components/TaskList";
import TaskListPagination from "@/components/TaskListPagination";
import React, { useEffect, useState, useCallback } from "react";
import { toast } from "sonner";
import api from "@/lib/axios";
import { visibleTaskLimit } from "@/lib/data";

const HomePage = () => {
  const [tasks, setTasks] = useState([]);
  const [activeTaskCount, setActiveTaskCount] = useState(0);
  const [completeTaskCount, setCompleteTaskCount] = useState(0);
  const [filter, setFilter] = useState("all");
  const [dateQuery, setDateQuery] = useState("today");
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const fetchTasks = useCallback(async () => {
    try {
      const res = await api.get("/tasks", {
        params: {
          page: page,
          size: visibleTaskLimit,
          filter: filter,
          date: dateQuery,
        },
      });

      const result = res.data.result;
      setTasks(result.page.content);
      setTotalPages(result.page.totalPages);
      setActiveTaskCount(result.activeCount || 0);
      setCompleteTaskCount(result.completedCount || 0);
    } catch {
      toast.error("Lỗi xảy ra khi truy xuất tasks.");
    }
  }, [page, filter, dateQuery]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    setPage(0);
  };

  const handleDateChange = (newDate) => {
    setDateQuery(newDate);
    setPage(0);
  };

  const handleTaskChanged = () => {
    fetchTasks();
  };

  const handleNext = () => {
    if (page < totalPages - 1) setPage((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (page > 0) setPage((prev) => prev - 1);
  };

  return (
    <div className="min-h-screen w-full bg-[#e0f2fe] relative pb-10">
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `radial-gradient(circle at 30% 70%, rgba(173, 216, 230, 0.35), transparent 60%),
                            radial-gradient(circle at 70% 30%, rgba(255, 182, 193, 0.4), transparent 60%)`,
        }}
      />
      <div className="container relative z-10 pt-8 mx-auto">
        <div className="w-full max-w-2xl p-6 mx-auto space-y-6">
          <Header />
          <AddTask handleNewTaskAdded={handleTaskChanged} />

          <StatsAndFilters
            filter={filter}
            setFilter={handleFilterChange}
            activeTasksCount={activeTaskCount}
            completedTasksCount={completeTaskCount}
          />

          <TaskList
            tasks={tasks}
            filter={filter}
            handleTaskChanged={handleTaskChanged}
          />

          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            <TaskListPagination
              handleNext={handleNext}
              handlePrev={handlePrev}
              handlePageChange={(p) => setPage(p - 1)}
              page={page + 1}
              totalPages={totalPages}
            />
            <DateTimeFilter
              dateQuery={dateQuery}
              setDateQuery={handleDateChange}
            />
          </div>

          <Footer
            activeTasksCount={activeTaskCount}
            completedTasksCount={completeTaskCount}
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
