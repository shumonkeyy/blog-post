import React, { useEffect, useState, useRef } from "react";
import Create from "./Create";
import Post from "./Post";
import Edit from "./Edit";
import axios from "axios";
import "../index.css";

const List = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [posts, setPosts] = useState([]);

  const [isCreate, setIsCreate] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getTitle = useRef();
  const getContent = useRef();
  const [validateErr, setValidateErr] = useState({});

  useEffect(() => {
    fetchPost();
  }, []);

  const fetchPost = async () => {
    try {
      const response = await axios.get("/api/blog");
      setPosts(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center mt-5">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="error-message">Error: {error}</div>;
  }

  const saveTitle = (e) => {
    setTitle(e.target.value);
  };
  const saveContent = (e) => {
    setContent(e.target.value);
  };
  const toggleCreate = () => {
    setIsCreate(!isCreate);
  };
  const toggleEdit = () => {
    setIsEdit(!isEdit);
  };
  const editPost = (id) => {
    setEditId(id);
    toggleEdit();
  };
  // const savePost = (e) => {
  //   e.preventDefault();

  //   const id = Date.now();
  //   setPosts([...posts, { id, title, content }]);
  //   getTitle.current.value = "";
  //   getContent.current.value = "";
  //   toggleCreate();
  // };
  const savePost = async (event) => {
    event.preventDefault();
    if (title && content) {
      // setPosts([...posts, {id: Date.now(), title, content}])
      await axios.put(`/api/blog/${editId}`, {
        title,
        content,
      });
      fetchPost();

      getTitle.current.value = "";
      getContent.current.value = "";
      toggleCreate();

      setValidateErr([]);
    } else {
      let err = [];
      if (!title) err["title"] = "This field is required!";
      if (!content) err["content"] = "This field is required!";

      setValidateErr(err);
    }
  };

  // const updatePost = (e) => {
  //   e.preventDefault();

  //   const updatedPosts = posts.map((post) => {
  //     if (post.id === editId) {
  //       return {
  //         ...post,
  //         title: title || post.title,
  //         content: content || post.content,
  //       };
  //     }
  //     return post;
  //   });
  //   setPosts(updatedPosts);

  //   toggleEdit();
  // };
  const updatePost = async (event) => {
    event.preventDefault();

    if (title && content) {
      console.log("post update");
      // const updatedPosts = posts.map(post => {
      //  if(post._id === editId) {
      //      return { ...post, title, content }
      //  }
      //  return post
      // })
      // setPosts(updatedPosts)
      await axios.put(`/api/blog/${editId}`, {
        title,
        content,
      });
      fetchPost();

      // getTitle.current.value = "";
      // getContent.current.value = "";
      setIsEdit(false);

      setValidateErr([]);
    } else {
      // console.log("error");
      let err = [];
      if (!title) err["title"] = "This field is required!";
      if (!content) err["content"] = "This field is required!";
      console.log(err);

      setValidateErr(err);
    }
  };

  const deletePost = async (id) => {
    if (confirm("Are you sure you want to delete this post?")) {
      // Save it!
      await axios.delete(`http://localhost:3000/blog/${id}`);
      fetchPost();
    } else {
      // Do nothing!
      return;
    }
  };

  const cancelEdit = (e) => {
    setIsEdit(!isEdit);
  };

  const cancelCreate = (e) => {
    setIsCreate(!isCreate);
  };
  if (isCreate) {
    return (
      <Create
        getTitle={getTitle}
        getContent={getContent}
        saveTitleToState={saveTitle}
        saveContentToState={saveContent}
        savePost={savePost}
        cancelCreate={cancelCreate}
      />
    );
  } else if (isEdit) {
    const post = posts.find((post) => {
      return post.id === editId;
    });

    return (
      <Edit
        title={post.title}
        content={post.content}
        saveTitleToState={saveTitle}
        saveContentToState={saveContent}
        updatePost={updatePost}
        cancelEdit={cancelEdit}
      />
    );
  } else {
    return (
      <>
        <div className="container text-center my-5">
          <h1>All Posts</h1>
          {!posts.length ? (
            <h2 className="text-danger">There are no posts to show.</h2>
          ) : (
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Title</th>
                  <th>Content</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {posts.map((post) => {
                  return (
                    <Post
                      key={post.id}
                      id={post.id}
                      title={post.title}
                      content={post.content}
                      editPost={editPost}
                      deletePost={deletePost}
                    />
                  );
                })}
              </tbody>
            </table>
          )}
          <button className="btn btn-primary mt-2" onClick={toggleCreate}>
            + Create New Post
          </button>
        </div>
      </>
    );
  }
};

export default List;
