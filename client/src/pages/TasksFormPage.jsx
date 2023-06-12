import { useForm } from "react-hook-form";
import { deleteTask, createTask, updateTask, getTask } from "../api/task.api";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "react-hot-toast";

export function TasksFormPage() {
  const navigate = useNavigate();
  const params = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  const onSubmit = handleSubmit(async (data) => {
    if (params.id) {
      await updateTask(params.id, data);
      toast.success("tarea actualisada", {
        position: "bottom-right",
        style: {
          background: "#101010",
          color: "#fff",
        },
      });
    } else {
      await createTask(data);
      toast.success("tarea creada", {
        position: "bottom-right",
        style: {
          background: "#101010",
          color: "#fff",
        },
      });
    }
    navigate("/tasks");
  });

  useEffect(() => {
    async function loadTask() {
      if (params.id) {
        const res = await getTask(params.id);
        console.log(res);
        setValue("title", res.data.title);
        setValue("description", res.data.description);
      }
    }
    loadTask();
  }, []);
  return (
    <div className=" max-w-xl mx-auto">
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="texto"
          {...register("title", { required: true })}
          className=" bg-zinc-800 p-3 rounded-lg block w-full mb-3"
        />
        {errors.title && <span>this title is required</span>}
        <textarea
          rows="3"
          placeholder="description"
          {...register("description", { required: true })}
          className=" bg-zinc-800 p-3 rounded-lg block w-full mb-3"
        ></textarea>
        {errors.description && <span>this description is required</span>}
        <button className=" bg-indigo-500 p-3 rounded-lg w-full block mt-3">
          Save
        </button>
      </form>
      {params.id && (
        <div className=" flex justify-end">
          <button
            className=" bg-red-500 p-3 rounded-lg w-48 mt-3"
            onClick={async () => {
              const acepted = window.confirm("are you sure");
              if (acepted) {
                await deleteTask(params.id);
                toast.success("task eliminada", {
                  position: "bottom-right",
                  style: {
                    background: "#101010",
                    color: "#fff",
                  },
                });
                navigate("/tasks");
              }
            }}
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
}
