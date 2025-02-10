import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import TaskAssignment from "../components/TaskAssignment";
import TaskList from "../components/TaskList";
import CalendarView from "../components/CalendarView";
import Chart from "../components/Chart";
import ProgressChart from "../components/ProgressChart";
import { io } from "socket.io-client";

// Initialize Socket.IO
const socket = io("http://localhost:4000"); // Backend URL

const Home = () => {

  const chartData = {
    labels: ["Task 1", "Task 2", "Task 3"],
    datasets: [
      {
        label: "Completion Progress",
        data: [30, 60, 90],
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  // Fetch tasks from backend
  const fetchTasks = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/tasks");
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      toast.error("Failed to load tasks!");
    }
  };

  // Add a new task
  const handleAddTask = async (task) => {
    try {
      const response = await axios.post("http://localhost:4000/api/tasks", task);
      const newTask = response.data;
      setTasks([...tasks, newTask]);

      // Emit socket event
      socket.emit("task-added", newTask);

      toast.success("Task added successfully!");
    } catch (error) {
      console.error("Error adding task:", error);
      toast.error("Failed to add task!");
    }
  };

  // Real-time updates using Socket.IO
  useEffect(() => {
    fetchTasks();

    // Listen for real-time updates
    socket.on("task-updated", (updatedTask) => {
      setTasks((prevTasks) => [...prevTasks, updatedTask]);
    });

    return () => socket.disconnect();
  }, []);

  const [tasks, setTasks] = useState([]);

  // Fetch tasks from the backend
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/tasks");
        const data = await response.json();
        setTasks(data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    fetchTasks();
  }, []);

  return (
    <main className="container mx-auto">
      <div className="container item-center flex mx-auto" >
        <div className="w-1/2 bg-blue-50 rounded-lg p-6 mt-9 mr-5 flex flex-col justify-center items-center shadow-lg">
          <h4 className="text-2xl font-semibold text-gray-700 mb-2">Welcome to</h4>
          <h2 className="text-3xl font-bold text-blue-600 mb-4">Zidio Task Management</h2>
          <p className="text-lg text-gray-600 text-center px-4">
            Stay organized and boost productivity with Zidio. Effortlessly manage, track, and complete your tasks on time.
          </p>
        </div>



        <TaskAssignment onAddTask={handleAddTask} />

      </div>
      <TaskList tasks={tasks} setTasks={setTasks} />
      {/* <Chart chartData={chartData} />
      <ProgressChart tasks={tasks} /> */}
      <CalendarView tasks={tasks} />
    </main>
  );
};

export default Home;
