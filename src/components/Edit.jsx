import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faBan } from "@fortawesome/free-solid-svg-icons";

const Edit = ({
  title,
  content,
  saveTitleToState,
  saveContentToState,
  updatePost,
  cancelEdit,
}) => {
  return (
    <>
      <div className="text-center my-5">
        <form>
          <h1>Edit Post</h1>
          <input
            type="text"
            placeholder="title"
            defaultValue={title}
            onChange={saveTitleToState}
            className="w-75"
          />
          <br />
          <br />
          <textarea
            placeholder="contents"
            defaultValue={content}
            onChange={saveContentToState}
            className="w-75"
          ></textarea>
          <br />
          <br />
          <button onClick={updatePost} className="btn btn-success me-2">
            <FontAwesomeIcon icon={faPenToSquare} /> Update Post
          </button>
          <button onClick={cancelEdit} className="btn btn-danger">
            <FontAwesomeIcon icon={faBan} /> Cancel Edit
          </button>
        </form>
      </div>
    </>
  );
};
export default Edit;
