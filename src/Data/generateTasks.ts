import type { Task } from '../Type/taskType'

const titles = [
  "Fix bug", "Update UI", "Write docs", "Test feature",
  "Deploy app", "Refactor code", "Design layout", "Implement login",
  "Optimize performance", "Fix responsive issues", "Add dark mode",
  "Create API endpoints", "Integrate backend", "Setup database",
  "Write unit tests", "Debug authentication", "Improve UX flow",
  "Add validation", "Fix console errors", "Update dependencies",
  "Configure routing", "Handle edge cases", "Improve accessibility",
  "Add loading states", "Fix layout bugs", "Setup CI/CD", "Review pull request"
];

const users = ["AV", "RK", "SP", "JD", "MK", "SR"];

const priorities: Task["priority"][] = ["Low", "Medium", "High"];
const statuses: Task["status"][] = [
  "Todo",
  "In-progress",
  "In-review",
  "Done",
];

const randomDate = () => {
  const start = new Date(2026, 2, 1);
  const end = new Date(2026, 3, 10);
  const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  return date.toISOString().split("T")[0];
};

export const generateTasks = (count: number = 500): Task[] => {
  const tasks: Task[] = [];

  for (let i = 1; i <= count; i++) {
    const hasStartDate = Math.random() > 0.2;

    tasks.push({ id: i,
      title: titles[Math.floor(Math.random() * titles.length)],
      status: statuses[Math.floor(Math.random() * statuses.length)],
      priority: priorities[Math.floor(Math.random() * priorities.length)],
      assignee: users[Math.floor(Math.random() * users.length)],
      startDate: hasStartDate ? randomDate() : undefined,
      dueDate: randomDate(),
    });
  }

  return tasks;
};