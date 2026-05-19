import { useState, useEffect } from "react";
import { initialProjects } from "../data/initialProjects";

export function useProjects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("portfolio_projects");
    if (stored) {
      try {
        setProjects(JSON.parse(stored));
      } catch (e) {
        console.error("Failed to parse stored projects", e);
        setProjects(initialProjects);
      }
    } else {
      setProjects(initialProjects);
      localStorage.setItem("portfolio_projects", JSON.stringify(initialProjects));
    }
  }, []);

  const addProject = (newProject) => {
    const updated = [
      ...projects,
      {
        id: Date.now().toString(),
        ...newProject,
        screenshots: newProject.screenshots || [],
      },
    ];
    setProjects(updated);
    localStorage.setItem("portfolio_projects", JSON.stringify(updated));
  };

  const deleteProject = (id) => {
    const updated = projects.filter((p) => p.id !== id);
    setProjects(updated);
    localStorage.setItem("portfolio_projects", JSON.stringify(updated));
  };

  const editProject = (id, updatedData) => {
    const updated = projects.map((p) =>
      p.id === id ? { ...p, ...updatedData } : p
    );
    setProjects(updated);
    localStorage.setItem("portfolio_projects", JSON.stringify(updated));
  };

  return { projects, addProject, deleteProject, editProject };
}
