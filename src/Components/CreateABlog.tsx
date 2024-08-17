import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import '../Styles/App.scss';

interface CreateBlogPostProps {
  userId: string;
}

const CreateBlogPost: React.FC<CreateBlogPostProps> = ({ userId }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const postData = {
      title,
      content,
      author: userId,
    };
    console.log(postData);
  };

  return (
    <div className="createBlogMainContainer">
      <h2 className="createBlogHeader">Create a Blog Post</h2>
      <Form onSubmit={handleSubmit} className="formCreateBlog">
        <Form.Group controlId="formTitle">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your blog title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="formContent" controlId="formContent">
          <Form.Label>Content</Form.Label>
          <Form.Control
            as="textarea"
            rows={5}
            placeholder="Write your post blog post here"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="submitButton">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default CreateBlogPost;
