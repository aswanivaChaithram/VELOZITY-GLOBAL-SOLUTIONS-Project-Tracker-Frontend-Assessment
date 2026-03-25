export type Task = {
  id: number;
  title: string;
  status: "Todo" | "In-progress" | "In-review" | "Done";
  priority: "Low" | "Medium" | "High";
  assignee: string;
  startDate?: string;
  dueDate: string;
};