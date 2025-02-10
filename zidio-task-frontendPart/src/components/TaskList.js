import React, { useState, useEffect } from "react";

const TaskList = ({ tasks, setTasks }) => {
    if (tasks.length === 0) {
        return (
            <div className="w-1/2 bg-blue-50 rounded-lg p-4 mt-9 ml-5 shadow-lg">
                <h2 className="text-xl text-center text-black mb-4"><b>TASK LIST</b></h2>
                <p className="text-gray-600">No tasks available. Add some tasks to get started!</p>
            </div>
        );
    }

    // Sort tasks by deadline (earliest first)
    const sortedTasks = [...tasks].sort((a, b) => new Date(a.deadline) - new Date(b.deadline));

    // Function to toggle task completion in real-time
    const handleCompleteTask = async (taskId, completed) => {
        try {
            const response = await fetch(`http://localhost:4000/api/tasks/${taskId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ completed: !completed }),
            });

            if (response.ok) {
                setTasks(prevTasks =>
                    prevTasks.map(task =>
                        task._id === taskId ? { ...task, completed: !completed } : task
                    )
                );
            } else {
                console.error("Failed to update task status.");
            }
        } catch (error) {
            console.error("Error updating task:", error);
        }
    };

    // Function to delete task in real-time
    const handleDeleteTask = async (taskId) => {
        try {
            const response = await fetch(`http://localhost:4000/api/tasks/${taskId}`, {
                method: "DELETE",
            });

            if (response.ok) {
                setTasks(prevTasks => prevTasks.filter(task => task._id !== taskId));
            } else {
                console.error("Failed to delete task.");
            }
        } catch (error) {
            console.error("Error deleting task:", error);
        }
    };

    return (
        <div className="w-full bg-blue-50 rounded-lg p-4 mt-9 shadow-lg">
            <h2 className="text-2xl font-bold text-black mb-4 text-center">Task List</h2>
            <ul>
                {sortedTasks.map((task) => (
                    <li
                        key={task._id}
                        className="border-b py-4 flex justify-between items-center"
                    >
                        <div>
                            <h3 className={`font-bold ${task.completed ? "line-through" : ""}`}>
                                {task.title}
                            </h3>
                            <p className="text-sm text-gray-500">
                                Subtasks: {task.subtasks?.join(", ")}
                            </p>
                            <p className="text-sm text-gray-500">
                                Priority: {task.priority} | Deadline:{" "}
                                {new Date(task.deadline).toLocaleDateString()}
                            </p>
                        </div>
                        <div>
                            <button
                                className={`px-4 py-2 rounded ${task.completed ? "bg-green-500" : "bg-gray-400"} text-white mr-2`}
                                onClick={() => handleCompleteTask(task._id, task.completed)}
                            >
                                {task.completed ? "Completed" : "Mark Complete"}
                            </button>
                            <button
                                className="px-4 py-2 bg-red-500 text-white rounded"
                                onClick={() => handleDeleteTask(task._id)}
                            >
                                Delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TaskList;
