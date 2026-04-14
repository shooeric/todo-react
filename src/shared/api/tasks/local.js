const STORAGE_KEY = "tasks";

const read = () => {
    try {
        const data = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
        return Array.isArray(data) ? data : [];
    } catch(error) {
        return []
    }
};

const write = (tasks) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
};

const delay = (ms = 150) => {
    return new Promise((resolve) => setTimeout(resolve, ms))
};

console.log("localAPI");

const localAPI = {
  getAll: async () => {
    await delay()
    
    return read()
  },

  getById: async (id) => {
    await delay();
    
    return read()
        .find((task) => task.id === id) ?? null
      
  },

  add: async (task) => {
    await delay();
    
    const newTask = {
        ...task,
        id: crypto?.randomUUID() ?? Date.now().toString()
    }
      
      const data = read();
    console.log("data:", data, "isArray:", Array.isArray(data));
    console.log("TASK:", task);
      write([...read(), newTask])
      
    return newTask
  },

  delete: async (id) => {
    await delay();
    
    const tasks = read().filter((task) => task.id !== id)
    
    write(tasks)
  },

  deleteAll: async () => {
    await delay();
    
    write([])
  },

  toggleComplete: async (id, isDone) => {
    await delay();
    
    const tasks = read()
        .map((task) => {
          return task.id === id ? {...task, isDone} : task
        })
      
    write(tasks)
  },
};

export default localAPI