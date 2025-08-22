import { useContext, useEffect, useState } from "preact/hooks";
import type { IEvent } from "../types/event";
import { EventContext } from "../store/EventContext";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function EventForm({
  isEditing = false,
}: {
  isEditing?: boolean;
}) {
  //consuming context
  const context = useContext(EventContext);
  if (!context) {
    throw new Error("Error");
  }
  const { state, addEvent, updateEvent, dispatch } = context;
  const { category, error } = state;

  //navigation
  const navigate = useNavigate();
  const { id } = useParams();

  //Form Data
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
    organizer: "",
    imageUrl: "",
    category: "",
  });
  //Form error state
  const [errors, setErrors] = useState<any>({});

  //Image state handling
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [previousImageUrl, setPreviousImageUrl] = useState("event2.jpeg");

  //form on input change
  function handleImageChange(e: any) {
    try {
      const file = e.target.files[0];
      if (file) {
        setSelectedFile(file);
        setPreviousImageUrl(URL.createObjectURL(file));
      } else {
        setSelectedFile(null);
        setPreviousImageUrl(previousImageUrl || "");
      }
    } catch (error: any) {
      console.error("Error-handleImageChange-function:", error);
    }
  }
  function handleInputChange(event: any) {
    try {
      const { name, value } = event.target;
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    } catch (error: any) {
      console.error("Error-handleInputChange-function:", error);
    }
  }

  //Form Edit
  useEffect(() => {
    try {
      if (isEditing && id) {
        const eventToEdit = state.events.find((event) => event.id === id);
        if (eventToEdit) {
          setFormData({
            title: eventToEdit.title,
            description: eventToEdit.description,
            date: eventToEdit.date,
            location: eventToEdit.location,
            organizer: eventToEdit.organizer,
            imageUrl: eventToEdit.imageUrl,
            category: eventToEdit.category,
          });
        }
      }
    } catch (error: any) {
      console.error("Error-Form-Edit:", error);
    }
  }, [isEditing, id, state.events]);

  //Form Submission and validation
  async function handleSubmit(e: any) {
    try {
      e.preventDefault();
      if (previousImageUrl) {
        formData.imageUrl = previousImageUrl;
      } else if (selectedFile) {
        formData.imageUrl = selectedFile;
      }
      const eventData: Omit<IEvent, "id"> = {
        title: formData.title,
        description: formData.description,
        date: formData.date,
        location: formData.location,
        organizer: formData.organizer,
        imageUrl: formData.imageUrl,
        category: formData.category,
      };
      const validationErrors: any = {};
      if (!formData.title) {
        validationErrors.title = "Title is Required";
      }
      if (!formData.description) {
        validationErrors.description = "Description is Required";
      }
      if (!formData.date) {
        validationErrors.date = "date is Required";
      }
      if (!formData.location) {
        validationErrors.location = "location is Required";
      }
      if (!formData.organizer) {
        validationErrors.organizer = "organizer is Required";
      }

      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
      } else {
        setErrors({});

        if (isEditing && id) {
          updateEvent({ id, ...eventData });
        } else {
          addEvent(eventData);
        }

        navigate("/");
      }
    } catch (error: any) {
      console.error("Error-handleSubmit:", error);
    }
  }

  //Form Cancel
  function handleCancel() {
    try {
      navigate("/");
    } catch (error: any) {
      console.error("Error-handleCancel:", error);
    }
  }
  return (
    <div className="rounded-sm p-4  max-w-3xl  ">
      <form
        class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={handleSubmit}
      >
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="title">
            Event Title
          </label>
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="Event Title"
            id="title"
            name="title"
            onChange={handleInputChange}
            value={formData.title}
          />
          {errors.title && <span className="text-red-500">{errors.title}</span>}
        </div>
        <div class="mb-4">
          <label
            class="block text-gray-700 text-sm font-bold mb-2"
            for="description"
          >
            Description
          </label>
          <textarea
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Event Description"
            id="description"
            name="description"
            onChange={handleInputChange}
            value={formData.description}
          />
          {errors.description && (
            <span className="text-red-500">{errors.description}</span>
          )}
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="date">
            Date
          </label>
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="date"
            placeholder="Event Date"
            id="date"
            name="date"
            onChange={handleInputChange}
            value={formData.date}
          />
          {errors.date && <span className="text-red-500">{errors.date}</span>}
        </div>
        <div class="mb-4">
          <label
            class="block text-gray-700 text-sm font-bold mb-2"
            for="location"
          >
            Location
          </label>
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="Event Location"
            id="location"
            name="location"
            onChange={handleInputChange}
            value={formData.location}
          />
          {errors.location && (
            <span className="text-red-500">{errors.location}</span>
          )}
        </div>
        <div class="mb-4">
          <label
            class="block text-gray-700 text-sm font-bold mb-2"
            for="organizer"
          >
            Organizer
          </label>
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="Event Organizer"
            id="organizer"
            name="organizer"
            onChange={handleInputChange}
            value={formData.organizer}
          />
          {errors.organizer && (
            <span className="text-red-500">{errors.organizer}</span>
          )}
        </div>
        <div class="mb-4">
          <label
            class="block text-gray-700 text-sm font-bold mb-2"
            for="organizer"
          >
            Event Category
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option selected>Choose a category</option>

            {category.map((option) => {
              return <option value={option.name}>{option.name}</option>;
            })}
          </select>
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="Image">
            {isEditing ? "Existing Event Image" : "Event Image"}
          </label>
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="file"
            placeholder="Event Image"
            id="imageUrl"
            name="imageUrl"
            onChange={handleImageChange}
          />
          {selectedFile && <img src={previousImageUrl} />}
          {/* {errors.imageUrl && (
            <span className="text-red-500">{errors.imageUrl}</span>
          )} */}
        </div>

        <div class="flex gap-8">
          <button
            class="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            {isEditing ? "Update Event" : "Create Event"}
          </button>

          <button
            class=" font-bold border-secondary bg-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
