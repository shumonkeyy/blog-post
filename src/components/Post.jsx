import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";

const Post = ({ id, title, content, editPost, deletePost }) => {
  return (
    <>
      <tr>
        <td>{id}</td>
        <td>{title}</td>
        <td>{content}</td>
        <td>
          <button className="btn btn-primary me-2" onClick={() => editPost(id)}>
            <FontAwesomeIcon icon={faPenToSquare} />
          </button>
          <button className="btn btn-danger" onClick={() => deletePost(id)}>
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </td>
      </tr>
    </>
  );
};
export default Post;
