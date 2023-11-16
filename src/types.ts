export interface Task {
    id: number;
    title: string;
    description?: string;
    deadline?: string;//Date
    status: "pending" | "completed" | "overdue" | "removed";
}