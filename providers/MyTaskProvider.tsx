import { getUserTasks } from "@/lib/api-functions";
import { Task } from "@/type-declarations";
import {
  createContext,
  ReactNode,
  useContext,
  useState,
  useEffect,
} from "react";
import { useAuth } from "./AuthProvider";

interface MyTasksContextType {
  myTasks: Task[] | null;
  isLoading: boolean;
}

const MyTasksContext = createContext<MyTasksContextType | null>(null);

export default function MyTasksContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [myTasks, setMyTasks] = useState<Task[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { session } = useAuth();

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    async function fetchMyTasks() {
      try {
        setIsLoading(true);
        if (!session) {
          return;
        }
        const data = await getUserTasks(session);
        setMyTasks(data);
      } finally {
        setIsLoading(false);
      }
    }

    if (session) {
      fetchMyTasks(); // Initial fetch
      interval = setInterval(fetchMyTasks, 60000); // Poll every 60 seconds
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [session]);

  return (
    <MyTasksContext.Provider value={{ myTasks, isLoading }}>
      {children}
    </MyTasksContext.Provider>
  );
}

export function useMyTasks() {
  const ctx = useContext(MyTasksContext);
  if (!ctx) {
    throw new Error("useMyTasks must be used within a MyTasksContextProvider");
  }
  return ctx;
}
