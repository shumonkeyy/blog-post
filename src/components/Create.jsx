import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFloppyDisk, faBan } from "@fortawesome/free-solid-svg-icons";

const Create = ({
  saveTitleToState,
  saveContentToState,
  savePost,
  getTitle,
  getContent,
  cancelCreate,
}) => {
  return (
    <>
      <div className="text-center my-5">
        <form>
          <h1>Create New Post</h1>
          <input
            type="text"
            placeholder="title"
            onChange={saveTitleToState}
            ref={getTitle}
            className="w-75"
          />
          <br />
          <br />
          <textarea
            placeholder="content"
            onChange={saveContentToState}
            ref={getContent}
            className="w-75"
          ></textarea>
          <br />
          <br />
          <button onClick={savePost} className="btn btn-success me-2">
            <FontAwesomeIcon icon={faFloppyDisk} /> Save Post
          </button>
          <button onClick={cancelCreate} className="btn btn-danger">
            <FontAwesomeIcon icon={faBan} /> Cancel
          </button>
        </form>
      </div>
    </>
  );
};
export default Create;
