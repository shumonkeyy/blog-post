import React, { useEffect, useState, useRef } from "react";
import Create from "./Create";
import Post from "./Post";
import Edit from "./Edit";

const List = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [posts, setPosts] = useState([
    { id: 1, title: "t1", content: "c1" },
    { id: 2, title: "t2", content: "c2" },
  ]);

  const [isCreate, setIsCreate] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState("");

  const getTitle = useRef();
  const getContent = useRef();

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
  const savePost = (e) => {
    e.preventDefault();

    const id = Date.now();
    setPosts([...posts, { id, title, content }]);
    getTitle.current.value = "";
    getContent.current.value = "";
    toggleCreate();
  };

  const updatePost = (e) => {
    e.preventDefault();

    const updatedPosts = posts.map((post) => {
      if (post.id === editId) {
        return {
          ...post,
          title: title || post.title,
          content: content || post.content,
        };
      }
      return post;
    });
    setPosts(updatedPosts);

    toggleEdit();
  };

  const deletePost = (id) => {
    if (confirm("Are you sure you want to delete this post?")) {
      // Save it!
      const modifiedPosts = posts.filter((eachPost) => {
        return eachPost.id !== id;
      });
      setPosts(modifiedPosts);
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
          <button className="btn btn-primary mt-2" onClick={toggleCreate}>
            + Create New Post
          </button>
        </div>
      </>
    );
  }
};

export default List;
